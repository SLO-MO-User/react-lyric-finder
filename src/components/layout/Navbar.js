import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className='navbar navbar-dark bg-dark mb-5'>
      <span className='mb-0 h1 mx-auto'>
        <Link className="navbar-brand" to='/'>LyricFinder</Link>
      </span>
    </nav>
  )
}

export default Navbar
