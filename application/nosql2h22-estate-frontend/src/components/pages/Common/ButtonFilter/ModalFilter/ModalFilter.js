import React, {useState} from 'react'
import PropTypes from "prop-types";
import {Modal} from "react-bootstrap";
import {Button} from "react-bootstrap";
import '../../../../../styles/Common/ButtonFilter/ModalFilter.css'


function ModalFilter(props) {
    let [filter, setFilter] = useState({})


    function FindEngField(rusField) {
        let engField = ""
        for(let i = 0; i < props.columns.length; i++) {
            if(props.columns[i] === rusField) {
                engField = props.columnsEng[i]
            }
        }
        return engField
    }

    function OnClickSubmit() {
        props.onClickSubmit(filter)
    }

    function OnClickCancel() {
        props.onClickSubmit({})
    }

    function Input(e, value) {
        let tmp = filter;
        tmp[FindEngField(value)] = e.target.value
        setFilter(tmp)
    }

    function CustomModalInput(value) {
        return (
            <input className="authorization-card-form-modal-input" id="message-text" onChange={(e)=>{Input(e, value)}}/>
        )
    }

    function CustomModalOptionName(value) {
        return (
            <table>
                <thead>
                    <tr>
                        <th>{value}</th>
                    </tr>
                </thead>
            </table>    
        )
    }

    function CustomModalOptions() {
        return props.columns.map((value, index) => {
            return (
                <div key={index}>
                    {CustomModalOptionName(value)}
                    {CustomModalInput(value)}
                    <div className={"ModalOffset"}/>
                </div>
            )
        })

    }


    return (
        <Modal className="Modal" show={props.showFunc} onHide={props.onHide}  aria-labelledby="contained-modal-title-center" size='lg'
               centered>
            <Modal.Header closeButton>
                <Modal.Title>Фильтрация домов по параметрам</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={"ModalContent"}>
                    {CustomModalOptions()}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className={"authorization-card-form-modal"}>
                    <button className="authorization-card-form-modal-button" type="submit" onClick={()=>{OnClickCancel()}}>
                        <span className="authorization-card-form-button-text">
                          Сбросить фильтры
                        </span>
                    </button>
                    <button className="authorization-card-form-modal-button" type="submit" onClick={()=>{OnClickSubmit()}}>
                        <span className="authorization-card-form-modal-button-text">
                          Применить
                        </span>
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
    )

}

ModalFilter.propTypes = {
    Handler: PropTypes.func,
    columns: PropTypes.array,
    columnsEng: PropTypes.array,


    showFunc: PropTypes.bool,
    onHide: PropTypes.func,
    onClickSubmit: PropTypes.func
}

export default ModalFilter;
