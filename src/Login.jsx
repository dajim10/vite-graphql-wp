import React, { useState } from 'react';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the form data to the API
    try {
      const response = await fetch('https://eloginx.rmutsv.ac.th', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok && data.status === true) {
        setLoginSuccess(true);
      } else {
        setLoginSuccess(false);
      }
    } catch (error) {
      console.log('An error occurred:', error);
      setLoginSuccess(false);
    }
  };

  return (
    <div className="container">
      <h1>Login Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      {loginSuccess && (
        <div className="popup">
          <p>Login successful!</p>
        </div>
      )}

      <style jsx>{`
        .container {
          width: 300px;
          padding: 20px;
          background-color: #f2f2f2;
          margin: 0 auto;
          margin-top: 100px;
          border: 1px solid #ccc;
        }

        h1 {
          text-align: center;
          margin-bottom: 20px;
        }

        .form-control {
          margin-bottom: 20px;
        }

        label {
          display: block;
          margin-bottom: 5px;
        }

        input[type='text'],
        input[type='password'] {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        button {
          width: 100%;
          padding: 10px;
          background-color: #4caf50;
          color: white;
          border: none;
          cursor: pointer;
          border-radius: 4px;
        }

        .popup {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: #fff;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}

export default LoginForm;
