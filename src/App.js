import React, { Component } from 'react';
import './App.css';
import { ExcelRenderer} from 'react-excel-renderer';
// import ExcelContent from './excel-content.js';
import ChartComponnet from './chart/chart';
import SelectComponent from './select-component.js'
export default class App extends Component {
	constructor(props){
		super(props);
		this.state = {
		fileNameError: false,
		countOf: false
		}
	}

	fileHandler = (event) => {
		let fileObj = event.target.files[0];
		let fileName = fileObj.name.slice(fileObj.name.lastIndexOf('.')+1)
		this.setState({
		fileNameError: false,
		excelHeaders: undefined,
		extractedData: undefined,
		xValue: undefined,
		yValue: undefined,
		graphType: undefined,
		graphData: undefined
		})
		if(fileName === "xls" || fileName === "xlsx" ){
			this.extractFile(fileObj) 
		}
		else {
		this.setState({
			fileNameError: true
		})
		}
	}

	extractFile = (filePath) => {
		ExcelRenderer(filePath, (err, resp) => {
		if(err){
			console.log(err);            
		}
		else{
			const excelData = resp.rows
			const excelHeaders = []
			const extractedExcelData = []
			excelData[0].map(header => {
			excelHeaders.push(header)
			return ''
			})
			excelData.map((excelData, index) => {
			if(index) {
				let row = {}
				excelData.map((data, rowIndex) => {
				row[excelHeaders[rowIndex]] = data
				return ''
				})
				extractedExcelData.push(row)
			}
			return ''          
			})
			this.setState({
			excelHeaders,
			extractedData: extractedExcelData
			});
		}
		});
	}

	setXValue = (value) => {
		this.setState({ xValue: value, graphData: undefined }, () => {
			const { xValue, yValue, countOf } = this.state
			if (xValue && countOf) {
				this.setState({graphData: undefined})
				this.getCountOfValue()
			} else if(xValue && yValue) {
				this.setState({graphData: undefined})
				this.constructGraphData()
			}
		})
	}

	setYValue = (value) => {
		this.setState({ yValue: value, graphData: undefined }, () => {
			const { xValue, yValue } = this.state
			if(xValue && yValue) {
				this.constructGraphData()
			}
		})
	}

	setGraphType = (value) => {
		this.setState({ graphType: value })
	}

	constructGraphData = () => {
		const { xValue, yValue, extractedData } = this.state
		let graphData = [{key: 'GraphData', values: []}]
		extractedData.map(data => {
			let value = {}
			value.x = data[xValue]
			value.y = data[yValue]
			graphData[0].values.push(value)
			return ''
		})
		this.setState({ graphData })
	}

	onChangeCountOfValue = (value) => {
		this.setState({ countOf: value, graphData: undefined }, () => {
			if(this.state.countOf) {
				this.getCountOfValue()
			}
		})
	}
	
	getCountOfValue = () => {
		const { xValue, extractedData } = this.state
		if (xValue) {
			let totalXValuesArray = []
			let graphData = [{key: 'GraphData', values: []}]
			extractedData.map(dataValue => {
				if (!totalXValuesArray.length || !totalXValuesArray.includes(dataValue[xValue])) {
					let value = { x: dataValue[xValue], y: 0 }
					totalXValuesArray.push(dataValue[xValue])
					extractedData.map(data => {
						if(dataValue[xValue] === data[xValue]) {
							value.y = value.y + 1
						}
						return ''
					})
					graphData[0].values.push(value)
				}				
				return ''
			})
			this.setState({ graphData })
		}
	}

  render () {
	const { fileNameError, excelHeaders, graphData, graphType, countOf } = this.state
    return(
		<div className="extract-excel-view">
			<div className='select-file-view'>
				Select File  <input
				type='file'
				onChange={this.fileHandler}
				className='select-file'
				/>
			</div>
			{fileNameError && <span className='error-text'>Please select .xls or .xlsx file</span>}
			{/* {extractedData && <ExcelContent
			extractedData={extractedData} 
			excelHeaders={excelHeaders}
			/>} */}
			{excelHeaders && <SelectComponent
				excelHeaders={excelHeaders}
				countOf={countOf}
				xValueSelectedCallback={(value) => this.setXValue(value)}
				yValueSelectedCallback={(value) => this.setYValue(value)}
				onGraphTypeSelectedCallback={(value) => this.setGraphType(value)}
				countOfSelectedCallback={(value) => this.onChangeCountOfValue(value)}
			/>}
			{ graphData && graphType && <ChartComponnet
				data={graphData}
				graphType={graphType}
			/>}
		</div>
    )
  }
}