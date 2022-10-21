import { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import 'styles/globals.scss'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  )
}

export default MyApp
