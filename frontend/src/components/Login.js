import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logo.png'; // Adjust the path to your image location

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column; /* Adjust for vertical alignment */
`;

const Logo = styled.img`
  width: 350px; /* Set the desired width */
  margin-bottom: 20px; /* Add some space below the logo */
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #1a237e;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const SignUpLink = styled.p`
  text-align: center;
  margin-top: 10px;

  a {
    color: #1a237e;
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

function Login() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle login validation (for now, just navigate to dashboard)
    if (studentId === password) {
      navigate('/dashboard'); // Redirect to dashboard or home page after successful login
    } else {
      alert('Login failed! Make sure your Student ID matches the password.');
    }
  };

  return (
    <Container>
      <Logo src={logo} alt="App Logo" /> {/* Add the logo here */}
      <Form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Input 
          type="text" 
          value={studentId} 
          onChange={(e) => setStudentId(e.target.value)} 
          placeholder="Student ID"
          required
        />
        <Input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password"
          required
        />
        <Button type="submit">Login</Button>

        {/* Sign up link that redirects to Sign Up page */}
        <SignUpLink>
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </SignUpLink>
      </Form>
    </Container>
  );
}

export default Login;
