import {readFileSync} from 'fs'
import remark from "remark"
import html from "remark-html"
import path from 'path'
import matter from 'gray-matter'
import fg from "fast-glob"

const postsDirectory = path.join(process.cwd(), 'posts')

const getPostPaths = () => {
  return fg.sync(path.join(postsDirectory, '**'), { objectMode: true})
}

const dateRe = /(\w{4})\/(\w{2})\/(\w{2})/
// this sort of works!
// BUT....
// it makes managing these things _realllly_ ugly
// we should rely on front-matter (as ugly as that is)
// to do this for us
const extractSlug = (path, filename) => {
  const [_, year, month, day] = path.match(dateRe)
  const title = filename.replace(/.md$/, '')
  return { year, month, day, title }
}

function getAllPosts () {
  return getPostPaths().map(({ path, name }) => {
    const fileContents = readFileSync(path, 'utf8')
    const matterResult = matter(fileContents)
    const params = extractSlug(path, name)
    return {
      params,
      href: {
        pathname: '/posts/[year]/[month]/[day]/[title]',
        query: params
      },
      ...matterResult.data
    }
  })
}

export function getSortedPostsData () {
  // Sort posts by date
  return getAllPosts().sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIds () {
  return getAllPosts()
    .map((post) => ({
      params: post.params
    }))
}

export async function getPostData({year, month, day, title}) {
  const fullPath = path.join(postsDirectory, year, month, day, `${title}.md`)
  const fileContents = readFileSync(fullPath, 'utf8')
  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    href: {
      pathname: '/posts/[year]/[month]/[day]/[title]',
      query: {year, month, day, title}
    },
    contentHtml,
    ...matterResult.data
  }
}
