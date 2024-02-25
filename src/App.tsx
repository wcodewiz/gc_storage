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
