import React from 'react'
import Helmet from 'react-helmet'
import { ThemeProvider } from 'styled-components'
import './css/index.css'
import './css/prism-okaidia.css'
import { StaticQuery, graphql } from 'gatsby'
import theme from './theme'

export default ({ children }) => (
  <StaticQuery
    query={graphql`
      query LayoutQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          titleTemplate={`%s | ${data.site.siteMetadata.title}`}
          defaultTitle={data.site.siteMetadata.title}
        />
        <div>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </div>
      </>
    )}
  />
)
