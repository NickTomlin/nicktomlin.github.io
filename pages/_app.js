import "../styles/global.scss"
import {Header} from "../components/Header"
import {Footer} from "../components/Footer"
import Head from "next/head"
import site from "../site.config"

export default function App ({ Component, pageProps}) {
  return <>
    <Head>
      <meta name="description" key="description" content={site.description} />
    </Head>
    <Header />
    <Component {...pageProps} />
    <Footer />
    </>
}
