import axios from 'axios'

export const getAllGroups = async () => {
  const res = await axios.get(process.env.DEV_URL + 'api/groups')
  return res
}

export const getSingleGroupInfo = async id => {
  const res = await axios.get(`${process.env.DEV_URL}api/groups/${id}`)
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

export const createGroup = async (name, isPrivate) => {
  const data = await axios.post('/api/groups', { 
    name, private: isPrivate,
  })
  return data
}