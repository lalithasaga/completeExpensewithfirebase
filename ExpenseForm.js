/*import React, { useRef } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import ExpenseInput from './ExpenseInput';
import './ExpenseForm.css';

const ExpenseForm = () => {
  const expenseInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredExpense = expenseInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredCategory = categoryInputRef.current.value;

    const expenseData = {
      expense: enteredExpense,
      description: enteredDescription,
      category: enteredCategory,
    };


    const db = firebase.firestore(); // Access the Firestore database

    db.collection('expenses')
      .add(expenseData)
      .then(() => {
        console.log('Expense added successfully');
      })
      .catch((error) => {
        console.error('Error adding expense:', error);
      });

    expenseInputRef.current.value = '';
    descriptionInputRef.current.value = '';
    categoryInputRef.current.value = '';
  };

  return (
    <form onSubmit={submitHandler}>
      <ExpenseInput
        id="expense"
        label="Expense"
        type="text"
        required
        inputRef={expenseInputRef}
      />
      <ExpenseInput
        id="description"
        label="Description"
        type="text"
        required
        inputRef={descriptionInputRef}
      />
     <div className="category">
  <label htmlFor="category">Category
    <select id="category" ref={categoryInputRef}>
      <option value="">Select a category</option>
      <option value="Food">Food</option>
      <option value="Petrol">Petrol</option>
      <option value="Salary">Salary</option>
    </select>
  </label>
</div>


      <button type="submit">Add Expense</button>
    </form>
   
  );
};

export default ExpenseForm; */

import React, { useRef, useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import ExpenseInput from './ExpenseInput';
import './ExpenseForm.css';

const ExpenseForm = () => {
  const expenseInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();
  const [expenses, setExpenses] = useState([]);
  const [editingExpenseId, setEditingExpenseId] = useState(null);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredExpense = expenseInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredCategory = categoryInputRef.current.value;

    const expenseData = {
      expense: enteredExpense,
      description: enteredDescription,
      category: enteredCategory,
    };

    const db = firebase.firestore(); // Access the Firestore database

    if (editingExpenseId) {
      // Editing existing expense
      db.collection('expenses')
        .doc(editingExpenseId)
        .update(expenseData)
        .then(() => {
          console.log('Expense updated successfully');
          setEditingExpenseId(null); // Clear the editing expense ID
        })
        .catch((error) => {
          console.error('Error updating expense:', error);
        });
    } else {
      // Adding new expense
      db.collection('expenses')
        .add(expenseData)
        .then(() => {
          console.log('Expense added successfully');
        })
        .catch((error) => {
          console.error('Error adding expense:', error);
        });
    }

    expenseInputRef.current.value = '';
    descriptionInputRef.current.value = '';
    categoryInputRef.current.value = '';
  };

  const deleteExpense = (expenseId) => {
    const db = firebase.firestore();
    db.collection('expenses')
      .doc(expenseId)
      .delete()
      .then(() => {
        console.log('Expense deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting expense:', error);
      });
  };

  const editExpense = (expenseId) => {
    setEditingExpenseId(expenseId);

    const expenseToEdit = expenses.find((expense) => expense.id === expenseId);
    if (expenseToEdit) {
      expenseInputRef.current.value = expenseToEdit.expense;
      descriptionInputRef.current.value = expenseToEdit.description;
      categoryInputRef.current.value = expenseToEdit.category;
    }
  };

  useEffect(() => {
    const db = firebase.firestore();
    const unsubscribe = db.collection('expenses').onSnapshot((snapshot) => {
      const expensesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setExpenses(expensesData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <form onSubmit={submitHandler}>
        <ExpenseInput
          id="expense"
          label="Expense"
          type="text"
          required
          inputRef={expenseInputRef}
        />
        <ExpenseInput
          id="description"
          label="Description"
          type="text"
          required
          inputRef={descriptionInputRef}
        />
        <div className="category">
          <label htmlFor="category">
            Category
            <select id="category" ref={categoryInputRef}>
              <option value="">Select a category</option>
              <option value="Food">Food</option>
              <option value="Petrol">Petrol</option>
              <option value="Salary">Salary</option>
            </select>
          </label>
        </div>
        <button type="submit">{editingExpenseId ? 'Update Expense' : 'Add Expense'}</button>
      </form>
      <div>
        <h2>Expenses</h2>
        {expenses.length === 0 && <p>No expenses added yet.</p>}
        {expenses.length > 0 && (
          <table className="expenses-table">
            <thead>
              <tr>
                <th>Expense</th>
                <th>Description</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses
                .filter(
                  (expense) =>
                    expense.expense !== '' ||
                    expense.description !== '' ||
                    expense.category !== ''
                )
                .map((expense) => (
                  <tr key={expense.id}>
                    <td>{expense.expense}</td>
                    <td>{expense.description}</td>
                    <td>{expense.category}</td>
                    <td>
                      <button onClick={() => deleteExpense(expense.id)}>Delete</button>
                      <button onClick={() => editExpense(expense.id)}>Edit</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ExpenseForm;


