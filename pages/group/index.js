import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { getAllGroups } from '../../lib/api'

const GroupPage = () => {
  const [groups, setGroups] = useState([])
  useEffect(() => {
    getAllGroups()
      .then(data => {

        if (data.message = 'success') {
          setGroups(data.data)
        }
      })
      .catch(e => console.log(e))
    // change 'success' string for const variable
  }, [])
  console.log(groups)
  return (
    <div>
      <p>groups all</p>
      {groups.map(item => (
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
    </div>
  )
}

export default GroupPage

// GroupPage.getInitialProps = async () => {
//   const res = await axios.get('/api/groups')
//   return res
// }