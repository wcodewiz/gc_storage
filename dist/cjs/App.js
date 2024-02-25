"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const data_1 = require("./example/data");
const App = () => {
    return (react_1.default.createElement("div", { onClick: () => {
            data_1.CartTable.insertWhere([[4, 1, 1, '4000', '3000']]);
        } },
        "hello world",
        data_1.CartTable.getTableName()));
};
exports.default = App;
//# sourceMappingURL=App.js.map