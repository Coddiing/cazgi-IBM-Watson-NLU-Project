import React from 'react';
import './bootstrap.min.css';
import TableRows from './TableRows.js';

class EmotionTable extends React.Component {
    render() {
      return (  
        <div>
          {/*You can remove this line and the line below. */}
          {JSON.stringify(this.props.emotions)}
          <table className="table table-bordered">
          <thead>
                <tr>
                    <th>Emotions</th>
                    <th>Numbers</th>
                </tr>
            </thead>
            <tbody>
                {
                    
                    this.props.emotions.map ( ( data, index, arr ) => {
                        
                        return Object.keys( data.emotion ).map( (sentiment, index, arr) => {
                           
                            
                            return <TableRows  sentiment={sentiment} data={data.emotion} />
                        }
                             
                        )
                    
                    } )

                    //Write code to use the .map method that you worked on in the Hands-on React lab to extract the emotions
    
                }
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;
