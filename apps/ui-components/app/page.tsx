import data from "../public/registry/all-available-components.json";

export default async function Home() {
  return (
    <div className="space-y-12 py-12 [&>*]:mx-auto [&>*]:max-w-3xl">
      <header className="space-y-8">
        <h1 className="mb-4 text-4xl font-bold">xyflow components registry</h1>
        <p>
          Here you can find all the components we've built and are available for
          you to use in your projects.
        </p>

        <div className="flex gap-4 [&>*]:flex-1 [&>*]:rounded [&>*]:border [&>*]:p-4 [&>*]:text-center">
          <a className="hover:bg-gray-50" href="https://www.reactflow.dev">
            reactflow.dev
          </a>
          <a className="hover:bg-gray-50" href="https://www.svelteflow.dev">
            svelteflow.dev
          </a>
        </div>
      </header>

      <main className="flex justify-between">
        <section>
          <h2 className="mb-2 text-2xl font-bold">available components</h2>
          <ul id="examples-react">
            {data.components.map((component) => (
              <li key={component} className="mb-4">
                <a
                  className="text-blue-500 hover:underline"
                  href={`/components/${component}`}
                >
                  {component}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
