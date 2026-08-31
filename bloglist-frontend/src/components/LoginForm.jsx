const LoginForm = ({ handleLogin, username, password, setUsername, setPassword }) => (
  <div>
    <form onSubmit={handleLogin}>
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

export default LoginForm
