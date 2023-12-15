"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("./index.css");
const Card = ({ img }) => {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "card" }, { children: (0, jsx_runtime_1.jsx)("img", { alt: img, src: img }) })) }));
};
exports.default = Card;
