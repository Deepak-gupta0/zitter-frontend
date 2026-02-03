import React from 'react'
import ProfileList from './ProfileList'

const WhoToFollow = () => {
  return (
    <div className='outline outline-gray-200/50 rounded-xl p-3'>
      <div className='my-2'>
      <h1 className='font-bold text-2xl '>Who to follow</h1>
      </div>
      <ProfileList />
    </div>
  )
}

export default WhoToFollow