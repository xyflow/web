import { useEffect, useState } from 'react';

export function ExamplesUrl() {
    const [url, setUrl] = useState("");

    useEffect(() => {
        if (process.env.VERCEL_ENV === 'preview' && process.env.VERCEL_GIT_COMMIT_REF) {
            setUrl(`https://example-apps-git-${process.env.VERCEL_GIT_COMMIT_REF}-xyflow.vercel.app`);
        } else {
            setUrl("https://example-apps-git-test-xyflow.vercel.app");
        }
    }, []);

    return url;
}
