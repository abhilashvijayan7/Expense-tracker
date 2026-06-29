import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ExpenseForm } from './ExpenseForm';

describe('ExpenseForm Core Business Component Unit Tests', () => {
  it('should cleanly execute the onSubmit callback function when all fields are populated correctly', async () => {
    const mockOnSubmit = jest.fn();
    render(<ExpenseForm onSubmit={mockOnSubmit} />);

    // 1. Target inputs robustly by their explicit labels using accessible text roles
    const titleInput = screen.getByRole('textbox', { name: /transaction title/i });
    const amountInput = screen.getByRole('spinbutton', { name: /amount/i }); // Material-UI type="number" sets role to spinbutton

    await userEvent.type(titleInput, 'Monthly Internet Bill');
    await userEvent.type(amountInput, '75.50');

    // 2. Open and click the Category dropdown selector layout menu
    const categoryDropdown = screen.getByRole('combobox', { name: /category/i });
    await userEvent.click(categoryDropdown);
    
    const categoryOption = screen.getByRole('option', { name: 'Utilities & Bills' });
    await userEvent.click(categoryOption);

    // 3. Fire the trigger execution form handler submit event
    const submitButton = screen.getByRole('button', { name: /save transaction/i });
    await userEvent.click(submitButton);

    // 4. Assert values match your strict global types layout
    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'Monthly Internet Bill',
      amount: -75.5, // Correctly transformed to negative for expense types
      category: 'Utilities',
      date: new Date().toISOString().split('T')[0],
    });
  });

  // ✅ New Test Case: Ensures validation blocks submit requests and alerts users inline
  it('should prevent submission and display inline errors if fields are left blank', async () => {
    const mockOnSubmit = jest.fn();
    render(<ExpenseForm onSubmit={mockOnSubmit} />);

    // Trigger immediate submission with completely empty fields
    const submitButton = screen.getByRole('button', { name: /save transaction/i });
    await userEvent.click(submitButton);

    // Verify your custom inline error alerts are active instead of a native browser popup window
    expect(screen.getByText('Transaction title is required.')).toBeInTheDocument();
    expect(screen.getByText('Amount value is required.')).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});