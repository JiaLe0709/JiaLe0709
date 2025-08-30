export default function filterPublishedPosts({
                                                 posts,
                                                 onlyPost,
                                                 onlyHidden,
                                                 onlyProject,
                                                 onlyGallery,
                                             }) {
    if (!posts || !posts.length) return []
    return posts
        .filter((post) =>
            onlyProject
                ? post?.type?.[0] === 'Project'
                : post
        )
        .filter((post) =>
        onlyGallery
            ? post?.type?.[0] === 'Gallery'
            : post
        )
        .filter((post) =>
            onlyPost
                ? post?.type?.[0] === 'Post'
                : post
        )
        .filter((post) =>
            onlyHidden
                ? post?.type?.[0] === 'Hidden'
                : post?.type?.[0] !== 'Hidden'
        )
        .filter((post) => {
            return (
                post.title &&
                post?.status?.[0] === 'Published' &&
                post.date <= new Date()
            )
        })
}
