import React, {useState} from 'react'
import '../../../../styles/Common/ButtonFilter/ButtonFilter.css'
import PropTypes from "prop-types";
import ModalFilter from './ModalFilter/ModalFilter'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faFilter } from '@fortawesome/free-solid-svg-icons'

function ButtonFilter(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function OnClick(columns, Handler) {
        handleShow()
    }

    function Hide() {
        handleClose()
    }

    function OnClickSubmit(filter) {
        props.Handler(filter)
        handleClose()
    }

    return (
        <>
            <ModalFilter
                showFunc={show}
                onHide={()=>{Hide()}}
                columns={props.columns}
                onClickSubmit={OnClickSubmit}
                columnsEng={props.columnsEng}
            />
            <div className="mainFilter">
                <div className="rectangle-40" onClick={()=>{OnClick(props.columns, props.Handler)}}>
                    <span className="textFilter">{"Фильтры"}</span>
                </div>
                <FontAwesomeIcon icon={faFilter} className="fa fa-filter" />
            </div>
        </>
    );

};

ButtonFilter.propTypes = {
    Handler: PropTypes.func,
    columns: PropTypes.array,
    columnsEng: PropTypes.array
}

export default ButtonFilter;
