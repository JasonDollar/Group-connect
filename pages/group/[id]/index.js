import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import fetch from 'isomorphic-unfetch'

const groupPage = props => {
  const getData = async id => {
    const data = await axios.get(`/api/groups/${id}`)
    console.log(data)
    return data
  }
  const router = useRouter()
  const { id } = router.query
  useEffect(() => {
    getData(id)

  }, [])
  console.log(props)
  return (
    <div>
      s
    </div>
  )
}

export default groupPage

// groupPage.getInitialProps = async ({ query }) => {
//   // console.log(query)
//   const res = await fetch(`/api/groups/${query.id}`)
//   const data = res.json()
//   return { group: data }
// }