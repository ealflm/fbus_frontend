import React from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { useState, useEffect, useRef } from "react";
import { MAPBOX_ACCESS_TOKEN, MAPBOX_STYLE_URL_DEVELOPMENT, MAPBOX_STYLE_URL_PRODUCTION } from "../../../configs/baseURL";

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

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
      style: process.env.NODE_ENV === 'development' ? MAPBOX_STYLE_URL_DEVELOPMENT : MAPBOX_STYLE_URL_PRODUCTION,
      center: [lng, lat],
      zoom: zoom,
    });
    setMap(map);
    return () => map.remove();
  }, []);

  useEffect(() => {
    if (map) {
      (stationList || []).forEach((marker) => {

        // Clear old element
        const markerElement = document.getElementById(marker.stationId);
        markerElement?.remove();

        // Create new element
        const elStationMarker = document.createElement("div");
        elStationMarker.id = marker.stationId;
        elStationMarker.className = stationSelected.includes(marker.stationId) ? 'markerSelected' : "markerIcon";
        const markerDiv = new mapboxgl.Marker(elStationMarker)
          .setLngLat([marker.longitude, marker.latitude])
          .addTo(map);

        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
          offset: 25,
        });
        popup.setHTML(`<p>${marker.name}</p>`).addTo(map);

        markerDiv.setPopup(popup);
        popup.remove();

        // Mouse over event
        markerDiv.getElement().addEventListener("mouseover", () => {
          markerDiv.togglePopup();
        });

        // Mouse leavve event
        markerDiv.getElement().addEventListener("mouseleave", () => {
          popup.remove();
        });

        // Click event
        markerDiv.getElement().addEventListener("click", (e) => {
          setStationSelected(prev => {
            const temp = prev.includes(e.target.id) ? prev.filter(item => item !== e.target.id) : [...prev, e.target.id];
            return [...temp];
          });
        });
      });
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
