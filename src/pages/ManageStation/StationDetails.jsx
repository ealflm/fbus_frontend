import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useParams } from "react-router-dom";
// import mapboxgl from "mapbox-gl";
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
import { useEffect } from "react";
import { useCallback } from "react";
import { stationService } from "../../services/StationService";
import { Box, Card, Grid, Typography } from "@mui/material";
import { height } from "@mui/system";
mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
export default function StationDetails() {
  const { id } = useParams();
  const [map, setMap] = useState();
  const mapContainerRef = useRef(null); //MapBox Container
  const [lng, setLng] = useState(106.80997955258721); //Longitude
  const [lat, setLat] = useState(10.84105064580045); //Latitude
  const [zoom, setZoom] = useState(17);
  const [stationDetail, setStationDetail] = useState();
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

  const getStationDetails = useCallback(() => {
    stationService
      .getStationDetail(id)
      .then((res) => {
        console.log(res);
        setStationDetail(res.data.body);
        const el = document.createElement("div");
        el.className = "marker";
        el.id = res.data.body.stationId;
        el.style.width = `20px`;
        el.style.height = `45px`;
        el.style.backgroundImage = `url(${markerIcon})`;
        el.style.cursor = "pointer";
        var marker = new mapboxgl.Marker(el);
        marker
          .setLngLat([res.data.body.longitude, res.data.body.latitude])
          .addTo(map);
        const popup = new mapboxgl.Popup({
          closeButton: true,
          closeOnClick: true,
          offset: 25,
        });
        popup.setHTML(`<p>${res.data.body.name}</p>`).addTo(map);
        marker.setPopup(popup);
        map.flyTo({
          center: [res.data.body?.longitude, res.data.body?.latitude],
          zoom: 22.5, // 22.5 is greater than the default maxZoom of 20
        });
      })
      .catch((error) => console.log(error));
  }, [id, map]);
  useEffect(() => {
    if (map) {
      getStationDetails();
    }
  }, [map]);
  return (
    <Grid container spacing={2}>
      <Typography variant="h4" sx={{ marginTop: 2 }}>
        Chi tiết Trạm
      </Typography>
      <Grid
        item
        xs={12}
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: "inherit",
        }}
      >
        <Card>
          <Box
            style={{
              width: "100%",
              display: "flex",
              height: "150px",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 15px",
            }}
          >
            <Box width={"70%"}>
              <Typography variant="h5" mt={2}>
                Tên trạm : <b>{stationDetail?.name}</b>
              </Typography>
              <Typography variant="h5" mt={2}>
                Địa chỉ: <b>{stationDetail?.address}</b>
              </Typography>
            </Box>
            <Box width={"25%"}>
              <Typography variant="h5" mt={2}>
                Kinh độ: <b>{stationDetail?.longitude}</b>
              </Typography>
              <Typography variant="h5" mt={2}>
                Vĩ độ: <b>{stationDetail?.latitude}</b>
              </Typography>
            </Box>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12} sx={{ height: "10vh" }}>
        <div className="map-body" style={{ height: "67vh" }}>
          <div className="map-wapper">
            <div className="map-container" ref={mapContainerRef}></div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
