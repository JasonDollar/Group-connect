import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { getAllGroups } from '../../lib/api'

const GroupPage = props => (
    <div>
      <p>groups all</p>
      {props.groups && props.groups.map(item => (
        <Link
          key={item.id}
          href={{
            pathname: `/group/${item.id}`,
            query: { n: item.slug },
          }}
          // as={`/group/${item.slug}`}
        >
          <a>

          {item.name}
          </a>
        </Link>
      ))}
      {/* {props.error && <p>{props.error.response.data.message}</p>} */}
    </div>
)

// const [groups, setGroups] = useState([])
// console.log(props)
// useEffect(() => {
// getAllGroups()
//   .then(data => {

//     if (data.message = 'success') {
//       setGroups(data.data)
//     }
//   })
//   .catch(e => console.log(e))
// change 'success' string for const variable
// }, [])



export default GroupPage

GroupPage.getInitialProps = async () => {
  try {
    const res = await getAllGroups()
    // console.log(res)
    // return res
    return { groups: res.data ? res.data.data : null, error: null }

  } catch (e) {
    return { error: e, groups: null }
  }
}