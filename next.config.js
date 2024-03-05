const withMDX = require("@next/mdx")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"]
};

module.exports = withMDX(nextConfig);
