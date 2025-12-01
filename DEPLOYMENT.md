# GitHub Pages Deployment Guide

This guide explains how to deploy the VAAV Restaurant website to GitHub Pages.

## 🚀 Deployment URL

Once deployed, your site will be available at:
**https://volta-jebaprashanth.github.io/vaav-restaurant/**

## 📋 Prerequisites

- Git repository pushed to GitHub at `https://github.com/Volta-Jebaprashanth/vaav-restaurant`
- Node.js and npm installed locally

## ⚙️ Setup (One-Time Configuration)

### 1. Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/Volta-Jebaprashanth/vaav-restaurant`
2. Click on **Settings** tab
3. In the left sidebar, click **Pages**
4. Under **Source**, select **GitHub Actions**

![GitHub Pages Settings](https://docs.github.com/assets/cb-47267/mw-1440/images/help/pages/publishing-source-drop-down.webp)

That's it! The setup is complete.

## 🔄 Automated Deployment (Recommended)

The repository is configured with GitHub Actions for automatic deployment.

### How it works:

1. Every time you push to the `main` branch, GitHub Actions automatically:
   - Installs dependencies
   - Builds the project
   - Deploys to GitHub Pages

2. You can monitor the deployment:
   - Go to the **Actions** tab in your GitHub repository
   - Click on the latest workflow run to see the progress

### Triggering a deployment:

```bash
# Make your changes
git add .
git commit -m "Your commit message"
git push origin main
```

The deployment will start automatically and complete in 1-2 minutes.

## 🛠️ Manual Deployment (Alternative)

If you prefer to deploy manually, you can use the npm script:

### First time setup:

```bash
npm install
```

### Deploy:

```bash
npm run deploy
```

This will:
1. Build the project (`npm run build`)
2. Deploy the `dist` folder to the `gh-pages` branch

## 📁 Project Configuration

The following files have been configured for GitHub Pages:

### `vite.config.js`
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/vaav-restaurant/', // Ensures correct asset paths
})
```

### `package.json`
```json
{
  "homepage": "https://volta-jebaprashanth.github.io/vaav-restaurant",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### `.github/workflows/deploy.yml`
GitHub Actions workflow that automatically builds and deploys on push to main.

## 🔍 Verifying Deployment

After deployment completes:

1. Visit: https://volta-jebaprashanth.github.io/vaav-restaurant/
2. Check that all pages load correctly
3. Verify images and assets display properly
4. Test navigation and interactive features

## 🐛 Troubleshooting

### Deployment fails in GitHub Actions

1. Check the **Actions** tab for error messages
2. Ensure GitHub Pages is enabled in repository settings
3. Verify the source is set to **GitHub Actions**

### Site shows 404 error

1. Wait 2-3 minutes after deployment completes
2. Clear your browser cache
3. Verify the URL is correct: `https://volta-jebaprashanth.github.io/vaav-restaurant/`

### Assets not loading (blank page)

1. Check that `base: '/vaav-restaurant/'` is set in `vite.config.js`
2. Rebuild and redeploy: `npm run build && npm run deploy`

### Manual deployment fails

1. Install gh-pages: `npm install`
2. Ensure you have write access to the repository
3. Check your Git credentials are configured

## 📝 Notes

- **Build folder**: The `dist` folder is generated during build and should not be committed to Git
- **Branch**: Automated deployment uses the `main` branch as the source
- **Build time**: Typical deployment takes 1-2 minutes
- **Cache**: Browser caching may require a hard refresh (Ctrl+F5) to see updates

## 🔗 Useful Links

- [Repository](https://github.com/Volta-Jebaprashanth/vaav-restaurant)
- [Live Site](https://volta-jebaprashanth.github.io/vaav-restaurant/)
- [GitHub Actions](https://github.com/Volta-Jebaprashanth/vaav-restaurant/actions)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

## 🌩️ Cloudflare Pages Deployment

You can also deploy this project to Cloudflare Pages for faster global performance.

### Setup Instructions

1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Go to **Workers & Pages** > **Create Application** > **Pages** > **Connect to Git**.
3. Select your repository (`vaav-restaurant`).
4. Configure the build settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Build Output Directory**: `dist`
5. Click **Save and Deploy**.

The project is already configured to detect Cloudflare Pages and adjust the asset paths automatically.
