import React, {useEffect, useState, useReducer} from 'react'
import ButtonSearchCathalog from "./ButtonsCathalog/ButtonSearchCathalog";
import ButtonFilter from "../Common/ButtonFilter/ButtonFilter";
import ButtonSorterCathalog from "./ButtonsCathalog/ButtonSorterCathalog";
import TableCathalog from "./TableCathalog/TableCathalog";
import '../../../styles/Cathalog/CathalogComponent.css'
import PropTypes from "prop-types";

import {col_names, col_names_eng, test_rowdata} from '../Common/data_info.js'

function CathalogComponent(props){
    let [filter, setFilter] = useState({})
    let [sort, setSort] = useState("")
    let [search, setSearch] = useState("")
    let [reverseSort, setReverseSort] = useState(false)
    let [columns, setColumns] = useState([]);
    let [columnsEng, setColumnsEng] = useState([]);
    let [rowObjects, setRowObjects] = useState([]);
    let [testRowObjects, setTestRowObjects] = useState([]);
    let [isInitialize, setIsInitialize] = useState(false);
    let [isBeginingLoading, setIsBeginingLoading] = useState(false)
    let [isEndingLoading, setIsEndingLoading] = useState(false)
    let [test, setTest] = useState(true)
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0)


    function InitializeRowObjects() {
        if(Object.keys(filter).length === 0) {
            fetch('http://localhost:1337/houses/')
                .then(res => res.json())
                .then( (res) => {
                    setRowObjects(SortRowObjects(SearchRowObjects(res.message)))
                });
        } else {
            let url = new URL('http://localhost:1337/houses/filter')
            for (let k in filter) {
                url.searchParams.append(k, filter[k]);
            }
            fetch(url)
                .then(res => res.json())
                .then( (res) => {
                    setRowObjects(SortRowObjects(SearchRowObjects(res.message)))
                });
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
    }, [rowObjects])

    function SetProps() {
        TestSetProps();
        if(props.columns !== undefined) {
            setColumns(props.columns)
        }
        InitializeRowObjects()
    }

    function TestSetProps() {
        if (test) {
            setColumns(col_names)
            setColumnsEng(col_names_eng)
            //setTestRowObjects(test_rowdata)
            setTest(false)
        }
    }

    function SortRowObjects(mass) {
        return mass.sort(SortBy(sort, reverseSort, undefined))
    }

    function SearchRowObjects(mass) {
        if(search !== "") {
            return mass.filter(row => CustomMatch(row.street, search))
        } else {
            return mass
        }
    }

    function CustomMatch(word, search) {
        return word.match(search)
    }

    function FindEngField(rusField) {
        let engField = ""
        for(let i = 0; i < columns.length; i++) {
            if(columns[i] === rusField) {
                engField = columnsEng[i]
            }
        }
        return engField
    }

    function SortBy(field, reverse, primer)  {
        const key = primer ?
            function(x) {
                return primer(x[field])
            } :
            function(x) {
                return x[field]
            };
        reverse = !reverse ? 1 : -1;
        return function(a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
    }

    function Handler() {
        //setRowObjects([])
        setIsInitialize(false)
    }

    function HandlerSort(value) {
        setSort(FindEngField(value))
        setReverseSort(!reverseSort)
        Handler()
    }

    function HandlerSearch(value) {
        Handler()
        setSearch(value)
    }

    function HandlerFilter(value) {
        setFilter(value)
        Handler()
    }

    function DisplayTableCathalog() {
        if(isInitialize) {
            return (
                <TableCathalog columns={columns} rowObjects={rowObjects}/>
            )
        }
    }

    //alert("begined: " + JSON.stringify(rowObjects))
    return (
        <div className="cathalog">
            <div className="rectangle-23">
                <div className="panel">
                    <ButtonSearchCathalog Handler={HandlerSearch}/>
                    <div className="EmptySurfacePanel"/>
                    <ButtonFilter columns={columns} Handler={HandlerFilter} columnsEng={columnsEng}/>
                    <div className="EmptySurfacePanelSecond"/>
                    <ButtonSorterCathalog columns={columns} Handler={HandlerSort}/>
                </div>
                {DisplayTableCathalog()}
            </div>
        </div>
    );

};

CathalogComponent.propTypes = {
    columns: PropTypes.array,
    rowObjects: PropTypes.array
}

export default CathalogComponent;
