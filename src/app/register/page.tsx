"use client";

import React, { useState, useEffect } from 'react';
import { Box, Button, Paper, Typography, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; 
import { registerUserAsync } from '../../shared_features/store/authSlice';
import { RootState } from '../../shared_features/store';
import { InputField } from '../../component_library/InputField/InputField';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    if (isAuthenticated) router.replace('/dashboard');
  }, [isAuthenticated, router]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', password: '' };

    if (!name.trim()) {
      newErrors.name = 'Full name is required.';
      isValid = false;
    }

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
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    const resultAction = await dispatch(registerUserAsync({ name, email, password }) as any);
    if (registerUserAsync.fulfilled.match(resultAction)) {
      router.push('/dashboard');
    } else {
      setErrors(prev => ({ ...prev, email: 'Registration failed. Email might already be taken.' }));
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center'}}>
      <Container maxWidth="md">
        <Paper elevation={4} sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, borderRadius: 4, overflow: 'hidden', minHeight: 480 }}>
          {/* Left branding panel */}
          <Box sx={{ width: { xs: '100%', md: '50%' }, bgcolor: '#1e40af', color: '#ffffff', p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>FinTrack</Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 400 }}>Master your capital with institutional precision.</Typography>
          </Box>
          
          {/* Right interactive form layer */}
          <Box component="form" onSubmit={handleSignUp} noValidate sx={{ width: { xs: '100%', md: '50%' }, p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', bgcolor: '#ffffff' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#1a202c' }}>Create your account</Typography>
            
            <InputField 
              label="Full Name"
              placeholder="John Doe"
              value={name}
              onChange={(val) => { setName(val); setErrors(p => ({ ...p, name: '' })); }}
              error={!!errors.name}
              helperText={errors.name}
            />

            <InputField 
              label="Email Address"
              placeholder="name@company.com"
              value={email}
              onChange={(val) => { setEmail(val); setErrors(p => ({ ...p, email: '' })); }}
              error={!!errors.email}
              helperText={errors.email}
            />

            <InputField 
              label="Password"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(val) => { setPassword(val); setErrors(p => ({ ...p, password: '' })); }}
              error={!!errors.password}
              helperText={errors.password}
            />
            
            <Button type="submit" variant="contained" fullWidth sx={{ py: 1.5, mt: 1, textTransform: 'none', fontWeight: 'bold', bgcolor: '#1e3a8a' }}>
              Create Account
            </Button>
            
            <Typography variant="body2" sx={{ mt: 2.5, textAlign: 'center', color: '#4a5568' }}>
              Already have an account?{' '}
              <Link href="/login" style={{ color: '#1e3a8a', fontWeight: 'bold', textDecoration: 'none' }}>
                Log In
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}