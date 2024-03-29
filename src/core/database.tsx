import { Table } from './table';

export class Database {
    private databaseName: string = '';
    private data: {} = {};
    private fetchedPrevious = {};
    private joinedData: {} | null = {};
    private fetched: {} | null = {};
    private tabeName: string = '';

    constructor(name: string = '') {
        this.databaseName = name;
        this.data = this.get(name);
    }

    private get(name: string): {} {
        if (localStorage.getItem(name) == null) {
            this.save();
            return {};
        }
        return JSON.parse(`${localStorage.getItem(name)}`);
    }

    private exist(tableName: string): boolean {
        var found = false;
        for (var item in this.data) {
            if (item === tableName) {
                found = true;
                break;
            }
        }
        return found;
    }

    public dataCount(tableName: string, primaryKey: string = 'id') {
        //@ts-ignore
        var tableData = this.data[tableName];
        //@ts-ignore
        return tableData[primaryKey].length;
    }

    public insertWhere(rows: any[] = [[], []], tableName: string = this.tabeName): Database {
        const conditions: boolean[] = [];
        //@ts-ignore
        var tableData = this.data[tableName];
        for (var i = 0; i < rows.length; i++) {
            for (var j = 0; j < rows[i].length; j++) {
                for (var column in tableData) {
                    const found = this.fetchWhere(tableName, column, rows[i][j]).fetch();
                    conditions.push(found === null);
                }
            }
        }
        var failed = true;
        for (var i = 0; i < conditions.length; i++) {
            if (conditions[i]) {
                failed = false;
                break;
            }
        }
        if (!failed) {
            this.insert(rows, tableName);
        }
        return this;
    }

    public insert(rows: any[] = [[], []], tableName: string = this.tabeName): Database {
        const found = this.fetchById(tableName, rows[0][0]).fetch();
        var dataSize = this.dataCount(this.tabeName);

        if (this.exist(tableName) && found === null) {
            var data = {};
            this.data = this.get(this.databaseName);
            //@ts-ignore
            var tableData = this.data[tableName];
            const primary = tableData['primary'];
            var index = 0;
            for (var column in tableData) {
                const items: any[] = tableData[column];
                if (items.push instanceof Function) {
                    for (var j = 0; j < rows.length; j++) {
                        var item = rows[j][index];
                        if (primary === column) {
                            if (item === null) {
                                if (tableData['autoIncrement']) {
                                    item = dataSize === 0 ? 1 : dataSize + 1;
                                } else {
                                    item = dataSize === 0 ? 1 : dataSize;
                                }
                            }
                        }
                        items.push(item);
                    }
                }

                data = { ...data, [column]: items };
                index += 1;
            }

            this.data = { ...this.data, [tableName]: data };
        }
        this.save();
        return this;
    }

    public getTableName(): string {
        return this.tabeName;
    }
    public createTable(table: Table): Database {
        this.tabeName = table.tableName;
        if (!this.exist(table.tableName)) {
            var data = {};
            if (table.rows.length > 0) {
                if (table.columns.length < table.rows[0].length || table.rows[0].length < table.columns.length) {
                    throw Error(`invalid data structure, table with total data of column of size ${table.columns.length} and a row of  size ${table.rows[0].length}`);
                }
            }
            for (var i = 0; i < table.columns.length; i++) {
                const items: any[] = [];
                for (var j = 0; j < table.rows.length; j++) {
                    items.push(table.rows[j][i]);
                }
                data = { ...data, [table.columns[i]]: items };
            }
            this.data = { ...this.data, [table.tableName]: { ...data, ['primary']: table.primaryKey, ['autoIncrement']: table.autoIncrement } };
            return this;
        }
        this.save();
        return this;
    }

    private getIndex(tableName: string, searchColumn: string | number, column: string): number {
        this.data = this.get(this.databaseName);
        //@ts-ignore
        var tableData = this.data[tableName];
        var foundIndex = -1;
        for (var i = 0; i < tableData[column].length; i++) {
            if (searchColumn === tableData[column][i]) {
                foundIndex = i;
                break;
            }
        }
        return foundIndex;
    }
    private search(tableName: string, searchColumn: string | number, column: string): number {
        this.data = this.get(this.databaseName);
        //@ts-ignore
        var tableData = this.data[tableName];
        var foundIndex = -1;
        for (var i = 0; i < tableData[column].length; i++) {
            if (searchColumn.toString().indexOf(tableData[column][i]) !== -1) {
                foundIndex = i;
                break;
            }
        }
        return foundIndex;
    }

    private searchAll(tableName: string, searchColumn: string | number, column: string): number[] {
        this.data = this.get(this.databaseName);
        //@ts-ignore
        var tableData = this.data[tableName];
        var foundIndex = [];
        for (var i = 0; i < tableData[column].length; i++) {
            if (searchColumn.toString().indexOf(tableData[column][i]) !== -1) {
                foundIndex.push(i);
            }
        }
        return foundIndex;
    }
    public fetchSimilarAll(tableName: string, columnName: string, value: string | number): Database {
        //@ts-ignore
        var tableData = this.data[tableName];
        var foundIndex = this.searchAll(tableName, value, columnName);
        var rows = [];
        for (var j = 0; j < foundIndex.length; j++) {
            var returned = {};
            for (var column in tableData) {
                for (var i = 0; i < tableData[column].length; i++) {
                    returned = { ...returned, [column]: tableData[column][foundIndex[j]] };
                }
            }
            rows.push(returned);
        }
        this.fetchedPrevious = { [tableName]: foundIndex.length <= 0 ? null : rows };
        this.fetched = foundIndex.length <= 0 ? null : rows;
        this.clearJoin();
        return this;
    }

    private getAll(tableName: string, searchColumn: string | number, column: string): number[] {
        this.data = this.get(this.databaseName);
        //@ts-ignore
        var tableData = this.data[tableName];
        var foundIndex = [];
        for (var i = 0; i < tableData[column].length; i++) {
            if (searchColumn === tableData[column][i]) {
                foundIndex.push(i);
            }
        }
        return foundIndex;
    }

    public fetchAll(tableName: string, columnName: string, value: string | number): Database {
        //@ts-ignore
        var tableData = this.data[tableName];
        var foundIndex = this.getAll(tableName, value, columnName);
        var rows = [];
        for (var j = 0; j < foundIndex.length; j++) {
            var returned = {};
            for (var column in tableData) {
                for (var i = 0; i < tableData[column].length; i++) {
                    returned = { ...returned, [column]: tableData[column][foundIndex[j]] };
                }
            }
            rows.push(returned);
        }
        this.fetchedPrevious = { [tableName]: foundIndex.length <= 0 ? null : rows };
        this.fetched = foundIndex.length <= 0 ? null : rows;
        this.clearJoin();
        return this;
    }

    public fetchWhere(tableName: string, columnName: string, value: string | number): Database {
        var returned = {};
        //@ts-ignore
        var tableData = this.data[tableName];
        var foundIndex = this.getIndex(tableName, value, columnName);
        for (var column in tableData) {
            for (var i = 0; i < tableData[column].length; i++) {
                returned = { ...returned, [column]: tableData[column][foundIndex] };
            }
        }
        this.fetchedPrevious = { [tableName]: foundIndex == -1 ? null : returned };
        this.fetched = foundIndex == -1 ? null : returned;
        this.clearJoin();
        return this;
    }

    public fetchSimilar(tableName: string, columnName: string, value: string | number): Database {
        var returned = {};
        //@ts-ignore
        var tableData = this.data[tableName];
        var foundIndex = this.search(tableName, value, columnName);
        for (var column in tableData) {
            for (var i = 0; i < tableData[column].length; i++) {
                returned = { ...returned, [column]: tableData[column][foundIndex] };
            }
        }
        this.fetchedPrevious = { [tableName]: foundIndex == -1 ? null : returned };
        this.fetched = foundIndex == -1 ? null : returned;
        this.clearJoin();
        return this;
    }
    public fetch(): {} | null {
        return this.joinedData === null ? this.fetched : this.joinedData;
    }

    public join(tableName: string, columnName: string, value: string | number): Database {
        if (this.joinedData == null) {
            this.joinedData = {};
        }
        var oldData = this.fetchedPrevious;
        var newData = this.fetchWhere(tableName, columnName, value).fetch();
        this.joinedData = { ...this.joinedData, ...oldData, [tableName]: newData };
        this.fetched = null;
        return this;
    }
    private clearJoin(): Database {
        this.joinedData = null;
        return this;
    }

    public fetchById(tableName: string, id: number): Database {
        return this.fetchWhere(tableName, 'id', id);
    }

    public save(): Database {
        localStorage.setItem(this.databaseName, JSON.stringify(this.data));
        return this;
    }
}
