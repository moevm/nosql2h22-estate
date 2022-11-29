import React, {useState} from 'react'
import PropTypes from "prop-types";
import {Modal} from "react-bootstrap";
import {Button} from "react-bootstrap";
import '../../../../../../styles/Cathalog/ButtonsCathalog/ModalFilterCathalog.css'


function ModalFilterCathalog(props) {
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

    function Input(e, value) {
        let tmp = filter;
        tmp[FindEngField(value)] = e.target.value
        setFilter(tmp)
    }

    function CustomModalInput(value) {
        return (
            <textarea className="form-control" id="message-text" onChange={(e)=>{Input(e, value)}}/>
        )
    }

    function CustomModalOptionName(value) {
        return (
            <th>{value}</th>
        )
    }

    function CustomModalOptions() {
        return props.columns.map((value, index) => {
            return (
                <div>
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
                <Button className="ModalButton" variant="secondary" onClick={()=>{OnClickSubmit()}}>
                    Применить
                </Button>
            </Modal.Footer>
        </Modal>
    )

}

ModalFilterCathalog.propTypes = {
    Handler: PropTypes.func,
    columns: PropTypes.array,
    columnsEng: PropTypes.array,


    showFunc: PropTypes.bool,
    onHide: PropTypes.func,
    onClickSubmit: PropTypes.func
}

export default ModalFilterCathalog;
