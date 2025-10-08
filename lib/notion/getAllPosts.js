import Config from '@/app.config'
import {NotionAPI} from 'notion-client'
import {idToUuid} from 'notion-utils'
import dayjs from '@/lib/day'
import getAllPageIds from './getAllPageIds'
import getPageProperties from './getPageProperties'
import filterPublishedPosts from './filterPublishedPosts'

/**
 * @param {{ onlyPost: boolean }} - false: all types / true: post only
 * @param {{ onlyHidden: boolean }} - false: all types / true: hidden only
 * @param {{ onlyProject: boolean }} - false: all types / true: project only
 * @param {{ onlyGallery: boolean }} - false: all types / true: gallery only
 * @param {{ onlyWall: boolean }} - false: all types / true: wall only
 */

export async function getAllPosts({
                                      onlyPost = false,
                                      onlyHidden = false,
                                      onlyProject = false,
                                      onlyGallery = false,
                                      onlyWall = false,
                                  }) {
    let id = Config.notionPageId
    const authToken = Config.notionAccessToken || null
    const api = new NotionAPI({
        apiBaseUrl: Config.notionAPIBaseUrl,
        authToken
    })
    const response = await api.getPage(id)

    id = idToUuid(id)
    const collection = Object.values(response.collection)[0]?.value
    const collectionQuery = response.collection_query
    const block = response.block
    const schema = collection?.schema

    const rawMetadata = block[id].value

    // Check Type
    if (
        rawMetadata?.type !== 'collection_view_page' &&
        rawMetadata?.type !== 'collection_view'
    ) {
        console.log(`pageId '${id}' is not a database`)
        return null
    } else {
        // Construct Data
        const pageIds = getAllPageIds(collectionQuery)
        const data = []
        for (let i = 0; i < pageIds.length; i++) {
            const id = pageIds[i]
            const properties = (await getPageProperties(id, block, schema)) || null

            // Add fullwidth to properties
            properties.fullWidth = block[id].value?.format?.page_full_width ?? false
            // Convert date (with timezone) to unix milliseconds timestamp
            properties.date = (
                properties.date?.start_date
                    ? dayjs.tz(properties.date?.start_date)
                    : dayjs(block[id].value?.created_time)
            ).valueOf()

            data.push(properties)
        }

        // remove all the items doesn't meet requirements
        const posts = filterPublishedPosts({
            posts: data,
            onlyPost,
            onlyHidden,
            onlyProject,
            onlyGallery,
            onlyWall,
        })

        // Sort by date
        if (Config.sortByDate) {
            posts.sort((a, b) => b.date - a.date)
        }
        return posts
    }
}
