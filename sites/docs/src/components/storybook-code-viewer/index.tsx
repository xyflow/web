type StorybookCodeViewerProps = {
    framework: 'react' | 'svelte' | 'vue',
    codePath: string
}


export default function StorybookCodeViewer({
    framework,
    codePath
}: StorybookCodeViewerProps) {
    return (
        <>
            <iframe
                src="http://localhost:6006/iframe.html?singleStory=tr&showPanel=true&id=stories-customnodes--primary"
                width="100%"
                height="500px"
            ></iframe>
            <iframe
                src="http://localhost:6006/iframe.html?singleStory=tr&showPanel=true&id=stories-customnodes--docs"
                width="100%"
                height="500px"
            ></iframe>
        </>
    )
}