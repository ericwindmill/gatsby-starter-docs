import React from "react"
import styled from 'styled-components'
import Navigation from './Navigation'

class MainHeader extends React.Component {
  getHeader () {
    if (this.props.location.pathname === '/') {
      return(
        <IndexHeadContainer>
          <Navigation />

          <Hero>
            <h1>{this.props.siteTitle}</h1>

          </Hero>
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

const IndexHeadContainer = styled.div`
  background: ${props => props.theme.brand};
  padding: ${props => props.theme.sitePadding};
`

const SiteContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${props => props.theme.brand};
  height: 100%;
  padding: 0 25px;
`

const Hero = styled.div`
  padding: 50px;
  & > h1 {
    font-weight: 600;  
  }
`

export default MainHeader


