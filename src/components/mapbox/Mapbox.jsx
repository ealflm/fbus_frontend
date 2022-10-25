import React, { useRef, useEffect, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';

import busJson from '../../assets/JsonData/bus-locations.json';

import './Mapbox.css';

// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import markerIcon from '../../assets/images/markerIcon.png';
mapboxgl.accessToken =
  'pk.eyJ1IjoibGV0cm9uZ3RoYW5nMTMxMDAwIiwiYSI6ImNsODdjMDN4aDBiY3M0MHJ3c3FydzZnM2gifQ.lzb2BAjXcUeDiXYaz6N3pg';
// mapboxgl.accessToken =
//   'pk.eyJ1Ijoic2FuZ2RlcHRyYWkiLCJhIjoiY2w0bXFvaDRwMW9uZjNpbWtpMjZ3eGxnbCJ9.2gQ3NUL1eBYTwP1Q_qS34A';
const Mapbox = (props) => {
  const { stationList, stationDetail } = props;
  const [map, setMap] = useState();
  const mapContainerRef = useRef(null); //MapBox Container
  const [lng, setLng] = useState(106.80997955258721); //Longitude
  const [lat, setLat] = useState(10.84105064580045); //Latitude
  const [zoom, setZoom] = useState(17); //Zoom Level
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });
    setMap(map);
  }, []);
  useEffect(() => {
    if (map) {
      if (stationList) {
        for (const station of stationList) {
          const el = document.createElement('div');
          el.className = 'marker';
          el.id = station.id;
          el.style.width = `20px`;
          el.style.height = `45px`;
          el.style.backgroundImage = `url(${markerIcon})`;
          el.style.cursor = 'pointer';
          var marker = new mapboxgl.Marker(el);
          marker.setLngLat([station.longitude, station.latitude]).addTo(map);
          const popup = new mapboxgl.Popup({
            closeButton: true,
            closeOnClick: true,
            offset: 25,
          });
          popup.setHTML(`<p>${station.name}</p>`).addTo(map);
          marker.setPopup(popup);
          popup.remove();
        }
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
    <div className='map-body'>
      <div className='map-wapper'>
        <div className='map-container' ref={mapContainerRef}></div>
      </div>
    </div>
  );
};

export default Mapbox;
