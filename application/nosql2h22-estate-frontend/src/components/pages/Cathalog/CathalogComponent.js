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

    let [buttonsMaxPage, setButtonsMaxPage] = useState(295);
    let [numberElementsOnPage, setNumberElementsOnPage] = useState(20);
    let [currentPage, setCurrentPage] = useState("1");

    function RoundButtonsMaxPage(res) {
        let ans = res / numberElementsOnPage
        if (Number.isInteger(ans)) {
            setButtonsMaxPage(Math.floor(ans))
        } else {
            setButtonsMaxPage(Math.floor(ans) + 1)
        }
    }

    function InitializeButtonsMaxPage() {

        if(Object.keys(filter).length === 0) {
            let url = new URL('http://localhost:1337/houses/count')
            fetch(url)
                .then(res => res.json())
                .then((res) => {
                    console.log('res = ', res.message)
                    RoundButtonsMaxPage(res.message)
                });
        }
    }

    function InitializeRowObjects() {

            console.log('has filter')
            let url = new URL('http://localhost:1337/houses/filter')
            for (let k in filter) {
                url.searchParams.append(k, filter[k]);
            }
            url.searchParams.append("page", currentPage)
            url.searchParams.append("sort", sort.toString())
            if(reverseSort) {
                url.searchParams.append("order", "1")
            } else  {
                url.searchParams.append("order", "-1")
            }
            fetch(url)
                .then(res => res.json())
                .then( (res) => {
                    console.log('res = ', res.message)
                    //alert(JSON.stringify(res.message.houses))
                    setRowObjects(res.message.houses)
                    RoundButtonsMaxPage(res.message.count)
                });
        //setRowObjects(SortRowObjects(SearchRowObjects(test_rowdata)))
    }

    useEffect(() => {
        if(!isInitialize) {
            InitializeButtonsMaxPage()
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
        //setRowObjects([])
        setIsInitialize(false)
    }

    function HandlerSort(value) {
        setSort(FindEngField(value))
        setReverseSort(!reverseSort)
        Handler()
    }

    function HandlerSearch(value) {
        let tmp = filter
        tmp.street = value
        setFilter(tmp)
        Handler()
    }

    function HandlerFilter(value) {
        setFilter(value)
        Handler()
    }

    function HandlerPage(value) {
        setCurrentPage(value)
        Handler()
    }

    function DisplayTableCathalog() {
        if(isInitialize && (rowObjects.length !== 0)) {
            return (
                <TableCathalog columns={columns}
                               rowObjects={rowObjects}
                               currentPage={currentPage}
                               Handler={HandlerPage}
                               buttonsMaxPage={buttonsMaxPage}
                               numberElementsOnPage={numberElementsOnPage}
                />
            )
        }
    }

    if(isInitialize)
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
    else {
        return (
            <div/>
        )
    }

};

CathalogComponent.propTypes = {
    columns: PropTypes.array,
    rowObjects: PropTypes.array
}

export default CathalogComponent;
