import { useEffect, useRef, useState } from "react";
import "./App.css";
import Tobe from "./components/Tobe";
import Main from "./components/Main";
import PopUpBar from "./components/PopUpNavBar";
import MainBar from "./components/MainNavBar";
import Description from "./components/Description";
import { useInView } from "motion/react";
import Carousel from "./components/Carousel";

import Iridescence from "./components/Iridescence";
import { GetData, JsonData } from "./assets/scripts/getData";

function App() {
  const [tobe] = useState(false);
  const [language, setLanguage] = useState("en");
  const mainref = useRef<HTMLElement | null>(null);
  const mainInView = useInView(mainref, { margin: "-50px" });

  const [jsonData, setJsonData] = useState <JsonData>();

  
  if(jsonData == null){
    var response  = GetData(language);
    if (response != null) setJsonData(response);
  }

  useEffect(() =>{
    var response  = GetData(language);
    if (response != null) setJsonData(response);
  }, [language])

  useEffect(() => {
    inPage();
  });

  function inPage() {
    var elements_to_watch = document.querySelectorAll(".watch");
    var callback = function (items: any[]) {
      items.forEach((item) => {
        if (item.isIntersecting) {
          item.target.classList.add("in-page");
        }
      });
    };
    var observer = new IntersectionObserver(callback, { threshold: 0.5 });
    elements_to_watch.forEach((element) => {
      observer.observe(element);
    });
  }

  return (
    <>
    
      {tobe && <Tobe />}
      {!tobe && (
        <div
          style={{ top: "0", left: "0", position: "absolute", width: "100vw" }}
        >

          <MainBar jsonData={jsonData} language={language} setLanguage={setLanguage} />
          {!mainInView && (
            <PopUpBar jsonData={jsonData} language={language} setLanguage={setLanguage} />
          )}
          <Main jsonData={jsonData} mainref={mainref} language={language} />
          <Description jsonData={jsonData} language={language} />
          {/* <Carousel /> */}
        </div>
      )}
    </>
  );
}

export default App;
