export function getWordCountFromPosts(posts) {
    const PostsCount = posts.filter((post) => post?.count)
    const count = [...PostsCount.map((p) => p.count).flat()]
    const countObj = {}
    count.forEach((tag) => {
      if (tag in countObj) {
        countObj[tag]++
      } else {
        countObj[tag] = 1
      }
    })
    return countObj
  }
  