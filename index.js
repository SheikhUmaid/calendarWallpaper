const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World22!');
});


const sharp = require('sharp');
// 1080x2400
async function generateBlackImage(width = 1080, height = 2400) {
  const now = new Date();
  now.setDate(now.getDate() + 1);
  const year = now.getFullYear();
  const isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  const totalDays = isLeap ? 366 : 365;
  const startOfYear = new Date(year, 0, 1);
  const dayOfYear = Math.floor((now - startOfYear) / (1000 * 60 * 60 * 24));

  const dotsPerRow = 14;
  const rows = Math.ceil(totalDays / dotsPerRow);
  const topOffset = height * 0.28;
  const gridHeight = height * 0.6;
  const xStep = width / (dotsPerRow + 1);
  const yStep = gridHeight / (rows + 1);

  let svgContent = '';
  
  // Add dots
  for (let i = 0; i < totalDays; i++) {
    const cx = (i % dotsPerRow + 1) * xStep;
    const cy = topOffset + (Math.floor(i / dotsPerRow) + 1) * yStep;
    const fill = i < dayOfYear ? 'white' : (i === dayOfYear ? 'red' : 'rgba(255, 255, 255, 0.3)');
    svgContent += `<circle cx="${cx}" cy="${cy}" r="10" fill="${fill}" />`;
  }

  const daysLeft = totalDays - (dayOfYear + 1);
  const textY = topOffset + (rows + 2) * yStep;
  
  svgContent += `<text x="${width / 2}" y="${textY}" text-anchor="middle" font-family="'Roboto', sans-serif" font-size="24" fill="red">${daysLeft} days left</text>`;
  svgContent += `<text x="${width / 2}" y="${height * 0.15}" text-anchor="middle" font-family="'Amiri', serif" font-size="28" fill="white">حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ</text>`;
  svgContent += `<text x="${width / 2}" y="${height * 0.08}" text-anchor="middle" font-family="'Amiri', serif" font-size="32" fill="white">يَا حَيُّ يَا قَيُّومُ</text>`;

  const svgBuffer = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&amp;family=Roboto:wght@400;700&amp;display=swap');
        </style>
      </defs>
      ${svgContent}
    </svg>
  `);

  return await sharp({
    create: {
      width,
      height,
      channels: 3,
      background: { r: 0, g: 0, b: 0 }
    }
  })
    .composite([{ input: svgBuffer }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

app.get('/black-image', async (req, res) => {
    try {
        const imageBuffer = await generateBlackImage();
        res.set('Content-Type', 'image/png');
        res.send(imageBuffer);
    } catch (error) {
        res.status(500).send('Error generating image');
    }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});


