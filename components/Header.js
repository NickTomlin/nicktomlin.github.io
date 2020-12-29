import site from "../site.config"
import Link from "next/link"

function HeaderLink ({ href, children }) {
  return <Link href={href}>
    <a className={"hover:underline hover:text-brand-secondary transition-all"}>
      {children}
    </a>
  </Link>
}
export function Header () {
  return (
    <header className="relative my-4 min-h-56">
      <div className="wrapper flex items-center site-header">
        <div className={"mt-2"}>
          <a href={"/"}><img className={"max-h-10"}  src="/images/nt-logo.svg" alt={site.title}/></a>
        </div>

        <nav className={"header-nav space-x-6 ml-8"}>
          <HeaderLink href={"/"}>Home</HeaderLink>
          <HeaderLink href={"/about"}>About</HeaderLink>
          <HeaderLink href={"/posts"}>Posts</HeaderLink>
        </nav>
      </div>
    </header>
  )
}
