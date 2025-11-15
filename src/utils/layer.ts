import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from "ol/layer/Vector";
import { register } from "ol/proj/proj4";
import VectorSource from "ol/source/Vector";
import proj4 from "proj4";

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
