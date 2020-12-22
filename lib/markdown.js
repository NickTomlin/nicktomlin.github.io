import remark from "remark"
import html from "remark-html"
import remarkPrism from "remark-prism"

export async function processMarkdown(markdownString) {
  const processedContent = await remark()
    .use(remarkPrism, {
      transformInlineCode: true
    })
    .use(html)
    .process(markdownString)
  return processedContent.toString()
}
