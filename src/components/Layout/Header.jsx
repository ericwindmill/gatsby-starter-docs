import React from "react"
import styled from 'styled-components'
import Navigation from './Navigation'

const IndexHeadContainer = styled.div`
  background: ${props => props.theme.brand};
  padding: ${props => props.theme.sitePadding};
`

const SiteContainer = styled.div`
  background: ${props => props.theme.brand};
  padding: ${props => props.theme.sitePadding};
`

class MainHeader extends React.Component {
  getHeader () {
    if (this.props.location.pathname === '/') {
      return(
        <IndexHeadContainer>
          <Navigation />
          <h1>{this.props.siteTitle}</h1>
        </IndexHeadContainer>
      )
    } else {
     return(
       <SiteContainer>
         <Navigation />
       </SiteContainer>
     )
    }
  }

  render() {
    return(
        this.getHeader()
    )
  }
}

export default MainHeader