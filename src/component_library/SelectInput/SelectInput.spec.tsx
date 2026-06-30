import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { SelectInput } from './SelectInput';

describe('SelectInput Component Library Unit Tests', () => {
  const mockOptions = [
    { value: 'income', label: 'Income (+)' },
    { value: 'expense', label: 'Expense (-)' },
  ];

  it('should render the select input wrapper cleanly', () => {
    render(
      <SelectInput 
        label="Transaction Type" 
        value="" 
        onChange={() => {}} 
        options={mockOptions} 
      />
    );
    
    const selectEl = screen.getByRole('combobox', { name: /transaction type/i });
    expect(selectEl).toBeInTheDocument();
  });

  it('should call onChange callback function when an item option is clicked', async () => {
    const mockOnChange = jest.fn();
    render(
      <SelectInput 
        label="Transaction Type" 
        value="" 
        onChange={mockOnChange} 
        options={mockOptions} 
      />
    );

    const selectTrigger = screen.getByRole('combobox', { name: /transaction type/i });
    await userEvent.click(selectTrigger);

    const optionElement = screen.getByRole('option', { name: 'Income (+)' });
    await userEvent.click(optionElement);

    expect(mockOnChange).toHaveBeenCalledWith('income');
  });

  it('should display the helper text message cleanly when error state is active', () => {
    const customErrorMessage = 'Please select an allocation ledger category account.';
    
    render(
      <SelectInput 
        label="Transaction Type" 
        value="" 
        onChange={() => {}} 
        options={mockOptions} 
        error={true}
        helperText={customErrorMessage}
      />
    );

    const errorTextElement = screen.getByText(customErrorMessage);
    expect(errorTextElement).toBeInTheDocument();
  });
});