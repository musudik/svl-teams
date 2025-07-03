# Deployment Guide
## SVL Cricket Club Team Management Website

This guide explains how to deploy your cricket club website to GitHub Pages for free hosting.

## 🚀 GitHub Pages Deployment

### Prerequisites

- GitHub account (free)
- All project files ready
- Player photos and DCB documents prepared

### Step 1: Create GitHub Repository

1. **Sign in** to [GitHub.com](https://github.com)
2. **Click** the "+" icon in the top right corner
3. **Select** "New repository"
4. **Configure** repository settings:
   - Repository name: `svl-cricket-club` (or your preferred name)
   - Description: "SVL Cricket Club team management website"
   - Visibility: **Public** (required for free GitHub Pages)
   - Initialize with README: **Unchecked** (we have our own files)

### Step 2: Upload Project Files

#### Method A: Web Interface (Recommended for beginners)

1. **Click** "uploading an existing file" on the repository page
2. **Drag and drop** all project files maintaining the folder structure:
   ```
   svl-cricket-club/
   ├── assets/
   │   ├── css/
   │   │   └── styles.css
   │   ├── images/
   │   │   ├── Logo2.png
   │   │   └── players/
   │   │       ├── player1.jpg
   │   │       ├── player2.jpg
   │   │       └── ...
   │   ├── documents/
   │   │   └── dcb/
   │   │       ├── DCB0M33631.pdf
   │   │       ├── DCB0M41681.pdf
   │   │       └── ...
   │   └── js/
   │       └── main.js
   ├── data/
   │   └── players.json
   ├── index.html
   ├── _config.yml
   ├── README.md
   ├── PLAYER_MANAGEMENT_GUIDE.md
   └── DEPLOYMENT.md
   ```
3. **Add** commit message: "Initial website deployment"
4. **Click** "Commit changes"

#### Method B: Git Command Line

```bash
# Clone the empty repository
git clone https://github.com/yourusername/svl-cricket-club.git
cd svl-cricket-club

# Copy all project files to this directory
# Then add and commit
git add .
git commit -m "Initial website deployment"
git push origin main
```

### Step 3: Configure GitHub Pages

1. **Go** to repository Settings tab
2. **Scroll** to "Pages" section in the left sidebar
3. **Configure** source:
   - Source: "Deploy from a branch"
   - Branch: "main"
   - Folder: "/ (root)"
4. **Click** "Save"

### Step 4: Update Configuration

Edit `_config.yml` with your repository details:

```yaml
title: "SVL Cricket Club"
description: "Managing three competitive teams with DCB certified players"
baseurl: "/svl-cricket-club"  # Your repository name
url: "https://yourusername.github.io"  # Your GitHub username
```

### Step 5: Verify Deployment

1. **Wait** 5-10 minutes for deployment to complete
2. **Visit** your website at: `https://yourusername.github.io/svl-cricket-club`
3. **Test** all functionality:
   - Team navigation
   - Player profiles
   - Modal windows
   - Responsive design

## 🔧 Custom Domain Setup (Optional)

### Using Your Own Domain

If you want to use a custom domain (e.g., `cricket.yourclub.com`):

1. **Add** CNAME file to repository root:
   ```
   cricket.yourclub.com
   ```

2. **Configure** DNS with your domain provider:
   - Add CNAME record pointing to `yourusername.github.io`

3. **Update** `_config.yml`:
   ```yaml
   url: "https://cricket.yourclub.com"
   baseurl: ""
   ```

4. **Enable** HTTPS in GitHub Pages settings

## 📁 File Structure for Deployment

Ensure your repository has this exact structure:

```
svl-cricket-club/
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── images/
│   │   ├── Logo2.png
│   │   └── players/
│   │       ├── player1.jpg
│   │       ├── player2.jpg
│   │       └── ...
│   ├── documents/
│   │   └── dcb/
│   │       ├── DCB0M33631.pdf
│   │       ├── DCB0M41681.pdf
│   │       └── ...
│   └── js/
│       └── main.js
├── data/
│   └── players.json
├── index.html
├── _config.yml
├── README.md
├── PLAYER_MANAGEMENT_GUIDE.md
└── DEPLOYMENT.md
```

## 🔄 Updating the Website

### Making Changes

1. **Edit** files in your repository
2. **Commit** changes with descriptive messages
3. **Push** to main branch
4. **Wait** 2-5 minutes for automatic deployment

### Adding New Players

1. **Add** player photo to `assets/images/players/`
2. **Add** DCB document to `assets/documents/dcb/`
3. **Update** `data/players.json`
4. **Commit** and push changes

### Batch Updates

For multiple changes:
1. **Create** a new branch for testing
2. **Make** all changes
3. **Test** locally if possible
4. **Merge** to main branch when ready

## 🐛 Troubleshooting Deployment

### Common Issues

**Website not loading:**
- Check GitHub Pages is enabled in settings
- Verify repository is public
- Wait 10-15 minutes for initial deployment

**Images not displaying:**
- Check file paths in `players.json`
- Ensure images are committed to repository
- Verify case-sensitive filenames

**404 Error on pages:**
- Check `_config.yml` baseurl setting
- Ensure all links use relative paths
- Verify file structure is correct

**JSON data not loading:**
- Validate JSON syntax at jsonlint.com
- Check browser console for errors
- Ensure `data/players.json` is committed

### Debugging Steps

1. **Check** GitHub Actions tab for deployment errors
2. **View** browser console for JavaScript errors
3. **Verify** all files are in repository
4. **Test** JSON file syntax
5. **Check** image file paths and extensions

## 📊 Performance Optimization

### Image Optimization

Before deployment:
1. **Compress** all images to reduce file size
2. **Resize** player photos to 400x400px
3. **Use** JPG format for photos
4. **Optimize** logo and other graphics

### File Size Limits

GitHub Pages has these limits:
- Repository size: 1GB
- Individual file size: 100MB
- Bandwidth: 100GB/month
- Builds: 10 per hour

### Best Practices

1. **Compress** images before uploading
2. **Minimize** PDF file sizes
3. **Remove** unused files
4. **Use** efficient file formats

## 🔒 Security Considerations

### Public Repository

Remember that GitHub Pages repositories are public:
- **Don't** include sensitive information
- **Only** use publicly available player data
- **Ensure** player consent for photos
- **Regular** review of published content

### Data Privacy

- **Only** include DCB-approved information
- **Remove** personal details not required
- **Use** official player photos only
- **Comply** with data protection regulations

## 📈 Analytics and Monitoring

### GitHub Insights

Monitor your website using:
- Repository traffic statistics
- Popular content analysis
- Visitor demographics (if enabled)

### External Analytics

Add Google Analytics or similar:
1. **Get** tracking code
2. **Add** to `index.html` head section
3. **Monitor** website performance

## 🆘 Support and Resources

### GitHub Pages Documentation

- [GitHub Pages Basics](https://docs.github.com/en/pages)
- [Custom Domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Troubleshooting](https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-jekyll-build-errors-for-github-pages-sites)

### Getting Help

1. **Check** GitHub Pages status page
2. **Review** repository Actions tab for errors
3. **Search** GitHub Community discussions
4. **Contact** GitHub Support if needed

### Community Resources

- GitHub Pages community forum
- Jekyll documentation (for advanced features)
- Web development communities

## ✅ Pre-Deployment Checklist

Before going live, verify:

- [ ] All player photos are added and properly named
- [ ] DCB documents are uploaded (if available)
- [ ] `players.json` has valid syntax
- [ ] All team information is accurate
- [ ] Logo and branding are correct
- [ ] Contact information is updated
- [ ] Links work correctly
- [ ] Mobile responsiveness is tested
- [ ] Browser compatibility is verified
- [ ] Performance is optimized

## 🔄 Maintenance Schedule

### Regular Tasks

**Weekly:**
- Check for broken links
- Verify website functionality
- Monitor performance

**Monthly:**
- Update player information if changed
- Review and optimize images
- Check for security updates

**Quarterly:**
- Review all player data for accuracy
- Update DCB documents if renewed
- Analyze website usage statistics

---

**Congratulations!** Your SVL Cricket Club website is now live and accessible to the world. Share the URL with your team members and cricket community! 