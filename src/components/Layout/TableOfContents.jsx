import React from "react"
import Link from 'gatsby-link'
import styled from 'styled-components'


class TableOfContents extends React.Component {
  constructor() {
    super();
    this.nodeListItemsToRender = [];
    this.currentLevel = 0;
  }

  buildNodes(nodes, level) {
    // Level matters because sub-chapter <li> and chapter <li>s are styled differently
    //
    // If the node is an Array, it holds the actual page nodes itself,
    // 1. Add the node's value as either a chapter <li> or subchapter <li> - based on level
      // 2. Build the lesson <li> links
      //
    // Else, its an object, so it must be a chapter or sub-chapter
      // 1. build the Chapter <li>
      // 2. Recursively restart on the child node
    //
    // For level, if we've hit an array, then we must be as deeply nested as possible.
    // So the next node we hit will be a top level chapter node, so we're back to level 0.
    //

    this.currentLevel = level !== undefined ? level : this.currentLevel;

    function getNextNode(postNodes, node) {
      const keys = Object.keys(nodes);
      const nextIndex = keys.indexOf(node) +1;
      return keys[nextIndex];
    }

    Object.keys(nodes).forEach(node => {
      const nextNode = getNextNode(nodes, node);
      if (Array.isArray(nodes[node])) {
        // Add the Lowest Level Chapter Name (Title of Array):
        if (this.currentLevel !== 0) {
          this.nodeListItemsToRender.push(
            <SubchapterLIContainer>
              <h5>
                {node}
              </h5>
            </SubchapterLIContainer>
          );
        } else {
          this.nodeListItemsToRender.push(
            <ChapterLIContainer>
              <h5>
                {node}
              </h5>
            </ChapterLIContainer>
          );
        }
        this.buildLessonItemNodes(nodes[node]);
        if (nextNode === undefined) {
          this.currentLevel -= 1;
        }
      } else {
        this.buildChapterNodes(node, this.currentLevel)
        this.currentLevel += 1;
        this.buildNodes(nodes[node], this.currentLevel)
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

  render() {
    const posts = this.props.posts.chapters;
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

  & > ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  p, h6 {
    display: inline-block;
    font-weight: 200;
    margin: 0;
  }
  
  .tocHeading 
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

const ChapterLIContainer = styled.li`


`

const SubchapterLIContainer = styled.li`
  h5 {
     font-weight: 200;
     color: ${props => props.theme.brand};
     margin-bottom: 10px;
  }
`

export default TableOfContents

