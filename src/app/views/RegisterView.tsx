"use client";

import React, { useState } from 'react';
import { Box, Button, Paper, Typography, Container, Link } from '@mui/material';
import { useDispatch } from 'react-redux';
import { registerUserAsync } from '../../shared_features/store/authSlice';
import { ActiveRoute } from '../page';

interface RegisterViewProps {
  onNavigate: (route: ActiveRoute) => void;
}

export function RegisterView({ onNavigate }: RegisterViewProps) {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert('Please populate all submission form entry parameters.');
      return;
    }
    dispatch(registerUserAsync({ name, email, password }) as any);
  };

  return (
    <Box 
      sx={{ 
        backgroundColor: '#1e3a8a', 
        height: '100vh',           // Absolute viewport restriction
        boxSizing: 'border-box',   // Forces padding inside the height bounds
        display: 'flex', 
        alignItems: 'center', 
        overflow: 'hidden',        // Guardrail against any stray overflows
        py: 2 
      }}
    >
      <Container maxWidth="md">
        <Paper elevation={4} sx={{ display: 'flex', borderRadius: 4, overflow: 'hidden', minHeight: 480 }}>
          <Box sx={{ width: '50%', bgcolor: '#1e40af', color: '#ffffff', p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>FinTrack</Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 400 }}>Master your capital with institutional precision.</Typography>
          </Box>
          <Box component="form" onSubmit={handleSignUp} sx={{ width: '50%', p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', bgcolor: '#ffffff' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#1a202c' }}>Create your account</Typography>
            
            <input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: '12px', marginBottom: '14px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
            <input placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '12px', marginBottom: '14px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
            
            <Button type="submit" variant="contained" fullWidth sx={{ py: 1.5, textTransform: 'none', fontWeight: 'bold', bgcolor: '#1e3a8a' }}>Create Account</Button>
            <Typography variant="body2" sx={{ mt: 2.5, textAlign: 'center', color: '#4a5568' }}>
              Already have an account? <Link onClick={() => onNavigate('login')} sx={{ color: '#1e3a8a', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'none' }}>Log In</Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}