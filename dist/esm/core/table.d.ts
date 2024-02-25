export declare class Table {
    tableName: string;
    rows: any[];
    columns: string[];
    primaryKey: string;
    autoIncrement: boolean;
    constructor(tableName: string, columns?: string[], row?: any[], primary?: string, autoIncrement?: boolean);
}
