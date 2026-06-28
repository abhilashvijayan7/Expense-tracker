import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ExpenseForm } from './ExpenseForm';

describe('ExpenseForm Core Business Component Unit Tests', () => {
  it('should cleanly execute the onSubmit callback function when all fields are populated correctly', async () => {
    const mockOnSubmit = jest.fn();
    render(<ExpenseForm onSubmit={mockOnSubmit} />);

    // 1. Populate the raw text string input blocks
    const titleInput = screen.getByPlaceholderText(/e.g., Office Rent/i);
    const amountInput = screen.getByPlaceholderText('0.00');

    await userEvent.type(titleInput, 'Monthly Internet Bill');
    await userEvent.type(amountInput, '75.50');

    // 2. Open and click the modern Category dropdown selector overlay menu
    const categoryDropdown = screen.getByRole('combobox', { name: /category/i });
    await userEvent.click(categoryDropdown);
    
    const categoryOption = screen.getByRole('option', { name: 'Utilities & Bills' });
    await userEvent.click(categoryOption);

    // 3. Fire the trigger event handler execution sequence
    const submitButton = screen.getByRole('button', { name: /save transaction/i });
    await userEvent.click(submitButton);

    // 4. Assert structural contract completion values match your strict global types layout
    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'Monthly Internet Bill',
      amount: -75.5, // Correctly transformed to negative for expense types
      category: 'Utilities', // Correctly capitalized matching system types
      date: new Date().toISOString().split('T')[0], // Current dynamic date match
    });
  });
});