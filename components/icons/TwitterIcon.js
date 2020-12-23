import Image from "next/image"

export const TwitterIcon = ({ username }) => {
  return <a href={`https://twitter.com/${username}`}>
    <span className={"icon"}>
      <Image src={"/images/twitter.svg"} height={16} width={16} alt={"Twitter Profile"} />
    </span>
    <span className={"icon--username"}>@{username}</span>
  </a>
}
