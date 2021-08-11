import React, { useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  Popup,
  Rectangle,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";
import styled from "@emotion/styled";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { CRS } from "leaflet";

const MapStyles = styled.div`
  .leaflet-container {
    background-color: mediumvioletred;
  }

  //img.leaflet-image-layer {
  //  image-rendering: pixelated;
  //}

  .leaflet-bar a,
  .leaflet-bar a:hover {
    background-color: #393245;
    color: #ececec;
  }

  .leaflet-bar a:hover {
    background-color: #18151e;
  }

  .leaflet-touch .leaflet-control-layers,
  .leaflet-touch .leaflet-bar {
    border: none;
  }
`;

const Layers = () => {
  const map = useMap();

  // map.setMaxBounds(map.getBounds());

  const bounds = [
    map.unproject([0, 0], map.getZoom()),
    map.unproject([5000, 5000], map.getZoom()),
  ];

  return (
    <>
      <TileLayer
        noWrap={true}
        errorTileUrl={"/static/google-tiles-2/blank.png"}
        // @ts-ignore
        bounds={bounds}
        maxZoom={10}
        minZoom={3}
        url={"/static/google-tiles-2/{z}/{y}/{x}.png"}
      />
      {Array.from({ length: 10000 }, (_, i) => i).map((i) => {
        const x = (i % 100) * 50;
        const y = Math.floor(i / 100.0) * 50;

        return (
          <Rectangle
            key={i}
            bounds={[
              // @ts-ignore
              map.unproject([x, y], map.getZoom()),
              // @ts-ignore
              map.unproject([x + 50, y + 50], map.getZoom()),
            ]}
            pathOptions={{ color: "black", stroke: false, fillOpacity: 0 }}
          >
            <Tooltip direction="bottom" opacity={1} offset={[0, 15]}>
              #{i}
            </Tooltip>
            <Popup>
              <a href={`/lore/${i}/0`} target={"_blank"}>
                Go to Lore
              </a>
            </Popup>
          </Rectangle>
        );
      })}
    </>
  );
};

const WizardMapLeaflet = () => {
  return (
    <MapStyles>
      <MapContainer
        preferCanvas={true}
        crs={CRS.Simple}
        zoom={5}
        center={[-78.125, 78.125]}
        scrollWheelZoom={false}
        style={{ height: "500px", width: "100%" }}
        attributionControl={false}
      >
        <Layers />
      </MapContainer>
    </MapStyles>
  );
};

export default WizardMapLeaflet;
