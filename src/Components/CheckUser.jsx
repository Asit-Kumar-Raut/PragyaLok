import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';

const CheckUser = ({ onUserCheck }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/check-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      
      if (response.ok) {
        onUserCheck(data);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <h3 className="auth-title">Welcome Back!</h3>
      <p className="auth-subtitle">Enter your email to continue</p>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="w-100 auth-btn"
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner size="sm" className="me-2" />
              Checking...
            </>
          ) : (
            'Continue'
          )}
        </Button>
      </Form>

      <div className="mt-3">
        <small className="text-muted">
          We'll check if you have an account and guide you accordingly.
        </small>
      </div>
    </div>
  );
};

export default CheckUser;