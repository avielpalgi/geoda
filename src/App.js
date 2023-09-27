import "./App.css";
import GlobalMap from "./Pages/GlobalMap/GlobalMap.js";
import esriConfig from "@arcgis/core/config.js";
import WebMap from "./Pages/WebMap/WebMap";
esriConfig.assetsPath = "./assets";

function App() {
  return (
    <div className="App">
      <GlobalMap />
      {/* <WebMap /> */}
    </div>
  );
}

export default App;
