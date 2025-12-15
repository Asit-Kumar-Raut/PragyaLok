import React, { useState, useRef, useEffect } from 'react';
import { Form, Button, Alert, Spinner, Row, Col } from 'react-bootstrap';

const OTPVerification = ({ email, type, onVerified, onBack }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(600); // 10 minutes
  const inputRefs = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      setError('Please enter complete OTP');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          otp: otpString,
          type
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        onVerified();
      } else {
        setError(data.error || 'OTP verification failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    setError('');

    try {
      const endpoint = type === 'verification' ? '/api/register' : '/api/forgot-password';
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      
      if (response.ok) {
        setTimer(600); // Reset timer
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0].focus();
      } else {
        setError(data.error || 'Failed to resend OTP');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <h3 className="auth-title">Verify OTP</h3>
      <p className="auth-subtitle">
        Enter the 6-digit code sent to<br />
        <strong>{email}</strong>
      </p>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Row className="justify-content-center mb-4">
          {otp.map((digit, index) => (
            <Col xs={2} key={index} className="px-1">
              <Form.Control
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="otp-input text-center"
                maxLength={1}
                disabled={loading}
              />
            </Col>
          ))}
        </Row>

        <div className="mb-3">
          <small className="text-muted">
            Time remaining: <strong>{formatTime(timer)}</strong>
          </small>
        </div>

        <Button
          variant="primary"
          type="submit"
          className="w-100 auth-btn mb-2"
          disabled={loading || timer === 0}
        >
          {loading ? (
            <>
              <Spinner size="sm" className="me-2" />
              Verifying...
            </>
          ) : (
            'Verify OTP'
          )}
        </Button>

        <Button
          variant="outline-secondary"
          className="w-100"
          onClick={handleResendOTP}
          disabled={loading || timer > 540} // Can resend after 1 minute
        >
          Resend OTP
        </Button>
      </Form>

      <div className="text-center mt-3">
        <Button variant="link" onClick={onBack}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default OTPVerification;