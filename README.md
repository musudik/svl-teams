# SVL Cricket Club - Team Management Website

A modern, responsive website for managing three cricket teams (Reds, Blacks, and Whites) with DCB certified players. Built for static hosting on GitHub Pages.

## 🏏 Features

### Team Management
- **Three Teams**: Reds, Blacks, and Whites with distinct themes
- **Player Profiles**: Comprehensive player information with photos
- **DCB Integration**: Direct links to DCB player profiles
- **PDF Documents**: View DCB ID documents with QR codes
- **Team Statistics**: Player counts, average age, and active status

### Player Information
- Personal details (name, age, date of birth)
- DCB ID and registration information
- Team assignment and status
- Professional player photos
- Printable player profiles

### Modern Features
- **Responsive Design**: Works on all devices
- **Fast Loading**: Optimized for performance
- **Print Support**: Team rosters and player profiles
- **Export Data**: JSON export for team data
- **Search & Filter**: Easy player discovery
- **Dark/Light Theme**: Black, red, and white color scheme

## 🚀 Quick Start

### 1. Repository Setup

```bash
# Clone or download this repository
git clone https://github.com/yourusername/svl-cricket-club.git
cd svl-cricket-club
```

### 2. Directory Structure

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
└── README.md
```

### 3. Adding Player Data

Edit `data/players.json` to add/modify players:

```json
{
  "teams": {
    "reds": {
      "name": "Reds",
      "motto": "Fire & Passion",
      "color": "#dc2626",
      "players": [
        {
          "id": "player_id",
          "name": "Player Name",
          "dcbId": "DCB0M12345",
          "dateOfBirth": "1990-01-01",
          "validFrom": "2023-01-01",
          "image": "assets/images/players/player_name.jpg",
          "dcbProfileUrl": "https://dcb.cricket/player/DCB0M12345"
        }
      ]
    }
  }
}
```

### 4. Adding Player Photos

1. Add player photos to `assets/images/players/`
2. Use format: `firstname_lastname.jpg`
3. Recommended size: 400x400px
4. Supported formats: JPG, PNG, WebP

### 5. Adding DCB Documents

1. Create directory: `assets/documents/dcb/`
2. Add PDF files named with DCB ID: `DCB0M12345.pdf`
3. Ensure PDFs contain QR codes and player information

## 🌐 GitHub Pages Deployment

### Method 1: GitHub Pages (Recommended)

1. **Fork/Upload** this repository to your GitHub account
2. **Rename** repository to `svl-cricket-club` or your preferred name
3. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)"
   - Click Save
4. **Update URLs** in `_config.yml`:
   ```yaml
   url: "https://yourusername.github.io"
   baseurl: "/svl-cricket-club"
   ```
5. **Access** your site at: `https://yourusername.github.io/svl-cricket-club`

### Method 2: Custom Domain

1. Add `CNAME` file with your domain name
2. Configure DNS settings with your domain provider
3. Update `_config.yml` with your custom domain

## 📁 File Organization

### Player Photos
- Location: `assets/images/players/`
- Naming: `firstname_lastname.jpg`
- Size: 400x400px recommended
- Format: JPG preferred

### DCB Documents
- Location: `assets/documents/dcb/`
- Naming: `{DCB_ID}.pdf`
- Content: Official DCB player ID with QR code

### Team Data
- File: `data/players.json`
- Structure: JSON with teams and players
- Validation: Ensure valid JSON format

## 🎨 Customization

### Colors and Themes
Edit CSS variables in `assets/css/styles.css`:

```css
:root {
    --primary-red: #dc2626;
    --primary-black: #1f2937;
    --primary-white: #ffffff;
    /* Customize other colors */
}
```

### Logo
Replace `assets/images/Logo2.png` with your club logo:
- Recommended size: 200x200px
- Format: PNG with transparency
- Aspect ratio: 1:1 (square)

### Club Information
Update club details in `index.html`:
- Club name and motto
- About section content
- Contact information

## 📱 Features Overview

### Team Management
- ✅ Three distinct teams with color themes
- ✅ Player statistics and summaries
- ✅ Team roster printing
- ✅ Data export functionality

### Player Profiles
- ✅ Individual player cards
- ✅ Detailed player information
- ✅ DCB document viewing
- ✅ Status tracking (Active/Inactive)

### User Experience
- ✅ Mobile-responsive design
- ✅ Fast loading and smooth animations
- ✅ Accessible navigation
- ✅ Print-friendly layouts

### Administrative
- ✅ Easy data management via JSON
- ✅ Bulk operations support
- ✅ Version control friendly
- ✅ No database required

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic structure
- **CSS3**: Modern styling with Grid/Flexbox
- **JavaScript ES6+**: Interactive functionality
- **JSON**: Data storage
- **GitHub Pages**: Static hosting

### Browser Support
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Performance
- Optimized images and assets
- Minimal JavaScript dependencies
- CSS Grid and Flexbox for layouts
- Lazy loading for better performance

## 📋 Maintenance

### Adding New Players
1. Add player photo to `assets/images/players/`
2. Add DCB document to `assets/documents/dcb/`
3. Update `data/players.json` with player information
4. Commit and push changes

### Updating Player Information
1. Edit `data/players.json`
2. Update photos if necessary
3. Refresh DCB documents if changed
4. Deploy updates

### Team Management
- Players can be moved between teams by updating the JSON file
- Team statistics update automatically
- No database migrations required

## 🆘 Troubleshooting

### Common Issues

**Images not loading:**
- Check file paths in `players.json`
- Ensure images are in correct directory
- Verify image file extensions

**PDF documents not opening:**
- Confirm PDF files are in `assets/documents/dcb/`
- Check DCB ID matches filename
- Ensure PDFs are not corrupted

**Data not updating:**
- Validate JSON syntax in `players.json`
- Clear browser cache
- Check browser console for errors

### Support
For issues and questions:
1. Check the browser console for errors
2. Validate JSON format using online tools
3. Ensure all file paths are correct
4. Test on different browsers

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**SVL Cricket Club Team Management System** - Built with ❤️ for cricket enthusiasts

