import {IconBase} from "./Icon"

export const TwitterIcon = ({ username }) => {
  return <IconBase
    href={`https://twitter.com/${username}`}
    text={username}
    svgPath={"/images/twitter.svg"}
    alt={"Twitter"}
  />
}
