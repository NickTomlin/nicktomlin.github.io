import site from "../site.config"
import {GithubIcon} from "./icons/GithubIcon"
import {TwitterIcon} from "./icons/TwitterIcon"
import {MailIcon} from "./icons/Mail"

export function Footer () {
  return (
    <footer className={"border-t border-solid border-top border-light-blue-500 pt-4 text-sm"}>
      <div className="wrapper flex justify-between pb-2">
        <div className={"flex-1"}>
          <ul>
            <li><MailIcon username={site.email} /></li>
            {site.github_username &&
            <li>
              <GithubIcon username={site.github_username} />
            </li>
            }
            {site.twitter_username && <li>
              <TwitterIcon username={site.twitter_username} />
            </li>
            }
          </ul>
        </div>

        <div className="flex-1">
          <p>{ site.description }</p>
        </div>
      </div>
    </footer>
  )
}
