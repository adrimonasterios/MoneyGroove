import React from 'react'
import { useHistory } from 'react-router-dom'


export default function Logout(props) {
  const history = useHistory()

  props.logoutUser()
  history.push('/home')

  return (
    <div>
    </div>
  )
}
