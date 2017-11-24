import React from "react"
import styled from 'styled-components'
import Navigation from './Navigation'

const Container = styled.div`
  background: ${props => props.theme.brand};
  padding: ${props => props.theme.sitePadding};
`

class MainHeader extends React.Component {
  render() {
    return(
        <Container>
          <Navigation />
          <h1>{this.props.siteTitle}</h1>
        </Container>
    )
  }
}

export default MainHeader