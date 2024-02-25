import React from 'react';
import { CartTable } from './example/data';
const App = () => {
    return (React.createElement("div", { onClick: () => {
            CartTable.insertWhere([[4, 1, 1, '4000', '3000']]);
        } },
        "hello world",
        CartTable.getTableName()));
};
export default App;
//# sourceMappingURL=App.js.map