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

  it('should render the select input wrapper with the correct label text', () => {
    render(
      <SelectInput 
        label="Transaction Type" 
        value="" 
        onChange={() => {}} 
        options={mockOptions} 
      />
    );
    
    // Assert that the outer label element renders correctly
    expect(screen.getByLabelText('Transaction Type')).toBeInTheDocument();
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

    // 1. Target and click the Material-UI select trigger element to open the menu grid popup
    const selectTrigger = screen.getByRole('combobox');
    await userEvent.click(selectTrigger);

    // 2. Locate the specific option row inside the virtual modal overlay and click it
    const optionElement = screen.getByRole('option', { name: 'Income (+)' });
    await userEvent.click(optionElement);

    // 3. Assert that our spy hook captured the chosen key value accurately
    expect(mockOnChange).toHaveBeenCalledWith('income');
  });
});