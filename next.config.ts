import type { NextConfig } from "next";
import NextFederationPlugin from "@module-federation/nextjs-mf";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@dasjideepak/mf-shared-ui"],

  webpack(config, { isServer }) {
    const location = isServer ? "ssr" : "chunks";

    config.plugins.push(
      new NextFederationPlugin({
        name: "remote1",
        filename: "static/chunks/remoteEntry.js",
        remotes: isServer
          ? {}
          : {
              host: `host@${process.env.HOST_URL}/_next/static/${location}/remoteEntry.js`,
            },
        exposes: {
          "./DashboardShell": "./src/components/DashboardShell",
        },
        shared: isServer
          ? {}
          : {
              react: {
                singleton: true,
                requiredVersion: false,
                strictVersion: false,
              },
              "react-dom": {
                singleton: true,
                requiredVersion: false,
                strictVersion: false,
              },
            },
        extraOptions: {},
      })
    );

    return config;
  },
};

export default nextConfig;
