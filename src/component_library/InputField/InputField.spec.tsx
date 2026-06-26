import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { InputField } from './InputField';

describe('InputField Component Library Unit Tests', () => {
  it('should render the input with the correct label and placeholder text', () => {
    render(
      <InputField 
        label="Transaction Title" 
        placeholder="Enter name..." 
        value="" 
        onChange={() => {}} 
      />
    );
    
    // Assert the label is present
    expect(screen.getByLabelText('Transaction Title')).toBeInTheDocument();
    // Assert the placeholder text attribute matches cleanly
    expect(screen.getByPlaceholderText('Enter name...')).toBeInTheDocument();
  });

  it('should call the onChange callback function when the user types a keystroke', async () => {
    const mockOnChange = jest.fn();
    render(
      <InputField 
        label="Test Input" 
        value="" 
        onChange={mockOnChange} 
      />
    );
    
    const inputElement = screen.getByLabelText('Test Input');
    
    // Simulate user typing a character into the input field
    await userEvent.type(inputElement, 'A');
    
    // Assert that our callback handler was notified correctly
    expect(mockOnChange).toHaveBeenCalledWith('A');
  });
});