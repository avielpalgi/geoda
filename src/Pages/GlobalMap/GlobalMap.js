import React, { useRef, useEffect } from "react";
import { loadModules } from "esri-loader";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";

const GlobalMap = () => {
  const mapDiv = useRef(null);

  useEffect(() => {
    // Load the ArcGIS modules asynchronously
    loadModules(["esri/Map", "esri/views/MapView"], { css: true })
      .then(([Map, MapView]) => {
        const measureThisAction = {
          title: "Measure distance",
          id: "measure-this",
          image:
            "https://developers.arcgis.com/javascript/latest//sample-code/popup-actions/live/Measure_Distance16.png",
        };

        const template = {
          // autocasts as new PopupTemplate()
          title: "{name}",
          content: "{population}",
          actions: [measureThisAction],
        };

        function populationChange(feature) {
          const cityName = feature.graphic.attributes.CITY_NAME;
          const population = feature.graphic.attributes.POP;
          //dislpay the population in millions or thousands with , seperator
          const beutifulPopulation = displayBeutyNumber(population);
          //display in the pop up the name of the city and the population
          return `The population of ${cityName} is ${beutifulPopulation} people`;
        }

        const layer = new FeatureLayer({
          // URL to the service
          url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Cities/FeatureServer/0",
        });
        const map = new Map({
          basemap: "streets",
          //add feature later
          layers: [layer],
        });
        const view = new MapView({
          container: mapDiv.current,
          map: map,
          center: [35.0818155, 31.4117257],
          zoom: 8,
        });

        const popupTemplate = {
          // autocasts as new PopupTemplate()
          title: "",
          outFields: ["*"],
          content: populationChange,
        };

        layer.popupTemplate = popupTemplate;
      })
      .catch((error) => {
        console.error("Error loading ArcGIS modules:", error);
      });
  }, []);

  const displayBeutyNumber=(number)=>{
    //dislpay the population in millions or thousands with , seperator
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return <div ref={mapDiv} style={{ width: "100%", height: "100vh" }} />;
};

export default GlobalMap;
