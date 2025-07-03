# SVL Cricket Club - Development Guide

## Running the Website Locally

Due to browser security restrictions (CORS), the website needs to be served via HTTP rather than opened directly as a file. Here are the options:

### Option 1: Python HTTP Server (Recommended)
```bash
# Navigate to the project directory
cd svl-cricket-club-updated-with-images

# Start the server (Python 3)
python -m http.server 8000

# Or for Python 2
python -m SimpleHTTPServer 8000

# Open browser to: http://localhost:8000
```

### Option 2: Node.js HTTP Server
```bash
# Install http-server globally
npm install -g http-server

# Navigate to project directory and start server
cd svl-cricket-club-updated-with-images
http-server -p 8000

# Open browser to: http://localhost:8000
```

### Option 3: VS Code Live Server Extension
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Features

- **Grid-Based Player Display**: Players are displayed in alphabetical order within each team
- **Player Photos**: Images are automatically loaded from `assets/images/players/` folder
- **DCB Integration**: Click any player to view their DCB profile link
- **Responsive Design**: Works on desktop and mobile devices
- **Modern Animations**: Smooth transitions and hover effects

## File Structure

```
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   └── styles.css      # Modern CSS styling
│   ├── js/
│   │   └── main.js         # JavaScript functionality
│   └── images/
│       ├── Logo2.png       # SVL logo
│       └── players/        # Player photos
├── data/
│   └── players.json        # Player data and DCB links
└── _config.yml            # GitHub Pages configuration
```

## Troubleshooting

- **Players not showing**: Make sure you're accessing via HTTP server, not file://
- **Images not loading**: Check that player photos exist in `assets/images/players/`
- **DCB links not working**: Verify `dcbProfileUrl` fields in `players.json` 