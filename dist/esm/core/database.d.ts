import { Table } from './table';
export declare class Database {
    private databaseName;
    private data;
    private fetchedPrevious;
    private joinedData;
    private fetched;
    private tabeName;
    constructor(name?: string);
    private get;
    private exist;
    dataCount(tableName: string, primaryKey?: string): any;
    insertWhere(rows?: any[], tableName?: string): Database;
    insert(rows?: any[], tableName?: string): Database;
    getTableName(): string;
    createTable(table: Table): Database;
    private getIndex;
    private search;
    private searchAll;
    fetchSimilarAll(tableName: string, columnName: string, value: string | number): Database;
    private getAll;
    fetchAll(tableName: string, columnName: string, value: string | number): Database;
    fetchWhere(tableName: string, columnName: string, value: string | number): Database;
    fetchSimilar(tableName: string, columnName: string, value: string | number): Database;
    fetch(): {} | null;
    join(tableName: string, columnName: string, value: string | number): Database;
    private clearJoin;
    fetchById(tableName: string, id: number): Database;
    save(): Database;
}
