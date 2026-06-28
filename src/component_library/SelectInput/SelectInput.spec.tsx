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
    
    // Target the combobox and verify it is explicitly named by our label string
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

    // 1. Open the dropdown popup container safely using the accessible name
    const selectTrigger = screen.getByRole('combobox', { name: /transaction type/i });
    await userEvent.click(selectTrigger);

    // 2. Select the option item from the list overlay
    const optionElement = screen.getByRole('option', { name: 'Income (+)' });
    await userEvent.click(optionElement);

    // 3. Confirm your mock function records the accurate option value payload
    expect(mockOnChange).toHaveBeenCalledWith('income');
  });
});