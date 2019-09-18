import React, { Component } from 'react';
import '../App.css';
import { BarChart, AreaChart, LineChart, ScatterChart } from 'react-charts-d3';

export default class ChartComponnet extends Component {
    render () {
        const { graphType, data } = this.props
        return(
            <div className='graph-view'>
                {graphType === 'barchart' ? <BarChart data={data} />: null }
                {graphType === 'areachart' ? <AreaChart data={data} />: null }
                {graphType === 'linechart' ? <LineChart data={data} />: null }
                {graphType === 'scatterchart' ? <ScatterChart data={data} />: null }
            </div>
        )
    }
}