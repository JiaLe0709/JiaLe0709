const Config = {
    notionDomain: process.env.NOTION_DOMAIN || "jiale0709.notion.site",
    notionPageId: process.env.NOTION_PAGE_ID || "62581ac7b5334d6197dc33d9416a9cc3",
    notionSpacesId: process.env.NOTION_SPACES_ID || "3e2958af48ab41a3821642983fdeae70",
    notionAccessToken: process.env.NOTION_ACCESS_TOKEN,
    giscusConfig: {
        repo: 'jiale0709/giscus-jiale',
        repoId: 'R_kgDOPe0JDQ',
        category: 'Announcements',
        categoryId: 'DIC_kwDOPe0JDc4CuPHS',
        dataMapping: 'pathname',
    },
}

module.exports = Config;