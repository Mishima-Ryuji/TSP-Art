import NextHead from 'next/head'
import { useRouter } from 'next/router'

export type HeadProps = {
  title?: string
  description?: string
  keyword?: string
  keywords?: string[]
  image?: string
  path?: string
  index?: boolean
}

export const Head = ({
  title = '',
  description = '',
  image = '/logo.png',
  keyword,
  keywords = [],
  path = '',
  index = false,
}: HeadProps) => {
  const router = useRouter()
  const host = process.env.HOST || ''
  if (path === '') path = router.pathname
  if (keyword) keywords = [keyword, ...keywords]
  if (title) {
    keywords = [title, ...keywords]
    title += ' | '
  }
  title += 'TSP Art'
  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description}></meta>
      {!index && <meta name="robots" content="noindex" />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="keywords" content={keywords?.join(', ')} />
      <meta property="og:type" content="blog" />
      <meta property="og:url" content={host + path} />
      {/* <meta property="og:image" content={image} /> */}
      <meta property="og:site_name" content={title} />
      <meta name="twitter:card" content="summary" />
      {/* <meta name="twitter:site" content="Twitterアカウント名" /> */}
      <meta name="twitter:url" content={host + path} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {/* <meta name="twitter:image" content={image} /> */}
      <link rel="canonical" href={host + path} />
      <link rel="shortcut icon" href={host + '/favicon.ico'} />
      <link rel="apple-touch-icon" href={host + '/logo.png'} />
    </NextHead>
  )
}
