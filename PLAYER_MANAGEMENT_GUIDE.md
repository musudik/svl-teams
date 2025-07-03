# Player Management Guide
## SVL Cricket Club Team Management System

This guide explains how to add, update, and manage players in the SVL Cricket Club team management system.

## 📋 Table of Contents

1. [Adding New Players](#adding-new-players)
2. [Managing Player Photos](#managing-player-photos)
3. [DCB Document Management](#dcb-document-management)
4. [Updating Player Information](#updating-player-information)
5. [Team Management](#team-management)
6. [Data Validation](#data-validation)
7. [Troubleshooting](#troubleshooting)

## 🆕 Adding New Players

### Step 1: Prepare Player Information

Before adding a player, collect the following information from their DCB ID document:

- **Full Name**: As it appears on the DCB document
- **DCB ID**: Unique identifier (e.g., DCB0M33631)
- **Date of Birth**: In YYYY-MM-DD format
- **Valid From**: Registration date in YYYY-MM-DD format
- **Team Assignment**: Reds, Blacks, or Whites

### Step 2: Extract Player Photo

1. **From DCB PDF**: Extract the player's photo from their DCB ID document
2. **Image Requirements**:
   - Format: JPG, PNG, or WebP
   - Size: 400x400px recommended
   - Quality: High resolution for clear display
   - Background: Any (will be cropped to circle)

### Step 3: Save Player Photo

1. Navigate to `assets/images/players/`
2. Save the photo using this naming convention:
   ```
   firstname_lastname.jpg
   ```
   Examples:
   - `aamir_afridi.jpg`
   - `arun_karthik_ganesan.jpg`
   - `krishna_kamlashankar_yadav.jpg`

### Step 4: Add Player to JSON Database

Edit `data/players.json` and add the player to the appropriate team:

```json
{
  "id": "firstname_lastname",
  "name": "Full Player Name",
  "dcbId": "DCB0M12345",
  "dateOfBirth": "1990-01-01",
  "validFrom": "2023-01-01",
  "image": "assets/images/players/firstname_lastname.jpg",
  "dcbProfileUrl": "https://dcb.cricket/player/DCB0M12345"
}
```

### Step 5: Add DCB Document (Optional)

1. Create directory: `assets/documents/dcb/` (if not exists)
2. Save the DCB PDF using the DCB ID as filename:
   ```
   DCB0M12345.pdf
   ```

## 📷 Managing Player Photos

### Photo Guidelines

- **Aspect Ratio**: 1:1 (square) preferred
- **Resolution**: Minimum 300x300px, recommended 400x400px
- **File Size**: Keep under 500KB for faster loading
- **Format**: JPG preferred for smaller file sizes

### Photo Processing Tips

1. **Crop to Square**: Ensure the player's face is centered
2. **Good Lighting**: Clear, well-lit photos work best
3. **Professional Look**: Formal cricket attire preferred
4. **Background**: Any background (will be displayed in circle)

### Batch Photo Processing

For multiple photos:

1. Use image editing software (Photoshop, GIMP, etc.)
2. Create an action/script for consistent sizing
3. Apply to all photos for uniform appearance

## 📄 DCB Document Management

### Document Requirements

- **Format**: PDF only
- **Content**: Official DCB player ID with QR code
- **Naming**: Must match DCB ID exactly
- **Size**: Keep under 5MB for web compatibility

### Adding DCB Documents

1. **Create Directory Structure**:
   ```
   assets/
   └── documents/
       └── dcb/
           ├── DCB0M33631.pdf
           ├── DCB0M41681.pdf
           └── ...
   ```

2. **File Naming Convention**:
   - Use exact DCB ID as filename
   - Include `.pdf` extension
   - No spaces or special characters

3. **Verification**:
   - Ensure PDF opens correctly
   - Check QR code is visible and scannable
   - Verify player information matches

### Document Security

- **No Sensitive Information**: Remove any unnecessary personal data
- **Public Access**: Remember these will be publicly accessible
- **Regular Updates**: Update when DCB documents are renewed

## 🔄 Updating Player Information

### Modifying Existing Players

To update a player's information:

1. **Open** `data/players.json`
2. **Find** the player by searching for their name or DCB ID
3. **Update** the required fields
4. **Save** the file
5. **Validate** JSON syntax

### Common Updates

**Name Change**:
```json
"name": "New Full Name"
```

**Team Transfer**:
1. Remove player object from current team
2. Add player object to new team
3. Update any team-specific information

**DCB Information Update**:
```json
"dcbId": "DCB0M54321",
"validFrom": "2024-01-01",
"dcbProfileUrl": "https://dcb.cricket/player/DCB0M54321"
```

**Photo Update**:
1. Replace photo file in `assets/images/players/`
2. Update image path if filename changed:
   ```json
   "image": "assets/images/players/new_filename.jpg"
   ```

## 👥 Team Management

### Team Structure

Each team has the following properties:

```json
{
  "name": "Team Name",
  "motto": "Team Motto",
  "color": "#hexcolor",
  "players": [...]
}
```

### Moving Players Between Teams

1. **Copy** player object from source team
2. **Paste** into destination team's players array
3. **Remove** from source team
4. **Verify** JSON structure is valid

### Team Statistics

The system automatically calculates:
- Total player count
- Active/inactive players
- Average age
- DCB certification status

## ✅ Data Validation

### JSON Validation

Always validate JSON after making changes:

1. **Online Validators**: Use JSONLint.com or similar
2. **Text Editors**: Many editors highlight JSON errors
3. **Browser Console**: Check for JavaScript errors

### Required Fields

Every player must have:
- `id` (unique identifier)
- `name` (full name)
- `dcbId` (DCB identification)
- `dateOfBirth` (YYYY-MM-DD format)
- `validFrom` (YYYY-MM-DD format)
- `image` (path to photo)
- `dcbProfileUrl` (DCB website link)

### Data Consistency

Ensure:
- DCB IDs are unique across all teams
- Image files exist for all players
- Dates are in correct format
- URLs are valid and accessible

## 🔧 Troubleshooting

### Common Issues

**Player Photo Not Displaying**:
- Check file path in JSON matches actual file location
- Verify image file exists and is readable
- Ensure correct file extension (.jpg, .png, etc.)

**DCB Document Not Opening**:
- Confirm PDF file exists in `assets/documents/dcb/`
- Check filename matches DCB ID exactly
- Verify PDF is not corrupted

**JSON Syntax Errors**:
- Use JSON validator to find syntax issues
- Check for missing commas, brackets, or quotes
- Ensure proper nesting structure

**Player Not Appearing on Website**:
- Verify player is added to correct team
- Check JSON syntax is valid
- Clear browser cache and refresh

### Data Backup

**Before Making Changes**:
1. **Backup** `data/players.json`
2. **Version Control**: Use Git for change tracking
3. **Test Changes**: Verify in browser before publishing

### Recovery

**If Data is Corrupted**:
1. **Restore** from backup
2. **Re-validate** JSON structure
3. **Test** functionality before deploying

## 📊 Best Practices

### Organization

1. **Consistent Naming**: Use same format for all files
2. **Regular Updates**: Keep player information current
3. **Documentation**: Record changes and reasons
4. **Testing**: Always test after making changes

### Performance

1. **Optimize Images**: Compress photos for web
2. **Limit PDF Size**: Keep documents under 5MB
3. **Clean Data**: Remove unnecessary information
4. **Regular Maintenance**: Archive old/inactive players

### Security

1. **Public Information Only**: Don't include sensitive data
2. **Regular Reviews**: Check what's publicly accessible
3. **Access Control**: Limit who can make changes
4. **Audit Trail**: Track changes and who made them

## 📞 Support

### Getting Help

1. **Check Documentation**: Review this guide first
2. **Validate Data**: Use JSON validators
3. **Browser Console**: Check for error messages
4. **Test Locally**: Verify changes work before deploying

### Reporting Issues

When reporting problems, include:
- What you were trying to do
- What actually happened
- Error messages (if any)
- Browser and version
- Steps to reproduce the issue

---

**Remember**: Always backup your data before making changes and test thoroughly before deploying to production!

