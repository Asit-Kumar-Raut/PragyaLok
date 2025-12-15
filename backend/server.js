const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
const nodemailer = require('nodemailer');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Database Connection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'ex123',
  database: 'learning_platform',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Email transporter (using Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ardiliumplatform@gmail.com', 
    pass: 'axzt dwsb' 
  }
});

// JWT Secret
const JWT_SECRET = 'your-jwt-secret-key-here';

// Initialize Database Tables
async function initializeDatabase() {
  try {
    const connection = await pool.getConnection();
    
    // Users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        is_verified BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // OTP table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS otps (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        otp VARCHAR(6) NOT NULL,
        type ENUM('verification', 'reset') NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        used BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    connection.release();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}

// Generate OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send Email Function
async function sendEmail(to, subject, html) {
  try {
    await transporter.sendMail({
      from: '"Upanayana Learning" <ardiliumplatform@gmail.com>',
      to: to,
      subject: subject,
      html: html
    });
    console.log(`✅ Email sent to ${to}`);
    return true;
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    return false;
  }
}

// Send Welcome Email
async function sendWelcomeEmail(email, name) {
  const subject = '🎉 Welcome to Upanayana - Let\'s Build Your Career!';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; color: white; border-radius: 10px 10px 0 0;">
        <h1>Welcome to Upanayana! 🎓</h1>
        <p>Your journey to career excellence begins now</p>
      </div>
      
      <div style="padding: 30px; background: #f8f9fa;">
        <h2>Hello ${name},</h2>
        <p>We're thrilled to welcome you to <strong>Upanayana Learning Platform</strong>!</p>
        
        <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="color: #667eea;">🚀 What's Next?</h3>
          <ul>
            <li>Explore our wide range of courses</li>
            <li>Connect with expert instructors</li>
            <li>Build in-demand skills for your career</li>
            <li>Join our learning community</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="http://localhost:3000/courses" style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Explore Courses
          </a>
        </div>
        
        <p><strong>Ready to transform your career?</strong> Let's build something amazing together! 💫</p>
        
        <p>Best regards,<br>The Upanayana Team</p>
      </div>
      
      <div style="text-align: center; padding: 20px; background: #e9ecef; border-radius: 0 0 10px 10px;">
        <p style="margin: 0; color: #6c757d;">© 2024 Upanayana Learning Platform. All rights reserved.</p>
      </div>
    </div>
  `;

  return await sendEmail(email, subject, html);
}

// Send OTP Email for Password Reset
async function sendPasswordResetOTP(email, otp) {
  const subject = '🔐 Password Reset OTP - Upanayana';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; background: #dc3545; padding: 20px; color: white; border-radius: 10px 10px 0 0;">
        <h2>Password Reset Request</h2>
      </div>
      
      <div style="padding: 30px; background: #f8f9fa;">
        <p>We received a request to reset your password for your Upanayana account.</p>
        
        <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center;">
          <h3 style="color: #dc3545;">Your OTP Code</h3>
          <div style="font-size: 32px; font-weight: bold; letter-spacing: 10px; color: #333; margin: 20px 0;">
            ${otp}
          </div>
          <p style="color: #6c757d;">This OTP will expire in 10 minutes</p>
        </div>
        
        <p><strong>Didn't request this?</strong> If you didn't request a password reset, please ignore this email. Your account is secure.</p>
        
        <p>Best regards,<br>The Upanayana Team</p>
      </div>
    </div>
  `;

  return await sendEmail(email, subject, html);
}

// Test database connection
pool.getConnection()
  .then(connection => {
    console.log('✅ MySQL Connected successfully!');
    connection.release();
  })
  .catch(error => {
    console.log('❌ MySQL Connection failed:', error.message);
  });

// Test route
app.get('/api/test', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT 1 + 1 AS result');
    res.json({ 
      success: true, 
      message: 'Server is working!', 
      database: 'Connected',
      result: rows[0].result 
    });
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed', details: error.message });
  }
});

// Check if user exists
app.post('/api/check-user', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const [rows] = await pool.execute(
      'SELECT id, email, is_verified FROM users WHERE email = ?',
      [email]
    );

    if (rows.length > 0) {
      res.json({ 
        exists: true, 
        isVerified: rows[0].is_verified,
        message: 'User exists. Please login.'
      });
    } else {
      res.json({ exists: false, message: 'User not found. Please register.' });
    }
  } catch (error) {
    console.error('Check user error:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Register User - AUTO VERIFIED + WELCOME EMAIL
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required' });
    }

    // Check if user already exists
    const [existingUsers] = await pool.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user - AUTO VERIFIED (is_verified = TRUE)
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password, phone, is_verified) VALUES (?, ?, ?, ?, TRUE)',
      [name, email, hashedPassword, phone || null]
    );

    // Send welcome email (don't wait for it)
    sendWelcomeEmail(email, name);

    console.log(`✅ New user registered: ${email}`);

    res.json({ 
      success: true, 
      message: 'Registration successful! Welcome email sent.',
      userId: result.insertId
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed', details: error.message });
  }
});

// Forgot Password - SEND OTP
app.post('/api/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Check if user exists
    const [users] = await pool.execute(
      'SELECT id, name FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(400).json({ error: 'No account found with this email address' });
    }

    const user = users[0];

    // Generate OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Delete any existing OTPs for this email
    await pool.execute('DELETE FROM otps WHERE email = ? AND type = ?', [email, 'reset']);

    // Insert new OTP
    await pool.execute(
      'INSERT INTO otps (email, otp, type, expires_at) VALUES (?, ?, ?, ?)',
      [email, otp, 'reset', expiresAt]
    );

    // Send OTP email
    const emailSent = await sendPasswordResetOTP(email, otp);

    if (emailSent) {
      res.json({ 
        success: true, 
        message: 'Password reset OTP sent to your email. Please check your inbox.'
      });
    } else {
      res.status(500).json({ 
        success: false, 
        error: 'Failed to send OTP email. Please try again.' 
      });
    }
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'Failed to process request', details: error.message });
  }
});

// Verify OTP for Password Reset
app.post('/api/verify-reset-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ error: 'Email and OTP are required' });
    }

    // Check OTP
    const [otpRows] = await pool.execute(
      'SELECT * FROM otps WHERE email = ? AND otp = ? AND type = ? AND used = FALSE AND expires_at > NOW()',
      [email, otp, 'reset']
    );

    if (otpRows.length === 0) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    // Mark OTP as used
    await pool.execute(
      'UPDATE otps SET used = TRUE WHERE id = ?',
      [otpRows[0].id]
    );

    res.json({ 
      success: true, 
      message: 'OTP verified successfully. You can now reset your password.' 
    });
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({ error: 'OTP verification failed', details: error.message });
  }
});

// Reset Password after OTP verification
app.post('/api/reset-password', async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ error: 'Email and new password are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    const [result] = await pool.execute(
      'UPDATE users SET password = ? WHERE email = ?',
      [hashedPassword, email]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({ error: 'User not found' });
    }

    res.json({ 
      success: true, 
      message: 'Password reset successfully! You can now login with your new password.' 
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'Password reset failed', details: error.message });
  }
});

// Login - WITH WELCOME MESSAGE
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const [users] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(400).json({ error: 'User not found' });
    }

    const user = users[0];

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Welcome message based on time
    const hour = new Date().getHours();
    let greeting = 'Welcome';
    if (hour < 12) greeting = 'Good morning';
    else if (hour < 17) greeting = 'Good afternoon';
    else greeting = 'Good evening';

    const welcomeMessage = `${greeting} ${user.name}! 🎉 Welcome to Upanayana - Let's build your career together!`;

    res.json({
      success: true,
      token,
      welcomeMessage: welcomeMessage,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed', details: error.message });
  }
});

const PORT = 5000;

app.listen(PORT, async () => {
  await initializeDatabase();
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Test server: http://localhost:${PORT}/api/test`);
  console.log(`📧 Email service: Ready`);
});
