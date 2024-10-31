import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from "../src/components/TodoItem";

describe('туду', () => {
  const mockTodo = {
    id: 1,
    title: 'Test Todo',
    completed: false,
  };

  const mockActs = {
    done: jest.fn(),
    edit: jest.fn(),
    remove: jest.fn(),
  };

  it('туду можно редактировать', () => {
    render(<TodoItem todo={mockTodo} index={0} acts={mockActs} />);

    const editButton = screen.getByText('Изменить');
    
    fireEvent.click(editButton);

    expect(mockActs.edit).toHaveBeenCalledWith(mockTodo);
  });
});