"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GCStorage = void 0;
const database_1 = require("./core/database");
class GCStorage {
    static init(name) {
        return new database_1.Database(name);
    }
}
exports.GCStorage = GCStorage;
//# sourceMappingURL=Storage.js.map