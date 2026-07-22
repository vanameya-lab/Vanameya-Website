const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');

// Replace this with your actual Vercel/Production URL once deployed
const SHOP_URL = 'http://localhost:3000/shop-now';
const OUTPUT_PATH = path.join(__dirname, '../public/shop-qr-code.png');

async function generateQR() {
  try {
    // Generate high quality QR code for posters
    await QRCode.toFile(OUTPUT_PATH, SHOP_URL, {
      width: 1000,
      margin: 2,
      color: {
        dark: '#000000',  // Black dots
        light: '#ffffff' // White background
      }
    });
    console.log(`✅ Success! QR Code generated for: ${SHOP_URL}`);
    console.log(`📁 Saved to: ${OUTPUT_PATH}`);
    console.log(`\nIMPORTANT: Make sure to update SHOP_URL in this script with your production Vercel URL before printing posters!`);
  } catch (err) {
    console.error('Failed to generate QR code:', err);
  }
}

generateQR();
