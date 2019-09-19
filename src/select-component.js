import React, { Component } from 'react';
import './App.css';

export default class SelectComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            graphTypes: ["barchart", "linechart", "areachart", "scatterchart", "linechart"],
            defaultGraphType: 'barchart',
            defaultValue: '',
        }
    }

    onChangeXValue = (event) => {
        this.props.xValueSelectedCallback(event.target.value)
    }

    onChangeYValue = (event) => {
        this.props.yValueSelectedCallback(event.target.value)
    }

    onChangeCountOf = () => {
        const { countOf } = this.props
        this.props.countOfSelectedCallback(!countOf)
    }

    onChangeGraphTYpe = (event) => {
        this.props.onGraphTypeSelectedCallback(event.target.value)
    }

    componentDidMount () {
        const { defaultGraphType } = this.state
        this.props.onGraphTypeSelectedCallback(defaultGraphType)
    }

    render () {
        const { excelHeaders, countOf } = this.props
        const { graphTypes, defaultValue } = this.state
        const selectOptions = excelHeaders.map((data, index) => <option key={index} value={data}>{data}</option>)
        const graphTypeOptions =  graphTypes.map((data, index) => <option key={index} value={data}>{data}</option>)
        return(
            <div className="select-view">
                <div className='select'>
                    <label className='label'>Select X-axis field:</label>
                    <select onChange={this.onChangeXValue} defaultValue={defaultValue} className='select-tag'>
                        <option value='' disabled>Select</option>
                        {selectOptions}
                    </select>
                </div>
                <div className='select'>
                    <label className='label'>CountOf:</label>
                    <input type='checkbox' checked={countOf} onChange={this.onChangeCountOf}/>
                </div>
                {!countOf && <div className='select'>
                    <label className='label'>Select Y-axis field:</label>
                    <select onChange={this.onChangeYValue} defaultValue={defaultValue} className='select-tag'>
                        <option value='' disabled>Select</option>
                        {selectOptions}
                    </select>
                </div>}
                <div className='select'>
                    <label className='label'>Select graph type:</label>
                    <select onChange={this.onChangeGraphTYpe} className='select-tag'>
                        {graphTypeOptions}
                    </select>
                </div>
            </div>
        )
    }
}