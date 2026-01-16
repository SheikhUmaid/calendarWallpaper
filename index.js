const { createCanvas, registerFont } = require('canvas');
const path = require('path');

const express = require('express');
const app = express();


// Register the font (put Amiri-Regular.ttf in your fonts folder)
registerFont(path.join(__dirname, 'fonts', 'Amiri-Regular.ttf'), { family: 'Amiri' });

async function generateBlackImage(width = 1080, height = 2400) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Black background
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, height);

  const now = new Date();
  now.setDate(now.getDate() + 1);
  const year = now.getFullYear();
  const isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  const totalDays = isLeap ? 366 : 365;
  const startOfYear = new Date(year, 0, 1);
  const dayOfYear = Math.floor((now - startOfYear) / (1000 * 60 * 60 * 24));
  const daysLeft = totalDays - (dayOfYear + 1);

  const dotsPerRow = 14;
  const rows = Math.ceil(totalDays / dotsPerRow);
  const topOffset = height * 0.30;
  const gridHeight = height * 0.6;
  const xStep = width / (dotsPerRow + 1);
  const yStep = gridHeight / (rows + 1);

  // Draw dots
  for (let i = 0; i < totalDays; i++) {
    const cx = (i % dotsPerRow + 1) * xStep;
    const cy = topOffset + (Math.floor(i / dotsPerRow) + 1) * yStep;
    
    ctx.beginPath();
    ctx.arc(cx, cy, 20, 0, 2 * Math.PI);
    
    if (i < dayOfYear) {
      ctx.fillStyle = 'white';
    } else if (i === dayOfYear) {
      ctx.fillStyle = 'red';
    } else {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    }
    ctx.fill();
  }

  // Draw Arabic text
  ctx.fillStyle = 'white';
  ctx.font = '50px Amiri';
  ctx.textAlign = 'center';
  ctx.fillText('يَا حَيُّ يَا قَيُّومُ', width / 2, height * 0.24);
  
  ctx.font = '50px Amiri';
  ctx.fillText('حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ', width / 2, height * 0.28);
 const year_percent_left = (daysLeft / totalDays) * 100;
  // Days left
  const textY = topOffset + (rows + 2) * yStep;
  ctx.fillStyle = 'red';
  ctx.font = '60px Amiri';
  ctx.fillText(`${daysLeft}d left ${Math.ceil(year_percent_left)}% `, width / 2, textY);

  return canvas.toBuffer('image/png');
}


async function srushtis_wallpaper(width = 1080, height = 2392) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Black background
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, height);

  const now = new Date();
  now.setDate(now.getDate() + 1);
  const year = now.getFullYear();
  const isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  const totalDays = isLeap ? 366 : 365;
  const startOfYear = new Date(year, 0, 1);
  const dayOfYear = Math.floor((now - startOfYear) / (1000 * 60 * 60 * 24));
  const daysLeft = totalDays - (dayOfYear + 1);

  const dotsPerRow = 15;
  const rows = Math.ceil(totalDays / dotsPerRow);
  const topOffset = height * 0.25;
  const gridHeight = height * 0.6;
  const xStep = width / (dotsPerRow + 1);
  const yStep = gridHeight / (rows + 1);

  // Draw dots
  for (let i = 0; i < totalDays; i++) {
    const cx = (i % dotsPerRow + 1) * xStep;
    const cy = topOffset + (Math.floor(i / dotsPerRow) + 1) * yStep;
    
    ctx.beginPath();
    ctx.arc(cx, cy, 20, 0, 2 * Math.PI);
    
    if (i < dayOfYear) {
      ctx.fillStyle = 'white';
    } else if (i === dayOfYear) {
      ctx.fillStyle = 'red';
    } else {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    }
    ctx.fill();
  }

  // Draw Arabic text
  ctx.fillStyle = 'white';
  ctx.font = '50px Amiri';
  ctx.textAlign = 'center';
  ctx.fillText('Chutku Putku', width / 2, height * 0.20);
  
  ctx.font = '50px Amiri';
  ctx.fillText('16L', width / 2, height * 0.24);
 const year_percent_left = (daysLeft / totalDays) * 100;
  // Days left
  const textY = topOffset + (rows + 2) * yStep;
  ctx.fillStyle = 'red';
  ctx.font = '60px Amiri';
  ctx.fillText(`${daysLeft}d left ${Math.ceil(year_percent_left)}% `, width / 2, textY);

  return canvas.toBuffer('image/png');
}







app.get('/srushti_wallpaper', async (req, res) => {
  try {
    const imageBuffer = await srushtis_wallpaper();
    res.set('Content-Type', 'image/png');
    res.send(imageBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating image: ' + error.message);
  }
});
app.get('/black-image', async (req, res) => {
  try {
    const imageBuffer = await generateBlackImage();
    res.set('Content-Type', 'image/png');
    res.send(imageBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating image: ' + error.message);
  }
});


app.listen(3000,'0.0.0.0', () => {
  console.log('Server started on port 3000');
});
