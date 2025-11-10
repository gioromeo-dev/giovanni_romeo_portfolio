import "../assets/styles/PopUpNavBar.css"

function PopUpNavBar(props: any) {

    const {jsonData, language, setLanguage} = props

  function handleClick() {
    setLanguage(props.language === "en" ? "it" : "en")
  }


  return (
    <div className="pop-menu-bar up-in">
        <nav className="pop-menu glass">
          <img className="pop-logo" src="images/logo_white.png" alt="logo" />
          <div className="pop-flex">

          <div className="pop-menu-btn">
              <button className="menu-button">{jsonData.navbar.buttonHome}</button>
          </div>
          <div className="pop-menu-btn">
              <button className="menu-button">{jsonData.navbar.buttonDescription}</button>
          </div>
          <div className="pop-menu-btn">
              <button className="menu-button">{jsonData.navbar.buttonProjects}</button>
          </div>
          <div className="pop-menu-btn">
              <button className="menu-button">{jsonData.navbar.buttonAbout}</button>
          </div>
        <div className="pop-menu-btn">
            <button className="contact-button">{jsonData.navbar.buttonContact}</button>
        </div>
          </div>
          {language === "en" && <img className="pop-flag" src="images/italy_flag.svg" alt="it" onClick={handleClick}/>}
          {language === "it" && <img className="pop-flag" src="images/uk_flag.svg" alt="uk" onClick={handleClick}/>}
      </nav>
    </div>
  )
}


export default PopUpNavBar;
