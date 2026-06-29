"use client";

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Box, Button, Paper, Typography, Container } from '@mui/material';
import Link from 'next/link'; 
import { loginUserAsync } from '../../shared_features/store/authSlice';
import { RootState } from '../../shared_features/store';
import { InputField } from '../../component_library/InputField/InputField';

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '', global: '' });

  useEffect(() => {
    if (isAuthenticated) router.push('/dashboard');
  }, [isAuthenticated, router]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', password: '', global: '' };

    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
      isValid = false;
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email.trim())) {
        newErrors.email = 'Please enter a valid email format (e.g., name@company.com).';
        isValid = false;
      }
    }

    if (!password) {
      newErrors.password = 'Password is required.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    const resultAction = await dispatch(loginUserAsync({ email, password }) as any);
    if (loginUserAsync.fulfilled.match(resultAction) && resultAction.payload) {
      router.push('/dashboard');
    } else {
      setErrors(prev => ({ ...prev, global: 'Invalid email identity or password combination.' }));
    }
  };

  return (
    <Box sx={{ backgroundColor: '#f4f5f7', minHeight: '100vh', display: 'flex', alignItems: 'center'}}>
      <Container maxWidth="xs">
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1e3a8a', mb: 3, textAlign: 'center', fontFamily: 'monospace' }}>
          FinTrack
        </Typography>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, bgcolor: '#ffffff' }}>
          <Typography variant="h4" sx={{ fontWeight: 700, textAlign: 'center', mb: 3 }}>Welcome back</Typography>
          
          {errors.global && (
            <Typography variant="body2" sx={{ color: 'error.main', mb: 2, textAlign: 'center', fontWeight: 500 }}>
              {errors.global}
            </Typography>
          )}

          <Box component="form" onSubmit={handleSignIn} noValidate>
            <InputField 
              label="EMAIL ADDRESS"
              placeholder="name@company.com"
              value={email}
              onChange={(val) => { setEmail(val); setErrors(p => ({ ...p, email: '', global: '' })); }}
              error={!!errors.email}
              helperText={errors.email}
            />

            <InputField 
              label="PASSWORD"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(val) => { setPassword(val); setErrors(p => ({ ...p, password: '', global: '' })); }}
              error={!!errors.password}
              helperText={errors.password}
            />

            <Button type="submit" variant="contained" fullWidth sx={{ py: 1.5, mt: 1, borderRadius: 2, fontWeight: 'bold', textTransform: 'none', bgcolor: '#3f51b5' }}>
              Sign In
            </Button>
          </Box>
        </Paper>
        <Typography variant="body2" sx={{ textAlign: 'center', mt: 3 }}>
          New to FinTrack? <Link href="/register" style={{ color: '#1e3a8a', fontWeight: 'bold', textDecoration: 'none' }}>Create an account</Link>
        </Typography>
      </Container>
    </Box>
  );
}