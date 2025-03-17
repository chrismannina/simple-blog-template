---
title: Deploying Your Blog
date: 2025-03-16
excerpt: A comprehensive guide to deploying your blog to various hosting platforms including Vercel, Netlify, GitHub Pages, and more.
tags: ['deployment', 'hosting', 'tutorial']
coverImage: https://images.unsplash.com/photo-1497215728101-856f4ea42174
---

# Deploying Your Blog

After customizing your blog and creating content, the next step is to share it with the world. This guide walks you through deploying your blog to various hosting platforms, from free options to more advanced configurations.

## Preparing Your Blog for Deployment

Before deploying, follow these steps to prepare your blog:

1. **Build for production**:
   ```bash
   npm run build
   # or
   yarn build
   ```

2. **Test the production build locally**:
   ```bash
   npm run preview
   # or
   yarn preview
   ```

3. **Check for any issues**:
   - Broken links
   - Missing images
   - Layout problems

## Deployment Options

### Vercel (Recommended)

[Vercel](https://vercel.com) is the easiest option for deploying your blog, with excellent performance and a generous free tier.

#### Using the Vercel Dashboard

1. Push your code to a GitHub, GitLab, or Bitbucket repository
2. Sign up/log in to Vercel
3. Click "New Project"
4. Import your repository
5. Vercel will automatically detect Vite configuration
6. Click "Deploy"

#### Using the Vercel CLI

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Run the deployment command:
   ```bash
   vercel
   ```

3. Follow the prompts to complete deployment

#### Environment Variables and Configuration

If your blog uses environment variables, you can configure them in the Vercel dashboard under your project settings.

### Netlify

[Netlify](https://netlify.com) is another excellent option with similar features to Vercel.

#### Using the Netlify Dashboard

1. Push your code to a GitHub, GitLab, or Bitbucket repository
2. Sign up/log in to Netlify
3. Click "New site from Git"
4. Select your repository
5. Set build command to `npm run build` or `yarn build`
6. Set publish directory to `dist`
7. Click "Deploy site"

#### Using the Netlify CLI

1. Install the Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Run the deployment command:
   ```bash
   netlify deploy
   ```

3. For production deployment:
   ```bash
   netlify deploy --prod
   ```

### GitHub Pages

GitHub Pages is a free hosting service provided by GitHub, perfect for personal blogs.

#### Configuration

1. Add a `base` property to your `vite.config.ts`:
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/',
     // other configuration...
   })
   ```

2. Create a deployment script in `package.json`:
   ```json
   {
     "scripts": {
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. Install the `gh-pages` package:
   ```bash
   npm install --save-dev gh-pages
   # or
   yarn add --dev gh-pages
   ```

#### Deployment

1. Build your blog:
   ```bash
   npm run build
   # or
   yarn build
   ```

2. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   # or
   yarn deploy
   ```

### AWS Amplify

AWS Amplify provides a robust hosting solution with AWS infrastructure.

1. Set up an AWS account if you don't have one
2. Install the AWS Amplify CLI:
   ```bash
   npm install -g @aws-amplify/cli
   ```

3. Configure Amplify:
   ```bash
   amplify configure
   ```

4. Initialize Amplify in your project:
   ```bash
   amplify init
   ```

5. Add hosting:
   ```bash
   amplify add hosting
   ```

6. Publish:
   ```bash
   amplify publish
   ```

### Firebase Hosting

Google's Firebase offers fast and secure hosting.

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Log in to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase in your project:
   ```bash
   firebase init
   ```
   - Select "Hosting"
   - Set "dist" as the public directory
   - Configure as a single-page app: Yes
   - Set up automatic builds and deploys: No

4. Deploy:
   ```bash
   firebase deploy
   ```

## Using Custom Domains

Most hosting providers support custom domains. Here's how to set up a custom domain:

### Purchasing a Domain

You can purchase domains from:
- [Namecheap](https://www.namecheap.com)
- [Google Domains](https://domains.google)
- [GoDaddy](https://www.godaddy.com)

### Configuring DNS

1. Add your domain in your hosting provider's dashboard
2. Update your domain's DNS records to point to your hosting provider
3. Wait for DNS propagation (can take up to 48 hours)

### Setting Up HTTPS

Most hosting providers automatically set up HTTPS with Let's Encrypt. If not:

1. Generate an SSL certificate
2. Upload it through your hosting provider's dashboard
3. Enable HTTPS

## Continuous Deployment

Set up continuous deployment to automatically publish changes when you push to your repository:

1. Configure your hosting provider to watch your repository
2. Set up build hooks
3. Configure branch-based deployments (e.g., preview deployments for PRs)

## Performance Optimization

After deployment, optimize your blog for performance:

1. **Analyze performance**:
   - Use [Lighthouse](https://developers.google.com/web/tools/lighthouse) to audit your site
   - Check [PageSpeed Insights](https://pagespeed.web.dev/)

2. **Optimize images**:
   - Use WebP format
   - Implement lazy loading

3. **Enable caching**:
   - Configure caching headers
   - Use a CDN if available

## Troubleshooting Common Deployment Issues

### 404 Errors for Routes

If you're using React Router and getting 404s, add a redirect rule:

- **Vercel**: Create a `vercel.json` file:
  ```json
  {
    "rewrites": [
      { "source": "/(.*)", "destination": "/index.html" }
    ]
  }
  ```

- **Netlify**: Create a `_redirects` file in your public directory:
  ```
  /* /index.html 200
  ```

### Build Failures

1. Check build logs for errors
2. Verify dependency versions
3. Ensure build scripts are correct
4. Check for environment variables that might be missing

## Monitoring Your Deployed Blog

Consider setting up:

1. **Analytics**:
   - [Google Analytics](https://analytics.google.com)
   - [Plausible](https://plausible.io) (privacy-focused)
   - [Fathom](https://usefathom.com) (privacy-focused)

2. **Error tracking**:
   - [Sentry](https://sentry.io)

3. **Uptime monitoring**:
   - [UptimeRobot](https://uptimerobot.com) (free tier available)

## Wrapping Up

Congratulations! You've now completed all the guides in this blog template:

1. [Welcome](/blog/01-welcome) - Introduction to the blog template
2. [Getting Started](/blog/02-getting-started) - Setting up your environment
3. [Writing Content](/blog/03-writing-content) - Creating posts with Markdown
4. [Customizing Your Blog](/blog/04-customizing) - Personalizing your site
5. Deploying Your Blog - Sharing with the world

By following these guides, you've learned how to set up, customize, create content for, and deploy your own blog using the Simple Blog Template.

For more specialized deployment requirements or advanced configurations, consult the documentation of your chosen hosting provider. 