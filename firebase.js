import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, onSnapshot } from 'firebase/firestore';

const firebaseConfig = {
  // Your Firebase configuration object
  apiKey: "AIzaSyDx0SVoBQfPlrxT68IwmNR3OKKdQdp-1Yw",
  authDomain: "expense-tracker-9da4c.firebaseapp.com",
  databaseURL: "https://expense-tracker-9da4c-default-rtdb.firebaseio.com",
  projectId: "expense-tracker-9da4c",
  storageBucket: "expense-tracker-9da4c.appspot.com",
  messagingSenderId: "640370122741",
  appId: "1:640370122741:web:8fd9a5346ee2a7bbf10abc"
// This includes your API keys, project ID, etc.
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get Firestore instance
export const db = getFirestore(app);

// Add expense to Firestore
export const addExpenseToFirestore = async (expenseData) => {
  try {
    const docRef = await addDoc(collection(db, 'expenses'), expenseData);
    console.log('Expense added with ID: ', docRef.id);
  } catch (error) {
    console.error('Error adding expense: ', error);
  }
};

// Get all expenses from Firestore
export const getAllExpensesFromFirestore = (updateExpenses) => {
  const expensesRef = collection(db, 'expenses');
  onSnapshot(expensesRef, (snapshot) => {
    const expenses = [];
    snapshot.forEach((doc) => {
      expenses.push({ id: doc.id, ...doc.data() });
    });
    updateExpenses(expenses);
  });
};
