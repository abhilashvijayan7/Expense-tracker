"use client";

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, Paper, Typography, Container, Link, Checkbox, FormControlLabel } from '@mui/material';
import { loginUserAsync } from '../../shared_features/store/authSlice';
import { ActiveRoute } from '../page';

interface LoginViewProps {
  onNavigate: (route: ActiveRoute) => void;
}

export function LoginView({ onNavigate }: LoginViewProps) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please provide both email and security credentials.');
      return;
    }
    
    // Execute async Axios data validation lifecycle thunk loop
    const resultAction = await dispatch(loginUserAsync({ email, password }) as any);
    if (loginUserAsync.fulfilled.match(resultAction)) {
      if (!resultAction.payload) {
        alert('Invalid email identity or profile password combination.');
      }
    }
  };

  return (
    <Box sx={{ backgroundColor: '#f4f5f7', minHeight: '100vh', display: 'flex', alignItems: 'center', py: 4 }}>
      <Container maxWidth="sm">
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1e3a8a', mb: 3, textAlign: 'center', fontFamily: 'monospace' }}>
          account_balance_wallet FinTrack
        </Typography>
        
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, bgcolor: '#ffffff' }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, textAlign: 'center', mb: 1, color: '#1a202c' }}>
            Welcome back
          </Typography>
          <Typography variant="body2" sx={{ textAlign: 'center', color: '#718096', mb: 4 }}>
            Log in to manage your financial ecosystem
          </Typography>

          <Box component="form" onSubmit={handleSignIn} noValidate>
            <Box sx={{ mb: 2.5 }}>
              <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#4a5568', display: 'block', mb: 1 }}>EMAIL ADDRESS</Typography>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '15px' }}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#4a5568', display: 'block', mb: 1 }}>PASSWORD</Typography>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '15px' }}
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <FormControlLabel control={<Checkbox size="small" defaultChecked />} label={<Typography variant="body2" color="#4a5568">Remember this device for 30 days</Typography>} />
              <Link href="#" variant="body2" sx={{ color: '#3f51b5', textDecoration: 'none', fontWeight: 500 }}>Forgot Password?</Link>
            </Box>

            <Button type="submit" variant="contained" fullWidth sx={{ py: 1.5, borderRadius: 2, fontWeight: 'bold', textTransform: 'none', backgroundColor: '#3f51b5', mb: 3 }}>
              Sign In
            </Button>
          </Box>
        </Paper>
        
        <Typography variant="body2" sx={{ textAlign: 'center', mt: 3, color: '#4a5568' }}>
          New to FinTrack? <Link onClick={() => onNavigate('register')} sx={{ color: '#1e3a8a', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'none' }}>Create an account</Link>
        </Typography>
      </Container>
    </Box>
  );
}