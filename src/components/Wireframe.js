import React, {useEffect} from 'react';
import Map from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView"
import FeatureLayer from "@arcgis/core/layers/FeatureLayer"
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer"
import Expand from "@arcgis/core/widgets/Expand"
import Legend from "@arcgis/core/widgets/Legend"
import LayerList from "@arcgis/core/widgets/LayerList"
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery"

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

    const defaultSym = {
      type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
      color: [0, 0, 0, 0],
      outline: {
        // autocasts as new SimpleLineSymbol()
        color: "#71de6e",
        width: 1
      }
    };

    const renderer = {
      type: "simple", // autocasts as new SimpleRenderer()
      symbol: defaultSym,
      visualVariables: [
        {
          type: "size",
          field: "NITROGEN",
          normalizationField: "NITROGEN",
          legendOptions: {
            title: "% population in poverty by county"
          },
          stops: [
            {
              value: 0.15,
              size: 4,
              label: "<15%"
            },
            {
              value: 0.25,
              size: 12,
              label: "25%"
            },
            {
              value: 0.35,
              size: 20,
              color: [0, 0, 0, 0],
              label: ">35%"
            }
          ]
        }
      ]
    };

    const povLayer = new FeatureLayer({
      url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/counties_politics_poverty/FeatureServer/0",
      renderer: renderer,
      title: "State of NZ water quality",
      popupTemplate: {
        // autocasts as new PopupTemplate()
        title: "{NAME}",
        content:
          "{NAME} State of NZ water quality",
        fieldInfos: [
          {
            fieldName: "NITROGEN",
            format: {
              digitSeparator: true,
              places: 0
            }
          },
          {
            fieldName: "PHOSPHORUS",
            format: {
              digitSeparator: true,
              places: 0
            }
          }
        ]
      }
    });



    const map = new Map({
      basemap: "gray-vector",
      layers: [povLayer],
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
        color: "orange"
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


    // view.popup.autoOpenEnabled = false;  // Disable the default popup behavior
    // view.on("click", function(event) { // Listen for the click event
    //   view.hitTest(event).then(function (hitTestResults){ // Search for features where the user clicked
    //     if(hitTestResults.results) {
    //       view.popup.open({ // open a popup to show some of the results
    //         location: event.fieldName,
    //         title: "Hit Test Results",
    //         content: hitTestResults.results
    //       });
    //     }
    //   })
    // });


    // Adds widget below other elements in the top left corner of the view
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

