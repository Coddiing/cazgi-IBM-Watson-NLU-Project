import React from 'react'
import './bootstrap.min.css';

class TableRows extends React.Component{

    processData() {
        var row = []
         if (this.props.sentiment==="joy" ) {
             row.push(
            <tr  style={{color:"green"}} >
                <td>{this.props.sentiment}</td>
                <td>{ this.props.data[this.props.sentiment] }</td>
            </tr>
             )
            
        } else if ( this.props.sentiment==="disgust" || 
                    this.props.sentiment==="fear" || 
                    this.props.sentiment==="anger" )
        {
            row.push(
                <tr  style={{color:"red"}} >
                    <td>{this.props.sentiment}</td>
                    <td>{ this.props.data[this.props.sentiment] }</td>
                </tr>
                 )

        } else {
            row.push(
                    <tr  style={{color:"yellow"}} >
                        <td>{this.props.sentiment}</td>
                        <td>{ this.props.data[this.props.sentiment] }</td>
                    </tr>
                 )
        }
     
        return row;
    }
    render() {
        return (
            
                        this.processData()[0]
               
        )
    }
}

export default TableRows;