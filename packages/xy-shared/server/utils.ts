import { Client as NotionClient } from '@notionhq/client';
import { readFileSync } from 'fs';
import https from 'https';
import { put } from '@vercel/blob';

const notion = new NotionClient({ auth: process.env.NOTION_API_SECRET });

const SHOWCASES_DATABASE_ID = '17bf4645224280ff9710d495e21ed13d';

export function loadJSONFile<T>(url: string): T | undefined {
  try {
    const file = readFileSync(url, 'utf-8');
    return JSON.parse(file.toString()) as T;
  } catch (err) {
    console.log(err);
  }
}

export const downloadImage = async (source: string): Promise<Buffer> => {
  return new Promise((resolve) => {
    https.get(source, (res) => {
      let chunks: Buffer[] = [];
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

export const fakeShowcases = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  title: `Showcase ${i}`,
  url: 'https://example.com',
  demoUrl: 'https://example.com',
  description: 'This is a showcase',
  image: '/img/showcase/placeholder.png',
  tags: [],
  featured: false,
}));

export async function fetchNotionShowcases(
  framework: 'React Flow' | 'Svelte Flow' = 'React Flow',
) {
  if (!process.env.NOTION_API_SECRET) {
    return fakeShowcases;
  }

  const { results } = (await notion.databases.query({
    database_id: SHOWCASES_DATABASE_ID,
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
            equals: framework,
          },
        },
      ],
    },
    sorts: [
      {
        property: 'Priority',
        direction: 'ascending',
      },
      {
        property: 'title',
        direction: 'ascending',
      },
    ],
  })) as any;

  const showcases = await Promise.all(
    results.map(async (result: any) => {
      const id = result.id;
      const title = result.properties.Name.title[0].plain_text;
      const projectUrl = result.properties['Project Website'].url;
      const demoUrl = result.properties['Demo URL'].url;
      const repoUrl = result.properties['Repository URL'].url;
      const openSource = result.properties['Open Source'].checkbox;
      const tags = result.properties.Tags.multi_select;
      const featured = result.properties.Featured.checkbox;
      const description = result.properties.Description.rich_text[0].plain_text;
      const imageSrc = result.properties.Image.files[0].file.url;

      if (openSource) {
        tags.push({ id: 'open-source', name: 'Open Source' });
      }

      const image =
        process.env.BLOB_READ_WRITE_TOKEN &&
        process.env.NODE_ENV === 'production'
          ? await downloadImageToVercelBlob(imageSrc, id)
          : imageSrc;

      return {
        id,
        title,
        url: projectUrl,
        demoUrl,
        repoUrl,
        openSource,
        description,
        image,
        tags,
        featured,
      };
    }),
  );

  return showcases;
}
