import React from 'react'
import './bootstrap.min.css';

class TableRows extends React.Component{
    render() {
        return (
                    <tr>
                        <td>{this.props.sentiment}</td>
                        <td>{ this.props.data[this.props.sentiment] }</td>
                    </tr>
                )
    }
}

export default TableRows;