import { isFullPage, Client as NotionClient } from '@notionhq/client';
import { readFileSync } from 'fs';
import https from 'https';
import { put } from '@vercel/blob';
import { z } from 'zod';
import { ShowcaseItem } from '../layouts/showcase';
import { getFramework } from '../hooks/use-framework';

const notion = new NotionClient({ auth: process.env.NOTION_API_SECRET });

const SHOWCASES_DATABASE_ID = '17bf4645-2242-81fe-a089-000bf447a578';

// Zod schema for Notion page properties
const ShowcaseSchema = z.object({
  Name: z.object({
    title: z.array(z.object({ plain_text: z.string() })).min(1),
  }),
  'Project Website': z.object({
    url: z.string(),
  }),
  'Demo URL': z.object({
    url: z.string().nullable(),
  }),
  'Repository URL': z.object({
    url: z.string().nullable(),
  }),
  'Open Source': z.object({
    checkbox: z.boolean(),
  }),
  Tags: z.object({
    multi_select: z.array(z.object({ id: z.string(), name: z.string() })),
  }),
  Description: z.object({
    rich_text: z.array(z.object({ plain_text: z.string() })).min(1),
  }),
  Image: z.object({
    files: z
      .array(
        z.object({
          file: z.object({
            url: z.string(),
          }),
        }),
      )
      .min(1),
  }),
});

export function loadJSONFile<T>(url: string): T | undefined {
  try {
    const file = readFileSync(url, 'utf-8');
    return JSON.parse(file) as T;
  } catch (err) {
    console.error(err);
  }
}

export const downloadImage = async (source: string): Promise<Buffer> => {
  return new Promise((resolve) => {
    https.get(source, (res) => {
      const chunks: Buffer[] = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    });
  });
};

export const downloadImageToVercelBlob = async (
  source: string,
  id: string,
): Promise<string> => {
  const imageFile = await downloadImage(source);

  const blob = await put(`showcases/${id}.png`, imageFile, {
    access: 'public',
    addRandomSuffix: false,
  });

  return blob.url;
};

export const fakeShowcases: ShowcaseItem[] = Array.from(
  { length: 10 },
  (_, i) =>
    ({
      id: i.toString(),
      title: `Showcase ${i}`,
      url: 'https://example.com',
      demoUrl: 'https://example.com',
      repoUrl: null,
      description: 'This is a showcase',
      image: '/img/showcase/placeholder.jpg',
      tags: [],
    }) satisfies ShowcaseItem,
);

export async function fetchNotionShowcases(): Promise<ShowcaseItem[]> {
  if (!process.env.NOTION_API_SECRET) {
    if (process.env.NODE_ENV === 'development') {
      return fakeShowcases;
    }
    throw new Error('NOTION_API_SECRET is not set');
  }

  const { library } = getFramework();

  const { results } = await notion.dataSources.query({
    data_source_id: SHOWCASES_DATABASE_ID,
    filter: {
      and: [
        {
          property: 'Status',
          select: {
            equals: 'published',
          },
        },
        {
          property: 'Library',
          select: {
            equals: library,
          },
        },
      ],
    },
    sorts: [
      // {
      //   property: 'Priority',
      //   direction: 'ascending',
      // },
      {
        property: 'Name',
        direction: 'ascending',
      },
    ],
  });

  const showcases: ShowcaseItem[] = [];

  for (const result of results) {
    if (!result || !isFullPage(result)) {
      continue;
    }

    // Parse and validate properties with Zod
    const parsed = ShowcaseSchema.safeParse(result.properties);
    if (!parsed.success) {
      console.error('Invalid Notion page properties:', parsed.error);
      continue;
    }

    const props = parsed.data;
    const id = result.id;
    const title = props.Name.title[0].plain_text;
    const projectUrl = props['Project Website'].url;
    const demoUrl = props['Demo URL'].url;
    const repoUrl = props['Repository URL'].url;
    const openSource = props['Open Source'].checkbox;
    const tags: { id: string; name: string }[] = props.Tags.multi_select.map((tag) => ({
      id: tag.id,
      name: tag.name,
    }));
    const description = props.Description.rich_text[0].plain_text;
    const imageSrc = props.Image.files[0].file.url;

    if (openSource) {
      tags.push({ id: 'open-source', name: 'Open Source' });
    }

    const image =
      process.env.BLOB_READ_WRITE_TOKEN && process.env.NODE_ENV === 'production'
        ? await downloadImageToVercelBlob(imageSrc, id)
        : imageSrc;

    showcases.push({
      id,
      title,
      url: projectUrl,
      demoUrl,
      repoUrl,
      openSource,
      description,
      image,
      tags,
    });
  }

  await Promise.all(showcases);

  return showcases;
}
