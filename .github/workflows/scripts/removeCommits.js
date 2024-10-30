const regex = /(\[.*\]\(.*\)) (\[.*\]\(.*\)) /g;

(async () => {
  const body = process.env.BODY;
  const newBody = body.replaceAll(regex, '$1 ');
  console.log(newBody);
})();
