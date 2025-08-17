export function getPostCategory(posts) {
    const PostsCategory = posts.filter((post) => post?.categoty)
    const category = [...PostsCategory.map((p) => p.category).flat()]
    const categoryObj = {}
    category.forEach((tag) => {
      if (tag in countObj) {
        categoryObj[tag]++
      } else {
        categoryObj[tag] = 1
      }
    })
    return categoryObj
  }
  