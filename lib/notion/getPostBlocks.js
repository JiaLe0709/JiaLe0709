import Config from '@/app.config'
import { NotionAPI } from 'notion-client'
import { getPreviewImageMap } from '@/lib/notion/previewImages'

export async function getPostBlocks(id) {
  const authToken = Config.notionAccessToken || null
  const api = new NotionAPI({ authToken })
  const pageBlock = await api.getPage(id)
  if (Config.previewImagesEnabled) {
    const previewImageMap = await getPreviewImageMap(pageBlock)
    pageBlock.preview_images = previewImageMap
  }
  return pageBlock
}
