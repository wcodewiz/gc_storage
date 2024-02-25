export class Table {
    constructor(tableName, columns = [], row = [[], []], primary = 'id', autoIncrement = true) {
        this.autoIncrement = true;
        this.tableName = tableName;
        this.rows = row;
        this.columns = columns;
        this.autoIncrement = autoIncrement;
        this.primaryKey = primary;
    }
}
//# sourceMappingURL=table.js.map