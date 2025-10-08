const Config = {
    notionDomain: process.env.NOTION_DOMAIN || "jiale0709.notion.site",
    notionPageId: process.env.NOTION_PAGE_ID || "252bca3fa613811291be000c11e691c9",
    notionSpacesId: process.env.NOTION_SPACES_ID || "252bca3fa6138094b2e2fecf189bddaa",
    notionAPIBaseUrl: process.env.NOTION_API_BASE_URL,
    notionAccessToken: process.env.NOTION_ACCESS_TOKEN,
    giscusConfig: {
        repo: 'jiale0709/giscus-jiale',
        repoId: 'R_kgDOPe0JDQ',
        category: 'Announcements',
        categoryId: 'DIC_kwDOPe0JDc4CuPHS',
        dataMapping: 'pathname',
    },
    sortByDate: false
}

module.exports = Config;