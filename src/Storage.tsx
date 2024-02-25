import { Database } from './core/database';

export class GCStorage {
    public static init(name: string): Database {
        return new Database(name);
    }
}
