# ETH Price Hunter Extension

## Overview
ETH Price Hunter is a Chrome extension that tracks the price of Ethereum (ETH) and displays it on a badge. The extension includes an embedded graph, a settings button, and a settings menu. The badge updates every minute to reflect the latest price.

## Features
- **Price Tracking**: Fetches the latest ETH price from CoinMarketCap and displays it on a badge.
- **Embedded Graph**: Displays an advanced chart from TradingView.
- **Settings Menu**: Allows users to customize settings such as badge visibility, badge color, and update frequency.
- **Copy Address**: Provides a button to copy a donation address to the clipboard.
- **Badge Update**: Updates the badge every minute with the latest ETH price.

## Installation
1. Clone the repository from GitHub: `ETH-Price-Hunter-Extension`
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the cloned repository folder.

## Usage

### Popup Interface
- **Copy Address**: Click the "Copy Address" button to copy the donation address to the clipboard.
- **Settings**: Click the "Settings" button to open the settings menu.

### Settings Menu
- **Reset Settings**: Resets all settings to their default values.
- **Black Only Badge**: Toggles the badge color between black and the default colors.
- **Hide Badge**: Toggles the visibility of the badge.
- **Reload with New Settings**: Reloads the extension with the updated settings.
- **Badge Reload Time**: Adjusts the frequency of badge updates.

## Code Structure

### HTML
- **[popup.html](popup.html)**: Contains the main interface with buttons for copying the address and accessing settings.
- **[settings.html](settings.html)**: Contains the settings menu interface.

### JavaScript
- **[popup.js](popup.js)**: Handles the functionality of the popup interface, including copying the address and opening the settings menu.
- **[settings.js](settings.js)**: Manages the settings menu, including saving and resetting settings, and updating the badge.
- **[background.js](background.js)**: Handles background tasks such as fetching the ETH price and updating the badge every minute.

### CSS
- **[styles.css](styles.css)**: Styles for the popup interface.
- **[settings.css](settings.css)**: Styles for the settings menu.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.