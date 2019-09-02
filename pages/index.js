import React, { useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'

const Home = () => 
  // useEffect(() => {
  //   fetch('/api/hello')
  //     .then(res => res.json())
  //     .then(data => console.log(data))
  // }, [])

   (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <h1>Hello, index page</h1>
      <h3>Links</h3>
      <Link href="/group">
        <a>Groups</a>
      </Link>
      <Link href="/signin">
        <a>Sign in</a>
      </Link>
      <Link href="/signup">
        <a>Sign up</a>
      </Link>
    </div>
  )


export default Home
