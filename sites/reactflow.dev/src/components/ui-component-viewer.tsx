import { useData } from 'nextra/data';

function UiComponentViewer() {
  const data = useData();

  if (!data) {
    return null;
  }

  const npmDependencies = (data.dependencies || []).map((dep) => ({
    label: dep,
    url: `https://www.npmjs.com/package/${dep}`,
  }));
  const shadcnDependencies = (data.registryDependencies || []).map((dep) => ({
    label: `shadcn/ui/${dep}`,
    url: `https://ui.shadcn.com/docs/components/${dep}`,
  }));

  return (
    <div className="mt-5">
      <iframe
        className="w-full h-[500px] rounded-md border border-gray-200"
        src={`${process.env.NEXT_PUBLIC_UI_COMPONENTS_URL}/${data.name}`}
      />
      <div className="flex gap-2 items-center my-5">
        <div>Dependencies:</div>
        {npmDependencies.map((dep) => (
          <a
            className="bg-gray-100 rounded-md px-1 py-0.5"
            key={dep.label}
            href={dep.url}
          >
            {dep.label}
          </a>
        ))}
        {shadcnDependencies.map((dep) => (
          <a
            className="bg-gray-100 rounded-md px-1 py-0.5"
            key={dep.label}
            href={dep.url}
          >
            {dep.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default UiComponentViewer;
