import React, {useEffect} from 'react';
import Map from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView"
import FeatureLayer from "@arcgis/core/layers/FeatureLayer"
import Point from "@arcgis/core/geometry/Point"
import Graphic from "@arcgis/core/Graphic"
import Expand from "@arcgis/core/widgets/Expand"
import Legend from "@arcgis/core/widgets/Legend"
import LayerList from "@arcgis/core/widgets/LayerList"
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery"
import CoordinateConversion from "@arcgis/core/widgets/CoordinateConversion"
import PopupTemplate from "@arcgis/core/PopupTemplate";
import * as watchUtils from "@arcgis/core/core/watchUtils";
import * as univariateRendererCreator from "@arcgis/core/smartMapping/renderers/univariateColorSize"
import * as sizeRendererCreator from "@arcgis/core/smartMapping/renderers/size"

import 'bootstrap/dist/css/bootstrap.min.css'
import "../styles/Wireframe.css";

export default function Wireframe() {

  useEffect(() => {
    setupWebMap();
  }, []);

  

  const setupWebMap = () => {

    // const webMap = new WebMap({
    //   portalItem: {
    //     id: 'c3337bfc8f964688856b36a4651b66cf'
    //   }
    // });


    const map = new Map({
      basemap: "gray-vector",
      // layers: [layer]
      // basemap: "arcgis-topographic", //Basemap layer service
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


      // add legend, layerlist and basemapGallery widgets
      view.ui.add(
        [
          new Expand({
            content: new Legend({
              view: view
            }),
            view: view,
            group: "top-left"
          }),
          new Expand({
            content: new LayerList({ view: view }),
            view: view,
            group: "top-left"
          }),
          new Expand({
            content: new BasemapGallery({
              view: view
            }),
            view: view,
            expandIconClass: "esri-icon-basemap",
            group: "top-left"
          })
        ],
        "top-left"
      );

      const ccWidget = new CoordinateConversion({
        view: view
      });

      view.ui.add(ccWidget, "bottom-left");

      // Create a symbol for drawing the point
      const markerSymbol = {
        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        color: [226, 119, 40],
        outline: {
          // autocasts as new SimpleLineSymbol()
          color: [255, 255, 255],
          width: 2
        }
      };

      const point1 = {
        type: "point", // autocasts as new Point()
        longitude: 175.1557,
        latitude: -40.6978
      };

      // Create a graphic and add the geometry and symbol to it
      const pointGraphic1 = new Graphic({
        geometry: point1,
        symbol: markerSymbol
      });

      const point2 = {
        type: "point", // autocasts as new Point()
        longitude: 177.7598,
        latitude: -42.6899
      };

      
      const pointGraphic2 = new Graphic({
        geometry: point2,
        symbol: markerSymbol
      });
      

      view.graphics.addMany([pointGraphic1, pointGraphic2]);

    view.popup.autoOpenEnabled = false;  // Disable the default popup behavior
    view.on("click", function(event) { // Listen for the click event
      view.hitTest(event.screenPoint).then(function (response){ // Search for features where the user clicked
        var graphic = response.results[0].graphic.attributes.OBJECTID;
        if(graphic) {
          view.popup.open({ // open a popup to show some of the results
            location: event.mapPoint,
            title: "Site:"+ graphic,
            content: event.mapPoint.x + ",  "+ event.mapPoint.y
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

  }

  return (
  
    <div className="app-container">
    {/* Load esri API and the map */}
      <div id="mapView" className='map-view'/>

      <div id="stateOfWaterQuality" className="state" >
        <div className="state-title">State of NZ water quality</div>
        <div className="state-circle circle1">
          <label className="state-label label1">137.7</label>
          <label className="state-bottom-label">Average Nitrogen</label>
          <label className="state-bottom-label bottom-label1">(parts per million)</label>
        </div>
        <div className="state-circle">
          <label className="state-label label2">33.8</label>
          <label className="state-bottom-label">Average Phosphorus</label>
          <label className="state-bottom-label bottom-label2">(parts per million)</label>
        </div>
        <div className="state-circle">
          <label className="state-label label3">47.8</label>
          <label className="state-label label4">%</label>
          <label className="state-bottom-label">Complaint with</label>
          <label className="state-bottom-label bottom-label3">national standards</label>
        </div>
      </div>
    </div>
  )
}

