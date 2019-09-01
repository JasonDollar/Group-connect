import React, { useState } from 'react'
import axios from 'axios'

const signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const handleSubmit = async e => {
    e.preventDefault()
    const data = await axios.post('/api/users/create', { 
      name, email, password, passwordConfirm,
    })
    console.log(data)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div>
          <label htmlFor="passwordConfirm">Confirm Password:</label>
          <input type="password" id="passwordConfirm" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default signup
