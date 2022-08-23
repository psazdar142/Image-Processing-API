import express from 'express';
import sharp from 'sharp';
import logger from './middleware/logger';
import fs from 'fs';

const app = express();
const port = 3000;

app.get('/', logger, async (req, res): Promise<void> => {
  res.status(200).send('Welcome to the Image Processing API');
});

app.get('/image_processing', logger, async (req, res): Promise<void> => {
  try {
    const file_name: string = String(req.query.file_name); // eslint-disable-line
    const width: string = String(req.query.width); // eslint-disable-line
    const height: string = String(req.query.height); // eslint-disable-line

    const valid_image_file = is_valid_image(file_name);
    const valid_image_height = is_valid_height(height);
    const valid_image_width = is_valid_width(width);

    if (valid_image_height && valid_image_width && valid_image_file) {
      await sharp_resize(file_name, width, height);
      res
        .status(200)
        .sendFile(file_name + 'width' + width + 'height' + height + '.jpg', {
          root: 'assets/thumb/'
        });
    } else {
      res.send(
        'ERROR: Please make sure that you are choosing a valid image file and that both the height and width you are choosing to resize to are less than 10,000px. Please modify your request and try again.'
      );
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

// Start server
app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});

// helper functions below
export async function sharp_resize(
  file_name: string,
  width: string,
  height: string
): Promise<void> {
  const input: string = 'assets/full/' + file_name + '.jpg';
  const output: string =
    'assets/thumb/' + file_name + 'width' + width + 'height' + height + '.jpg';

  await sharp(input)
    .resize(+width, +height, {})
    .toFile(output);
}

function is_valid_image(file_name: string): boolean {
  const path = 'assets/full/' + file_name + '.jpg';
  if (fs.existsSync(path)) {
    return true;
  }
  return false;
}

function is_valid_width(width: string): boolean {
  if (Number(width) > 10000) {
    return false;
  }
  return true;
}

function is_valid_height(height: string): boolean {
  if (Number(height) > 10000) {
    return false;
  }
  return true;
}

export default app;
