import fs from 'fs';
import https from 'https';

const fileId = '1EVxFLKS-6_O6Pyo1-9z_sXU-afmF2xJD';
const url = `https://lh3.googleusercontent.com/d/${fileId}`;

function download(url: string, dest: string) {
  https.get(url, (res) => {
    if (res.statusCode === 302 || res.statusCode === 303) {
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

download(url, 'test_logo2.png');
