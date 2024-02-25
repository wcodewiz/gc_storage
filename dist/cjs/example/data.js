"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartTable = void 0;
const Storage_1 = require("../Storage");
const table_1 = require("../core/table");
const databaseName = 'myDataBase';
exports.CartTable = Storage_1.GCStorage.init(databaseName).createTable(new table_1.Table('cart', ['id', 'product_id', 'quantity', 'price', 'totalPrice'], [], 'id'));
//# sourceMappingURL=data.js.map