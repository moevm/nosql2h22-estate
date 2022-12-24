import React, {useEffect, useState, useReducer} from 'react'
import '../../../styles/HouseProfile/HouseProfileComponent.css'
import PropTypes from "prop-types";
import {col_names, col_names_eng} from '../Common/data_info.js'
import {Map, Placemark, YMaps} from "react-yandex-maps";



function HouseProfileComponent(props) {
    let [isInitialize, setIsInitialize] = useState(false);
    let [object, setObject] = useState({})

    const [currentAddress, setCurrentAddress] = useState('')
    const [coords, setCoords] = useState({coordinates: [59.942436, 30.342032]})
    const [isNewCoord, setIsNewCoord] = useState(false)



    const ChangeAddress = (value) => {
        setCurrentAddress('Санкт-Петербург, ' +
            value.street +
            ', ' +
            value.houseNumber[0] +
            '/' +
            value.houseFractionNumber +
            ', ' +
            value.character +
            ', ' +
            value.district +
            ' район')
        setIsNewCoord(true)
    }

    useEffect(() => {
        if(isNewCoord){
            geocode()
            setIsNewCoord(false)
        }
    }, [isNewCoord]);

    useEffect(()=>{
        if(Object.keys(object).length !== 0) {
            //console.log(JSON.stringify(object))
            ChangeAddress(object)
        }
    }, [object])

    const geocode = () => {
        let url = new URL('https://geocode-maps.yandex.ru/1.x/')
        url.searchParams.append("apikey", "368ea89a-29e6-4b8a-881f-b59a7bab8369")
        url.searchParams.append("geocode", currentAddress)
        url.searchParams.append("format", "json")
        fetch(url)
            .then(res => res.json())
            .then( (res) => {
                let coordArr = res.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(" ")
                setCoords({coordinates: [parseFloat(coordArr[1]), parseFloat(coordArr[0])]})
            })
    }

    const getObjectById = () => {
        let url = new URL('http://127.0.0.1:1337/houses/'+props.id)
        fetch(url)
            .then(res => res.json())
            .then( ( res ) => {
                console.log(res.message)
                setObject(res.message)
                setIsInitialize(true)
            });
    };

    function getMark(geometry){
        return <Placemark geometry={geometry} options={{
            preset: 'islands#circleIcon',
            iconColor: 'green',
        }}
        />
    }

    useEffect(()=>{
        if(!isInitialize){
            getObjectById()
        }
    }, [isInitialize])


    function FindEngField(rusField) {
        let engField = ""
        for(let i = 0; i < col_names.length; i++) {
            if(col_names[i] === rusField) {
                engField = col_names_eng[i]
                break;
            }
        }
        return engField
    }

    function DivideTextFromMass(mass) {
        const n = mass.length;

        let result = '';
        for(let i = 0; i < n-1; i++) {
            result += `${mass[i]}, `;
        }
        result += `${mass[n-1]}`;

        return result
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

    function DisplayAttribute(nameAttribute, valueAttribute, id) {
        //console.log(nameAttribute, valueAttribute)    
        if (nameAttribute === 'Номер дома' || nameAttribute === 'Коммунальные квартиры' || 
            nameAttribute === 'Квартиры' || nameAttribute === 'Год проведения кап. ремонта' ||
            nameAttribute === 'Виды работ'){
            if (nameAttribute === 'Номер дома' || nameAttribute === 'Год проведения кап. ремонта'){
                return (
                    <div id={id} className={"fieldAttributeHouse"}>
                        <p className={"paragraph-250"}>{nameAttribute}</p>
                        <div className={"rectangle-280"}>{valueAttribute.toString()}</div>
                    </div>
                )
            }else if (nameAttribute === 'Виды работ'){
                return (
                    <div id={id} className={"fieldAttributeHouse"}>
                        <p className={"paragraph-250"}>{nameAttribute}</p>
                        <div className={"rectangle-280"}>{valueAttribute.join(';')}</div>
                    </div>
                )
            }else{
                if(valueAttribute.length === 0){
                    return (
                        <div id={id} className={"fieldAttributeHouse"}>
                            <p className={"paragraph-250"}>{nameAttribute}</p>
                            <div className={"rectangle-280"}>{'-'}</div>
                        </div>
                    )
                }else{
                    let res = []
                    for(let i = 0; i < valueAttribute.length; i++){
                        res.push(valueAttribute[i].roomsCount + '-комнатные - ' + valueAttribute[i].count + 'шт.')
                    }
                    return (
                        <div id={id} className={"fieldAttributeHouse"}>
                            <p className={"paragraph-250"}>{nameAttribute}</p>
                            <div className={"rectangle-280"}>{res.join(';')}</div>
                        </div>
                    )
                }
            }
        }else{
            if(!valueAttribute){
                return (
                    <div id={id} className={"fieldAttributeHouse"}>
                        <p className={"paragraph-250"}>{nameAttribute}</p>
                        <div className={"rectangle-280"}>{'-'}</div>
                    </div>
                )
            }else{
                if(nameAttribute === 'Автономная котельная' || nameAttribute === 'Печное отопление' || 
                nameAttribute === 'Центральное горячее водоснабжение' || nameAttribute === 'Горячее водоснабжение от газ. колонок' ||
                nameAttribute === 'Горячее водоснабжение от дров. колонок' || nameAttribute === 'Центральное электроснабжение' ||
                nameAttribute === 'Центральное газоснабжение' || nameAttribute === 'Мусоропроводы' || nameAttribute === 'Аварийность'
                ){
                    return (
                        <div id={id} className={"fieldAttributeHouse"}>
                            <p className={"paragraph-250"}>{nameAttribute}</p>
                            <div className={"rectangle-280"}>{'Есть'}</div>
                        </div>
                    )
                }else{
                    return (
                        <div id={id} className={"fieldAttributeHouse"}>
                            <p className={"paragraph-250"}>{nameAttribute}</p>
                            <div className={"rectangle-280"}>{valueAttribute}</div>
                        </div>
                    )
                }
            }
        }

            /*
            if(!valueAttribute || valueAttribute?.length === 0){
                return (
                    <div id={id} className={"fieldAttributeHouse"}>
                        <p className={"paragraph-250"}>{nameAttribute}</p>
                        <div className={"rectangle-280"}>{'-'}</div>
                    </div>
                )
            }else{
                if(typeof valueAttribute === 'Number'){
                    
                }else{
                    return (
                        <div id={id} className={"fieldAttributeHouse"}>
                            <p className={"paragraph-250"}>{nameAttribute}</p>
                            <div className={"rectangle-280"}>{valueAttribute.toString()}</div>
                        </div>
                    )
                }
            }
            */
    }

    function DisplayAttributes() {
        //console.log('object = ', object)
        if(Object.keys(object).length !== 0) {
            return col_names.map((value, index) => {
                return (
                    <>
                        {
                            DisplayAttribute(value, object[FindEngField(value)], index)
                        }
                    </>
                )
            })
        } else {
            return (
                <></>
            )
        }
    }

    function DisplayMap() {
        return (
            <div className={"fieldMap"}>
                <YMaps query={{ns: "use-load-option", apikey: "368ea89a-29e6-4b8a-881f-b59a7bab8369"}}>
                    <Map defaultState={{ center: coords.coordinates, zoom: 15 }}  style={{height: "inherit", width: "inherit"}}
                    >
                        {getMark(coords.coordinates)}
                    </Map>
                </YMaps>
            </div>
        )
    }

    return (
        <div>
            <div className={"rectangle-260"}>
                {DisplayMap()}
                <div className={"fieldAttributes"}>
                    {DisplayAttributes()}
                </div>
            </div>
        </div>
    )

}


HouseProfileComponent.propTypes = {
    id: PropTypes.string
}

export default HouseProfileComponent;
