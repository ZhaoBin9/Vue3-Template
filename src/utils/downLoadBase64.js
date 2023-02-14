/**
 * 下载base64格式图片
 * @param {String} fileName 文件名
 * @param {String} content base64内容
 */
export default function downLoadBase64(fileName, content) {
  let aLink = document.createElement('a')
  let blob = base64ToBlob(content) //new Blob([content]);

  let evt = document.createEvent('HTMLEvents')
  evt.initEvent('click', true, true) //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
  aLink.download = fileName
  aLink.href = URL.createObjectURL(blob)
  aLink.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    })
  )
}

function base64ToBlob(code) {
  var arr = code.split(',')
  // 图片格式
  var mime = arr[0].match(/:(.*?);/)[1]
  // 获取，之后的base64的编码
  var bstr = window.atob(arr[1])
  var n = bstr.length
  var u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], {
    type: mime,
  })
}
