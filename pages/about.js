import {PageLayout} from "../layouts/PageLayout"
import site from "../site.config"
import {SocialLinks} from "../components/SocialLinks"

export default function About () {
  return <PageLayout>
    <header className={"mb-4"}>
      <h1 className={"text-4xl"}>About me</h1>
    </header>

    <section className={"prose prose-content mb-4"}>
      <p>I am a product-focused full stack engineer. I love the process of taking an idea from a whiteboard to production.</p>
    </section>

    <section className={"grid grid-cols-2 gap-4"}>
      <article className={"prose-content prose"}>
        <h1>Contributions</h1>
        <h2>Community</h2>
        <p>
          I share code, contribute to projects, and help write detailed issues on <a href={`https://github.com/${site.github_username}`}>Github</a>.
        </p>
        <p>
          I answer, edit, and post questions on <a href={`http://stackoverflow.com/users/${site.stackoverflow_username}`}>StackOverflow</a>. If you're curious,{" "}
          <a href="/posts/stackoverflow-as-a-learning-tool">I wrote a blog post about it</a>.
        </p>
        <h2>Speaking</h2>
        <ul>
          <li>Midwest.js 2015: Tdd The Hard Parts <a href="http://nick-tomlin.com/tdd-the-hard-parts/#/">[slides]</a></li>
          <li>Open West 2015: Building Achievable Applications With Flux <a href="http://nick-tomlin.com/flux-talk/#/">[slides]</a></li>
        </ul>
      </article>

      <article>
        <header className={"prose-content prose mb-6"}>
          <h1>Links</h1>
        </header>

        <SocialLinks />
      </article>
    </section>
  </PageLayout>
}
