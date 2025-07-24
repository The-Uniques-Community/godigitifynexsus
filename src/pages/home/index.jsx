import React from 'react'
import { Link } from 'react-router'
import Hero from './components/Hero'
import About from './components/About'
import Project from './Project'

const index = () => {
  return (
    <div>
        <Hero />
        <About />
        <Project />
    </div>
  )
}

export default index