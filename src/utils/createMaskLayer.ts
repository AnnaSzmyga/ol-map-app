import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Polygon from "ol/geom/Polygon";
import { Fill, Style } from "ol/style";
import { POLAND_EXTENT } from "../constants";

export function createMaskLayer() {
  const [minX, minY, maxX, maxY] = POLAND_EXTENT;

  const offset = 2000000;

  const outer = [
    [minX - offset, minY - offset],
    [maxX + offset, minY - offset],
    [maxX + offset, maxY + offset],
    [minX - offset, maxY + offset],
    [minX - offset, minY - offset],
  ];

  const hole = [
    [minX, minY],
    [maxX, minY],
    [maxX, maxY],
    [minX, maxY],
    [minX, minY],
  ];

  const poly = new Polygon([outer, hole]);
  const feat = new Feature(poly);

  const layer = new VectorLayer({
    source: new VectorSource({ features: [feat] }),
    style: new Style({ fill: new Fill({ color: "rgba(255, 255, 255, 0.8)" }) }),
  });

  return layer;
}
