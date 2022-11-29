import React, {useState} from 'react'
import '../../../../../styles/Cathalog/ButtonsCathalog/ButtonFilterCathalog.css'
import PropTypes from "prop-types";
import ModalFilterCathalog from './ModalFilterCathalog/ModalFilterCathalog'

function ButtonFilterCathalog(props) {
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
            <ModalFilterCathalog
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
                <i className="fa fa-filter" aria-hidden="true"/>
            </div>
        </>
    );

};

ButtonFilterCathalog.propTypes = {
    Handler: PropTypes.func,
    columns: PropTypes.array,
    columnsEng: PropTypes.array
}

export default ButtonFilterCathalog;
