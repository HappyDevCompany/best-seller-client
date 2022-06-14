import React from 'react'
import LoginLayout from '../../components/LoginLayout'
import RegisterLayout from '../../components/RegisterLayout'

const Login = () => {
  return (
    <div className="h-full w-full absolute bg-gray-200 flex items-center">
      <div className="w-3/4 bg-white shadow mx-auto flex md:flex-row flex-col">
        <div className="w-full md:w-1/2 py-7 px-10 relative">
          <LoginLayout />
        </div>
        <div className="w-full md:w-1/2 bg-blue-500 py-7 px-10 relative">
          <RegisterLayout />
        </div>
      </div>
    </div>
  )
}

export default Login