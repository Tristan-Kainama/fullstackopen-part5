import { useNavigate } from 'react-router-dom'

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
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>

        <br />

        <label>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>

      <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
