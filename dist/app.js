"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sharp_resize = void 0;
const express_1 = __importDefault(require("express"));
const sharp_1 = __importDefault(require("sharp"));
const logger_1 = __importDefault(require("./middleware/logger"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const port = 3000;
app.get('/', logger_1.default, async (req, res) => {
    res.status(200).send('Welcome to the Image Processing API');
});
app.get('/image_processing', logger_1.default, async (req, res) => {
    try {
        const file_name = String(req.query.file_name); // eslint-disable-line
        const width = String(req.query.width); // eslint-disable-line
        const height = String(req.query.height); // eslint-disable-line
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
        }
        else {
            res.send('ERROR: Please make sure that you are choosing a valid image file and that both the height and width you are choosing to resize to are less than 10,000px. Please modify your request and try again.');
        }
    }
    catch (e) {
        res.status(400).send(e);
    }
});
// Start server
app.listen(port, () => {
    console.log(`server started at localhost:${port}`);
});
// helper functions below
async function sharp_resize(file_name, width, height) {
    const input = 'assets/full/' + file_name + '.jpg';
    const output = 'assets/thumb/' + file_name + 'width' + width + 'height' + height + '.jpg';
    await (0, sharp_1.default)(input)
        .resize(+width, +height, {})
        .toFile(output);
}
exports.sharp_resize = sharp_resize;
function is_valid_image(file_name) {
    const path = 'assets/full/' + file_name + '.jpg';
    if (fs_1.default.existsSync(path)) {
        return true;
    }
    return false;
}
function is_valid_width(width) {
    if (Number(width) > 10000) {
        return false;
    }
    return true;
}
function is_valid_height(height) {
    if (Number(height) > 10000) {
        return false;
    }
    return true;
}
exports.default = app;
