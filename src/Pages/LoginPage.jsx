import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';

const LoginPage= ({ onLogin, onForgotPassword, onNewUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userData', JSON.stringify(data.user));
        onLogin(data.user);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="auth-title">Welcome Back</h3>
      <p className="auth-subtitle">Sign in to your account</p>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </Form.Group>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <Form.Check 
            type="checkbox" 
            label="Remember me" 
          />
          <Button variant="link" className="p-0" onClick={onForgotPassword}>
            Forgot password?
          </Button>
        </div>

        <Button
          variant="primary"
          type="submit"
          className="w-100 auth-btn"
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner size="sm" className="me-2" />
              Signing in...
            </>
          ) : (
            'Sign In'
          )}
        </Button>
      </Form>

      <div className="text-center mt-3">
        <Button variant="link" onClick={onNewUser}>
          New user? Create an account
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;