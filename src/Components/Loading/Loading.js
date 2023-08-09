import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loading = () => {
  return (
    <div className='text-center'>
    <Spinner animation='border' role='status'><span className='visually-hidden'></span></Spinner>
    </div>
  )
}

export default Loading