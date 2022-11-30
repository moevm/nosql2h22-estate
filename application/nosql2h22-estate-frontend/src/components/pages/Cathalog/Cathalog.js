import React, {useEffect, useState} from 'react'
import ButtonSearchCathalog from "./ButtonsCathalog/ButtonSearchCathalog";
import ButtonFilterCathalog from "./ButtonsCathalog/ButtonFilterCathalog/ButtonFilterCathalog";
import ButtonSorterCathalog from "./ButtonsCathalog/ButtonSorterCathalog";
import TableCathalog from "./TableCathalog/TableCathalog";
import '../../../styles/Cathalog/Cathalog.css'
import PropTypes from "prop-types";

import {col_names, col_names_eng, test_rowdata} from './data_info.js'

function Cathalog(props){
    let [filter, setFilter] = useState({})
    let [sort, setSort] = useState("")
    let [search, setSearch] = useState("")
    let [reverseSort, setReverseSort] = useState(false)
    let [columns, setColumns] = useState([]);
    let [columnsEng, setColumnsEng] = useState([]);
    let [rowObjects, setRowObjects] = useState([]);
    let [testRowObjects, setTestRowObjects] = useState([]);
    let [isInitialize, setIsInitialize] = useState(false)
    let [test, setTest] = useState(true)

    function InitializeRowObjects() {
        console.log('filter = ', filter)
        if(Object.keys(filter).length === 0) {
            console.log('no filter')
            fetch('http://localhost:1337/houses/')
                .then(res => res.json())
                .then( (res) => {
                    setRowObjects(res.message)
                    setIsInitialize(true)
                });
        } else {
            let x = 1 + 1
        }
    }

    useEffect(() => {
        if(!isInitialize) {
            SetProps();
            /*if(rowObjects.length !== 0) {
                let a = 1 + 1;
            }*/
            InitializeRowObjects()
        }
    }, )

    function SetProps() {
        TestSetProps();
        if(props.columns !== undefined) {
            setColumns(props.columns)
        }
        //setRowObjects(SortRowObjects(SearchRowObjects(InitializeRowObjects())))
    }

    function TestSetProps() {
        if (test) {
            setColumns(col_names)
            setColumnsEng(col_names_eng)
            setTestRowObjects(test_rowdata)
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
        setIsInitialize(false)
    }

    function HandlerSort(value) {
        setSort(FindEngField(value))
        setReverseSort(!reverseSort)
        Handler()
    }

    function HandlerSearch(value) {
        setSearch(value)
        Handler()
    }

    function HandlerFilter(value) {
        setFilter(value)
        Handler()
    }

    console.log('testRowObject = ', testRowObjects)
    console.log('rowObjects = ', rowObjects)

    return (
        <div className="cathalog">
          <div className="rectangle-23">
              <div className="panel">
                  <ButtonSearchCathalog Handler={HandlerSearch}/>
                  <div className="EmptySurfacePanel"/>
                  <ButtonFilterCathalog columns={columns} Handler={HandlerFilter} columnsEng={columnsEng}/>
                  <div className="EmptySurfacePanelSecond"/>
                  <ButtonSorterCathalog columns={columns} Handler={HandlerSort}/>
              </div>
              <TableCathalog columns={columns} rowObjects={rowObjects}/>
          </div>
        </div>
    );

};

Cathalog.propTypes = {
    columns: PropTypes.array,
    rowObjects: PropTypes.array
}

export default Cathalog;
