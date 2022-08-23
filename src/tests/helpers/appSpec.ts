import sharp from 'sharp';
import supertest from 'supertest';
import app from '../../app';
// require('supertest');
import fetch from 'node-fetch';
import { request } from 'http';
import { sharp_resize } from '../../app';
import fs from 'fs';

console.log(__dirname);
// app_object = new app;

describe('Endpoint Testing', (): void => {
  describe('endpoint: /', (): void => {
    it('gets /', async (): Promise<void> => {
      supertest(app).get('/').expect(200);
    });
  });

  describe('endpoint: /image_processing?file_name=tunnel_pic&height=550&width=550', (): void => {
    it('gets /image_processing?file_name=tunnel_pic&height=550&width=550', async (): Promise<void> => {
      supertest(app)
        .get('/image_processing?file_name=tunnel_pic&height=550&width=550')
        .expect(200);
    });
  });

  describe('endpoint: /image_processing?file_name=tunnel_pic&height=20001&width=550 height is too large', (): void => {
    it('gets /image_processing?file_name=tunnel_pic&height=20001&width=550', async (): Promise<void> => {
      supertest(app)
        .get('/image_processing?file_name=tunnel_pic&height=20001&width=550')
        .expect(400);
    });
  });

  describe('endpoint: /image_processing?file_name=tunnel_pic&height=550&width=20001 width is too large', (): void => {
    it('gets /image_processing?file_name=tunnel_pic&height=550&width=20001', async (): Promise<void> => {
      supertest(app)
        .get('/image_processing?file_name=tunnel_pic&height=550&width=20001')
        .expect(400);
    });
  });

  // describe('endpoint: /image_processing?file_name=tunnel_pic&height=600&width=600', (): void => {
  //   it('gets /image_processing?file_name=tunnel_pic&height=600&width=600', async (): Promise<void> => {
  //     // const response = await fetch('http://localhost:3000/image_processing?file_name=tunnel_pic&height=550&width=550');
  //     // const data = await response.json();
  //     const response = await request(app).get("/");
  //     let is_valid = await correct_dimensions('tunnel_pic');

  //     expect(is_valid).toBe(true);
  //   });
  // });
});

describe('Verifying resized image', () => {
  it('should resize image', async () => {
    await sharp_resize('tunnel_pic', '550', '550'); // generates testing file

    const path = 'assets/thumb/tunnel_picwidth550height550.jpg';

    let is_resized: boolean = false;
    if (fs.existsSync(path)) {
      is_resized = true;
    } else {
      is_resized = false;
    }

    // synchronously delete test file
    try {
      fs.unlinkSync(path);
      // file removed
    } catch (err) {
      console.error(err);
    }
    expect(is_resized).toBe(true);
  });
});
