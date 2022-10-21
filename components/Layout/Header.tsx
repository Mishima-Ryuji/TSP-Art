import { useAuthState } from 'hooks/useAuthState'
import Link from 'next/link'
import { Container, Navbar } from 'react-bootstrap'

export const HEADER_HEIGHT = 40
export const HEADER_BOTTOM_SPACE_HEIGHT = 16
export const HEADER_WITH_BOTTOM_SPACE_HEIGHT =
  HEADER_HEIGHT + HEADER_BOTTOM_SPACE_HEIGHT

type Props = {
  className?: string
  style?: React.CSSProperties
  sticky?: boolean
  maxWidth?: number
}

export const Header = ({
  maxWidth,
  className,
  style,
  sticky = true,
}: Props) => {
  const { isSignedIn } = useAuthState()
  return (
    <header className={className} style={style}>
      <Navbar
        bg="dark"
        variant="dark"
        className={`d-print-none ${sticky ? 'fixed-top' : ''}`}
      >
        <Container style={{ maxWidth }} fluid>
          <div>
            <Link href="/">
              <a className="text-white">TSP Art</a>
            </Link>
          </div>
        </Container>
      </Navbar>
      {sticky && <Container style={{ height: HEADER_HEIGHT }} fluid />}
    </header>
  )
}
