import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MetricCard } from './MetricCard';

describe('MetricCard Component Library Unit Tests', () => {
  it('should render the correct title and value passed via props', () => {
    // 1. Render the component into the virtual DOM sandbox
    render(<MetricCard title="Test Metric" value="$9,999" />);
    
    // 2. Assert that the title string exists on the screen layout
    expect(screen.getByText('Test Metric')).toBeInTheDocument();
    
    // 3. Assert that the metric numeric output displays accurately
    expect(screen.getByText('$9,999')).toBeInTheDocument();
  });

  it('should apply the custom text color style passed down through props', () => {
    // 1. Render the component with a specific hex color variable
    render(<MetricCard title="Colored Card" value="500" textColor="#d32f2f" />);
    
    const valueElement = screen.getByText('500');
    
    // 2. Verify that the CSS color maps directly to the rendered element
    expect(valueElement).toHaveStyle({ color: '#d32f2f' });
  });
});