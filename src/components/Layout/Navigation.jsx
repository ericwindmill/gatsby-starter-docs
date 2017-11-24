import React from "react"
import Link from 'gatsby-link'
import styled from 'styled-components'
import UserLinks from '../UserLinks'

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

class MainHeader extends React.Component {
  render() {
    return (
      <NavContainer>
        <section>
          <Link to='#'> Link 1 </Link>
          <Link to='#'> Link 2 </Link>
          <Link to='#'> Link 3 </Link>
        </section>
        <UserLinks />
      </NavContainer>
    )
  }
}

export default MainHeader