import React, {useEffect, useState} from 'react';
import Map from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView"
import Graphic from "@arcgis/core/Graphic"
import Expand from "@arcgis/core/widgets/Expand"
import Legend from "@arcgis/core/widgets/Legend"
import 'bootstrap/dist/css/bootstrap.min.css'
import "../styles/Wireframe.css";
import { getAverageNitrogen, getAveragePhosphorus, getNationalStandard } from "../services/fakeWaterQualityService";

export default function Wireframe() {

  const [averageNitrogen, setAverageNitrogen] = useState([]);
  const [averagePhosphorus, setAveragePhosphorus] = useState([]);
  const [nationalStandard, setNationalStandard] = useState([]);

  const getData =  () => {
    setAverageNitrogen(getAverageNitrogen());
    setAveragePhosphorus(getAveragePhosphorus());
    setNationalStandard(getNationalStandard());
  }

  useEffect(() => {
    getData();
    setupWebMap();
  }, []);

  const setupWebMap = () => {

    const map = new Map({
      basemap: "gray-vector",
      portalItem: {
        id: 'c3337bfc8f964688856b36a4651b66cf'
      }
    });

    const view = new MapView({
      container: "mapView",
      map: map,
      center: [176.7598, -41.6899],
      zoom: 4,
      highlightOptions: {
        // color: "orange"
      }
    });

    view.popup.autoOpenEnabled = false;  // Disable the default popup behavior
    view.on("click", function(event) { // Listen for the click event
      view.hitTest(event.screenPoint).then(function (response){ // Search for features where the user clicked
        var graphic = response.results[0].graphic.attributes;
        if(graphic && graphic.OBJECTID !== undefined) {
          view.popup.open({ // open a popup to show some of the results
            location: event.mapPoint,
            title: "Site:"+ graphic.OBJECTID
          });
        }else{
          view.popup.close();
        }
      })
    });

    // Adds widget below other elements in the top right corner of the view
    view.ui.add("stateOfWaterQuality", {
      position: "top-right"
    });

    // Create a symbol for drawing the point
    const markerSymbol = {
      type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
      color: "#E51354",
      size: 7,
      outline: null
    };

    const point1 = {
      type: "point", // autocasts as new Point()
      longitude: 168.525547,
      latitude: -46.529167
    };

    // Create a graphic and add the geometry and symbol to it
    const pointGraphic1 = new Graphic({
      geometry: point1,
      symbol: markerSymbol
    });

    const point2 = {
      type: "point",
      longitude: 169.3165,
      latitude: -46.14612
    };
      
    const pointGraphic2 = new Graphic({
      geometry: point2,
      symbol: markerSymbol
    });

    const point3 = {
      type: "point",
      longitude: 168.7397,
      latitude: -45.87142
    };
      
    const pointGraphic3 = new Graphic({
      geometry: point3,
      symbol: markerSymbol
    });

    const point4 = {
      type: "point",
      longitude: 169.355,
      latitude: -45.8369
    };
      
    const pointGraphic4 = new Graphic({
      geometry: point4,
      symbol: markerSymbol
    });

    const point5 = {
      type: "point",
      longitude: 172.07,
      latitude: -43.44
    };
      
    const pointGraphic5 = new Graphic({
      geometry: point5,
      symbol: markerSymbol
    });

    const point6 = {
      type: "point",
      longitude: 172.711,
      latitude: -42.88
    };
      
    const pointGraphic6 = new Graphic({
      geometry: point6,
      symbol: markerSymbol
    });

    const point7 = {
      type: "point",
      longitude: 172.76,
      latitude: -40.84
    };
      
    const pointGraphic7 = new Graphic({
      geometry: point7,
      symbol: markerSymbol
    });

    const point8 = {
      type: "point",
      longitude: 175.2338,
      latitude: -40.6897
    };
      
    const pointGraphic8 = new Graphic({
      geometry: point8,
      symbol: markerSymbol
    });

    const point9 = {
      type: "point",
      longitude: 175.793,
      latitude: -40.4
    };
      
    const pointGraphic9 = new Graphic({
      geometry: point9,
      symbol: markerSymbol
    });

    const point10 = {
      type: "point",
      longitude: 176.309,
      latitude: -39.935
    };
      
    const pointGraphic10 = new Graphic({
      geometry: point10,
      symbol: markerSymbol
    });

    const point11 = {
      type: "point",
      longitude: 176.985,
      latitude: -39.122
    };
      
    const pointGraphic11 = new Graphic({
      geometry: point11,
      symbol: markerSymbol
    });

    const point12 = {
      type: "point",
      longitude: 175.37,
      latitude: -38.953
    };
      
    const pointGraphic12 = new Graphic({
      geometry: point12,
      symbol: markerSymbol
    });

    const point13 = {
      type: "point",
      longitude: 176.35,
      latitude: -38.53
    };
      
    const pointGraphic13 = new Graphic({
      geometry: point13,
      symbol: markerSymbol
    });

    const point14 = {
      type: "point",
      longitude: 175.8,
      latitude: -37.968
    };
      
    const pointGraphic14 = new Graphic({
      geometry: point14,
      symbol: markerSymbol
    });

    const point15 = {
      type: "point", 
      longitude: 176.029,
      latitude: -37.56
    };
      
    const pointGraphic15 = new Graphic({
      geometry: point15,
      symbol: markerSymbol
    });

    const point16 = {
      type: "point", 
      longitude: 175.644,
      latitude: -37.64
    };
      
    const pointGraphic16 = new Graphic({
      geometry: point16,
      symbol: markerSymbol
    });

    const point17 = {
      type: "point",
      longitude: 174.47,
      latitude: -36.8
    };
      
    const pointGraphic17 = new Graphic({
      geometry: point17,
      symbol: markerSymbol
    });

    const point18 = {
      type: "point",
      longitude: 174.2717,
      latitude: -36.3458
    };
      
    const pointGraphic18 = new Graphic({
      geometry: point18,
      symbol: markerSymbol
    });

    const point19 = {
      type: "point",
      longitude: 174.33,
      latitude: -35.989
    };
      
    const pointGraphic19 = new Graphic({
      geometry: point19,
      symbol: markerSymbol
    });

    const point20 = {
      type: "point",
      longitude: 174.33,
      latitude: -35.848
    };
      
    const pointGraphic20 = new Graphic({
      geometry: point20,
      symbol: markerSymbol
    });

    const point21 = {
      type: "point",
      longitude: 173.587,
      latitude: -35.21
    };
      
    const pointGraphic21 = new Graphic({
      geometry: point21,
      symbol: markerSymbol
    });
      
    view.graphics.addMany([pointGraphic1, 
      pointGraphic2,
      pointGraphic3,
      pointGraphic4,
      pointGraphic5,
      pointGraphic6,
      pointGraphic7,
      pointGraphic8,
      pointGraphic9,
      pointGraphic10,
      pointGraphic11,
      pointGraphic12,
      pointGraphic13,
      pointGraphic14,
      pointGraphic15,
      pointGraphic16,
      pointGraphic17,
      pointGraphic18,
      pointGraphic19,
      pointGraphic20,
      pointGraphic21]);

  }

  return (
  
    <div className="app-container">
    {/* Load esri API and the map */}
      <div id="mapView" className='map-view'/>

      <div id="stateOfWaterQuality" className="state" >
        <div className="state-title">State of NZ water quality</div>
        <div className="state-circle circle1">
          <label className="state-label label1">{averageNitrogen}</label>
          <label className="state-bottom-label">Average Nitrogen</label>
          <label className="state-bottom-label bottom-label1">(parts per million)</label>
        </div>
        <div className="state-circle">
          <label className="state-label label2">{averagePhosphorus}</label>
          <label className="state-bottom-label">Average Phosphorus</label>
          <label className="state-bottom-label bottom-label2">(parts per million)</label>
        </div>
        <div className="state-circle">
          <label className="state-label label3">{nationalStandard}</label>
          <label className="state-label label4">%</label>
          <label className="state-bottom-label">Complaint with</label>
          <label className="state-bottom-label bottom-label3">national standards</label>
        </div>
      </div>
    </div>
  )
}

