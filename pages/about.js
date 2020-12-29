import {PageLayout} from "../layouts/PageLayout"
import site from "../site.config"
import {SocialLinks} from "../components/SocialLinks"

export default function About () {
  return <PageLayout>
    <header className={"mb-4"}>
      <h1 className={"text-4xl"}>About</h1>
    </header>

    <section className={"grid md:grid-cols-2 gap-16 mb-10"}>
      <article className={"prose prose-content"}>
        <p>I am a full stack engineer who loves taking a product from an idea, to production, and beyond.</p>
        <p>I'm fascinated with how organizations and teams work together to craft product experiences that delight users, and how I can bring that same passion and energy to whatever I do.</p>
        <p>I am a generalist who has worked within most parts of the stack, but I find myself most comfortable as a "mid-stack" developer, concerned with integrations between systems and the holistic makeup of a data domain.</p>
      </article>
      <article>
        <header className={"prose-content prose mb-6"}>
          <h2 className={"decorated-heading"}>Links</h2>
        </header>
        <div className={"space-y-2"}>
          <SocialLinks />
        </div>
      </article>
    </section>

    <section className={"grid md:grid-cols-2 gap-16"}>
      <article className={"prose-content prose"}>
        <h2 className={"decorated-heading"}>Contributions</h2>
        <h3>Community</h3>
        <p>
          I share code, contribute to projects, and help write detailed issues on <a href={`https://github.com/${site.github_username}`}>Github</a>.
        </p>
        <p>
          I answer, edit, and post questions on <a href={`http://stackoverflow.com/users/${site.stackoverflow_username}`}>StackOverflow</a>. If you're curious,{" "}
          <a href="/posts/stackoverflow-as-a-learning-tool">I wrote a blog post about it</a>.
        </p>
        <h3>Speaking</h3>
        <ul>
          <li>Midwest.js 2015: Tdd The Hard Parts <a href="http://nick-tomlin.com/tdd-the-hard-parts/#/">[slides]</a></li>
          <li>Open West 2015: Building Achievable Applications With Flux <a href="http://nick-tomlin.com/flux-talk/#/">[slides]</a></li>
        </ul>
      </article>

      <article>

        <header className={"prose-content prose mb-6"}>
          <h2 className={"decorated-heading"}>Hobbies</h2>
          <ul>
            <li>Hiking with my family.</li>
            <li>Trying to answer the question, will it <a href="https://www.chefsteps.com/joule">Sous vide</a>?</li>
            <li>Reading the occasional poem in my <a href="https://www.poetryfoundation.org/poetrymagazine/archive">long backlog</a></li>
            <li>Drinking <a href="https://fieldworkbrewing.com/">delicious craft beer</a>.</li>
          </ul>
        </header>
      </article>
    </section>
  </PageLayout>
}
