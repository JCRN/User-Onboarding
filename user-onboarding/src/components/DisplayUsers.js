import React from 'react'
import { Image, List } from 'semantic-ui-react'
import avatar from '../assets/images/avatar.png'

export default function DisplayUsers({ user }) {
  const { name, email } = user

  return (
    <List divided verticalAlign="middle">
      <List.Item>
        <Image avatar src={avatar} />
        <List.Content>
          <List.Header>{name}</List.Header>
          <List.Description>{email}</List.Description>
        </List.Content>
      </List.Item>
    </List>
  )
}
