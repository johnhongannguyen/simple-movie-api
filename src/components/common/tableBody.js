import React from 'react';

const TableBody = () => {
    const {data, colums} = this.props;
    return (  
        <tbody>
            {data.map(item => <tr>
               {columns.map(colum =>  <td></td>)}
            </tr>)}
            
        </tbody>
        
        );
}
 
export default TableBody;