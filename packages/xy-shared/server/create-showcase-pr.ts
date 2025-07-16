import { createAppAuth } from '@octokit/auth-app';
import { Octokit } from '@octokit/rest';
import { Library, ShowcaseItem } from '..';

const octokit = new Octokit({
  authStrategy: createAppAuth,
  auth: {
    appId: process.env.GH_APP_ID,
    privateKey: process.env.GH_APP_PRIVATE_KEY,
    clientId: process.env.GITHUB_APP_CLIENT_ID,
    clientSecret: process.env.GITHUB_APP_CLIENT_SECRET,
    installationId: process.env.GH_APP_INSTALL_ID
  },
});

export async function createShowcasePR(
  formData: ShowcaseItem,
  library: Library,
  comment: string,
) {
  const owner = 'xyflow';
  const repo = 'web';
  const base = 'showcase-form-poc';
  const branch = `form-data-${Date.now()}`;

  const reactflowPath =
    'sites/reactflow.dev/src/app/(content-pages)/showcase/showcases.json';
  const svelteflowPath =
    'sites/svelteflow.dev/src/app/(content-pages)/showcase/showcases.json';
  const filePath = library === 'React Flow' ? reactflowPath : svelteflowPath;

  // Get latest commit SHA
  const { data: latest } = await octokit.repos.getBranch({
    owner,
    repo,
    branch: base,
  });
  const baseSha = latest.commit.sha;
  const treeSha = latest.commit.commit.tree.sha;

  // Get existing file content (if any)
  let existingContent = '[]';
  try {
    const { data: file } = await octokit.repos.getContent({
      owner,
      repo,
      path: filePath,
      ref: base,
    });
    const buff = Buffer.from(file.content, 'base64');
    existingContent = buff.toString('utf8');
  } catch (_) {
    console.error('could not read file from github');
  }
  const showcases: ShowcaseItem[] = JSON.parse(existingContent);
  const updatedShowcases = [...showcases, formData];
  const newContent = JSON.stringify(updatedShowcases, undefined, 2);

  // Create new branch
  await octokit.git.createRef({
    owner,
    repo,
    ref: `refs/heads/${branch}`,
    sha: baseSha,
  });

  // Create blob
  const { data: blob } = await octokit.git.createBlob({
    owner,
    repo,
    content: newContent,
    encoding: 'utf-8',
  });

  // Create new tree
  const { data: newTree } = await octokit.git.createTree({
    owner,
    repo,
    base_tree: treeSha,
    tree: [
      {
        path: filePath,
        mode: '100644',
        type: 'blob',
        sha: blob.sha,
      },
    ],
  });

  // Create commit
  const { data: newCommit } = await octokit.git.createCommit({
    owner,
    repo,
    message: 'add showcase for ' + formData.title,
    tree: newTree.sha,
    parents: [baseSha],
  });

  // Update ref to point to new commit
  await octokit.git.updateRef({
    owner,
    repo,
    ref: `heads/${branch}`,
    sha: newCommit.sha,
  });

  // Create pull request
  const { data: pr } = await octokit.pulls.create({
    owner,
    repo,
    title: `Showcase for "${formData.title}"`,
    head: branch,
    base,
    body: `# Add showcase for "${formData.title}"\n\n${comment}`,
  });

  return { success: true, prUrl: pr.html_url };
}
