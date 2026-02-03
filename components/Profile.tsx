import { User } from 'lucide-react'
import React from 'react'

const Profile = () => {
  return (
    <div className="mb-1">
        <button className="w-full flex items-center gap-3 p-3 rounded-full hover:bg-gray-100/10 transition-colors">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-gray-600" />
          </div>
          <div className="flex-1 text-left">
            <div className="font-bold text-sm">Your Name</div>
            <div className="text-gray-500 text-sm">@username</div>
          </div>
          {/* <MoreHorizontal className="w-5 h-5" /> */}
        </button>
      </div>
  )
}

export default Profile