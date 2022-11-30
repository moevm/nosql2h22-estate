
import '../../../../styles/Cathalog/TableCathalog/ButtonPageTableCathalog.css'
import PropTypes from "prop-types";


function ButtonPageTableCathalog(props) {
    if(props.clicked) {
        return (
            <div className="mainPageTableCathalog">
                <button className="clickedRectangle-41">
                    {props.number}
                </button>
            </div>
        )
    }
    else {
        return (
            <div className="mainPageTableCathalog">
                <button className="rectangle-41" onClick={props.Handler}>
                    {props.number}
                </button>
            </div>
        )
    }

}

ButtonPageTableCathalog.propTypes = {
    number: PropTypes.string,
    clicked: PropTypes.bool,
    Handler: PropTypes.func
}

export default ButtonPageTableCathalog;
