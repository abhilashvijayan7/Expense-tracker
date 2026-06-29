import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { TransactionTable, Transaction } from './TransactionTable';

describe('TransactionTable Core Component Unit Tests', () => {
  const mockTransactions: Transaction[] = [
    {
      id: 'tx-999',
      title: 'Electricity Bill',
      amount: 120.45,
      type: 'expense',
      category: 'Utilities',
      date: '2026-06-28',
    },
  ];

  it('should render an empty placeholder message when zero transactions are provided', () => {
    render(<TransactionTable transactions={[]} onDelete={() => {}} />);
    
    expect(
      screen.getByText(/No transactions recorded yet/i)
    ).toBeInTheDocument();
  });

  it('should render rows accurately and trigger onDelete when the button wrapper element is clicked', async () => {
    const mockOnDelete = jest.fn();
    render(<TransactionTable transactions={mockTransactions} onDelete={mockOnDelete} />);

    expect(screen.getByText('Electricity Bill')).toBeInTheDocument();
    
    // ✅ Updated assertion rule to expect our new localized theme indicator token (₹)
    expect(screen.getByText('-₹120.45')).toBeInTheDocument();

    const deleteButton = screen.getByRole('button', { name: /delete transaction electricity bill/i });
    await userEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith('tx-999');
  });
});