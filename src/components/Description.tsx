import "../assets/styles/Description.css";
import Iridescence from "./Iridescence";

function Description(props: any) {

  const {jsonData} = props

  return (
    <>
      <div
        style={{
          top: "0",
          left: "0",
          width: "100vw",
          height: "100vh",
          position: "fixed",
        }}
      >
        <Iridescence
          color={[0.5, 0.5, 0.5]}
          mouseReact={false}
          amplitude={0.1}
          speed={1.0}
        />
      </div>
      <div className="section background-gradient ">
        <div id="corner"></div>
        <div className="description glass watch fade-in">
          <div className="t">
            <p>{jsonData.description.title}</p>
          </div>
          <div className="d">
            <p>{jsonData.description.body}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Description;
