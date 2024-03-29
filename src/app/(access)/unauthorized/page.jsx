import React from 'react'
import Link from 'next/link'

export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-md px-8 py-12 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Unauthorized to Access this page</h2>
        <p className="text-gray-600 mb-6 text-center">
          Oops! You do not have permission to access this page.
        </p>
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full">
          <Link href={`/`}>
            Back To Homepage
          </Link>
        </button>
      </div>
    </div>
  )
}