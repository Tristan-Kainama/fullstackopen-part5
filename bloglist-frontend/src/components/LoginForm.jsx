import { useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material'

const LoginForm = ({ handleLogin, username, password, setUsername, setPassword }) => {
  const navigate = useNavigate()

  const submitLogin = async (event) => {
    const loginSucceeded = await handleLogin(event)

    if (loginSucceeded) {
      navigate('/')
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={submitLogin}>
      <div>
        <TextField 
        label='username'
        value={username}
        onChange={({ target }) => setUsername(target.value)}
        />

        <br />

        <TextField
        label='password'
        type='password'
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        style={{ marginTop: 10 }}
        />
      </div>

      <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
        login
      </Button>
      </form>
    </div>
  )
}

export default LoginForm
