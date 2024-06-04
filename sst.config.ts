/// <reference path="./.sst/platform/config.d.ts" />

import { fileURLToPath } from 'node:url'
import { config } from 'dotenv'
import { env } from 'std-env'
import { dirname, resolve } from 'pathe'
import type { CdnDomainArgs } from './.sst/platform/src/components/aws'

export default $config({
  app(input) {
    return {
      name: 'starter-fullstack',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      home: 'aws',
    }
  },
  async run() {
    // // Loading apps/backend .env files for Function environments
    // sst.config.ts will be compiled to .sst/platform/eval, we need to move out from it.
    const currentDir = dirname(fileURLToPath(import.meta.url))
    const rootDir = resolve(currentDir, '../../../')
    const backendDir = resolve(rootDir, 'apps/backend/')
    config({ path: [resolve(backendDir, '.env'), resolve(backendDir, '.env.prod.local')], debug: true })
    // //

    const domainConfig: CdnDomainArgs = {
      name: 'starter-fullstack.is-the.top',
      dns: false,
      cert: 'arn:aws:acm:us-east-1:637423182440:certificate/cb05ac36-93cc-4b00-a133-2fb490ca1468',
    }

    const backend = new sst.aws.Function('Backend', {
      url: true,
      // bundle: 'apps/backend/dist',
      handler: 'apps/backend/src/index.handler',
      timeout: '60 seconds',
      // If you need to process a big amount of data, you should create sub "job" functions
      // instead of rising the the spec of the main function
      memory: '300 MB',
      streaming: false,
      environment: {
        KINDE_DOMAIN: env.KINDE_DOMAIN!,
        KINDE_CLIENT_ID: env.KINDE_CLIENT_ID!,
        KINDE_CLIENT_SECRET: env.KINDE_CLIENT_SECRET!,
        KINDE_REDIRECT_URI: env.KINDE_REDIRECT_URI!,
        KINDE_LOGOUT_REDIRECT_URI: env.KINDE_LOGOUT_REDIRECT_URI!,
      },
    })

    const frontendAssets = new sst.aws.Assets(
      'FrontendAssets',
      {
        build: {
          command: 'pnpm run build --filter="frontend"',
          output: 'apps/frontend/.output/public',
        },
        environment: {
          NUXT_PUBLIC_BACKEND_URL: $interpolate`https://${domainConfig.name}`,
        },
      },
      { dependsOn: [backend] },
    )

    const fullstackRouter = new sst.aws.Router('FullstackRouter', {
      domain: domainConfig,
      routes: {
        '/*': {
          origin: {
            originId: 's3',
            domainName:
              frontendAssets.nodes.bucket.nodes.bucket.bucketRegionalDomainName,
            s3OriginConfig: {
              originAccessIdentity:
                frontendAssets.nodes.access.cloudfrontAccessIdentityPath,
            },
          },
          behavior: {
            viewerProtocolPolicy: 'redirect-to-https',
            allowedMethods: ['GET', 'HEAD', 'OPTIONS'],
            cachedMethods: ['GET', 'HEAD'],
            compress: true,
            // CloudFront's managed CachingOptimized policy
            cachePolicyId: '658327ea-f89d-4fab-a63d-7e88639e58f6',
          },
        },
        '/api/*': {
          origin: {
            originId: 'ok',
            domainName: backend.url.apply(url => new URL(url).host),
            customOriginConfig: {
              httpPort: 80,
              httpsPort: 443,
              originProtocolPolicy: 'https-only',
              originSslProtocols: ['TLSv1.2'],
            },
          },
        },
      },
      transform: {
        cdn: {
          defaultRootObject: 'index.html',
          customErrorResponses: [
            {
              errorCode: 403,
              responsePagePath: '/index.html',
              responseCode: 200,
            },
            {
              errorCode: 404,
              responsePagePath: '/index.html',
              responseCode: 200,
            },
          ],
          transform: { distribution: { priceClass: 'PriceClass_200' } },
        },
      },
    })

    return {
      distributionUrl: fullstackRouter.url,
      backendUrl: backend.url,
    }
  },
})
