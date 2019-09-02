import React, { useState } from 'react'
import { loginUser } from '../lib/api'

const signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const handleSubmit = async e => {
    e.preventDefault()
    try {

      const data = await loginUser(email, password)
      console.log(data)
    } catch (e) {
      setError(e)
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        {error && <p>{error.response.data.message}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default signup
