import React, { useRef, useEffect, useState, useCallback } from "react";
// import mapboxgl from "mapbox-gl";
import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";
import "./Mapbox.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import markerIcon from "../../assets/images/markerIcon.png";
import {
  MAPBOX_ACCESS_TOKEN,
  MAPBOX_STYLE_URL_DEVELOPMENT,
  MAPBOX_STYLE_URL_PRODUCTION,
} from "../../configs/baseURL";

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

const Mapbox = (props) => {
  const { stationList, stationDetail, refereshData, routeDetail, routeLine } =
    props;
  const [map, setMap] = useState();
  const mapContainerRef = useRef(null); //MapBox Container
  const [lng, setLng] = useState(106.80997955258721); //Longitude
  const [lat, setLat] = useState(10.84105064580045); //Latitude
  const [zoom, setZoom] = useState(17);
  const [currentMarkerList, setCurrentMarkerList] = useState();
  const [currentRouteLine, setCurrentRouteLine] = useState();
  const [isChangedOnMap, setIsChangedOnMap] = useState(false);
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style:
        process.env.NODE_ENV === "development"
          ? MAPBOX_STYLE_URL_DEVELOPMENT
          : MAPBOX_STYLE_URL_PRODUCTION,
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
  useEffect(() => {
    if (map) {
      if (map.getLayer("route") && map.getSource("route")) {
        map.removeLayer("route");
        map.removeSource("route");
        setIsChangedOnMap(true);
      }
    }
  }, [map, stationDetail, routeLine]);
  useEffect(() => {
    if (map) {
      const coordinates = routeLine?.map((item) => item.reverse());
      const currentCoordinates = currentRouteLine?.map((item) =>
        item.reverse()
      );

      // Check if coordinates are old, don't need do anything
      if (
        JSON.stringify(coordinates) === JSON.stringify(currentCoordinates) &&
        !isChangedOnMap
      ) {
        return;
      }

      const geojson = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: coordinates,
        },
      };
      // Remove old layer and source
      if (map.getLayer("route") && map.getSource("route")) {
        map.removeLayer("route");
        map.removeSource("route");

        if (routeLine) {
          // Check case has change of adding/removing stations to make this route.
          map.addSource("route", {
            type: "geojson",
            data: geojson,
          });
          map.addLayer({
            id: "route",
            type: "line",
            source: "route",
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#30a4f1",
              "line-width": 8,
            },
          });
        }
      } else if (map.loaded()) {
        map.addSource("route", {
          type: "geojson",
          data: geojson,
        });
        map.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#30a4f1",
            "line-width": 8,
          },
        });
      }

      setCurrentRouteLine(routeLine);
      setIsChangedOnMap(false);
    }
  }, [map, routeLine]);
  return (
    <div className="map-body">
      <div className="map-wapper">
        <div className="map-container" ref={mapContainerRef}></div>
      </div>
    </div>
  );
};

export default Mapbox;
