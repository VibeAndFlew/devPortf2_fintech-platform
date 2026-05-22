# Vercel Deployment

## Prerequisites

- Node.js 20+
- Vercel CLI (`npm i -g vercel`)
- GitHub repository with the project

## Deploy from CLI

```bash
# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## Deploy from Vercel Dashboard

1. Push code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Configure project settings:
   - Framework: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `.next`
4. Add environment variables (see [Environment](environment.md))
5. Deploy

## Configuration

The `vercel.json` file handles routing, headers, and region configuration:

```json
{
  "framework": "nextjs",
  "regions": ["iad1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    },
    {
      "source": "/images/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

## Environment Variables

Set the following in Vercel dashboard:

```
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NEXT_PUBLIC_API_URL=https://api.your-domain.com
AUTH_SECRET=your-secret
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
```

## Preview Deployments

Vercel automatically creates preview deployments for every PR. Each preview gets a unique URL.

## Custom Domain

1. Go to Vercel Dashboard → Project → Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. SSL certificate is provisioned automatically
