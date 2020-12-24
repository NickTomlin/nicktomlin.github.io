import {IconBase} from "./Icon"

export const GithubIcon = ({ username }) => {
  return <IconBase
    href={`https://github.com/${username}`}
    text={"GitHub"}
    svgPath={"/images/github.svg"}
    alt={"Github"}
  />
}
