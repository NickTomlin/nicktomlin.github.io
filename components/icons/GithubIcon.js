import Image from "next/image"

export const GithubIcon = ({ username }) => {
  return <a href={`https://github.com/${username}`}>
    <Image src={"/public/images/github.svg"} height={16} width={16} alt={"Github Profile"} />
  </a>
}
