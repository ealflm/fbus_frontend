import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

import busJson from '../../assets/JsonData/bus-locations.json';

import './mapbox.css';

// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

mapboxgl.accessToken =
  'pk.eyJ1IjoibGV0cm9uZ3RoYW5nMTMxMDAwIiwiYSI6ImNsODdjMDN4aDBiY3M0MHJ3c3FydzZnM2gifQ.lzb2BAjXcUeDiXYaz6N3pg';
// mapboxgl.accessToken =
//   'pk.eyJ1Ijoic2FuZ2RlcHRyYWkiLCJhIjoiY2w0bXFvaDRwMW9uZjNpbWtpMjZ3eGxnbCJ9.2gQ3NUL1eBYTwP1Q_qS34A';
const Mapbox = () => {
  const mapContainerRef = useRef(null); //MapBox Container

  // const map = useRef(null);                //MapBox rendered element
  const [lng, setLng] = useState(106.809862); //Longitude
  const [lat, setLat] = useState(10.841128); //Latitude
  const [zoom, setZoom] = useState(17); //Zoom Level
  // const start = [lng, lat];
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });

    // map.on('move', () => {
    // setLng(map.getCenter().lng.toFixed(0.5));
    // setLat(map.getCenter().lat.toFixed(0.5));
    // setZoom(map.getZoom().toFixed(0.5));

    map.on('load', function () {
      setLng(map.getCenter().lng.toFixed(0.5));
      setLat(map.getCenter().lat.toFixed(0.5));
      setZoom(map.getZoom().toFixed(0.5));

      map.loadImage(
        'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
        function (error, image) {
          if (error) throw error;
          map.addImage('custom-marker', image);
          map.addSource('points', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: busJson.features,
            },
          });
          // Add a symbol layer

          map.addLayer({
            id: 'places',
            type: 'symbol',
            source: 'points',
            layout: {
              'icon-image': 'custom-marker',
              // get the tile name
              'text-field': ['get', 'title'],
              'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
              'text-offset': [0, 1.25],
              'text-anchor': 'top',
            },
          });
        }
      );
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      });

      map.on('click', 'places', (e) => {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(description).addTo(map);
        var features = map.queryRenderedFeatures(e.point, {
          layers: ['places'],
        });

        if (!features.length) {
          return;
        }
        console.log(features[0]);
        // map.loadImage(
        //   'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
        //   function (error, image) {
        //     if (error) throw error;
        //     map.setLayoutProperty('places', 'icon-image', [
        //       'match',
        //       ['id'], // get the feature id (make sure your data has an id set or use generateIds for GeoJSON sources
        //       e.features[0].id,
        //       'image-selected', //image when id is the clicked feature id
        //       image, // default
        //     ]);
        //   }
        // );
      });

      map.on('mouseleave', 'places', () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
      });
    });

    // });

    // const geocoder = new MapboxGeocoder({
    //     accessToken: mapboxgl.accessToken,
    //     types: 'country,region,place,postcode,locality,neighborhood',
    //     // see https://docs.mapbox.com/api/search/#geocoding-response-object for information about the schema of each response feature
    //     render: function (item) {
    //     // extract the item's maki icon or use a default
    //     const maki = item.properties.maki || 'marker';
    //     return `<div class='geocoder-dropdown-item'>
    //     <img class='geocoder-dropdown-icon' src='https://unpkg.com/@mapbox/maki@6.1.0/icons/${maki}-15.svg'>
    //     <span class='geocoder-dropdown-text'>
    //     ${item.text}
    //     </span>

    //     </div>`;
    //     },
    //     mapboxgl: mapboxgl
    //     });
    //     map.addControl(geocoder);
    // map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => map.remove();
  }, []);

  return (
    <div className='map-body'>
      <div className='sidebarStyle'>
        <div>
          Longitude: {lng} | Latitude: {lat} | Zomm: {zoom}
        </div>
      </div>
      <div className='map-wapper'>
        <div className='map-container' ref={mapContainerRef}></div>
      </div>
    </div>
  );
};

export default Mapbox;
