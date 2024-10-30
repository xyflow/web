const regex = /- *Updated dependencies *.*\n.*/g;

(async () => {
  const body = process.env.BODY;
  const newBody = body.replaceAll(regex, '');
  console.log(newBody);
})();
