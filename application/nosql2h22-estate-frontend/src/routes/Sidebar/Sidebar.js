import React from 'react'
import {
  Link,
  useLocation
} from "react-router-dom";
import PropTypes from 'prop-types'

//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons'
import { faPieChart } from '@fortawesome/free-solid-svg-icons'
import { faBarChart } from '@fortawesome/free-solid-svg-icons'
import { faAt } from '@fortawesome/free-solid-svg-icons'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'

//styles
import './../../styles/Sidebar.css'


function importDS(e) {

  let token = localStorage.getItem('token')
  console.log('import token = ', token)

  if(token === null){
    console.log('Incorrect token!')
    return;
  }else{

    const formData = new FormData()
    formData.append('db', e.target.files[0])
    formData.append('token', token)

    fetch('http://127.0.0.1:1337/houses/csv', {
      method: 'POST',
      body: formData
    })
      .then(res => console.log(res))
  }    
}

function exportDS() {
  console.log('export')

  fetch('http://127.0.0.1:1337/houses/download')
    .then((response) => response.blob())
    .then( (blob) => {
      const url = window.URL.createObjectURL(
        new Blob([blob]),
      );
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `db.json`,
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    })
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

const Sidebar = (props) => {

  const exit = (e) => {
    console.log('exit')
    e()
  }

  const SidebarExitButton = () => {
    if (props.isAuthorized === 'true'){
      return (
        <div className="exit-button-item">
          <button className="button" onClick={() => exit(props.handleAdminExit)}>
            <FontAwesomeIcon icon={faSignOut} />{' '}
            Выход
          </button>   
        </div>
      )  
    }else{
      return <div></div>
    }
  }

  const SidebarImportExport = () => {
      if (props.isAuthorized === 'true') {
          return (
              <>

                  <div className="div-line"></div>

                  <div className="button-item">
                      <button className="button">
                          <label htmlFor='import-ds-input' className="import-label">
                              <FontAwesomeIcon icon={faUpload} />{' '}
                              Импорт НД
                          </label>
                          <input type="file" id="import-ds-input" className="import-input" onChange={(e)=>importDS(e, props.token)}/>
                      </button>
                  </div>

                  <div className="button-item">
                      <button className="button" onClick={() => exportDS()}>
                          <FontAwesomeIcon icon={faDownload} />{' '}
                          Экспорт НД
                      </button>
                  </div>
              </>
          )
      } else {
          return (
              <></>
          )
      }
  }

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



      {SidebarImportExport()}


      {SidebarExitButton()}

    </div>
  );

};

Sidebar.propTypes = {
  handleAdminExit: PropTypes.func,
  isAuthorized: PropTypes.string
}

export default Sidebar;