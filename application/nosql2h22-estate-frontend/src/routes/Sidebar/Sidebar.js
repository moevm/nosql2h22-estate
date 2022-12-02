import React from 'react'
import {
  Link,
  useLocation
} from "react-router-dom";
//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons'
import { faPieChart } from '@fortawesome/free-solid-svg-icons'
import { faBarChart } from '@fortawesome/free-solid-svg-icons'
import { faAt } from '@fortawesome/free-solid-svg-icons'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { faUpload } from '@fortawesome/free-solid-svg-icons'

//styles
import './../../styles/Sidebar.css'


function importDS() {
  console.log('import')
}

function exportDS() {
  console.log('export')
}

function SidebarItem(text, link, icon) {
  const params = useLocation();
  const url = params.pathname;

  if (url === link){
    return (
      <div className="item-active">
        <span className="icon-active">
          <FontAwesomeIcon icon={icon} />
        </span>
        <span className="item-text-active">
          { text }
        </span>  
      </div>
    )
  }else{
    return (
      <div className="item">
        <span className="icon">
          <FontAwesomeIcon icon={icon} />
        </span>
        <span className="item-text">
          { text }
        </span>  
      </div>
    )
  }
}


const Sidebar = () => {
  return (
    <div>

      <div className="header-item">
        <span className="at-sign-icon">
          <FontAwesomeIcon icon={faAt} />
        </span>
        <span className="header-text">
          Каталог жилья
        </span>
      </div>

      <Link to="/" style={{ textDecoration: 'none' }}>
        { SidebarItem('Каталог', '/', faShoppingBasket) }
      </Link>

      <Link to="/map" style={{ textDecoration: 'none' }}>
        { SidebarItem('Карта', '/map', faPieChart) }
      </Link>

      <Link to="/stat" style={{ textDecoration: 'none' }}>
        { SidebarItem('Статистика', '/stat', faBarChart) }
      </Link>

      <div className="div-line"></div>

      <div className="button-item">
        <button className="button" onClick={importDS}>
          <FontAwesomeIcon icon={faUpload} />{' '}
          Импорт НД
        </button>     
      </div>

      <div className="button-item">
        <button className="button" onClick={exportDS}>
          <FontAwesomeIcon icon={faDownload} />{' '}
          Экспорт НД
        </button>   
      </div>

    </div>
  );

};

export default Sidebar;