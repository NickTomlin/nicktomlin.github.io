import {readFileSync} from 'fs'
import path from 'path'
import matter from 'gray-matter'
import fg from "fast-glob"
import {processMarkdown} from "./markdown"
import yaml from "js-yaml"

const postsDirectory = path.join(process.cwd(), 'posts')
const getPostPaths = () => {
  return fg.sync(path.join(postsDirectory, '**'), { objectMode: true})
}

const parseMatter = (fileContents) => {
  const {content, data, excerpt} =  matter(fileContents, {
      excerpt: (file) => {
        file.excerpt = file.content.split(".").slice(0, 2).join(' ')
      },
      engines: {
        yaml: s => yaml.safeLoad(s, {schema: yaml.JSON_SCHEMA})
      }
    }
  )
  return {
    content,
    data: {
      ...data,
      excerpt: excerpt || data.excerpt || ""
    }
  }
}

// this sort of works!
// BUT....
// it makes managing these things _realllly_ ugly
// we should rely on front-matter (as ugly as that is)
// to do this for us

function getAllPosts () {
  return getPostPaths().map(({ path, name }) => {
    const fileContents = readFileSync(path, 'utf8')
    const matterResult = parseMatter(fileContents)
    const id = name.replace('.md', '')
    return {
      id,
      params: { id },
      href: {
        pathname: '/posts/[id]',
        query: { id }
      },
      ...matterResult.data,
    }
  })
}

export function getSortedPostsData () {
  // Sort posts by date
  return getAllPosts()
    .sort((a, b) => {
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

export async function getPostData({ id }) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = readFileSync(fullPath, 'utf8')
  const {content, data} = parseMatter(fileContents)
  const contentHtml = await processMarkdown(content)
  return {
    id,
    href: {
      pathname: '/posts/[name]',
      query: { id }
    },
    contentHtml,
    ...data
  }
}
