import React from "react";
// import mapboxgl from "mapbox-gl";
import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";
import "./Map.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { useState, useEffect, useRef } from "react";
import {
  MAPBOX_ACCESS_TOKEN,
  MAPBOX_STYLE_URL_DEVELOPMENT,
  MAPBOX_STYLE_URL_PRODUCTION,
} from "../../../configs/baseURL";
mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

export default function Map(props) {
  const {
    stationList,
    coordinatorFlyTo,
    getStationSelected,
    routeLine,
    map,
    mapContainerRef,
    setMap,
  } = props;

  const [stationSelected, setStationSelected] = useState([]);

  useEffect(() => {
    if (map) {
      (stationList || []).forEach((marker) => {
        // Clear old element
        const markerElement = document.getElementById(marker.stationId);
        markerElement?.remove();

        // Create new element
        const elStationMarker = document.createElement("div");
        elStationMarker.id = marker.stationId;
        elStationMarker.className = stationSelected.includes(marker.stationId)
          ? "markerSelected"
          : "markerIcon";
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
          setStationSelected((prev) => {
            const temp = prev.includes(e.target.id)
              ? prev.filter((item) => item !== e.target.id)
              : [...prev, e.target.id];
            return [...temp];
          });
        });
      });
    }
  }, [map, stationList, stationSelected]);
  useEffect(() => {
    getStationSelected(stationSelected);
  }, [stationSelected]);
  useEffect(() => {
    if (map) {
      const coordinates = routeLine?.routes[0].geometry.coordinates;
      const geojson = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: coordinates,
        },
      };
      if (map.getLayer("route")) {
        map.removeLayer("route");
      }
      if (map.getSource("route")) {
        map.removeSource("route");
      }
      map.on("load", () => {
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
      });
    }
  }, [map, routeLine]);
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
