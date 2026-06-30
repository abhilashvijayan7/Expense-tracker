import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MetricCard } from './MetricCard';

describe('MetricCard Component Library Unit Tests', () => {
  it('should render the correct title and value passed via props', () => {
    render(<MetricCard title="Test Metric" value="₹9,999" />);
    
    expect(screen.getByText('Test Metric')).toBeInTheDocument();
    expect(screen.getByText('₹9,999')).toBeInTheDocument();
  });

  it('should apply the custom text color style passed down through props', () => {
    render(<MetricCard title="Colored Card" value="500" textColor="#3f51b5" />);
    
    const valueElement = screen.getByText('500');
    expect(valueElement).toHaveStyle({ color: '#3f51b5' });
  });

  it('should implicitly resolve green text colors when the header specifies INCOME context', () => {
    render(<MetricCard title="MONTHLY INCOME" value="₹3,000" />);
    
    const valueElement = screen.getByText('₹3,000');
    expect(valueElement).toHaveStyle({ color: '#2e7d32' }); 
  });

  it('should implicitly resolve red text colors when a net BALANCE metric goes negative', () => {
    render(<MetricCard title="TOTAL BALANCE" value="-₹150.00" />);
    
    const valueElement = screen.getByText('-₹150.00');
    expect(valueElement).toHaveStyle({ color: '#c62828' }); 
  });
});