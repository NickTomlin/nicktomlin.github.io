import site from "../site.config"
import {GithubIcon} from "./icons/GithubIcon"
import {TwitterIcon} from "./icons/TwitterIcon"

export function Footer () {
  return (
    <footer className="site-footer">
      <div className="wrapper">
        <div className="footer-col-wrapper">
          <div className="footer-col footer-col-1">
            <ul className="contact-list">
              <li>{site.title}</li>
              <li><a href={`mailto:${site.email}`}>{ site.email }</a></li>
            </ul>
          </div>

          <div className="footer-col footer-col-2">
            <ul className="social-media-list">
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

          <div className="footer-col footer-col-3">
            <p>{ site.description }</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
