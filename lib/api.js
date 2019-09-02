import axios from 'axios'

export const getAllGroups = async () => {
  const res = await axios.get('/api/groups')
  return res.data
}

export const getSingleGroupInfo = async id => {
  const res = await axios.get(`/api/groups/${id}`)
  return res
}

export const createAccount = async (name, email, password, passwordConfirm) => {
  const data = await axios.post('/api/users/create', { 
    name, email, password, passwordConfirm,
  })
  return data
}

export const loginUser = async (email, password) => {
  const data = await axios.post('/api/users/login', { 
    email, password,
  })
  return data
}