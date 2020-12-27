export const IconBase = ({ href, alt, svgPath, text}) => {
  return <a href={href} className={"flex hover:underline"}>
    <img className={"inline mr-2"} src={svgPath} height={16} width={16} alt={alt} />
    <span className={"icon--username"}>{text}</span>
  </a>
}
