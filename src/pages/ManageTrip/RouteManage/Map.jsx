import React from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { useState, useEffect, useRef } from "react";
mapboxgl.accessToken =
  "pk.eyJ1IjoibGV0cm9uZ3RoYW5nMTMxMDAwIiwiYSI6ImNsODdjMDN4aDBiY3M0MHJ3c3FydzZnM2gifQ.lzb2BAjXcUeDiXYaz6N3pg";

export default function Map(props) {
  const { stationList, coordinatorFlyTo } = props;
  const mapContainerRef = useRef(null); //MapBox Container
  const [lng, setLng] = useState(106.809862); //Longitude
  const [lat, setLat] = useState(10.841128); //Latitude
  const [zoom, setZoom] = useState(17); //Zoom Level
  const [map, setMap] = useState();
  const [stationSelected, setStationSelected] = useState([]);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    setMap(map);
    return () => map.remove();
  }, []);
  useEffect(() => {
    if (map) {
      let currentBusStationMarkers = [];
      if (currentBusStationMarkers !== null) {
        for (var i = currentBusStationMarkers.length - 1; i >= 0; i--) {
          currentBusStationMarkers[i].remove();
        }
      }
      if (stationList?.length >= 0) {
        stationList.map((marker) => {
          const elStationMarker = document.createElement("div");
          elStationMarker.id = marker.stationId;
          elStationMarker.className = stationSelected.includes(marker.stationId) ? 'markerSelected' : "markerIcon";
          const markerDiv = new mapboxgl.Marker(elStationMarker)
            .setLngLat([marker.longitude, marker.latitude])
            .addTo(map);
          // markerDiv.getElement().addEventListener("click", (e) => {
          //   if (!stationSelected.includes(marker)) {
          //     const result = [...stationSelected, marker];
          //     setStationSelected(result);
          //     elStationMarker.style.backgroundImage = `url(${MakerSelected})`;
          //     // this._routesForm["stationList"].setValue(this.stations);
          //   } else {
          //     removeSationFormList(marker.stationId);
          //     elStationMarker.style.backgroundImage = `url(${MakerIcon})`;
          //     // this._routesForm["stationList"].setValue(this.stations);
          //   }
          // });
          const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
            offset: 25,
          });
          popup.setHTML(`<p>${marker.name}</p>`).addTo(map);
          markerDiv.setPopup(popup);
          popup.remove();
          markerDiv.getElement().addEventListener("mouseover", () => {
            markerDiv.togglePopup();
          });
          markerDiv.getElement().addEventListener("mouseleave", () => {
            popup.remove();
          });
          markerDiv.getElement().addEventListener("click", (e) => {
            setStationSelected(prev => {
              const temp = prev.includes(e.target.id) ? prev.filter(item => item !== e.target.id) : [...prev, e.target.id];
              return [...temp];
            });
          });
          currentBusStationMarkers.push(markerDiv);
        });
      }
    }
  }, [map, stationList, stationSelected]);
  useEffect(() => {
    if (map) {
      if (coordinatorFlyTo) {
        map.flyTo({
          center: [coordinatorFlyTo?.longitude, coordinatorFlyTo?.latitude],
          zoom: 19, // 22.5 is greater than the default maxZoom of 20
        });
      }
    }
  }, [map, coordinatorFlyTo]);
  useEffect(() => { });
  const removeSationFormList = (stationId) => {
    const stations = stationSelected.filter(
      (value) => value.stationId !== stationId
    );
    setStationSelected(stations);
  };
  return (
    <div className="minimap-body" style={{ width: "100%", height: "93vh" }}>
      <div
        style={{
          width: "inherit",
          height: "inherit",
          borderRadius: "9px",
        }}
        className="minimap-container"
        ref={mapContainerRef}
      ></div>
    </div>
  );
}