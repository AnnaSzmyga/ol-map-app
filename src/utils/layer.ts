import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from "ol/layer/Vector";
import { register } from "ol/proj/proj4";
import VectorSource from "ol/source/Vector";
import Chart from "ol-ext/style/Chart";
import proj4 from "proj4";
import "ol/ol.css";
import "ol-ext/dist/ol-ext.css";
import { Style, Stroke, Fill } from "ol/style";
import { getCenter } from "ol/extent";
import { Point } from "ol/geom";
import { DATA_COLORS, DATA_LABELS } from "../constants";

// EPSG:4258 and EPSG:2180 registration
proj4.defs("EPSG:4258", "+proj=longlat +ellps=GRS80 +no_defs");
proj4.defs(
  "EPSG:2180",
  "+proj=tmerc +lat_0=0 +lon_0=19 +k=0.9993 +x_0=500000 +y_0=-5300000 +ellps=GRS80 +units=m +no_defs"
);
register(proj4);

const wojSource = new VectorSource({
  url: "/data/wojewodztwa.geojson",
  format: new GeoJSON({
    dataProjection: "EPSG:4258",
    featureProjection: "EPSG:3857",
  }),
});

export const wojLayer = new VectorLayer({
  source: wojSource,
  style: (feature) => {
    const geom = feature.getGeometry();
    if (!geom) return undefined;
    const extent = geom?.getExtent();
    const center = getCenter(extent);

    return [
      new Style({
        fill: new Fill({ color: "rgba(0, 0, 0, 0.1)" }),
        stroke: new Stroke({ color: "#444", width: 1 }),
      }),

      new Style({
        geometry: new Point(center),
        image: new Chart({
          type: "pie",
          data: DATA_LABELS.map((label) => feature.get(label)),
          colors: DATA_COLORS,
          radius: 20,
          stroke: new Stroke({ color: "#333", width: 1 }),
        }),
      }),
    ];
  },
});

const linesSource = new VectorSource({
  url: "/data/linie.geojson",
  format: new GeoJSON({
    dataProjection: "EPSG:2180",
    featureProjection: "EPSG:3857",
  }),
});

export const linesLayer = new VectorLayer({
  source: linesSource,
});
