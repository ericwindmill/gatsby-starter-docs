import React from "react"
import Link from 'gatsby-link'
import styled from 'styled-components'


// This class should not be used for listing posts, but for chapter based Docs. See PostListing for that.
// You'll also need to add your chapters to siteConfig

class TableOfContents extends React.Component {
  buildNodes() {
    const {posts} = this.props
    const type = this.props.contentsType
    const postNodes = []
    posts.forEach(post => {
      if (post.node.frontmatter.type === type) {
        const postNode = {
          title: post.node.frontmatter.title,
          path: post.node.fields.slug,
          lessonNumber: post.node.frontmatter.lesson,
          chapter: post.node.frontmatter.chapter
        }
        postNodes.push(postNode)
      }
    })

    const postNodeChapters = [];
    postNodes.forEach(post => {
      if (postNodeChapters[post.chapter]) {
        postNodeChapters[post.chapter].push(post)
      } else {
        postNodeChapters[post.chapter] = [post]
      }
    })

    postNodeChapters.forEach(chapter => {
      chapter.sort((a, b) => a.lessonNumber > b.lessonNumber)
    })
    return postNodeChapters
  }

  nodeListItems() {
    const postNodeChapters = this.buildNodes()
    const listItems = []
    const chapterTitles = this.props.chapterTitles
    postNodeChapters.forEach((chapter, idx) => {
      const chapterLessons = []
      chapter.forEach(node => {
        chapterLessons.push(
          <Link to={node.path}>
            <li className='lessonDetail'>
              <span>{node.chapter}.{node.lessonNumber} &nbsp;</span>
              <h3>{node.title}</h3>
            </li>
          </Link>
        )
      })
      listItems.push(
        <li className='chapter'>
          <h2 className='tocHeading'>
            {chapterTitles[idx].toUpperCase()}
          </h2>
          <ul className='chapterItems'>
            {chapterLessons}
          </ul>
        </li>
      )
    })
    return listItems
  }

  render() {
    return (
      <TableOfContentsContainer>
        <ul>
          {this.nodeListItems()}
        </ul>
      </TableOfContentsContainer>
    )
  }
}

const TableOfContentsContainer = styled.div`

  padding: ${props => props.theme.sitePadding};

  & > ul, .chapterItems {
    list-style: none;
    padding: 0;
  }
  
  .chapter {
  margin-bottom: 15px;
  }
 
  
  p, h3 {
    display: inline-block;
  }
  
  .tocHeading {
     padding-bottom: 15px;
  }
`

export default TableOfContents

