// https://github.com/vercel/next.js/issues/13488#issuecomment-688253373
import "../styles/tailwind.css"
import "../styles/syntax-coldark.css"
import "../styles/main.css"
import "../styles/utilities.css"


import {Header} from "../components/Header"
import {Footer} from "../components/Footer"
import Head from "next/head"
import site from "../site.config"

export default function App ({ Component, pageProps}) {
  return <>
    <Head>
      <meta name="description" key="description" content={site.description} />
      <title>{site.title}</title>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />
    </Head>
    <Header />
    <Component {...pageProps} />
    <Footer />
  </>
}
