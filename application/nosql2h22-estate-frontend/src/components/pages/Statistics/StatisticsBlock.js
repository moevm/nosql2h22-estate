import React, {useEffect, useState, useReducer} from 'react'
import '../../../styles/Statistics/StatisticsBlock.css'
import PropTypes from "prop-types";
import Chart from "react-apexcharts"

function StatisticsBlock(props) {

    let [options, setOptions] = useState({})
    let [series, setSeries] = useState([])
    let [isInitialize, setIsInitialize] = useState(false);

    function getFieldMass(fieldName, mass) {
        let ret = []
        for(let i = 0; i < mass.length; i++) {
            ret[i] = mass[i][fieldName]
        }
        return ret
    }

    function CalculateOptions() {
        return {
            dataLabels: {
                enabled: false
            },
            plotOptions: {
                bar: {
                    horizontal: true
                }
            },
            xaxis: {
                categories: getFieldMass("district", props.objects)
            }
        }
    }

    function CalculateSeries() {
        return (
            [{
                name: props.valueName,
                data: getFieldMass("value", props.objects)
            }]
        )
    }

    function CalculateChart() {
        return (
            <Chart className='Chart' options={CalculateOptions()} series={CalculateSeries()} type="bar" width="500" />
        )
    }

    return (
        <div className={"rectangle-22"}>
            <span className={"paragraph-19"}>{props.title}</span>
            {CalculateChart()}
        </div>
    )

}


StatisticsBlock.propTypes = {
    title: PropTypes.string,
    valueName: PropTypes.string,
    objects: PropTypes.array
}

export default StatisticsBlock;