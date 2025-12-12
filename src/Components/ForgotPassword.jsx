import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';

const ForgotPassword = ({ onBackToLogin, onOTPSent }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      
      if (response.ok) {
        setSuccess('OTP sent to your email!');
        setTimeout(() => {
          onOTPSent();
        }, 2000);
      } else {
        setError(data.error || 'Failed to send OTP');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="auth-title">Reset Password</h3>
      <p className="auth-subtitle">Enter your email to receive OTP</p>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

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
              Sending OTP...
            </>
          ) : (
            'Send OTP'
          )}
        </Button>
      </Form>

      <div className="text-center mt-3">
        <Button variant="link" onClick={onBackToLogin}>
          Back to Login
        </Button>
      </div>
    </div>
  );
};

export default ForgotPassword;