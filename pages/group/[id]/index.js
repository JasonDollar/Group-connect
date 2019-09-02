import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getSingleGroupInfo } from '../../../lib/api'

const groupPage = ({ groupInfo }) => {
  // const [groupInfo, setGroupInfo] = useState({
  //   name: '',
  // })
  const router = useRouter()
  const { id } = router.query
  // useEffect(() => {
  //   getSingleGroupInfo(id)
  //     .then(res => {
  //       console.log(res)
  //       setGroupInfo(res.data.data)
  //     })

  // }, [])
  // console.log(groupInfo)
  return (
    <div>
      <h1>{groupInfo.data.name}</h1>
    </div>
  )
}

export default groupPage

groupPage.getInitialProps = async ({ query }) => {
  // console.log(query)
  const res = await getSingleGroupInfo(query.id)
  // const data = res.json()
  return { groupInfo: res.data }
}