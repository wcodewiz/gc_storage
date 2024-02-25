# gc_storage

a grambid database storage manager for localStorage, incases of insensitive data. Local database for client side using the localStorage object.

**Note:** If you want to store sensitive data then you will have to use your backend. Thank you.

## Usage

First Create a global file.. example **database.tsx** using typescript paste the following code

```
import { GCStorage } from '../Storage';
import { Table } from '../core/table';

const databaseName = 'myDataBase';

export const CartTable = GCStorage.init(databaseName).createTable(new Table('cart', ['id', 'product_id', 'quantity', 'price', 'totalPrice'], [], 'id'));
```

### Usage

**Now inside your App.tsx**

```
import React from 'react';
import { CartTable } from './example/data';

const App = () => {
    return (
        <div
            onClick={() => {
                CartTable.insertWhere([[4, 1, 1, '4000', '3000']]);
            }}
        >
            hello world{CartTable.getTableName()}
        </div>
    );
};
export default App;
```

## RUN

**npm run dev** for vite

**npm start** for create-react-app

## Happy Hacking

## Authur

**Samuel Clinton**
