import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ExpenseForm } from './ExpenseForm';

describe('ExpenseForm Core Business Component Unit Tests', () => {
  it('should cleanly execute the onSubmit callback function when all fields are populated correctly', async () => {
    const mockOnSubmit = jest.fn();
    render(<ExpenseForm onSubmit={mockOnSubmit} />);

    const titleInput = screen.getByRole('textbox', { name: /transaction title/i });
    const amountInput = screen.getByRole('spinbutton', { name: /amount/i }); 

    await userEvent.type(titleInput, 'Monthly Internet Bill');
    await userEvent.type(amountInput, '75.50');

    const categoryDropdown = screen.getByRole('combobox', { name: /category/i });
    await userEvent.click(categoryDropdown);
    
    const categoryOption = screen.getByRole('option', { name: 'Utilities & Bills' });
    await userEvent.click(categoryOption);

    const submitButton = screen.getByRole('button', { name: /save transaction/i });
    await userEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'Monthly Internet Bill',
      amount: -75.5, 
      category: 'Utilities',
      date: new Date().toISOString().split('T')[0],
    });
  });

  it('should prevent submission and display inline errors if fields are left blank', async () => {
    const mockOnSubmit = jest.fn();
    render(<ExpenseForm onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByRole('button', { name: /save transaction/i });
    await userEvent.click(submitButton);

    expect(screen.getByText('Transaction title is required.')).toBeInTheDocument();
    expect(screen.getByText('Amount value is required.')).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});