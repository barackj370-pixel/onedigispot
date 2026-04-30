import fs from 'fs';
import https from 'https';

const url = `https://i.imgur.com/i6P3yzC.png`;

function download(url: string, dest: string) {
  https.get(url, (res) => {
    if (res.statusCode === 302 || res.statusCode === 303 || res.statusCode === 301) {
      download(res.headers.location!, dest);
    } else {
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log('Downloaded successfully. Content type:', res.headers['content-type']);
      });
    }
  }).on('error', (err) => {
    console.error('Error downloading:', err.message);
  });
}

if (!fs.existsSync('public')) {
  fs.mkdirSync('public');
}
download(url, 'public/logo.png');
