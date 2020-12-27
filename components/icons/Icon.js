export const IconBase = ({ href, alt, svgPath, text}) => {
  return <a href={href} target={"_blank"} rel={"noopener nofollow"} className={"flex hover:underline hover:text-brand-primary transition-all"}>
    <img className={"inline mr-2"} src={svgPath} height={16} width={16} alt={alt} />
    <span className={"icon--username"}>{text}</span>
  </a>
}
