export function getIconFromPosts(posts) {
    const PostsIcon = posts.filter((post) => post?.icon)
    const icon = [...PostsIcon.map((p) => p.icon).flat()]
    const iconObj = {}
    icon.forEach((tag) => {
      if (tag in countObj) {
        iconObj[tag]++
      } else {
        iconObj[tag] = 1
      }
    })
    return iconObj
  }
  