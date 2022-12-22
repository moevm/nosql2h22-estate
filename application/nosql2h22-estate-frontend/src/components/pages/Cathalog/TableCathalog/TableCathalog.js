import React, {useEffect} from 'react'
import '../../../../styles/Cathalog/TableCathalog/TableCathalog.css'
import {useState} from "react";
import ButtonPageTableCatalog from "./ButtonPageTableCatalog";
import PropTypes from "prop-types";

function TableCathalog(props) {

    let [columns, setColumns] = useState([]);
    let [rows, setRows] = useState([]);
    let [rowObjects, setRowObjects] = useState([]);
    let [buttonsPage, setButtonsPage] = useState([]);
    let [buttonsMaxPage, setButtonsMaxPage] = useState(0);
    let [currentPage, setCurrentPage] = useState("");
    let [numberElementsOnPage, setNumberElementsOnPage] = useState(0);
    let [test, setTest] = useState(true)
    let [isInitialize, setIsInitialize] = useState(false)

    useEffect(() => {
        if(!isInitialize) {
            Initialize();
        }
    })

    function Initialize() {
        SetProps();
        DividePageTableCathalog(rowObjects)
        if(rowObjects.length !== 0) {
            //setCurrentPage("1")
            setIsInitialize(true)
        }
    }

    function SetProps() {
        TestSetProps();
        if(props.columns !== undefined) {
            setColumns(props.columns)
        }
        if(props.rows !== undefined) {
            setRows(props.rows)
        }
        if(props.rowObjects !== undefined) {
            setRowObjects(props.rowObjects)
        }
        if(props.buttonsPage !== undefined) {
            setButtonsPage(props.buttonsPage)
        }
        if(props.buttonsMaxPage !== undefined) {
            setButtonsMaxPage(props.buttonsMaxPage)
        }
        if(props.currentPage !== undefined) {
            setCurrentPage(props.currentPage)
        }
        if(props.numberElementsOnPage !== undefined) {
            setNumberElementsOnPage(props.numberElementsOnPage)
        }
    }

    function TestSetProps() {
        if(test) {
            setColumns([
            ])
            setRows(["Минская", "Брянская", "Брестская",
                "Люблинская", "Варшавская", "Варшавская", "Варшавская",
                "Варшавская", "Варшавская", "Варшавская"])
            setRowObjects([
            ])
            setButtonsPage(["1", "2", "3", "...", "..."])
            setButtonsMaxPage(100)
            //setCurrentPage("1")
            setNumberElementsOnPage(props.numberElementsOnPage)
            setTest(false)
        }
    }

    function DividePageTableCathalog(rowObjects) {
        //let maxPage = Math.floor(rowObjects.length / numberElementsOnPage)+1
        /*if(rowObjects.length % numberElementsOnPage === 0) {
            maxPage--;
        }*/
        //setButtonsMaxPage(maxPage)
        setButtonsMaxPage(props.buttonsMaxPage)
        /*if(currentPage > maxPage) {
            setCurrentPage(props.currentPage)
        }*/
        setCurrentPage(props.currentPage)
        RecalculateButtonsPageTableCathalog(props.currentPage, props.buttonsMaxPage)
    }

    function RecalculateButtonsPageTableCathalog(page, buttonsMaxPage) {
        if(buttonsMaxPage > 5) {
            if(page === "1") {
                setButtonsPage(["1", "2", "3", "...", String(buttonsMaxPage)])
            }
            else {
                if(page === String(buttonsMaxPage) ||
                    page === String(buttonsMaxPage-1) ||
                    page === String(buttonsMaxPage-2) ||
                    page === String(buttonsMaxPage-3)) {
                    setButtonsPage([
                        String(buttonsMaxPage - 4),
                        String(buttonsMaxPage - 3),
                        String(buttonsMaxPage - 2),
                        String(buttonsMaxPage - 1),
                        String(buttonsMaxPage)
                    ])
                } else {
                    setButtonsPage([
                        String(Number(page)-1),
                        page,
                        String(Number(page)+1),
                        "...",
                        String(buttonsMaxPage)])
                }
            }
        } else {
            let stringMass = [];
            for(let i = 0; i < buttonsMaxPage; i++) {
                stringMass[i] = String(i+1);
            }
            setButtonsPage(stringMass)
        }
    }

    function TdBool(value) {
        if(value) {
            return (
                <td>
                    <p>Да</p>
                </td>
            )
        }
        else {
            return (
                <td>
                    <p>Нет</p>
                </td>
            )
        }
    }

    function TdDivideTextFromMass(mass) {
        const n = mass.length;

        let result = '';
        for(let i = 0; i < n-1; i++) {
            result += `${mass[i]}, `;
        }
        result += `${mass[n-1]}`;

        return (
            <td>
                {result}
            </td>
        )
    }

    function SumRoomsCount(mass) {
        let count = 0
        mass.map((value, index) => {
            count += value.roomsCount
        })
        return count
    }

    function SumCount(mass) {
        let count = 0
        mass.map((value, index) => {
            count += value.count
        })
        return count
    }

    function AddColumns(columns) {
        if(isInitialize) {
            return columns.map((value, index) => {
                return (
                    <th>
                        {value}
                    </th>
                )
            })
        } else {
            return (
                <></>
            )
        }

    }

    function AddRowsObjects(rowObjects) {
        if(isInitialize) {
            return rowObjects.map((value, index) => {
                return (
                    <tr>
                            <td>
                                {value.street}
                            </td>
                            {TdDivideTextFromMass(value.houseNumber)}
                            <td>
                                {value.houseFractionNumber}
                            </td>
                            <td>
                                {value.housing}
                            </td>
                            <td>
                                {value.character}
                            </td>
                            <td>
                                {value.district}
                            </td>
                            <td>
                                {SumRoomsCount(value.commune)}, {SumCount(value.commune)}
                            </td>
                            <td>
                                {SumRoomsCount(value.flat)}, {SumCount(value.flat)}
                            </td>
                            <td>
                                {value.series}
                            </td>
                            <td>
                                {value.yearBuild}
                            </td>
                            <td>
                                {value.yearReconstruct}
                            </td>
                            <td>
                                {value.areaHouse}
                            </td>
                            <td>
                                {value.areaLiving}
                            </td>
                            <td>
                                {value.areaFunctional}
                            </td>
                            <td>
                                {value.countLadder}
                            </td>
                            <td>
                                {value.countFloor}
                            </td>
                            <td>
                                {value.countLiving}
                            </td>
                            <td>
                                {value.areaAttic}
                            </td>
                            {TdBool(value.hasCentralHeating)}
                            {TdBool(value.hasAutonomousBoiler)}
                            {TdBool(value.hasFurnanceHeating)}
                            {TdBool(value.hasCentralHotWater)}
                            {TdBool(value.hasCentralHotWaterGas)}
                            {TdBool(value.hasCentralHotWaterWood)}
                            {TdBool(value.hasCentralElectricity)}
                            {TdBool(value.hasCentralGas)}
                            {TdBool(value.hasChute)}
                            <td>
                                {value.functionalCount}
                            </td>
                            <td>
                                {value.yearLiftBuild}
                            </td>
                            <td>
                                {value.yearLiftReconstruct}
                            </td>
                            <td>
                                {value.yearLiftUpgrade}
                            </td>
                            <td>
                                {value.areaCleaning}
                            </td>
                            <td>
                                {value.tapDate}
                            </td>
                            <td>
                                {value.mcName}
                            </td>
                            {TdBool(value.hasAccident)}
                            <td>
                                {value.capitalRepairDates}
                            </td>
                            {TdDivideTextFromMass(value.workTypes)}
                            <td>
                                {value.countChute}
                            </td>
                            <td>
                                {value.areaMetalRoof}
                            </td>
                            <td>
                                {value.countLift}
                            </td>
                            <td>
                                {value.countIntercom}
                            </td>
                            <td>
                                {value.areaBasement}
                            </td>
                        </tr>
                )
            })
        } else {
            return (
                <></>
            )
        }

    }

    function AddButtonsPage(buttonsPage, currentPage) {
        if(isInitialize) {
            return buttonsPage.map((value, index) => {
                if(currentPage === value) {
                    return (
                        <ButtonPageTableCatalog number={value} clicked={true}/>
                    )
                }
                else {
                    return (
                        <ButtonPageTableCatalog number={value} clicked={false} Handler={()=>{
                            if(value === "...") {
                                let nextPage = String(Number(currentPage)+2)
                                //RecalculateButtonsPageTableCathalog(nextPage, buttonsMaxPage)
                                //setCurrentPage(nextPage)
                                props.Handler(nextPage)

                            } else {
                                //RecalculateButtonsPageTableCathalog(value, buttonsMaxPage)
                                //setCurrentPage(value)
                                props.Handler(value)
                            }
                        }}/>
                    )
                }
            })
        } else {
            return (
                <></>
            )
        }
    }

    return (
        <div>
            <table className="table-1">
                <thead>
                    <tr>
                        {AddColumns(columns)}
                    </tr>
                </thead>
                <tbody>
                    {AddRowsObjects(rowObjects)}
                </tbody>
            </table>
            <div className="panel-pages">
                {AddButtonsPage(buttonsPage, currentPage)}
            </div>
        </div>
    );
};

TableCathalog.propTypes = {
    columns: PropTypes.array,
    rows:PropTypes.array,
    rowObjects: PropTypes.array,
    buttonsPage:PropTypes.array,
    buttonsMaxPage: PropTypes.number,
    currentPage: PropTypes.string,
    numberElementsOnPage: PropTypes.number,
    Handler: PropTypes.func
}

export default TableCathalog;
