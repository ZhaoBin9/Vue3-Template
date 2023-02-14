import { geoUrl } from '@/fetch/env'

// 添加临安 mapbox source
export default function addLinanSource(map, source = []) {
  const basicSource = ['region', 'base', 'region_center', 'region_linan']
  const sourceList = Array.from(new Set([...basicSource, ...source]))

  for (const name of sourceList) {
    if (name) {
      map.addSource(name, {
        type: 'vector',
        scheme: 'tms',
        tiles: [`${geoUrl}/geoserver/gwc/service/tms/1.0.0/linanAI%3A${name}@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf`],
      })
    }
  }
}
