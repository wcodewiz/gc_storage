export class Table {
    public tableName: string;
    public rows: any[];
    public columns: string[];
    public primaryKey: string;
    public autoIncrement: boolean = true;

    constructor(tableName: string, columns: string[] = [], row: any[] = [[], []], primary: string = 'id', autoIncrement = true) {
        this.tableName = tableName;
        this.rows = row;
        this.columns = columns;
        this.autoIncrement = autoIncrement;
        this.primaryKey = primary;
    }
}
