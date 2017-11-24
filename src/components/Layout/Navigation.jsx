import React from "react"
import Link from 'gatsby-link'
import styled from 'styled-components'
import UserLinks from '../UserLinks'

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background: transparent;
`

const linkStyles = {
  fontSize: '2rem',
  paddingRight: '10px',
}

class MainHeader extends React.Component {
  render() {
    return (
      <NavContainer>
        <section>
          <Link to='/about' style={ linkStyles } > About </Link>
          <Link to='#' style={ linkStyles } > Link </Link>
          <Link to='#' style={ linkStyles } > Link </Link>
        </section>
        <UserLinks />
      </NavContainer>
    )
  }
}

export default MainHeader