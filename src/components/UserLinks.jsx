import React, {Component} from 'react'
import {FaGithubAlt, FaTwitter, FaInstagram} from 'react-icons/lib/fa'
import {MdMessage, MdEmail} from 'react-icons/lib/md'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    max-width: 100%;
`

const UserIcon = styled.a`
  color: red;
`

const iconStyle = {
  width: '25px',
  height: '25px',
}

class UserLinks extends Component {
  render() {
    return (
      <Container className="user-links">
        <UserIcon href='https://github.com/ericwindmill'>
          <FaGithubAlt style={iconStyle} />
        </UserIcon>
        <UserIcon href='https://twitter.com/ericwindmill?lang=en'>
          <FaTwitter style={iconStyle} />
        </UserIcon>
        <UserIcon href="https://www.messenger.com/t/eric.windmill">
          <MdMessage style={iconStyle} />
        </UserIcon>
        <UserIcon href="mailto:eric@ericwindmill.com">
          <MdEmail style={iconStyle} />
        </UserIcon>
      </Container>
    )
  }
}

export default UserLinks