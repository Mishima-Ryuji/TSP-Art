import { Spinner } from 'react-bootstrap'
import { Head, HeadProps } from './Head'
import { Header } from './Header'

export type LayoutProps = {
  children: React.ReactNode
  head?: HeadProps
  loading?: boolean
  headerSticky?: boolean
}

export const DefaultLayout = ({
  children,
  head,
  loading = false,
  headerSticky = true,
}: LayoutProps) => {
  const maxWidth = 1200

  return (
    <div className="vh-100 w-100">
      {loading && <Head {...{ ...head, title: '読み込み中...' }} />}
      {!loading && <Head {...head} />}
      <Header maxWidth={maxWidth} sticky={headerSticky} />
      <div
        className="d-flex my-3 mx-auto"
        style={{
          maxWidth,
        }}
      >
        <main className="flex-grow-1 mw-100 px-2 px-sm-3">
          {!loading && <>{children}</>}
          {loading && (
            <div className="w-100 my-3 text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">読み込み中...</span>
              </Spinner>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
