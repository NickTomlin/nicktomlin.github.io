import site from "../site.config"
import Link from "next/link"
import {useState} from "react"
import clsx from "clsx"

function Nav (props) {
  const [visible, setVisible] = useState(false)
  const handleToggle = () => {
    setVisible(!visible)
  }
  const fill = visible ?  "#73b9dc" : "#424242"
  return (
    <nav {...props}>
      <span onClick={handleToggle} className={"block w-10 h-6 cursor-pointer p-5"}>
        <svg>
          <path fill={fill} d="M18,1.484c0,0.82-0.665,1.484-1.484,1.484H1.484C0.665,2.969,0,2.304,0,1.484l0,0C0,0.665,0.665,0,1.484,0 h15.031C17.335,0,18,0.665,18,1.484L18,1.484z"/>
          <path fill={fill} d="M18,7.516C18,8.335,17.335,9,16.516,9H1.484C0.665,9,0,8.335,0,7.516l0,0c0-0.82,0.665-1.484,1.484-1.484 h15.031C17.335,6.031,18,6.696,18,7.516L18,7.516z"/>
          <path fill={fill} d="M18,13.516C18,14.335,17.335,15,16.516,15H1.484C0.665,15,0,14.335,0,13.516l0,0 c0-0.82,0.665-1.484,1.484-1.484h15.031C17.335,12.031,18,12.696,18,13.516L18,13.516z"/>
        </svg>
      </span>
      <div className={clsx(!visible  && "hidden", "relative")} >
        <div className={"mt-4 absolute border-1 border-light-blue-500"}>
          <Link href={"/about"}>About</Link>
        </div>
      </div>
    </nav>
  )
}

export function Header () {
  return (
    <header className="relative my-2 min-h-56">
      <div className="wrapper flex justify-between">
        <div className={"flex-1 mt-2"}>
          <a href={"/"}><img className={"max-h-10"}  src="/images/nt-logo.svg" alt={site.title}/></a>
        </div>
        <Nav />
      </div>
    </header>
  )
}
