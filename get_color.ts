import { Jimp } from 'jimp';

async function main() {
  try {
    const image = await Jimp.read('public/logo.png');
    const color = image.getPixelColor(0, 0);
    const rgba = Jimp.intToRGBA(color);
    console.log(`Background color: rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`);
    console.log(`Hex: #${rgba.r.toString(16).padStart(2, '0')}${rgba.g.toString(16).padStart(2, '0')}${rgba.b.toString(16).padStart(2, '0')}`);
  } catch (err) {
    console.error(err);
  }
}

main();
