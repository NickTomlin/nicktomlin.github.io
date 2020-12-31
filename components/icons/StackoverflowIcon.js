import {IconBase} from "./Icon"

export const StackoverflowIcon = ({ username }) => {
  return <IconBase
    href={`http://stackoverflow.com/users/${username}`}
    text={"Stackoverflow"}
    svgPath={"/images/stackoverflow.svg"}
    alt={"Stackoverflow"}
  />
}
