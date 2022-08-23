"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const app_2 = require("../../app");
const fs_1 = __importDefault(require("fs"));
console.log(__dirname);
// app_object = new app;
describe('Endpoint Testing', () => {
    describe('endpoint: /', () => {
        it('gets /', async () => {
            (0, supertest_1.default)(app_1.default).get('/').expect(200);
        });
    });
    describe('endpoint: /image_processing?file_name=tunnel_pic&height=550&width=550', () => {
        it('gets /image_processing?file_name=tunnel_pic&height=550&width=550', async () => {
            (0, supertest_1.default)(app_1.default)
                .get('/image_processing?file_name=tunnel_pic&height=550&width=550')
                .expect(200);
        });
    });
    describe('endpoint: /image_processing?file_name=tunnel_pic&height=20001&width=550 height is too large', () => {
        it('gets /image_processing?file_name=tunnel_pic&height=20001&width=550', async () => {
            (0, supertest_1.default)(app_1.default)
                .get('/image_processing?file_name=tunnel_pic&height=20001&width=550')
                .expect(400);
        });
    });
    describe('endpoint: /image_processing?file_name=tunnel_pic&height=550&width=20001 width is too large', () => {
        it('gets /image_processing?file_name=tunnel_pic&height=550&width=20001', async () => {
            (0, supertest_1.default)(app_1.default)
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
        await (0, app_2.sharp_resize)('tunnel_pic', '550', '550'); // generates testing file
        const path = 'assets/thumb/tunnel_picwidth550height550.jpg';
        let is_resized = false;
        if (fs_1.default.existsSync(path)) {
            is_resized = true;
        }
        else {
            is_resized = false;
        }
        // synchronously delete test file
        try {
            fs_1.default.unlinkSync(path);
            // file removed
        }
        catch (err) {
            console.error(err);
        }
        expect(is_resized).toBe(true);
    });
});
