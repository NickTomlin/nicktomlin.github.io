import Link from "next/link"
import {DefaultLayout} from "../layouts/DefaultLayout"
import {getSortedPostsData} from "../lib/posts"
import {PostList} from "../components/post/PostList"
import {SocialLinks} from "../components/SocialLinks"

// need to do this... for slugs
// https://nextjs.org/docs/routing/dynamic-routes
export default function Index ({ posts }) {
  // TODO: if too small go to vertical format
  /*
  * 1. Switch header to vertical stacking
  * 2. Make image bigger/larger at responsive
  * 3. Figure out where to put posts
  * 4. Title statement
  *
  * Add personality somehwo?
  * */
  return (
    <DefaultLayout>
      <section className={"mb-2 flex flex-col items-center md:flex-row md:mb-4 lg:my-16 md:justify-evenly"}>
        <img src="/images/headshot.jpeg"
             className={"rounded-full border-solid border-4 border-brand-secondary max-h-64 mb-4"} />
        <article className={"text-center"}>
          <h1 className="text-6xl lead font-semibold tracking-wide mb-2">Nick Tomlin</h1>
          <h2 className={"text-3xl mb-2"} >Full Stack Engineer</h2>
          <h3 className={"text-xl"}>
            I take ideas from a whiteboard to production
          </h3>
          <div className={"grid grid-cols-2 gap-4 md:grid-cols-none md:flex my-5"}>
            <SocialLinks />
          </div>
        </article>
      </section>

      <section className={"mb-2 flex flex-col md:flex-row md:mb-4 lg:my-16 md:justify-evenly"}>
        <section className={"mb-8"}>
          <h1 className="text-3xl lead font-semibold tracking-wide">Writing</h1>
          <PostList posts={posts.slice(0, 4)}/>
          <p className={"text-secondary text-md underline"}>
            <Link href={"/blog"}>
              <a className={"p-2 rounded-md bg-brand-secondary text-white"}>
                All posts
              </a>
            </Link>
          </p>
        </section>

        <section>
          <h1 className="text-3xl lead font-semibold tracking-wide">Contributions</h1>
          <p>Code on Github</p>
          <p>Stackoverflow</p>
        </section>
      </section>
    </DefaultLayout>
  )
}

export async function getStaticProps() {
  const posts = getSortedPostsData()
  return {
    props: {
      posts
    }
  }
}

