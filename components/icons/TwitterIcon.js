import Image from "next/image"

export const TwitterIcon = ({ username }) => {
  return <a href={`https://twitter.com/${username}`}>
    <Image src={"/public/images/twitter.svg"} height={16} width={16} alt={"Twitter Profile"} />
  </a>
}
