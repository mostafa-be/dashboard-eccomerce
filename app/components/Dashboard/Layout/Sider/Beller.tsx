import { Bell } from 'lucide-react'
import React from 'react'

const Beller = () => {
  return (
    <div className="flex items-center gap-3">
    <div className="relative">
      <span className="p-1 rounded-full absolute top-0 right-0 bg-red-500"></span>
      <Bell size={20} className="text-gray-700/90 dark:text-white" />
    </div>
  </div>
  )
}

export default Beller