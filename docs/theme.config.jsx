/** @type {import('nextra-theme-docs').DocsThemeConfig} */
export default {
  logo: (
    <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>
      rp-base
    </span>
  ),
  project: {
    // Replace with your actual GitHub repo URL
    link: 'https://github.com/racersparadise/rp-base',
  },
  docsRepositoryBase:
    'https://github.com/racersparadise/rp-base/tree/main/resources/[core]/rp-base/docs-new',
  footer: {
    text: `rp-base · ${new Date().getFullYear()}`,
  },
  useNextSeoProps() {
    return { titleTemplate: '%s – rp-base' }
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="rp-base FiveM framework documentation" />
    </>
  ),
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  // Static export does not support Nextra's built-in search indexer.
  // Disable it here; swap in an Algolia config if you want full search.
  search: {
    placeholder: 'Search docs…',
  },
}
