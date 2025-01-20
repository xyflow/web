require('dotenv').config({ path: '.env.local' });
const { Client } = require('@notionhq/client');
const path = require('path');

const SHOWCASES_DATABASE_ID = '17bf4645224280ff9710d495e21ed13d';
const notion = new Client({ auth: process.env.NOTION_API_SECRET });
const OUTPUT_IMAGE_PATH = path.resolve(__dirname, '../public/img/showcase');

export default async function getStaticProps() {
  const { results } = await notion.databases.query({
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
            equals: 'React Flow',
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
  });

  const showcases = await Promise.all(
    results.map(async (result) => {
      const id = result.id;
      const title = result.properties.Name.title[0].plain_text;
      const projectUrl = result.properties['Project Website'].url;
      const demoUrl = result.properties['Demo URL'].url;
      const tags = result.properties.Tags.multi_select;
      const featured = result.properties.Featured.checkbox;
      const description = result.properties.Description.rich_text[0].plain_text;
      const imageSrc = result.properties.Image.files[0].file.url;
      const imageFileName = `${id}.png`;
      const imageFilePath = path.resolve(OUTPUT_IMAGE_PATH, imageFileName);

      return {
        id,
        title,
        url: projectUrl,
        demoUrl,
        description,
        image: imageFileName,
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
    revalidate: 60 * 60 * 24,
  };
}
