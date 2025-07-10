import { Octokit } from '@octokit/rest';
import { ShowcaseItem } from 'xy-shared';

export async function createShowcasePR(formData: ShowcaseItem, token: string) {
  const owner = process.env.NEXT_PUBLIC_GITHUB_USERNAME!;
  const repo = process.env.NEXT_PUBLIC_GITHUB_REPO!;
  const base = process.env.NEXT_PUBLIC_GITHUB_BRANCH!;
  const branch = `form-data-${Date.now()}`;
  const filePath = 'sites/reactflow.dev/public/form-data.txt';

  const octokit = new Octokit({ auth: token });

  try {
    // Get latest commit SHA
    const { data: latest } = await octokit.repos.getBranch({ owner, repo, branch: base });
    const baseSha = latest.commit.sha;
    const treeSha = latest.commit.commit.tree.sha;

    // Get existing file content (if any)
    let existingContent = '';
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

    const newContent = existingContent + '\n' + JSON.stringify(formData);

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
      message: 'Add form data',
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
      title: 'Form Data Submission',
      head: branch,
      base,
      body: 'Automated PR from form submission',
    });

    return { success: true, prUrl: pr.html_url };
  } catch (err) {
    return { error: 'Failed to create PR' };
  }
}
