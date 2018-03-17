import React from "react"
import Link from 'gatsby-link'
import styled from 'styled-components'


class TableOfContents extends React.Component {
  constructor() {
    super();
    this.nodeListItemsToRender = [];
  }
  buildNodes(nodes, level) {
    let currentLevel = level !== undefined ? level : 0;

    // If the node is an Array, it holds the actual page nodes itself,
    // So we want to build the links to those pages.
    // Otherwise, its an object, so it must be a chapter or sub-chapter
    // In that case, build the Chapter <li> and then start the process over.

    // Level only matters because sub-chapters and chapters are styled differently

    // For level, if we've hit an array, then we must be as deeply nested as possible,
    // So the next node we hit will be a top level chapter node, so we're back to level 0.

    Object.keys(nodes).forEach(node => {
      if (Array.isArray(nodes[node])) {
        this.buildLessonItemNodes(nodes[node]);
        currentLevel = 0;
      } else {
        this.buildChapterNodes(node, currentLevel)
        currentLevel += 1;
        this.buildNodes(nodes[node], currentLevel)
      }
    });
  }

  buildChapterNodes(node, level) {
    // If this is a Chapter (and not a subchapter)
    if (level === 0) {
      this.nodeListItemsToRender.push(
        <ChapterLIContainer>
          <h5>
            {node}
          </h5>
        </ChapterLIContainer>
      )
      // Else it's a SubChapter
    } else {
      this.nodeListItemsToRender.push(
        <SubchapterLIContainer>
          <h5>
            {node}
          </h5>
        </SubchapterLIContainer>
      )
    }
  }

  buildLessonItemNodes(nodeArray) {
    nodeArray.forEach(node => {
      this.nodeListItemsToRender.push(
        <LessonLIContainer>
          <Link to={node.post.childMarkdownRemark.fields.slug}>
            <li>
              <h6>{node.post.childMarkdownRemark.frontmatter.title}</h6>
            </li>
          </Link>
        </LessonLIContainer>
      )
    })
  }


  // buildNodesDos() {
    // Start with the highest level nodes
    // Object.keys(nodes).forEach(node => {
      // if the nodes child is an object, its a subchapter title
        // handle subchapter title recursively

      // if its an array, it's the post nodes,
        // handle the post nodes


      // First, extract all the data for that lesson for convenience.
    //   const currentPage = {};
    //   nodes[chapter].forEach(page => {
    //     const postFrontmatter = page.post.childMarkdownRemark.frontmatter
    //     const postNodeFields = page.post.childMarkdownRemark.fields
    //     currentPage.title = postFrontmatter.title
    //     currentPage.path = postNodeFields.slug
    //     currentPage.chapter = postFrontmatter.chapter
    //     currentPage.lessonNumber = postFrontmatter.lessonNumber
    //   })
    //
    //   const chapterLessonsToRender = []
    //   nodes[chapter].forEach(page => {
    //     chapterLessonsToRender.push(
    //       <LessonContainer>
    //         <Link to={page.path}>
    //           <li>
    //             <span>
    //               <p>{page.chapter}.{page.lessonNumber} &nbsp;</p>
    //               <h6>{page.title}</h6>
    //             </span>
    //           </li>
    //         </Link>
    //       </LessonContainer>
    //     )
    //   })
    //
    //   nodeListItemsToRender.push(
    //     <li className='chapter'>
    //       <h5 className='tocHeading'>
    //         {chapter.toUpperCase()}
    //       </h5>
    //       <ul className='chapterItems'>
    //         {chapterLessonsToRender}
    //       </ul>
    //     </li>
    //   )
    // })
  // }


    // const postNodes = []
    // posts.forEach(post => {
    //   if (post.node.frontmatter.type === type) {
    //     const postNode = {
    //       title: post.node.frontmatter.title,
    //       path: post.node.fields.slug,
    //       lessonNumber: post.node.frontmatter.lesson,
    //       chapter: post.node.frontmatter.chapter
    //     }
    //     postNodes.push(postNode)
    //   }
    // })
    //
    // const postNodeChapters = [];
    // postNodes.forEach(post => {
    //   if (postNodeChapters[post.chapter]) {
    //     postNodeChapters[post.chapter].push(post)
    //   } else {
    //     postNodeChapters[post.chapter] = [post]
    //   }
    // })
  //
  //   postNodeChapters.forEach(chapter => {
  //     chapter.sort((a, b) => a.lessonNumber > b.lessonNumber)
  //   })
  //   return postNodeChapters
  // }
  //
  // nodeListItems() {
  //   const postNodeChapters = this.buildNodes()
  //   const listItems = []
  //   const chapterTitles = this.props.chapterTitles
  //   postNodeChapters.forEach((chapter, idx) => {
  //     const chapterLessons = []
  //     chapter.forEach(node => {
  //       chapterLessons.push(
  //         <LessonContainer>
  //           <Link to={node.path}>
  //             <li>
  //               <span>
  //                 <p>{node.chapter}.{node.lessonNumber} &nbsp;</p>
  //                 <h6>{node.title}</h6>
  //               </span>
  //             </li>
  //           </Link>
  //         </LessonContainer>
  //       )
  //     })
  //     listItems.push(
  //       <li className='chapter'>
  //         <h5 className='tocHeading'>
  //           {chapterTitles[idx].toUpperCase()}
  //         </h5>
  //         <ul className='chapterItems'>
  //           {chapterLessons}
  //         </ul>
  //       </li>
  //     )
  //   })
  //   return listItems
  // }

  render() {
    const { posts } = this.props;
    this.nodeListItemsToRender = [];
    this.buildNodes(posts, 0);
    return (
      <TableOfContentsContainer>
        <ul>
          {this.nodeListItemsToRender}
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
    margin: 0;
  }
  
  p, h6 {
    display: inline-block;
    font-weight: 200;
    margin: 0;
  }
  
  .tocHeading {
     font-weight: 200;
     color: ${props => props.theme.brand};
     margin-bottom: 10px;
  }
`

const LessonLIContainer = styled.div`
  h6, p {
    color: black;
    margin: 0;
    line-height: 1.5;
  }
  li {
    margin: 0;
  }
  &:hover {
    li {
      span {
        border-bottom: 1px solid black;
      }
    }
  }
`

const ChapterLIContainer = styled.li``

const SubchapterLIContainer = styled.li``

export default TableOfContents

