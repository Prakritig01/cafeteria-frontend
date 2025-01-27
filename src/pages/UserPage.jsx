import React from 'react'
import NavbarLayout from '@/components/NavbarLayout'

const UserPage = () => {
  return (
    <div>
      User Page
    </div>
  )
}

export default function (){
  return <>
  <NavbarLayout>
    <UserPage />
  </NavbarLayout>
  </>
}
