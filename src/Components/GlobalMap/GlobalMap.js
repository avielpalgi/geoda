import React, { useRef, useEffect } from "react";
import { loadModules } from "esri-loader";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import MapView from "@arcgis/core/views/MapView.js";
import Map from "@arcgis/core/Map.js";
import "./GlobalMap.scss";
const GlobalMap = () => {
  const mapDiv = useRef(null);

  const populationChange = (feature) => {
    const cityName = feature.graphic.attributes.CITY_NAME;
    const population = feature.graphic.attributes.POP;
    const beutifulPopulation = displayBeutyNumber(population);
    return dislpayBeutyContent(cityName, beutifulPopulation);
  };

  const dislpayBeutyContent = (name, beutifulPopulation) => {
    return `<div class="pop-up">The population of <b>${name}</b> is <b>${beutifulPopulation}</b> people</div>`;
  };

  //dislpay the population in millions or thousands with , seperator
  const displayBeutyNumber = (number) => {
    //
    return number;
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // useEffect(() => {
  //   // Load the ArcGIS modules asynchronously
  //   loadModules(["esri/Map", "esri/views/MapView"], { css: true })
  //     .then(([]) => {
  //       const layer = new FeatureLayer({
  //         url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Cities/FeatureServer/0",
  //       });
  //       const map = new Map({
  //         basemap: "streets",
  //         layers: [layer],
  //       });
  //       const view = new MapView({
  //         container: mapDiv.current,
  //         map: map,
  //         center: [35.0818155, 31.4117257],
  //         zoom: 8,
  //       });

  //       const popupTemplate = {
  //         title: "",
  //         outFields: ["*"],
  //         content: populationChange,
  //       };

  //       layer.popupTemplate = popupTemplate;
  //     })
  //     .catch((error) => {
  //       console.error("Error loading ArcGIS modules:", error);
  //     });
  // }, []);

  useEffect(() => {
    const popupTemplate = {
      title: "",
      outFields: ["*"],
      content: populationChange,
    };
    const layer = new FeatureLayer({
      url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Cities/FeatureServer/0",
      popupTemplate : popupTemplate,
      definitionExpression: "Status = 'National and provincial capital'", // Define the filter expression here
    });
    const map = new Map({
      basemap: "streets",
      layers: [layer],

    });
    const view = new MapView({
      container: mapDiv.current,
      map: map,
      center: [35.0818155, 31.4117257],
      zoom: 8,
    });
  }, []);

  return <div ref={mapDiv} style={{ width: "100%", height: "100vh" }} />;
};

export default GlobalMap;
