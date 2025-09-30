# Create Timestamp - Adobe Premiere Pro CEP Extension

A powerful Adobe Premiere Pro CEP extension that automatically generates timestamps from audio clips in your timeline. Perfect for creating chapter markers, podcast timestamps, or any content that needs time-based navigation.

## Features

- **Multiple Format Options**: Choose from predefined formats or create your own custom pattern
- **Custom Format Builder**: Use placeholders to create personalized timestamp formats
- **One-Click Generation**: Automatically scans your audio track and generates timestamps
- **Copy to Clipboard**: Easy copying of all generated timestamps at once
- **Clean Interface**: Dark theme that matches Premiere Pro's UI

## Supported Formats

### Predefined Formats
1. **Track Format**: `Track 1: clipname 1 (02:02)`
2. **Simple Format**: `02:02 clipname 1`

### Custom Format
Create your own format using these placeholders:
- `{index}` - The track/clip number (1, 2, 3...)
- `{name}` - The clip name (without file extension)
- `{time}` - The formatted timestamp (MM:SS)

#### Custom Format Examples
- `"Chapter {index}: {name} - {time}"` → `"Chapter 1: My Clip - 02:30"`
- `"{time} | {name}"` → `"02:30 | My Clip"`
- `"[{index}] {name} ({time})"` → `"[1] My Clip (02:30)"`
- `"{name} starts at {time}"` → `"My Clip starts at 02:30"`

## Installation

### Method 1: Manual Installation

1. **Enable unsigned panels** (required for development/testing):

   **Windows**: Create this registry entry:
   ```
   Key: HKEY_CURRENT_USER/Software/Adobe/CSXS.11
   Name: PlayerDebugMode
   Type: String
   Value: 1
   ```

   **macOS**: Run in Terminal:
   ```bash
   defaults write /Users/<username>/Library/Preferences/com.adobe.CSXS.11.plist PlayerDebugMode 1
   ```

2. **Copy extension folder** to:
   ```
   Windows: C:\Program Files (x86)\Common Files\Adobe\CEP\extensions\
   Mac: /Library/Application Support/Adobe/CEP/extensions/
   ```

3. **Restart Premiere Pro**

4. **Access the panel**: Go to `Window > Extensions > Create Timestamp`

## Usage

1. **Open your project** in Adobe Premiere Pro
2. **Add audio clips** to the first audio track (A1)
3. **Open the extension** from `Window > Extensions > Create Timestamp`
4. **Select your format**:
   - Choose a predefined format, or
   - Select "Custom Format" and enter your pattern
5. **Click "Create Timestamp"** to generate timestamps
6. **Copy results** using the "Copy All" button

## Requirements

- Adobe Premiere Pro 2023 or later
- Audio clips placed on the first audio track (A1)
- CEP 11 support

## Development

This extension is built using:
- **CEP (Common Extensibility Platform)** for the panel interface
- **ExtendScript** for Premiere Pro integration
- **HTML/CSS/JavaScript** for the user interface

### Project Structure
```
Create Timestamp/
├── index.html          # Main panel interface
├── js/main.js          # Panel JavaScript logic
├── jsx/hostscript.jsx  # ExtendScript for Premiere Pro integration
├── css/style.css       # Panel styling
├── CSXS/manifest.xml   # Extension manifest
└── lib/                # CEP libraries
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have suggestions for improvements, please [open an issue](https://github.com/vietthanhnv/Create-timestamp-PPro-CEP/issues) on GitHub.

---

**Made with ❤️ for the Premiere Pro community**
