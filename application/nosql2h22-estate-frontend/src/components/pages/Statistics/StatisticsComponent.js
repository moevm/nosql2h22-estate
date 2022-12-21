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



    function CastToArray(obj) {
        let mass = []
        for (let key in obj) {
            mass.push({district: key, value: obj[key]})
        }
        return mass
    }

    function InitializeObjectsArea() {
        let url = new URL('http://localhost:1337/stats/area/')
        for (let k in filter) {
            url.searchParams.append(k, filter[k]);
        }
        fetch(url)
            .then(res => res.json())
            .then( (res) => {
                setObjectsArea(CastToArray(res.message))
            })
    }

    function InitializeObjectsFlats() {
        let url = new URL('http://localhost:1337/stats/flats/')
        for (let k in filter) {
            url.searchParams.append(k, filter[k]);
        }
        fetch(url)
            .then(res => res.json())
            .then( (res) => {
                setObjectsFlats(CastToArray(res.message))
            })
    }

    function InitializeObjectsResidents() {
        let url = new URL('http://localhost:1337/stats/residents/')
        for (let k in filter) {
            url.searchParams.append(k, filter[k]);
        }
        fetch(url)
            .then(res => res.json())
            .then( (res) => {
                setObjectsResidents(CastToArray(res.message))
            })
    }

    function InitializeObjects() {
        InitializeObjectsArea()
        InitializeObjectsFlats()
        InitializeObjectsResidents()
    }

    useEffect(() => {
        if(!isInitialize) {
            setIsInitialize(true)
            SetProps();
        }
    }, [isInitialize])


    function SetProps() {
        //TestSetProps();
        if(props.columns !== undefined) {
            setColumns(props.columns)
        }
        InitializeObjects()
    }

    function TestSetObjects() {
        return(
            [
                {
                    district: "Кировский",
                    value: 50
                },
                {
                    district: "Калининский",
                    value: 70
                },
                {
                    district: "Петроградский",
                    value: 67
                },
                {
                    district: "Колпинский",
                    value: 96
                },
                {
                    district: "Московский",
                    value: 67
                },
                {
                    district: "Адмиралтейский",
                    value: 63
                },
                {
                    district: "Центральный",
                    value: 27
                },
                {
                    district: "Фрунзенский",
                    value: 40
                },
                {
                    district: "Кронштадтский",
                    value: 79
                }
            ]
        )
    }

    function TestSetObjects2() {
        return(
            [
                {
                    district: "Кировский",
                    value: 70
                },
                {
                    district: "Калининский",
                    value: 87
                },
                {
                    district: "Петроградский",
                    value: 34
                },
                {
                    district: "Колпинский",
                    value: 20
                },
                {
                    district: "Московский",
                    value: 67
                },
                {
                    district: "Адмиралтейский",
                    value: 34
                },
                {
                    district: "Центральный",
                    value: 100
                },
                {
                    district: "Фрунзенский",
                    value: 34
                },
                {
                    district: "Кронштадтский",
                    value: 12
                }
            ]
        )
    }

    function TestSetObjects3() {
        return(
            [
                {
                    district: "Кировский",
                    value: 87
                },
                {
                    district: "Калининский",
                    value: 56
                },
                {
                    district: "Петроградский",
                    value: 25
                },
                {
                    district: "Колпинский",
                    value: 53
                },
                {
                    district: "Московский",
                    value: 13
                },
                {
                    district: "Адмиралтейский",
                    value: 24
                },
                {
                    district: "Центральный",
                    value: 34
                },
                {
                    district: "Фрунзенский",
                    value: 45
                },
                {
                    district: "Кронштадтский",
                    value: 87
                }
            ]
        )
    }

    function TestSetObjects4() {
        return(
            [
                {
                    district: "Кировский",
                    value: 34000
                },
                {
                    district: "Калининский",
                    value: 560000
                },
                {
                    district: "Петроградский",
                    value: 23000
                },
                {
                    district: "Колпинский",
                    value: 680000
                },
                {
                    district: "Московский",
                    value: 42000
                },
                {
                    district: "Адмиралтейский",
                    value: 560000
                },
                {
                    district: "Центральный",
                    value: 24000
                },
                {
                    district: "Фрунзенский",
                    value: 13000
                },
                {
                    district: "Кронштадтский",
                    value: 56000
                }
            ]
        )
    }

    function TestSetProps() {
        if (test) {
            setColumns(col_names)
            setColumnsEng(col_names_eng)
            setObjectsArea(TestSetObjects()) //TEST
            setObjectsFlats(TestSetObjects2()) //TEST
            setObjectsNonResidentsArea(TestSetObjects3()) //TEST
            setObjectsResidents(TestSetObjects4()) //TEST
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
                <StatisticsBlock title={"Количество проживающих"} valueName={"Количество человек"} objects={objectsResidents}/>
            </div>
        )
    }

    return (
        <div>
            <div className={"ButtonFilterOffset"}>
                <ButtonFilter columns={col_names} columnsEng={col_names_eng} Handler={HandlerFilter}/>
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
