import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const getBlog = async (id) => {
  const blogUrl = baseUrl + '/' + id

  const response = await axios.get(blogUrl)
  return response.data
}

const create = async (credentials) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, credentials, config)
  return response.data
}

const update = async (credentials, id) => {
  const blogUrl = baseUrl + '/' + id

  const response = await axios.put(blogUrl, credentials)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: {Authorization: token }
  }

  const blogUrl = baseUrl + '/' + id

  const response = await axios.delete(blogUrl, config)
  return response.data
}

export default { getAll, getBlog, create, setToken, update, remove }