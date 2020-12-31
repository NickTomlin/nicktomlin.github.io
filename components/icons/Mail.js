import {IconBase} from "./Icon"

export const MailIcon = ({ username }) => {
  return <IconBase
    href={`mailto:${username}`}
    text={`${username}`}
    svgPath={"/images/gmail.svg"}
    alt={"Mail"}
  />
}
