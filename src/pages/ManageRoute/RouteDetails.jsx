import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import markerIcon from "../../assets/images/markerIcon.png";
import {
  MAPBOX_ACCESS_TOKEN,
  MAPBOX_STYLE_URL_DEVELOPMENT,
  MAPBOX_STYLE_URL_PRODUCTION,
} from "../../configs/baseURL";
import { routeService } from "../../services/RouteService";
import * as polyUtil from "polyline-encoded";
mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
export default function RouteDetails() {
  const { id } = useParams();
  const [map, setMap] = useState();
  const mapContainerRef = useRef(null); //MapBox Container
  const [lng, setLng] = useState(106.80997955258721); //Longitude
  const [lat, setLat] = useState(10.84105064580045); //Latitude
  const [zoom, setZoom] = useState(17);
  const [routeDetail, setRouteDetail] = useState();
  const [routeLine, setRouteLine] = useState();
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

  //
  useEffect(() => {
    routeService
      .getRouteDetail(id)
      .then((res) => {
        setRouteDetail(res.data.body);
        let corrdinators = [];
        let origin;
        res.data.body.stationList.forEach((element, index) => {
          if (index === 0) {
            origin = element.latitude + "," + element.longitude;
          } else {
            const lnglat = element.latitude + "," + element.longitude;
            corrdinators = [...corrdinators, lnglat];
          }
        });
        const corrdinatorResult = corrdinators.join(";");
        routeService
          .mapBoxRenderRoute(origin, corrdinatorResult)
          .then((res) => {
            if (res.data) {
              setRouteLine(
                polyUtil.decode(res.data.routes[0].overview_polyline.points)
              );
            }
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    if (map) {
      if (routeDetail) {
        for (const station of routeDetail.stationList) {
          const el = document.createElement("div");
          el.className = "marker";
          el.id = station.stationId;
          el.style.width = `20px`;
          el.style.height = `45px`;
          el.style.backgroundImage = `url(${markerIcon})`;
          el.style.cursor = "pointer";
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
        map.flyTo({
          center: [
            routeDetail.stationList[0].longitude,
            routeDetail.stationList[0].latitude,
          ],
          zoom: 15, // 22.5 is greater than the default maxZoom of 20
        });
      }
    }
  }, [map, routeDetail]);
  useEffect(() => {
    if (map) {
      if (routeLine) {
        const coordinates = routeLine?.map((item) => item.reverse());
        console.log(coordinates);
        const geojson = {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: coordinates,
          },
        };
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
              "line-color": "#475ffd",
              "line-width": 8,
            },
          });
        });
      }
    }
  }, [map, routeLine]);
  return (
    <div className="map-body">
      <div className="map-wapper">
        <div className="map-container" ref={mapContainerRef}></div>
      </div>
    </div>
  );
}
