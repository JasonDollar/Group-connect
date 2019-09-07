import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { getAllGroups } from '../../lib/api'

const GroupPage = props => (
    <div>
      <p>groups all</p>
      <ul>

        {props.groups && props.groups.map(item => (
          <li key={item.id}>
            <Link
              
              href={{
                pathname: `/group/${item.hashid}`,
                query: { n: item.slug },
              }}
              // as={`/group/${item.slug}`}
            >
              <a>

              {item.name}
              </a>
            </Link>

          </li>
        ))}
      </ul>
      {/* {props.error && <p>{props.error.response.data.message}</p>} */}
    </div>
)



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