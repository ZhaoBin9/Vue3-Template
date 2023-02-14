// 转换菜单权限
export default function transformMenu(menu) {
  let menuList = []
  menu.forEach((item) => {
    if (item.children.length) menuList.push(...item.children)
    else menuList.push(item)
  })
  let concatMenuChildrenList = []
  menuList.forEach((menu) => {
    concatMenuChildrenList.push(menu)

    if (menu.children.length) {
      concatMenuChildrenList.push(
        ...menu.children.map((child) => {
          return {
            ...child,
            name: menu.name + '-' + child.name,
          }
        })
      )
    }
  })

  return concatMenuChildrenList
}
