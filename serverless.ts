import type { AWS } from '@serverless/typescript';

import { webhook, setWebhook } from '@handlers';

const serverlessConfiguration: AWS = {
  service: 'bot',
  frameworkVersion: '3',
  plugins: ['serverless-webpack', 'serverless-esbuild', 'serverless-dotenv-plugin', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'eu-central-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  functions: { webhook, setWebhook },
  package: { individually: true },
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
    // esbuild: {
    //   bundle: true,
    //   minify: false,
    //   sourcemap: true,
    //   exclude: ['aws-sdk'],
    //   target: 'node14',
    //   define: { 'require.resolve': undefined },
    //   platform: 'node',
    //   concurrency: 10,
    // },
  },
};

module.exports = serverlessConfiguration;
