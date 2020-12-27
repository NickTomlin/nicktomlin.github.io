const fg = require('fast-glob')
const fs = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')
const matter = require("gray-matter")
const yaml = require("js-yaml")

/*
* This is a hacky one time script to help migrate from the old Jekyll format to our "new" nested format.
* */

const log = (...args) => console.log(...args)

const DESTINATION_DIR = path.join(__dirname, '../posts')
const POST_URL = "/posts"
const REDIRECTS_FILE_NAME ="_redirects"

const dateRe = /(\w{4})-(\w{2})-(\w{2})-/
const extractDate = (dateString) =>  {
  const [_, year, month, day] = dateString.match(dateRe)
  return { year, month, day}
}

function transform (path, { year, month, day }, name) {
  const { content, data} = matter(fs.readFileSync(path, 'utf8'), {
    engines: {
      yaml: s => yaml.safeLoad(s, {schema: yaml.JSON_SCHEMA})
    }
  })
  data.date = `${year}-${month}-${day}`
  data.disqusId = `/${year}/${month}/${day}/${name}`

  // prism has different syntax names
  // than rouge/highlight
  const replaced = content
    .replace(/```viml/g, '```vim')
    .replace(/```zsh/g, '```shell')

  return matter.stringify(replaced, data)
}

function write ({name, contents, originalPath}) {
  mkdirp.sync(DESTINATION_DIR)
  log(`  Copying ${originalPath}`)
  fs.writeFileSync(path.join(DESTINATION_DIR, `${name}.md`), contents, 'utf8')
}

function writeRedirects (posts) {
  const content = posts.map(({ name, date }) => {
    const {year, month, day} = date
    return `/${year}/${month}/${day}/${name}/\t${POST_URL}/${name}`
  }).join("\n")
  log(`\nWriting redirects`)
  fs.writeFileSync(path.join(__dirname, '../public', REDIRECTS_FILE_NAME), content)
}

const sanitizeName = (name) => name.replace(/(\.md|\.markdown)/, '').replace(dateRe, '')

function main (command, ...rest) {
  const posts = fg.sync("_posts/*.md", { objectMode: true })
    .map(({ path, name: originalName}) => {
      const name = sanitizeName(originalName)
      const date = extractDate(path)
      const contents = transform(path, date, name)
      return { contents, name, originalPath: path, date}
    })
  switch (command) {
    case "redirects":
      writeRedirects(posts)
      return
    default:
      log(`\nWriting Posts`)
      writeRedirects(posts)
      posts
        .forEach(write)
  }
  log(`✅ Migrated ${posts.length} posts ✅`)
}

main(...process.argv.slice(2))
