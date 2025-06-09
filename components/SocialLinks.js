import {GithubIcon} from "./icons/GithubIcon"
import {StackoverflowIcon} from "./icons/StackoverflowIcon"
import {InIcon} from "./icons/InIcon"
import site from "../site.config"

export function SocialLinks () {
  return <>
    <GithubIcon username={site.github_username} />
    <StackoverflowIcon username={site.stackoverflow_username}/>
    <InIcon username={site.linkedIn_username} />
    </>
}
