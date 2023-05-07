import '@/styles/globals.css'
import Navigation from './components/Navigation'
import Footer from './components/Footer'

export default function App({ Component, pageProps }) {
  return (
  <>
    <Component {...pageProps} />
    <Footer/>
  </>
  )
}
