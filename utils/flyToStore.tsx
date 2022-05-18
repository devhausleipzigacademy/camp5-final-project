export default function flyToStore(currentFeature: any, map: any) {
  map.current.flyTo({
    center: currentFeature.geometry.coordinates,
    zoom: 15,
  });
}
