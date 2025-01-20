import https from 'https';
import { put } from '@vercel/blob';
import { Client } from '@notionhq/client';

const SHOWCASES_DATABASE_ID = '17bf4645224280ff9710d495e21ed13d';
const notion = new Client({ auth: process.env.NOTION_API_SECRET });

const downloadImage = (source: string): Promise<Buffer> => {
  return new Promise((resolve) => {
    https.get(source, (res) => {
      let chunks: Buffer[] = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    });
  });
};

// this is being used for only fetching the showcases once in development
// we don't want to query notion every time the page reloads
let devShowcaseCache: any = undefined;

// this is some fake content that is being used when no notion api key and vercel blob token is present
const devShowcasePlaceholders = Array.from({ length: 20 }).map((_, i) => ({
  id: `${i}`,
  title: `React Flow ${i}`,
  url: 'https://reactflow.dev',
  demoUrl: 'https://reactflow.dev',
  description:
    'A customizable React component for building node-based editors and interactive diagrams.',
  image: '/img/showcase/placeholder.png',
  tags: [
    { id: '1', name: 'Workflow Builder' },
    { id: '2', name: 'AI' },
    { id: '3', name: 'Open Source' },
  ],
  featured: false,
}));

export default function getStaticProps(
  framework: 'React Flow' | 'Svelte Flow' = 'React Flow',
) {
  return async () => {
    if (!process.env.NOTION_API_SECRET || !process.env.BLOB_READ_WRITE_TOKEN) {
      console.log(
        'You need to set NOTION_API_SECRET and BLOB_READ_WRITE_TOKEN in your .env.local file to get the showcases.',
      );
      return {
        props: {
          ssg: {
            showcases: devShowcasePlaceholders,
          },
        },
      };
    }

    if (process.env.NODE_ENV === 'development' && devShowcaseCache) {
      return {
        props: {
          ssg: {
            showcases: devShowcaseCache,
          },
        },
      };
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
          property: 'Featured',
          direction: 'descending',
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
        const tags = result.properties.Tags.multi_select;
        const featured = result.properties.Featured.checkbox;
        const description =
          result.properties.Description.rich_text[0].plain_text;
        const imageSrc = result.properties.Image.files[0].file.url;
        const imageFileName = `${id}.png`;

        const imageFile = await downloadImage(imageSrc);

        const blob = await put(imageFileName, imageFile, {
          access: 'public',
          addRandomSuffix: false,
        });

        return {
          id,
          title,
          url: projectUrl,
          demoUrl,
          description,
          image: blob.url,
          tags,
          featured,
        };
      }),
    );

    devShowcaseCache = showcases;

    return {
      props: {
        ssg: {
          showcases: showcases,
        },
      },
    };
  };
}
