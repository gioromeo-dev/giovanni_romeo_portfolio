import "../assets/styles/Main.css"
import TextType from "./TextType";

function Main(props: any) {

  const {jsonData, mainref, language} = props

  return (
    <>
  <div id="top"></div>

    <div ref={mainref}className="section main watch">
      <div className="main-name">
        {language === "en" && <TextType text={jsonData.title}/>}
        {language === "it" && <TextType text={jsonData.title}/>}
      </div>
      <div className="main-img watch fade-in">
        <img src="images/MemojiHi.svg" alt="img" />
      </div>
    </div>

    </>
  )
}


export default Main;
