import React from "react"
import Link from 'gatsby-link'
import styled from 'styled-components'
import UserLinks from '../UserLinks'

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background: ${props => props.theme.brand};
`

const linkStyles = {
  fontSize: '2rem',
  paddingRight: '10px',
}

class Navigation extends React.Component {

  render() {
    return (
      <NavContainer>
        <section>
          <Link to='/' style={ linkStyles } > Home </Link>
          <Link to='#' style={ linkStyles } > Link </Link>
          <Link to='#' style={ linkStyles } > Link </Link>
        </section>
        <UserLinks />
      </NavContainer>
    )
  }
}

export default Navigation