import React from 'react'
import Profile from './Profile'

const ProfileList = () => {
  const profiles = [1,3 ,4,6]
  return (
    <div>
      {profiles.map((profile, i) => (<Profile key={i}/>))}
    </div>
  )
}

export default ProfileList