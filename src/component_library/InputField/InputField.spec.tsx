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
    
    expect(screen.getByLabelText('Transaction Title')).toBeInTheDocument();
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
    await userEvent.type(inputElement, 'A');
    
    expect(mockOnChange).toHaveBeenCalledWith('A');
  });

  // ✅ Verification validation layer test execution mapping
  it('should cleanly present explicit helper errors when the error flag state is set to true', () => {
    const fallbackMessage = 'Strict alphanumeric title sequence requirement failed.';
    
    render(
      <InputField 
        label="Validated Input Field" 
        value="" 
        onChange={() => {}} 
        error={true}
        helperText={fallbackMessage}
      />
    );
    
    const errorTextElement = screen.getByText(fallbackMessage);
    expect(errorTextElement).toBeInTheDocument();
  });
});