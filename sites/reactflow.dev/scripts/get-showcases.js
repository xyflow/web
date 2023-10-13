require('dotenv').config();
const { Client } = require('@notionhq/client');
const path = require('path');
const fs = require('fs');
const https = require('https');

const SHOWCASES_DATABASE_ID = '585dfdbe353145f6af6dc2294ab14253';
const notion = new Client({ auth: process.env.NOTION_API_SECRET });
const OUTPUT_PATH = path.resolve(__dirname, '../public/data/showcases.json');
const OUTPUT_IMAGE_PATH = path.resolve(__dirname, '../public/img/showcase');

const downloadImage = (source, target) => {
  return new Promise((resolve) => {
    https.get(source, (res) => {
      res.pipe(fs.createWriteStream(target));
      resolve();
    });
  });
};

(async () => {
  const { results } = await notion.databases.query({
    database_id: SHOWCASES_DATABASE_ID,
    filter: {
      and: [
        {
          property: 'published',
          checkbox: {
            equals: true,
          },
        },
        {
          property: 'library',
          rich_text: {
            equals: 'react',
          },
        },
      ],
    },
    sorts: [
      {
        property: 'featured',
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
      const title = result.properties.title.title[0].plain_text;
      const projectUrl = result.properties['project-url'].url;
      const demoUrl = result.properties['demo-url'].url;
      const tags = result.properties.tags.multi_select;
      const featured = result.properties.featured.checkbox;
      const description = result.properties.description.rich_text[0].plain_text;
      const imageSrc = result.properties.image.files[0].file.url;
      const imageFileName = `${id}.png`;
      const imageFilePath = path.resolve(OUTPUT_IMAGE_PATH, imageFileName);

      await downloadImage(imageSrc, imageFilePath);

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

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(showcases));
})();
