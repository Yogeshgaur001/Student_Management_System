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

import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../components/NavBar';

const fetchStats = async () => {
  await new Promise((res) => setTimeout(res, 1000));
  return {
    totalStudents: 156,
    newThisMonth: 12,
    activeUsers: 43
  };
};

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hoveredCard, setHoveredCard] = useState(null);

  const { data: stats, isLoading, isError } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: fetchStats
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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
      description: 'View, search, and manage all student records.',
    },
    {
      to: '/create',
      icon: '✨',
      title: 'Add New Student',
      description: 'Register new students with complete details.',
    }
  ];

  const quickActions = [
    { to: '/reports', icon: '📊', title: 'Reports' },
    { to: '/settings', icon: '⚙️', title: 'Settings' },
    { to: '/help', icon: '❓', title: 'Help' },
    { to: '/profile', icon: '👤', title: 'Profile' }
  ];

  if (isLoading) return <div style={{ color: "white", padding: "2rem" }}>⏳ Loading dashboard...</div>;
  if (isError) return <div style={{ color: "red", padding: "2rem" }}>❌ Failed to load stats</div>;

  return (
    <>
      <Navbar />
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh',
        padding: '2rem',
        paddingTop: '6rem',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        position: 'relative',
        overflow: 'hidden'
      }}>
        <style>{`
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
        `}</style>

        <div style={{
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
        }}></div>

        <header style={{ textAlign: 'center', zIndex: 1, position: 'relative', marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '700',
            color: 'white',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            animation: 'slideDown 1s ease-out'
          }}>🎯 Student Dashboard</h1>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.9)' }}>
            Manage your academic records with ease
          </p>
          <div style={{
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.8)',
            backgroundColor: 'rgba(255,255,255,0.1)',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            display: 'inline-block',
            backdropFilter: 'blur(10px)',
            marginTop: '1rem'
          }}>
            {formatTime(currentTime)}
          </div>
        </header>

        <section style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
          position: 'relative',
          zIndex: 1
        }}>
          {[{
            id: 'total', label: 'Total Students', value: stats.totalStudents, color: '#4CAF50'
          }, {
            id: 'new', label: 'New This Month', value: stats.newThisMonth, color: '#2196F3'
          }, {
            id: 'active', label: 'Active Today', value: stats.activeUsers, color: '#FF9800'
          }].map(stat => (
            <div
              key={stat.id}
              style={{
                backgroundColor: 'rgba(255,255,255,0.95)',
                padding: '1.5rem',
                borderRadius: '15px',
                textAlign: 'center',
                transition: '0.3s',
                boxShadow: hoveredCard === stat.id ? '0 15px 40px rgba(0,0,0,0.2)' : '0 8px 32px rgba(0,0,0,0.1)',
                transform: hoveredCard === stat.id ? 'translateY(-10px) scale(1.02)' : 'none'
              }}
              onMouseEnter={() => setHoveredCard(stat.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: stat.color }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '1rem', color: '#666', fontWeight: '500' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </section>

        <nav style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          position: 'relative',
          zIndex: 1
        }}>
          {navigationItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              style={{
                backgroundColor: 'rgba(255,255,255,0.95)',
                padding: '2rem',
                borderRadius: '20px',
                textDecoration: 'none',
                color: '#333',
                boxShadow: hoveredCard === item.title ? '0 20px 60px rgba(0,0,0,0.2)' : '0 10px 40px rgba(0,0,0,0.1)',
                transform: hoveredCard === item.title ? 'translateY(-15px) scale(1.05)' : 'none',
                transition: '0.4s'
              }}
              onMouseEnter={() => setHoveredCard(item.title)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{item.icon}</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600' }}>{item.title}</h3>
              <p style={{ fontSize: '1rem', color: '#666' }}>{item.description}</p>
              <span style={{ position: 'absolute', bottom: '1rem', right: '1rem', fontSize: '1.5rem', color: '#667eea' }}>➡️</span>
            </Link>
          ))}
        </nav>

        <section style={{ marginTop: '3rem', position: 'relative', zIndex: 1 }}>
          <h2 style={{
            fontSize: '1.5rem',
            color: 'white',
            marginBottom: '1rem',
            textAlign: 'center',
            fontWeight: '600'
          }}>Quick Actions</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            {quickActions.map((action, idx) => (
              <Link
                key={idx}
                to={action.to}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  padding: '1rem',
                  borderRadius: '10px',
                  color: 'white',
                  textDecoration: 'none',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={() => setHoveredCard(action.title)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{action.icon}</div>
                <div>{action.title}</div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
