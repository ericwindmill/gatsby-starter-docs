import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

const Links = ({ entries, index }) => (
  <StyledLinkList>
    {entries.map(({ entry }, key) => (
      <EntryListItem key={`link${index}${key}`}>
        <Link to={entry.childMarkdownRemark.fields.slug}>
          <EntryTitle>{entry.childMarkdownRemark.frontmatter.title}</EntryTitle>
        </Link>
      </EntryListItem>
    ))}
  </StyledLinkList>
)

const Chapters = ({ chapters, index }) => (
  <StyledSubchapterList>
    {chapters.map(({ entries, title }, key) => (
      <li key={`subchapter${index}${key}`}>
        <SubchapterTitle>{title}</SubchapterTitle>
        <Links entries={entries} index={`subchapter${index}${key}`} />
      </li>
    ))}
  </StyledSubchapterList>
)

const chapterMapper = ({ chapters, entries, title }, index) => (
  <li key={`chapter${index}`}>
    <ChapterTitle>{title}</ChapterTitle>
    {chapters && <Chapters chapters={chapters} index={index} />}
    {entries && <Links entries={entries} index={index} />}
  </li>
)

const TableOfContents = ({ chapters }) => (
  <StyledChapterList>{chapters.map(chapterMapper, [])}</StyledChapterList>
)

export default TableOfContents

const StyledChapterList = styled.ol`
  list-style: none;
  padding: ${props => props.theme.sitePadding};
  margin: 0;
`
const StyledSubchapterList = styled.ol`
  list-style: none;
`

const StyledLinkList = styled.ol`
  list-style: none;
`

const EntryTitle = styled.h6`
  display: inline-block;
  font-weight: 200;
  color: black;
  margin: 0;
  line-height: 1.5;
  border-bottom: 1px solid transparent;
  text-decoration: none;
`

const EntryListItem = styled.li`
  margin: 0;
  a:hover {
    border-bottom: 1px solid black;
  }
`

const ChapterTitle = styled.h5`
  font-weight: 200;
  font-size: 2.8rem;
  color: ${props => props.theme.brand};
  margin-bottom: 10px;
`

const SubchapterTitle = styled.h5`
  font-weight: 600;
  color: black;
  margin-bottom: 5px;
`
