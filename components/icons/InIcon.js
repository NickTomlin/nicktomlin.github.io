import {IconBase} from "./Icon"

export const InIcon = ({ username }) => {
  return <IconBase
    href={`https://www.linkedin.com/in/${username}`}
    text={"LinkedIn"}
    svgPath={"/images/linkedin.svg"}
    alt={"LinkedIn"}
  />
}
