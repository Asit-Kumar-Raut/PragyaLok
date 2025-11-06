import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ai.css';
import Upanayana from './upanayana';

const AI = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Sample courses data
  const courses = [
    {
      id: 1,
      title: "Web Development Bootcamp",
      description: "Learn full-stack web development with modern technologies",
      duration: "12 weeks",
      price: "$299",
      level: "Beginner to Advanced",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400",
      page: "webdev"
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      description: "Master data analysis, visualization, and machine learning",
      duration: "10 weeks",
      price: "$349",
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
      page: "datascience"
    },
    {
      id: 3,
      title: "Mobile App Development",
      description: "Build iOS and Android apps with React Native",
      duration: "8 weeks",
      price: "$279",
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400",
      page: "mobileapp"
    },
    {
      id: 4,
      title: "UI/UX Design Masterclass",
      description: "Learn professional design principles and tools",
      duration: "6 weeks",
      price: "$229",
      level: "All Levels",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400",
      page: "uiux"
    }
  ];

  const suggestedQuestions = [
    "What courses do you offer?",
    "How to enroll in a course?",
    "What are the course fees?",
    "Do you provide certificates?",
    "What is the course duration?",
    "Are there any prerequisites?"
  ];

  const handleSendMessage = (message = inputMessage) => {
    if (message.trim() === '') return;

    // Add user message
    const newMessages = [...messages, { type: 'user', content: message }];
    setMessages(newMessages);
    setInputMessage('');
    setShowQuestions(false);

    // Simulate AI response after delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(message);
      setMessages([...newMessages, { type: 'ai', content: aiResponse }]);
    }, 1000);
  };

  const generateAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('course') && lowerMessage.includes('offer')) {
      return {
        type: 'courses',
        data: courses
      };
    } else if (lowerMessage.includes('enroll') || lowerMessage.includes('join')) {
      return {
        type: 'text',
        content: `To enroll in any course, follow these steps:\n\n1. **Browse Courses**: Check out all available courses\n2. **Select Course**: Click on the course you're interested in\n3. **Click Enroll**: Press the "Enroll Now" button on course page\n4. **Fill Details**: Provide your information\n5. **Make Payment**: Choose your payment method\n6. **Get Access**: Start learning immediately!\n\nYou can click on any course below to view details and enroll.`
      };
    } else if (lowerMessage.includes('fee') || lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return {
        type: 'text',
        content: `Our course fees are designed to be affordable:\n\n• **Web Development Bootcamp**: $299\n• **Data Science Fundamentals**: $349\n• **Mobile App Development**: $279\n• **UI/UX Design Masterclass**: $229\n\n💡 **Special Offers**:\n- Bundle discount available for multiple courses\n- Installment plans (3-6 months)\n- Scholarship programs for eligible students\n\nWhich course are you interested in?`
      };
    } else if (lowerMessage.includes('certificate') || lowerMessage.includes('certification')) {
      return {
        type: 'text',
        content: `Yes! We provide internationally recognized certificates:\n\n🎓 **Certificate Features**:\n• Digital certificate upon completion\n• Optional hard copy (additional $25)\n• Verification QR code for employers\n• LinkedIn sharing capability\n• Lifetime validity\n\nAll certificates include your name, course title, completion date, and unique verification code.`
      };
    } else if (lowerMessage.includes('duration') || lowerMessage.includes('length') || lowerMessage.includes('time')) {
      return {
        type: 'text',
        content: `Course durations are flexible to fit your schedule:\n\n⏰ **Time Commitment**:\n• Web Development: 12 weeks (recommended)\n• Data Science: 10 weeks (recommended)\n• Mobile Development: 8 weeks (recommended)\n• UI/UX Design: 6 weeks (recommended)\n\n📅 **Flexible Learning**:\n- Self-paced: Complete within 1 year\n- Weekly commitment: 5-10 hours recommended\n- Lifetime access to course materials\n- Regular live Q&A sessions`
      };
    } else if (lowerMessage.includes('prerequisite') || lowerMessage.includes('requirement')) {
      return {
        type: 'text',
        content: `**Course Prerequisites**:\n\n👨‍💻 **Web Development**:\n• Basic computer skills\n• No prior coding experience required\n• Recommended: Familiarity with internet browsing\n\n📊 **Data Science**:\n• Basic math knowledge\n• Familiarity with Excel (helpful but not required)\n• Logical thinking mindset\n\n📱 **Mobile Development**:\n• Basic understanding of programming concepts\n• No specific language experience required\n\n🎨 **UI/UX Design**:\n• Creativity and interest in design\n• Basic computer skills\n• No prior design experience needed\n\nAll courses include beginner-friendly content!`
      };
    } else {
      return {
        type: 'text',
        content: `land chusega,madarchod  click on the arrow mark which is just in the left side of you`
      };
    }
  };

  const handleCourseClick = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    const newMessages = [...messages, 
      { type: 'user', content: `I want to view ${course.title}` },
      { 
        type: 'ai', 
        content: {
          type: 'courseDetail',
          data: course
        }
      }
    ];
    setMessages(newMessages);
  };

  const handleEnrollNow = (coursePage) => {
    // Navigate to the specific course page
    navigate(`/${coursePage}`);
  };

  const handleQuickQuestion = (question) => {
    handleSendMessage(question);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleQuestions = () => {
    setShowQuestions(!showQuestions);
  };

  return (
    <>
    <div className={`ai-chat-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="chat-header">
        <div className="header-left">
          <div className="ai-avatar">U</div>
          <div className="header-info">
            <h3>Course Assistant</h3>
            <p>Online • Ready to help</p>
          </div>
        </div>
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>

      <div className="messages-container">
        {messages.length === 0 && (
          <div className="welcome-message">
            <div className="ai-message">
              <div className="message-avatar">U</div>
              <div className="message-content">
                <p>👋 Hello! I'm your course assistant. I can help you with:</p>
                <ul>
                  <li>Course information and details</li>
                  <li>Enrollment process</li>
                  <li>Fees and payment options</li>
                  <li>Certificate information</li>
                </ul>
                <p>Ask me anything or click the arrow button to see suggested questions!</p>
              </div>
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}-message`}>
            {message.type === 'U' && <div className="message-avatar">AI</div>}
            <div className="message-content">
              {message.type === 'user' ? (
                <p>{message.content}</p>
              ) : (
                <>
                  {typeof message.content === 'object' ? (
                    message.content.type === 'courses' ? (
                      <div className="courses-grid">
                        <h4>🎓 Available Courses</h4>
                        <p>Click on any course to view details and enroll:</p>
                        <div className="courses-list">
                          {message.content.data.map(course => (
                            <div 
                              key={course.id} 
                              className="course-card"
                              onClick={() => handleCourseClick(course.id)}
                            >
                              <img src={course.image} alt={course.title} />
                              <div className="course-info">
                                <h5>{course.title}</h5>
                                <p>{course.description}</p>
                                <div className="course-meta">
                                  <span>⏱️ {course.duration}</span>
                                  <span>💰 {course.price}</span>
                                  <span>📊 {course.level}</span>
                                </div>
                                <button className="enroll-btn">View Details</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : message.content.type === 'courseDetail' ? (
                      <div className="course-detail">
                        <h4>🎯 {message.content.data.title}</h4>
                        <img src={message.content.data.image} alt={message.content.data.title} />
                        <p><strong>Description:</strong> {message.content.data.description}</p>
                        <div className="course-features">
                          <div className="feature">
                            <span>⏱️ Duration</span>
                            <strong>{message.content.data.duration}</strong>
                          </div>
                          <div className="feature">
                            <span>💰 Price</span>
                            <strong>{message.content.data.price}</strong>
                          </div>
                          <div className="feature">
                            <span>📊 Level</span>
                            <strong>{message.content.data.level}</strong>
                          </div>
                        </div>
                        <div className="action-buttons">
                          <button 
                            className="primary-btn"
                            onClick={() => handleEnrollNow(message.content.data.page)}
                          >
                            Enroll Now
                          </button>
                          <button className="secondary-btn">View Syllabus</button>
                        </div>
                      </div>
                    ) : (
                      <p>{message.content.content}</p>
                    )
                  ) : (
                    <p>{message.content}</p>
                  )}
                </>
              )}
            </div>
            {message.type === 'user' && <div className="message-avatar user">You</div>}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Collapsible Suggested Questions */}
      {showQuestions && (
        <div className="suggested-questions">
          <p>Quick questions:</p>
          <div className="questions-grid">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                className="question-chip"
                onClick={() => handleQuickQuestion(question)}
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="input-container">
        <button 
          className="questions-toggle"
          onClick={toggleQuestions}
          title="Show suggested questions"
        >
          {showQuestions ? '▲' : '▼'}
        </button>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your question about courses..."
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button 
          onClick={() => handleSendMessage()} 
          disabled={!inputMessage.trim()}
          className="send-btn"
        >
          Send
        </button>
      </div>
    </div>
    <Upanayana />
    </>
  );
};

export default AI;