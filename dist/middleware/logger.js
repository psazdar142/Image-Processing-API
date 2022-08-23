"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = (req, res, next // eslint-disable-line
) => {
    const url = req.url;
    console.log(url + ' was visisted');
    next();
};
exports.default = logger;
