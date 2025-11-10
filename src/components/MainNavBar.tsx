import "../assets/styles/MainNavBar.css"

function MainNavBar(props: any) {
  const {jsonData, language, setLanguage} = props


  function handleClick() {
    setLanguage(props.language === "en" ? "it" : "en")
  }


  return (
    <div className="menu-bar">
        <nav className="menu">
          <img className="logo" src="images/logo_white.png" alt="logo" />
          <div className="menu-btn">
              <button className="menu-button">{jsonData.navbar.buttonHome}</button>
          </div>
          <div className="menu-btn">
              <button className="menu-button">{jsonData.navbar.buttonDescription}</button>
          </div>
          <div className="menu-btn">
              <button className="menu-button">{jsonData.navbar.buttonProjects}</button>
          </div>
          <div className="menu-btn">
              <button className="menu-button">{jsonData.navbar.buttonAbout}</button>
          </div>
        <div className="menu-btn">
            <button className="contact-button">{jsonData.navbar.buttonContact}</button>
        </div>
          {language === "en" && <img className="flag" src="images/italy_flag.svg" alt="it" onClick={handleClick}/>}
          {language === "it" && <img className="flag" src="images/uk_flag.svg" alt="uk" onClick={handleClick}/>}
      </nav>
    </div>
  )
}


export default MainNavBar;
