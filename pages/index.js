import React, { useEffect } from 'react'
// import Link from 'next/link'
import Head from 'next/head'

const Home = () => {
  useEffect(() => {
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => console.log(data))
  }, [])

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <h1>Hello, index page</h1>
      
    </div>
  )
}

export default Home
