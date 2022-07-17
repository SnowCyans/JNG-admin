import defaultSettings from '@/settings'

const title = defaultSettings.title || '杰尼龟的空间'

export default function getPageTitle (pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
