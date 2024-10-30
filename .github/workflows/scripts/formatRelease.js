const removeThanks =
  /Thanks \[@(?:moklick|peterkogo|hayleigh-dot-dev|chrtze|bcakmakoglu)\]\(.*\)! \- */g;
const removeCommits = /(\[.*\]\(.*\)) (\[.*\]\(.*\)) /g;
const removeDeps = /- *Updated dependencies.*/gs;
const removeNewlines = /[\r\n]+/g;

(async () => {
  const body = process.env.BODY;
  let newBody = body
    .replaceAll(removeThanks, '')
    .replaceAll(removeCommits, '$1 ')
    .replaceAll(removeDeps, '')
    .replaceAll(removeNewlines, '\n');
  console.log(newBody);
})();
