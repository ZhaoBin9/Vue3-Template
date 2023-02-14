import { geoUrl } from '@/fetch/env'

// 添加mapbox source
export default function addSource(map, source = []) {
  for (const name of source) {
    if (name) {
      map.addSource(name, {
        type: 'vector',
        scheme: 'tms',
        tiles: [`${geoUrl}/geoserver/gwc/service/tms/1.0.0/linanAI%3A${name}@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf`],
      })
    }
  }
}
