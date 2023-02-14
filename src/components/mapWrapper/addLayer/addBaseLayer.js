export default async function addBaseLayer(map) {
  const imageList = [
    {
      url: require('@/assets/images/common/base_icon.png'),
      usedName: 'base-marker',
    },
  ]
  for (const item of imageList) {
    await new Promise((resolve, reject) => {
      const existImage = map.hasImage(item.usedName)
      if (existImage) resolve()
      else {
        map.loadImage(item.url, function (error, image) {
          if (error) {
            reject()
          }
          map.addImage(item.usedName, image)
          resolve()
        })
      }
    })
  }

  await map.addLayer({
    id: `base-layer`,
    source: `base`,
    'source-layer': `base`,
    type: 'symbol',
    filter: true,
    layout: {
      'icon-image': `base-marker`,
      'icon-size': 0.8,
      'icon-allow-overlap': true,
    },
    paint: {},
  })
}
