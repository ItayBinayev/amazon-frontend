import React from 'react'
import { Helmet } from 'react-helmet-async'

export const Title = ({children}) => {
  return (
    <Helmet>
        <title>{children}</title>
    </Helmet>
  )
}
