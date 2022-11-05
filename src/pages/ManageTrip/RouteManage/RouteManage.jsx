import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import mapboxgl from "mapbox-gl";
import markerIcon from "../../../assets/images/markerIcon.png";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { Box, Card, Grid, Typography } from "@mui/material";
import { ScrollPanel } from "primereact/scrollpanel";
mapboxgl.accessToken =
  "pk.eyJ1IjoibGV0cm9uZ3RoYW5nMTMxMDAwIiwiYSI6ImNsODdjMDN4aDBiY3M0MHJ3c3FydzZnM2gifQ.lzb2BAjXcUeDiXYaz6N3pg";
export default function RouteManage() {
  const mapContainerRef = useRef(null); //MapBox Container
  const [lng, setLng] = useState(106.809862); //Longitude
  const [lat, setLat] = useState(10.841128); //Latitude
  const [zoom, setZoom] = useState(17); //Zoom Level

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    return () => map.remove();
  }, []);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <div
            className="minimap-body"
            style={{ width: "100%", height: "93vh" }}
          >
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
        </Grid>
        <Grid item xs={3}>
          <Box>
            <Typography variant="h6">Danh sách trạm đã chọn</Typography>
          </Box>
          <ScrollPanel style={{ width: "100%", height: "89vh" }}>
            <Card
              style={{
                marginBottom: "15px",
                padding: "1.25rem",
              }}
            >
              <Box>
                <Typography variant="body1">Tên trạm</Typography>
                <Typography variant="body1">Địa chỉ</Typography>
              </Box>
              <Box>
                <Typography variant="body2">Kinh độ</Typography>
                <Typography variant="body2">Vĩ độ</Typography>
              </Box>
            </Card>
            <Card
              style={{
                marginBottom: "15px",
                padding: "1.25rem",
              }}
            >
              <Box>
                <Typography variant="body1">Tên trạm</Typography>
                <Typography variant="body1">Địa chỉ</Typography>
              </Box>
              <Box>
                <Typography variant="body2">Kinh độ</Typography>
                <Typography variant="body2">Vĩ độ</Typography>
              </Box>
            </Card>{" "}
            <Card
              style={{
                marginBottom: "15px",
                padding: "1.25rem",
              }}
            >
              <Box>
                <Typography variant="body1">Tên trạm</Typography>
                <Typography variant="body1">Địa chỉ</Typography>
              </Box>
              <Box>
                <Typography variant="body2">Kinh độ</Typography>
                <Typography variant="body2">Vĩ độ</Typography>
              </Box>
            </Card>{" "}
            <Card
              style={{
                marginBottom: "15px",
                padding: "1.25rem",
              }}
            >
              <Box>
                <Typography variant="body1">Tên trạm</Typography>
                <Typography variant="body1">Địa chỉ</Typography>
              </Box>
              <Box>
                <Typography variant="body2">Kinh độ</Typography>
                <Typography variant="body2">Vĩ độ</Typography>
              </Box>
            </Card>{" "}
            <Card
              style={{
                marginBottom: "15px",
                padding: "1.25rem",
              }}
            >
              <Box>
                <Typography variant="body1">Tên trạm</Typography>
                <Typography variant="body1">Địa chỉ</Typography>
              </Box>
              <Box>
                <Typography variant="body2">Kinh độ</Typography>
                <Typography variant="body2">Vĩ độ</Typography>
              </Box>
            </Card>
            <Card
              style={{
                marginBottom: "15px",
                padding: "1.25rem",
              }}
            >
              <Box>
                <Typography variant="body1">Tên trạm</Typography>
                <Typography variant="body1">Địa chỉ</Typography>
              </Box>
              <Box>
                <Typography variant="body2">Kinh độ</Typography>
                <Typography variant="body2">Vĩ độ</Typography>
              </Box>
            </Card>
          </ScrollPanel>
        </Grid>
      </Grid>
    </Box>
  );
}
