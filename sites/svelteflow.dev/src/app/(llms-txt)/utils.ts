import { compileMdxSections, SectionKey } from 'xy-shared/server';

export async function buildLLMSTxt(sections: SectionKey[]): Promise<string> {
  return compileMdxSections('svelte', sections);
}
