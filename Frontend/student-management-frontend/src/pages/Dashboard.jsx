// First, update the imports at the top
/*import { Link } from 'react-router-dom';
import Navbar from '../components/NavBar'; // Note: using NavBar.jsx from your workspace

// Then update the component
export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundColor: '#f9f9f9',
          minHeight: '100vh',
          padding: '6rem 2rem 2rem',
          fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h2
          style={{
            color: '#333',
            marginBottom: '2rem',
            fontSize: '2rem',
            textAlign: 'center',
          }}
        >
          📊 Student Management Dashboard
        </h2>

        <nav
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '1.5rem',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '600px',
          }}
        >
          <Link
            to="/students"
            style={{
              padding: '1rem 2rem',
              backgroundColor: '#4CAF50',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '12px',
              textAlign: 'center',
              flex: '1 1 250px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease-in-out',
              fontWeight: '600',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#45a049')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#4CAF50')}
          >
            📚 View Student List
          </Link>

          <Link
            to="/create"
            style={{
              padding: '1rem 2rem',
              backgroundColor: '#2196F3',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '12px',
              textAlign: 'center',
              flex: '1 1 250px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease-in-out',
              fontWeight: '600',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#1976D2')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#2196F3')}
          >
            ➕ Create Student
          </Link>
        </nav>

        <footer
          style={{
            marginTop: '4rem',
            fontSize: '0.9rem',
            color: '#777',
            textAlign: 'center',
          }}
        >
          © {new Date().getFullYear()} Student Manager. All rights reserved.
        </footer>
      </div>
    </>
  );
}*/


import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
 // Assuming NavBar is in components folder

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stats, setStats] = useState({
    totalStudents: 0,
    newThisMonth: 0,
    activeUsers: 0
  });
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalStudents: 156,
        newThisMonth: 12,
        activeUsers: 43
      });
    }, 1000);
  }, []);

  const containerStyle = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    minHeight: '100vh',
    paddingTop: '5rem',
    padding: '2rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    position: 'relative',
    overflow: 'hidden'
  };

  const navbarStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '4rem',
    backgroundColor: 'rgba(255,255,255,0.1)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 2rem',
    zIndex: 10,
    borderBottom: '1px solid rgba(255,255,255,0.2)'
  };

  const navBrandStyle = {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: 'white',
    textDecoration: 'none'
  };

  const navLinksStyle = {
    display: 'flex',
    gap: '1.5rem'
  };

  const navLinkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'color 0.3s'
  };

  const backgroundPatternStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
    backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                      radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
    backgroundSize: '50px 50px',
    animation: 'float 20s ease-in-out infinite'
  };

  const headerStyle = {
    position: 'relative',
    zIndex: 1,
    textAlign: 'center',
    marginBottom: '3rem'
  };

  const titleStyle = {
    fontSize: '3rem',
    fontWeight: '700',
    color: 'white',
    marginBottom: '0.5rem',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
    animation: 'slideDown 1s ease-out'
  };

  const subtitleStyle = {
    fontSize: '1.2rem',
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '300',
    marginBottom: '1rem'
  };

  const timeStyle = {
    fontSize: '1rem',
    color: 'rgba(255,255,255,0.8)',
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    display: 'inline-block',
    backdropFilter: 'blur(10px)'
  };

  const statsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginBottom: '3rem',
    position: 'relative',
    zIndex: 1
  };

  const statCardStyle = {
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: '1.5rem',
    borderRadius: '15px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.2)',
    transition: 'all 0.3s ease',
    textAlign: 'center'
  };

  const statCardHoverStyle = {
    transform: 'translateY(-10px) scale(1.02)',
    boxShadow: '0 15px 40px rgba(0,0,0,0.2)'
  };

  const statNumberStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#667eea',
    marginBottom: '0.5rem',
    animation: 'countUp 2s ease-out'
  };

  const statLabelStyle = {
    fontSize: '1rem',
    color: '#666',
    fontWeight: '500'
  };

  const navigationStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    position: 'relative',
    zIndex: 1
  };

  const navCardStyle = {
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: '2rem',
    borderRadius: '20px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
    backdropFilter: 'blur(15px)',
    border: '1px solid rgba(255,255,255,0.2)',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    textDecoration: 'none',
    display: 'block',
    position: 'relative',
    overflow: 'hidden'
  };

  const navCardHoverStyle = {
    transform: 'translateY(-15px) scale(1.05)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
  };

  const iconStyle = {
    fontSize: '3rem',
    marginBottom: '1rem',
    display: 'block'
  };

  const navTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#333',
    marginBottom: '0.75rem'
  };

  const navDescriptionStyle = {
    fontSize: '1rem',
    color: '#666',
    lineHeight: '1.5',
    marginBottom: '1rem'
  };

  const navArrowStyle = {
    position: 'absolute',
    bottom: '1rem',
    right: '1rem',
    fontSize: '1.5rem',
    color: '#667eea',
    transition: 'transform 0.3s ease'
  };

  const quickActionsStyle = {
    marginTop: '3rem',
    position: 'relative',
    zIndex: 1
  };

  const quickActionsTitleStyle = {
    fontSize: '1.5rem',
    color: 'white',
    marginBottom: '1rem',
    textAlign: 'center',
    fontWeight: '600'
  };

  const quickActionsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem'
  };

  const quickActionStyle = {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: '1rem',
    borderRadius: '10px',
    color: 'white',
    textDecoration: 'none',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(255,255,255,0.2)',
    backdropFilter: 'blur(10px)'
  };

  const formatTime = (date) => {
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const navigationItems = [
    {
      to: '/students',
      icon: '👥',
      title: 'Student Management',
      description: 'View, search, and manage all student records. Access detailed profiles and academic information.',
      color: '#4CAF50'
    },
    {
      to: '/create',
      icon: '✨',
      title: 'Add New Student',
      description: 'Register new students with complete profile information, photos, and academic details.',
      color: '#2196F3'
    }
  ];

  const quickActions = [
    { to: '/reports', icon: '📊', title: 'Reports' },
    { to: '/settings', icon: '⚙️', title: 'Settings' },
    { to: '/help', icon: '❓', title: 'Help' },
    { to: '/profile', icon: '👤', title: 'Profile' }
  ];

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          @keyframes slideDown {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes countUp {
            from { transform: scale(0); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
        `}
      </style>

      <div style={navbarStyle}>
        <Link to="/" style={navBrandStyle}>🎓 EduDashboard</Link>
        <div style={navLinksStyle}>
          <Link to="/" style={navLinkStyle}>Home</Link>
          <Link to="/students" style={navLinkStyle}>Students</Link>
          <Link to="/create" style={navLinkStyle}>Create</Link>
          <Link to="/logout" style={navLinkStyle}>Logout</Link>
        </div>
      </div>

      <div style={backgroundPatternStyle}></div>

      <header style={headerStyle}>
        <h1 style={titleStyle}>🎯 Student Dashboard</h1>
        <p style={subtitleStyle}>Manage your academic records with ease</p>
        <div style={timeStyle}>
          {formatTime(currentTime)}
        </div>
      </header>

      <section style={statsContainerStyle}>
        <div 
          style={{
            ...statCardStyle,
            ...(hoveredCard === 'total' ? statCardHoverStyle : {})
          }}
          onMouseEnter={() => setHoveredCard('total')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div style={{...statNumberStyle, color: '#4CAF50'}}>
            {stats.totalStudents}
          </div>
          <div style={statLabelStyle}>Total Students</div>
        </div>
        
        <div 
          style={{
            ...statCardStyle,
            ...(hoveredCard === 'new' ? statCardHoverStyle : {})
          }}
          onMouseEnter={() => setHoveredCard('new')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div style={{...statNumberStyle, color: '#2196F3'}}>
            {stats.newThisMonth}
          </div>
          <div style={statLabelStyle}>New This Month</div>
        </div>
        
        <div 
          style={{
            ...statCardStyle,
            ...(hoveredCard === 'active' ? statCardHoverStyle : {})
          }}
          onMouseEnter={() => setHoveredCard('active')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div style={{...statNumberStyle, color: '#FF9800'}}>
            {stats.activeUsers}
          </div>
          <div style={statLabelStyle}>Active Today</div>
        </div>
      </section>

      <nav style={navigationStyle}>
        {navigationItems.map((item, index) => (
          <Link
            key={index}
            to={item.to}
            style={{
              ...navCardStyle,
              ...(hoveredCard === item.to ? navCardHoverStyle : {})
            }}
            onMouseEnter={() => setHoveredCard(item.to)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div style={iconStyle}>{item.icon}</div>
            <h3 style={navTitleStyle}>{item.title}</h3>
            <p style={navDescriptionStyle}>{item.description}</p>
            <div 
              style={{
                ...navArrowStyle,
                transform: hoveredCard === item.to ? 'translateX(10px)' : 'translateX(0)'
              }}
            >
              →
            </div>
          </Link>
        ))}
      </nav>

      <section style={quickActionsStyle}>
        <h3 style={quickActionsTitleStyle}>Quick Actions</h3>
        <div style={quickActionsGridStyle}>
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.to}
              style={quickActionStyle}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(255,255,255,0.2)';
                e.target.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <div style={{fontSize: '1.5rem', marginBottom: '0.5rem'}}>
                {action.icon}
              </div>
              <div style={{fontSize: '0.9rem', fontWeight: '500'}}>
                {action.title}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
