import type { Extent } from "ol/extent";

export const POLAND_EXTENT: Extent = [
  1550000, // west
  6250000, // south
  2700000, // east
  7350000, // north
];

export const POLAND_EXTENT_WITH_MARGIN: Extent = [
  1450000, 6150000, 2800000, 7450000,
];

export const DATA_LABELS = ["dane1", "dane2", "dane3", "dane4"];
export const DATA_COLORS = ["#ff5252", "#ffa726", "#29b6f6", "#66bb6a"];
