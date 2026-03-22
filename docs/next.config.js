const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
})

/** @type {import('next').NextConfig} */
module.exports = withNextra({
  output: 'export',
  images: { unoptimized: true },
  // Set this to your GitHub repo name when deploying to GitHub Pages.
  // e.g. basePath: '/rp-base-docs'
  // Leave empty when using a custom domain.
  basePath: process.env.DOCS_BASE_PATH ?? '',
  trailingSlash: true,
})
