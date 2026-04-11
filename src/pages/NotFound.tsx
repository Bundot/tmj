import React from 'react';
import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      textAlign: 'center',
      backgroundColor: 'var(--background)',
      color: 'var(--foreground)'
    }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Page Not Found</p>
      <Link to="/" style={{ 
        padding: '0.75rem 1.5rem', 
        backgroundColor: 'var(--primary)', 
        color: 'white', 
        borderRadius: '0.5rem',
        textDecoration: 'none'
      }}>
        Go Home
      </Link>
    </div>
  );
}
