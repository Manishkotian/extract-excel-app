import React, { Component } from 'react';
import './App.css';

export default class ExcelContent extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    renderTableHeader = (headers) => {
        return headers.map((data, index) => {
            return <th key={index}>{data}</th>
         })
    }

    renderTableData = (extractedData) => {
        return (
            <React.Fragment>
                {extractedData.map((data, index) => 
                    <tr key={index}>
                        {this.renderRowData(data)}
                    </tr>
                )}
            </React.Fragment>
        )        
    }

    renderRowData = (rowData) => {
        const { excelHeaders } = this.props
        return (
            <React.Fragment>
                {excelHeaders.map((data, index) => 
                    <td key={index}>
                        {rowData[data]}
                    </td>
                )}
            </React.Fragment>
        )       
    }

  render () {
    const { extractedData, excelHeaders } = this.props
    return(
        <div className="excel-content-view">
            <table>
                <thead>
                    <tr>{this.renderTableHeader(excelHeaders)}</tr>
                </thead>
                <tbody>
                    {this.renderTableData(extractedData)}
                </tbody>
            </table>
        </div>
    )
  }
}