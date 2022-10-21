import { ArtCreator } from 'components/Art/Creator'
import { DefaultLayout } from 'components/Layout/Default'
import { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <DefaultLayout>
      <ArtCreator />
    </DefaultLayout>
  )
}

export default Home
