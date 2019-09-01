import React, { useEffect } from 'react'

const Posts = () => {
  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => console.log(data))
  }, [])
  return (
    <div>
      sd
    </div>
  )
}

export default Posts
