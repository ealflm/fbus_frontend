import React, { useRef, useEffect, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "./Mapbox.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import markerIcon from "../../assets/images/markerIcon.png";
import { MAPBOX_ACCESS_TOKEN, MAPBOX_STYLE_URL_DEVELOPMENT, MAPBOX_STYLE_URL_PRODUCTION } from "../../configs/baseURL";

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

const Mapbox = (props) => {
  const { stationList, stationDetail, refereshData } = props;
  const [map, setMap] = useState();
  const mapContainerRef = useRef(null); //MapBox Container
  const [lng, setLng] = useState(106.80997955258721); //Longitude
  const [lat, setLat] = useState(10.84105064580045); //Latitude
  const [zoom, setZoom] = useState(17);
  const [currentMarkerList, setCurrentMarkerList] = useState();
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: process.env.NODE_ENV === 'development' ? MAPBOX_STYLE_URL_DEVELOPMENT : MAPBOX_STYLE_URL_PRODUCTION,
      center: [lng, lat],
      zoom: zoom,
    });
    setMap(map);
  }, []);
  useEffect(() => {
    if (currentMarkerList !== null) {
      for (var i = currentMarkerList?.length - 1; i >= 0; i--) {
        currentMarkerList[i].remove();
      }
    }
  }, [refereshData]);
  useEffect(() => {
    if (map) {
      if (stationList) {
        let markerArr = [];
        for (const station of stationList) {
          const el = document.createElement("div");
          el.className = "marker";
          el.id = station.stationId;
          el.style.width = `20px`;
          el.style.height = `45px`;
          el.style.backgroundImage = `url(${markerIcon})`;
          el.style.cursor = "pointer";
          var marker = new mapboxgl.Marker(el);
          marker.setLngLat([station.longitude, station.latitude]).addTo(map);
          markerArr = [...markerArr, marker];
          const popup = new mapboxgl.Popup({
            closeButton: true,
            closeOnClick: true,
            offset: 25,
          });
          popup.setHTML(`<p>${station.name}</p>`).addTo(map);
          marker.setPopup(popup);
          popup.remove();
        }
        setCurrentMarkerList(markerArr);
      }
    }
  }, [map, stationList]);

  useEffect(() => {
    if (map) {
      if (stationDetail) {
        map.flyTo({
          center: [stationDetail?.longitude, stationDetail?.latitude],
          zoom: 22.5, // 22.5 is greater than the default maxZoom of 20
        });
      }
    }
  }, [map, stationDetail]);
  return (
    <div className="map-body">
      <div className="map-wapper">
        <div className="map-container" ref={mapContainerRef}></div>
      </div>
    </div>
  );
};

export default Mapbox;
