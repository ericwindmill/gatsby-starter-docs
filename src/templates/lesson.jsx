import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components"

import SEO from "../components/SEO/SEO"
import SiteHeader from '../components/Layout/Header'
import config from "../../data/SiteConfig"
import TableOfContents from "../components/Layout/TableOfContents";



const BodyGrid = styled.div`
  display: grid;
  grid-template-rows: 75px 1fr;
  grid-template-columns: 250px 1fr;
`

const BodyContainer = styled.div`
  padding: ${props => props.theme.sitePadding};
  grid-column: 2 / 3;
  grid-row: 2 / 3;
`

const HeaderContainer = styled.div`
  grid-column: 1 / 3;
  grid-row: 1 / 2;
`

const ToCContainer = styled.div`
  grid-column: 1 / 2;
  grid-row: 2 / 3;
`


export default class LessonTemplate extends React.Component {
  render() {
    const { slug } = this.props.pathContext;
    const postNode = this.props.data.postBySlug;
    const post = postNode.frontmatter;
    if (!post.id) {
      post.id = slug;
    }
    if (!post.id) {
      post.category_id = config.postDefaultCategoryID;
    }
    return (
      <div>
        <Helmet>
          <title>{`${post.title} | ${config.siteTitle}`}</title>
        </Helmet>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <BodyGrid>
          <HeaderContainer>
            <SiteHeader location={this.props.location}/>
          </HeaderContainer>
          <ToCContainer>
            <TableOfContents
              posts={this.props.data.allPostTitles.edges}
              contentsType="lesson"
              chapterTitles={config.toCChapters}
            />
          </ToCContainer>
          <BodyContainer>
            <h1>
              {post.title}
            </h1>
            <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
          </BodyContainer>
        </BodyGrid>
      </div>
    );
  }
}

/* eslint no-undef: "off"*/
export const pageQuery = graphql`
  query LessonBySlug($slug: String!) {
    allPostTitles: allMarkdownRemark{
        edges {
          node {
            frontmatter {
              title
              lesson
              chapter
              type
            }
            fields {
              slug
            }
          }
        }
      }
      postBySlug: markdownRemark(fields: { slug: { eq: $slug } }) {
        html
        timeToRead
        excerpt
        frontmatter {
          title
          cover
          date
          category
          tags
        }
        fields {
          slug
        }
      } 
  }
`;
