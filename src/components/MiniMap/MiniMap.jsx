import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import markerIcon from '../../assets/images/markerIcon.png';
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { MAPBOX_ACCESS_TOKEN, MAPBOX_STYLE_URL_DEVELOPMENT, MAPBOX_STYLE_URL_PRODUCTION } from '../../configs/baseURL';

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

const MiniMap = (props) => {
  const { setValue, getCoordinates } = props;
  const mapContainerRef = useRef(null); //MapBox Container
  const [lng, setLng] = useState(106.809862); //Longitude
  const [lat, setLat] = useState(10.841128); //Latitude
  const [zoom, setZoom] = useState(17); //Zoom Level
  useEffect(() => {
    const miniMap = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: process.env.NODE_ENV === 'development' ? MAPBOX_STYLE_URL_DEVELOPMENT : MAPBOX_STYLE_URL_PRODUCTION,
      center: [lng, lat],
      zoom: zoom,
    });

    clickSetMarkerOnMap(miniMap);
    return () => miniMap.remove();
  }, []);
  const clickSetMarkerOnMap = (miniMap) => {
    const el = document.createElement('div');
    el.className = 'marker';
    el.style.width = `20px`;
    el.style.height = `45px`;
    el.style.backgroundImage = `url(${markerIcon})`;
    el.style.cursor = 'pointer';
    var marker = new mapboxgl.Marker(el);
    const add_marker = (event) => {
      var coordinates = event.lngLat;
      getCoordinates(coordinates);

      marker.setLngLat(coordinates).addTo(miniMap);
    };
    miniMap.on('click', add_marker);
  };
  return (
    <div className='minimap-body' style={{ width: '100%', height: '100%' }}>
      <div
        style={{ width: 'inherit', height: 'inherit', borderRadius: '9px' }}
        className='minimap-container'
        ref={mapContainerRef}
      ></div>
    </div>
  );
};

export default MiniMap;
