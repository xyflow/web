const regex = /- *Updated dependencies.*/gs;

(async () => {
  const body = process.env.BODY;
  const newBody = body.replaceAll(regex, '');
  console.log(newBody);
})();
