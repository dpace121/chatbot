import React from 'react'

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <button
        type="button"
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg"
        disabled
      >
        Loading...
      </button>
    </div>
  )
}

export default Loading