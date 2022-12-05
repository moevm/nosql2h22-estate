import React, {useEffect, useState, useReducer} from 'react'
import ButtonFilter from "../Common/ButtonFilter/ButtonFilter";
import '../../../styles/Statistics/StatisticsComponent.css'
import PropTypes from "prop-types";
import {col_names, col_names_eng, test_rowdata} from '../Common/data_info.js'
import StatisticsBlock from './StatisticsBlock'


function StatisticsComponent(props){
    let [filter, setFilter] = useState({})
    let [sort, setSort] = useState("")
    let [search, setSearch] = useState("")
    let [reverseSort, setReverseSort] = useState(false)
    let [columns, setColumns] = useState([]);
    let [columnsEng, setColumnsEng] = useState([]);
    let [objects, setObjects] = useState([]);
    let [objectsArea, setObjectsArea] = useState([]);
    let [objectsFlats, setObjectsFlats] = useState([]);
    let [objectsNonResidentsArea, setObjectsNonResidentsArea] = useState([]);
    let [objectsResidents, setObjectsResidents] = useState([]);
    let [isInitialize, setIsInitialize] = useState(false);
    let [test, setTest] = useState(true)
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0)


    function InitializeObjects() {
        if(Object.keys(filter).length === 0) {
            fetch('http://localhost:1337/stats/area/')
                .then(res => res.json())
                .then( (res) => {
                    //alert(JSON.stringify(res.message))
                });
        } else {
            console.log('has filter')
        }
    }

    useEffect(() => {
        if(!isInitialize) {
            SetProps();
        }
    }, [isInitialize])

    useEffect(() => {
        if(!isInitialize) {
            setIsInitialize(true)
        }
    }, [objects])

    function SetProps() {
        TestSetProps();
        if(props.columns !== undefined) {
            setColumns(props.columns)
        }
        InitializeObjects()
    }

    function TestSetObjects() {
        return(
            [
                {
                    district: "123",
                    value: 50
                },
                {
                    district: "234",
                    value: 70
                },
                {
                    district: "345",
                    value: 60
                },
                {
                    district: "456",
                    value: 40
                }
            ]
        )
    }

    function TestSetProps() {
        if (test) {
            setColumns(col_names)
            setColumnsEng(col_names_eng)
            setObjectsArea(TestSetObjects()) //TEST
            setObjectsFlats(TestSetObjects()) //TEST
            setObjectsNonResidentsArea(TestSetObjects()) //TEST
            setObjectsResidents(TestSetObjects()) //TEST
            setTest(false)
        }
    }

    function Handler() {
        setIsInitialize(false)
    }

    function HandlerFilter(value) {
        setFilter(value)
        Handler()
    }


    function DisplayStatisticsBlocks() {
        return (
            <div className={"StatisticsBlocks"}>
                <StatisticsBlock title={"Площадь всех зданий для каждого района, кв. м"} valueName={"Количество кв.м"} objects={objectsArea}/>
                <StatisticsBlock title={"Количество квартир"} valueName={"Количество квартир"} objects={objectsFlats}/>
                <StatisticsBlock title={"Площадь незанятых жилых помещений, кв. м"} valueName={"Количество кв.м"} objects={objectsNonResidentsArea}/>
                <StatisticsBlock title={"Количество проживающих"} valueName={"Количество проживающих"} objects={objectsResidents}/>
            </div>
        )
    }

    return (
        <div>
            <div className={"ButtonFilterOffset"}>
                <ButtonFilter columns={columns} Handler={HandlerFilter} columnsEng={columnsEng}/>
            </div>
            {DisplayStatisticsBlocks()}
        </div>
    );

};

StatisticsComponent.propTypes = {
    columns: PropTypes.array,
    objects: PropTypes.array
}

export default StatisticsComponent;
