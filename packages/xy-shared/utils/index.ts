export function ExamplesUrl() {
    if (process.env.VERCEL_ENV === 'preview' && process.env.VERCEL_GIT_COMMIT_REF) {
        return `https://example-apps-git-${process.env.VERCEL_GIT_COMMIT_REF}-xyflow.vercel.app`
    }
    return process.env.NEXT_PUBLIC_EXAMPLES_URL
}