import type { MDXComponents } from 'mdx/types';

// Default element styles for MDX content (case studies, posts) — all from tokens.
const components: MDXComponents = {
  h2: (p) => <h2 className="t-h2 mt-24 mb-8" {...p} />,
  h3: (p) => <h3 className="t-h3 mt-12 mb-4" {...p} />,
  p: (p) => <p className="mt-5 max-w-[64ch]" {...p} />,
  ul: (p) => <ul className="mt-5 grid max-w-[64ch] list-disc gap-2 pl-5" {...p} />,
  ol: (p) => <ol className="mdx-ol grid max-w-[64ch]" {...p} />, // list style in components.css (case pages restyle it)
  a: (p) => <a className="link" {...p} />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
