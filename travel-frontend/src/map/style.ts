import map from ".";
import { travelLineSegment } from "./layers";
import { darken } from "polished";

export function clearTravelSegmentHighlight() {
  if (!map.hasTravelLayer()) return;
  const lineLayer = travelLineSegment.id;
  map.map?.setPaintProperty(lineLayer, 'line-color', '#e55e5e');
  map.map?.setPaintProperty(lineLayer, 'line-width', 3);
}


export function setTravelSegmentHighlight(segmentId: number) {
  if (!map.hasTravelLayer()) return;

  const lineLayer = travelLineSegment.id;
  map.map?.setPaintProperty(lineLayer, 'line-color', [
    'case',
    ['boolean', ['==', ['get', 'trip_segment_id'], segmentId], false],
    darken(0.2, '#e55e5e'),
    '#e55e5e',
  ]);

  map.map?.setPaintProperty(lineLayer, 'line-width', [
    'case',
    ['boolean', ['==', ['get', 'trip_segment_id'], segmentId], false],
    5,
    3,
  ])
}