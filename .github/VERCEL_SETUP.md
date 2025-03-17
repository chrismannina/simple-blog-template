# Setting Up Vercel Deployment in GitHub Actions

This guide will help you set up the required secrets for automatic deployment to Vercel when you push to the main branch.

## Prerequisites

1. A Vercel account
2. Your project already deployed once to Vercel

## Steps to Set Up Vercel Secrets

### 1. Get your Vercel Access Token

1. Go to [Vercel Account Settings](https://vercel.com/account/tokens)
2. Click "Create" to create a new token
3. Give it a name like "GitHub Actions"
4. Set an appropriate expiration date
5. Copy the token once it's created (you won't be able to see it again)

### 2. Get your Vercel Organization ID and Project ID

Run this command locally to get both IDs:

```bash
vercel whoami
```

This will show your Organization ID.

Then run:

```bash
vercel projects list
```

Find your project and copy its Project ID.

Alternatively, you can find these IDs in your project settings on the Vercel dashboard.

### 3. Add Secrets to Your GitHub Repository

1. Go to your repository on GitHub
2. Click Settings > Secrets and variables > Actions
3. Add the following secrets:
   - `VERCEL_TOKEN`: Your Vercel access token
   - `VERCEL_ORG_ID`: Your Vercel Organization ID
   - `VERCEL_PROJECT_ID`: Your Vercel Project ID

### 4. That's it!

Now, when you push to the main branch, GitHub Actions will automatically deploy your project to Vercel.

## Troubleshooting

If the deployment fails, check the GitHub Actions logs for errors. Common issues include:

1. Incorrect token or IDs
2. The Vercel project not being linked to your repository
3. Tests failing before deployment

If the deployment works but the site doesn't update, make sure your Vercel project is correctly linked to your repository and branch. 