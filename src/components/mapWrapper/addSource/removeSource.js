// 移出 mapbox source
export default function removeSource(map, source = []) {
  for (const name of source) {
    if (name) {
      map.removeSource(name)
    }
  }
}
