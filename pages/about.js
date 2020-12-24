// TODO: MDX
import {PageLayout} from "../layouts/PageLayout"
import remark from "remark"
import html from "remark-html"

export default function About ({ html }) {
  return <PageLayout>
    <div className={"prose lg:prose-xl"} dangerouslySetInnerHTML={{ __html: html }} />
  </PageLayout>
}

/*
* TODO: MDX
* */
const markdown = `
I am a full stack engineer who is passionate about product focused engineering.

## Contributions

* [Github](https://github.com/NickTomlin)
* [Stackoverflow](http://stackoverflow.com/users/1048479)

## Speaking

* Midwest.js 2015: Tdd The Hard Parts [[slides]](http://nick-tomlin.com/tdd-the-hard-parts/#/)
* Open West 2015: Building Achievable Applications With Flux [[slides]](http://nick-tomlin.com/flux-talk/#/)

### Social Media

* [LinkedIn](https://www.linkedin.com/in/nick-tomlin-b0397636/)
* [Twitter](https://twitter.com/itsnicktomlin)
`

export async function getStaticProps () {
  const processed = await remark()
    .use(html)
    .process(markdown)
  return {
    props: {
      html: processed.toString()
    }
  }
}
