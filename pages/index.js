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
      <ul>
        <li>
          <Link href="/group">
            <a>Groups</a>
          </Link>
        </li>
        <li>
          <Link href="/group/create">
            <a>Create group</a>
          </Link>
        </li>
        <li>
          <Link href="/signin">
            <a>Sign in</a>
          </Link>
        </li>
        <li>
          <Link href="/signup">
            <a>Sign up</a>
          </Link>
        </li>
      </ul>
   


    </div>
  )


export default Home
