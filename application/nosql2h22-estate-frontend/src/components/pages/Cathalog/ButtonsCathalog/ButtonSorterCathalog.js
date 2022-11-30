import React, {useEffect, useState} from 'react'
import '../../../../styles/Cathalog/ButtonsCathalog/ButtonSorterCathalog.css'
import PropTypes from "prop-types";


function ButtonSorterCathalog(props) {

    let [columns, setColumns] = useState([]);
    let [dataState, setDataState] = useState("");
    let [sort, setSort] = useState("")
    let [isInitialize, setIsInitialize] = useState(false)

    function SelectOptions(options) {
        return options.map((value, index) => {
            return (
                <option>
                    {value.label}
                </option>
            )
        })
    }

    function OnClick(name) {
        setSort(name)
        setDataState("")
        props.Handler(name)
    }

    function CustomSelectOptionLabel(name, id) {
        return (
            <label htmlFor={"singleSelect"+String(id)} tabIndex={String(id)} className="__select__label">
                {name}
            </label>
        )
    }

    function CustomSelectOptionChecked(name, id) {
        return (
            <>
                <input id={"singleSelect"+String(id)}
                       className="__select__input"
                       type="radio"
                       name={"singleSelect"+String(id)}
                       checked
                       onClick={(evt) => {OnClick(name)}}/>
                {CustomSelectOptionLabel(name, id)}
            </>
        )
    }

    function CustomSelectOptionNotChecked(name, id) {
        return (
            <>
                <input id={"singleSelect"+String(id)}
                       className="__select__input"
                       type="radio"
                       name={"singleSelect"+String(id)}
                       onClick={(evt) => {OnClick(name)}}/>
                {CustomSelectOptionLabel(name, id)}
            </>
        )
    }

    function CustomSelectOption(name, id) {
        if(name === sort) {
            return (
                <>{CustomSelectOptionChecked(name, id)}</>
            )
        } else {
            return (
                <>{CustomSelectOptionNotChecked(name, id)}</>
            )
        }
    }

    function CustomSelectOptions() {
        return columns.map((value, index) => {
            return (
                <>{CustomSelectOption(value, index)}</>
            )
        })

    }

    function CustomSelect() {
        return (
            <div className="__select" data-state={dataState}>
                <div className="__select__title" onClick={() => {
                    if(dataState === "") {
                        setDataState("active")
                    } else {
                        setDataState("")
                    }
                }}/>
                <div className="__select__content">
                    {CustomSelectOption()}
                    {CustomSelectOptions()}
                </div>
            </div>
        )
    }

    function SetProps() {
        if(props.columns !== undefined) {
            setColumns(props.columns)
        }
    }

    function Initialize() {
        if(!isInitialize) {
            SetProps();
            if(columns.length !== 0) {
                setIsInitialize(true)
            }
        }
    }

    function ShortString(value) {
        if(value.length > 7) {
            return value.slice(0, 5) + "..."
        } else {
            return value
        }
    }

    useEffect(()=>{
        Initialize()
    })

    return (
        <div>
            <div className="mainSorter">
                <div className="absoluteField">
                    {CustomSelect()}
                </div>
                <span className="textSorter">Сортировать: <span>{ShortString(sort)}</span></span>
            </div>
        </div>
    );

};

ButtonSorterCathalog.propTypes = {
    columns: PropTypes.array,
    Handler: PropTypes.func
}

export default ButtonSorterCathalog;
