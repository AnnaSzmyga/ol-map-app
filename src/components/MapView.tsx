import { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { getCenter } from "ol/extent";
import { createMaskLayer } from "../utils/createMaskLayer";
import {
  DATA_COLORS,
  DATA_LABELS,
  POLAND_EXTENT,
  POLAND_EXTENT_WITH_MARGIN,
} from "../constants";
import type Layer from "ol/layer/Layer";
import { linesLayer, wojLayer } from "../utils/layer";

export default function MapView() {
  const [areLayersVisible, setAreLayersVisible] = useState(true);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const wojLayerRef = useRef<Layer>(null);
  const linesLayerRef = useRef<Layer>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const osm = new TileLayer({
      source: new OSM(),
    });

    const maskLayer = createMaskLayer();

    const view = new View({
      center: getCenter(POLAND_EXTENT),
      zoom: 3,
      extent: POLAND_EXTENT_WITH_MARGIN,
      constrainOnlyCenter: false,
    });

    linesLayerRef.current = linesLayer;
    wojLayerRef.current = wojLayer;

    const map = new Map({
      target: mapRef.current,
      layers: [osm, linesLayer, wojLayer, maskLayer],
      view,
    });

    return () => {
      map.setTarget();
    };
  }, []);

  useEffect(() => {
    linesLayerRef.current?.setVisible(areLayersVisible);
    wojLayerRef.current?.setVisible(areLayersVisible);
  }, [areLayersVisible]);

  return (
    <div
      ref={mapRef}
      id="map"
      className="map-container"
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <div className="sticky-box">
        {areLayersVisible && (
          <ul className="legend">
            {DATA_LABELS.map((label, idx) => (
              <li className="legend-item" key={label + idx}>
                <div
                  className="data-indicator"
                  style={{ backgroundColor: DATA_COLORS[idx] }}
                />
                {label}
              </li>
            ))}
          </ul>
        )}
        <button
          className="toggle-layers-button"
          onClick={() => setAreLayersVisible((prev) => !prev)}
        >
          {areLayersVisible ? "Ukryj warstwy" : "Pokaż warstwy"}
        </button>
      </div>
    </div>
  );
}
