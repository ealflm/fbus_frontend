import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import markerIcon from '../../assets/images/markerIcon.png';
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

mapboxgl.accessToken =
  'pk.eyJ1IjoibGV0cm9uZ3RoYW5nMTMxMDAwIiwiYSI6ImNsODdjMDN4aDBiY3M0MHJ3c3FydzZnM2gifQ.lzb2BAjXcUeDiXYaz6N3pg';
// mapboxgl.accessToken =
//   'pk.eyJ1Ijoic2FuZ2RlcHRyYWkiLCJhIjoiY2w0bXFvaDRwMW9uZjNpbWtpMjZ3eGxnbCJ9.2gQ3NUL1eBYTwP1Q_qS34A';
const MiniMap = (props) => {
  const { setValue, getCoordinates } = props;
  const mapContainerRef = useRef(null); //MapBox Container
  const [lng, setLng] = useState(106.809862); //Longitude
  const [lat, setLat] = useState(10.841128); //Latitude
  const [zoom, setZoom] = useState(17); //Zoom Level
  useEffect(() => {
    const miniMap = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
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
