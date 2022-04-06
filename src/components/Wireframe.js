import React, {useEffect} from 'react';
import Map from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView"
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

    

    // // add legend, layerlist and basemapGallery widgets
    // view.ui.add(
    //   [
    //     new Expand({
    //       content: new Legend({
    //         view: view
    //       }),
    //       view: view,
    //       group: "top-left"
    //     }),
    //     new Expand({
    //       content: new LayerList({ view: view }),
    //       view: view,
    //       group: "top-left"
    //     }),
    //     new Expand({
    //       content: new BasemapGallery({
    //         view: view
    //       }),
    //       view: view,
    //       expandIconClass: "esri-icon-basemap",
    //       group: "top-left"
    //     })
    //   ],
    //   "top-left"
    // );

    // view.popup.autoOpenEnabled = false;  // Disable the default popup behavior
    view.on("click", function(event) { // Listen for the click event
      view.hitTest(event).then(function (hitTestResults){ // Search for features where the user clicked
        if(hitTestResults.results) {
          view.popup.open({ // open a popup to show some of the results
            location: event.mapPoint,
            title: "Hit Test Results",
            content: hitTestResults.results
          });
        }
      })
    });

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

