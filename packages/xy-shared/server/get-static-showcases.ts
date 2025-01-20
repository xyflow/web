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

export default function getStaticProps(
  framework: 'React Flow' | 'Svelte Flow' = 'React Flow',
) {
  return async () => {
    console.log('Fetching showcases for', framework);
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

    return {
      props: {
        ssg: {
          showcases: showcases,
        },
      },
    };
  };
}
