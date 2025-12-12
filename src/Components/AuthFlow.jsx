import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Modal } from 'react-bootstrap';

const AuthFlow = ({ onLogin, onCancel }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Forgot Password States
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [forgotStep, setForgotStep] = useState(1); // 1: Email, 2: OTP, 3: New Password

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (isLogin) {
        // Login logic
        const response = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        
        if (response.ok) {
          onLogin(data.user, data.welcomeMessage);
        } else {
          setMessage(data.error || 'Login failed');
        }
      } else {
        // Register logic
        const response = await fetch('http://localhost:5000/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();
        
        if (response.ok) {
          setMessage(data.message || 'Registration successful! You can now login.');
          setTimeout(() => {
            setIsLogin(true);
            setMessage('Registration successful! Please login with your credentials.');
          }, 3000);
        } else {
          setMessage(data.error || 'Registration failed');
        }
      }
    } catch (error) {
      setMessage('Network error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Forgot Password Functions
  const handleForgotPassword = async () => {
    if (!forgotEmail) {
      setMessage('Please enter your email address');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail })
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage('OTP sent to your email!');
        setForgotStep(2);
      } else {
        setMessage(data.error || 'Failed to send OTP');
      }
    } catch (error) {
      setMessage('Network error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      setMessage('Please enter the OTP');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/verify-reset-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail, otp })
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage('OTP verified! Set your new password.');
        setForgotStep(3);
      } else {
        setMessage(data.error || 'Invalid OTP');
      }
    } catch (error) {
      setMessage('Network error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      setMessage('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail, newPassword })
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage('Password reset successfully! You can now login.');
        setShowForgotPassword(false);
        setForgotStep(1);
        setForgotEmail('');
        setOtp('');
        setNewPassword('');
      } else {
        setMessage(data.error || 'Failed to reset password');
      }
    } catch (error) {
      setMessage('Network error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForgotPassword = () => {
    setShowForgotPassword(false);
    setForgotStep(1);
    setForgotEmail('');
    setOtp('');
    setNewPassword('');
    setMessage('');
  };

  return (
    <>
      <Container fluid style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        minHeight: '100vh', 
        padding: '20px' 
      }}>
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col md={6} lg={4}>
            <Card className="shadow-lg" style={{ borderRadius: '20px', position: 'relative' }}>
              {/* Close Button */}
              <button 
                onClick={onCancel}
                style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  background: 'none',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                  color: '#6c757d'
                }}
              >
                ✕
              </button>

              <Card.Body className="p-4">
                <h3 className="text-center mb-4" style={{ color: '#333' }}>
                  {isLogin ? '🔐 Welcome Back' : '🚀 Join Upanayana'}
                </h3>

                {message && (
                  <Alert variant={
                    message.includes('Welcome') || message.includes('successful') || message.includes('OTP sent') ? 'success' : 'danger'
                  }>
                    {message}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  {!isLogin && (
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        disabled={loading}
                      />
                    </Form.Group>
                  )}

                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </Form.Group>

                  {isLogin && (
                    <div className="text-end mb-3">
                      <Button 
                        variant="link" 
                        className="p-0"
                        onClick={() => setShowForgotPassword(true)}
                      >
                        Forgot Password?
                      </Button>
                    </div>
                  )}

                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="w-100 mb-3"
                    disabled={loading}
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none',
                      padding: '12px',
                      fontSize: '16px',
                      fontWeight: '600'
                    }}
                  >
                    {loading ? '⏳ Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                  </Button>
                </Form>

                <div className="text-center">
                  <Button 
                    variant="link" 
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setMessage('');
                    }}
                    disabled={loading}
                  >
                    {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Forgot Password Modal */}
      <Modal show={showForgotPassword} onHide={resetForgotPassword} centered>
        <Modal.Header closeButton>
          <Modal.Title>🔐 Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {forgotStep === 1 && (
            <>
              <p>Enter your email address to receive a reset OTP</p>
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  disabled={loading}
                />
              </Form.Group>
              <Button 
                variant="primary" 
                onClick={handleForgotPassword}
                disabled={loading}
                className="w-100"
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </Button>
            </>
          )}

          {forgotStep === 2 && (
            <>
              <p>Enter the OTP sent to your email</p>
              <Form.Group className="mb-3">
                <Form.Label>OTP Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  disabled={loading}
                  maxLength={6}
                />
              </Form.Group>
              <Button 
                variant="primary" 
                onClick={handleVerifyOTP}
                disabled={loading}
                className="w-100"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </Button>
            </>
          )}

          {forgotStep === 3 && (
            <>
              <p>Create your new password</p>
              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={loading}
                />
                <Form.Text className="text-muted">
                  Password must be at least 6 characters long
                </Form.Text>
              </Form.Group>
              <Button 
                variant="primary" 
                onClick={handleResetPassword}
                disabled={loading}
                className="w-100"
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </Button>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AuthFlow;