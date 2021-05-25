import React from 'react';
import TableHeader from './tableHeader'
import TableBody from './tableBody';

const Table = (props) => {
    const {columns, sortColumn, onSort, data} = props;
    return ( 
        <table className="table">
        <TableHeader 
        columns ={this.columns}
        sortColumn ={sortColumn}
        onSort ={onSort}
        />
        <TableBody 
         columns={this.columns}
         data={data}
        />
         
     </table>
     );
}
 
export default Table;