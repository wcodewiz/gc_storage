import { GCStorage } from '../Storage';
import { Table } from '../core/table';
const databaseName = 'myDataBase';
export const CartTable = GCStorage.init(databaseName).createTable(new Table('cart', ['id', 'product_id', 'quantity', 'price', 'totalPrice'], [], 'id'));
//# sourceMappingURL=data.js.map