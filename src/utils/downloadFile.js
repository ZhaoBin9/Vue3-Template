// 下载文件
export default function downloadFile(url, id) {
  const a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')
  a.setAttribute('id', id)
  a.click()
  setTimeout(() => {
    a.remove()
  }, 100)
}
