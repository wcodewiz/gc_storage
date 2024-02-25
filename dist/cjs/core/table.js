"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = void 0;
class Table {
    constructor(tableName, columns = [], row = [[], []], primary = 'id', autoIncrement = true) {
        this.autoIncrement = true;
        this.tableName = tableName;
        this.rows = row;
        this.columns = columns;
        this.autoIncrement = autoIncrement;
        this.primaryKey = primary;
    }
}
exports.Table = Table;
//# sourceMappingURL=table.js.map