import React, {useState} from 'react'
import '../../../../styles/Cathalog/ButtonsCathalog/ButtonSearchCathalog.css'
import PropTypes from "prop-types";

function ButtonSearchCathalog(props) {

    let [textDynamicSearch, setTextDynamicSearch] = useState("");

    function Input(e) {
        setTextDynamicSearch(e.target.value)
        props.Handler(e.target.value)
    }

    function DisplayDynamicSearch() {
        return (
                <input className="textDynamicSearch"
                       value={textDynamicSearch}
                       onChange={(e) => {
                           Input(e)
                       }}
                >
                </input>
        )
    }

    function DisplayStaticSearch() {
        if(textDynamicSearch === "") {
            return (
                <>
                    <p className='textStaticSearch'>Search</p>
                </>
            )
        } else {
            return (
                <></>
            )
        }
    }

    return (
        <div className="mainSearch">
            <div className="rectangle-8">
                {DisplayDynamicSearch()}
                <i className='fa-solid fa-magnifying-glass'/>
                {DisplayStaticSearch()}
            </div>
        </div>
    );

};

ButtonSearchCathalog.propTypes = {
    Handler: PropTypes.func
}

export default ButtonSearchCathalog;
