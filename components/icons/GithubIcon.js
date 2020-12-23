import Image from "next/image"

export const GithubIcon = ({ username }) => {
  return <a href={`https://github.com/${username}`}>
    <span className={"icon"}>
      <Image src={"/images/github.svg"} height={16} width={16} alt={"Github Profile"} />
    </span>
    <span className={"icon--username"}>{username}</span>
  </a>
}
