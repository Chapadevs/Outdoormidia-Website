import { PROJ } from '@/lib/mapShapes'

const RAD = Math.PI / 180

export function projectToMap(lat, lng) {
  const x = (lng * RAD - PROJ.xMin) * PROJ.k
  const y = (PROJ.yMax - Math.log(Math.tan(Math.PI / 4 + (lat * RAD) / 2))) * PROJ.k
  return { x, y }
}

export function unprojectFromMap(x, y) {
  const lng = (x / PROJ.k + PROJ.xMin) / RAD
  const lat = (2 * Math.atan(Math.exp(PROJ.yMax - y / PROJ.k)) - Math.PI / 2) / RAD
  return { lat, lng }
}
