import React from "react"
import Link from 'gatsby-link'
import styled from 'styled-components'
import UserLinks from '../UserLinks'

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background: ${props => props.theme.brand};
`

const linkStyles = {
  fontSize: '1.6rem',
  paddingRight: '10px',
  fontWeight: '200'
}

class Navigation extends React.Component {

  render() {
    return (
      <NavContainer>
        <section>
          <Link to='/' style={ linkStyles } > HOME </Link>
          <Link to='/lesson-one' style={ linkStyles } > DOCS </Link>
          <Link to='/about' style={ linkStyles } > ABOUT </Link>
        </section>
        <UserLinks />
      </NavContainer>
    )
  }
}

export default Navigation