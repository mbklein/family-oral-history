const path = require("path");
const withMDX = require("@next/mdx")();

/** @type {import('next').NextConfig} */
const cloverSource = process.env.LOCAL_CLOVER ? path.resolve(__dirname, "../../clover-iiif/src") : undefined;;

const nextConfig = {
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT"
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
          }
        ]
      }
    ];
  },
  output: "export",
  productionBrowserSourceMaps: true,
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  webpack: (config, { defaultLoaders }) => {
    if (cloverSource) {
      // Allow importing uncompiled source from the linked component
      config.module.rules.push({
        test: /\.(js|jsx|ts|tsx)$/,
        include: [cloverSource],
        use: defaultLoaders.babel
      });

      // Optional alias so imports like `@samvera/clover-iiif` resolve to the source directory
      config.resolve.alias["@samvera/clover-iiif"] = cloverSource;
      config.resolve.alias["src"] = cloverSource;
    }
    return config;
  }
};

module.exports = withMDX(nextConfig);
