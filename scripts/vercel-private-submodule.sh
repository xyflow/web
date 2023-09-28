# github submodule repo address without https:// prefix
SUBMODULE_GITHUB=github.com/xyflow/pro-examples
# .gitmodules submodule path
SUBMODULE_PATH=sites/pro.xyflow.com/pro-examples

# github access token is necessary
# add it to Environment Variables on Vercel
if [ "$GITHUB_ACCESS_TOKEN" == "" ]; then
  echo "Error: GITHUB_ACCESS_TOKEN is empty"
  exit 1
fi

# stop execution on error - don't let it build if something goes wrong
set -e

rm -rf $SUBMODULE_PATH || true # remove the submodule path if exists
git clone https://$GITHUB_ACCESS_TOKEN@$SUBMODULE_GITHUB $SUBMODULE_PATH # clone the submodule repo
