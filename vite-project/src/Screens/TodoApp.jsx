import React, { useEffect, useState } from 'react';
import {
  collection, addDoc, getDocs, getDoc, doc,
  deleteDoc, updateDoc, setDoc
} from 'firebase/firestore';
import { db } from '../config/firebase';
import Footer from './Footer';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);

  const todosCollection = collection(db, "todos");

  // Fetch all todos
  const fetchTodos = async () => {
    const snapshot = await getDocs(todosCollection);
    const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTodos(tasks);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add new todo
  const handleAdd = async () => {
    if (!newTodo.trim()) return;
    await addDoc(todosCollection, { text: newTodo });
    setNewTodo("");
    fetchTodos();
  };

  // Edit (setDoc)
  const handleSetDoc = async (id) => {
    const docRef = doc(db, "todos", id);
    await setDoc(docRef, { text: newTodo });
    setEditingId(null);
    setNewTodo("");
    fetchTodos();
  };

  // Update (updateDoc)
  const handleUpdate = async (id) => {
    const docRef = doc(db, "todos", id);
    await updateDoc(docRef, { text: newTodo });
    setEditingId(null);
    setNewTodo("");
    fetchTodos();
  };

  // Delete todo
  const handleDelete = async (id) => {
    const docRef = doc(db, "todos", id);
    await deleteDoc(docRef);
    fetchTodos();
  };

  // Get single todo
  const handleEdit = async (id) => {
    const docRef = doc(db, "todos", id);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      setNewTodo(snap.data().text);
      setEditingId(id);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>📝 Firebase Todo App</h2>
        <div style={styles.inputGroup}>
          <input
            value={newTodo}
            onChange={e => setNewTodo(e.target.value)}
            placeholder="What do you need to do?"
            style={styles.input}
          />
          {editingId ? (
            <>
              <button style={styles.button} onClick={() => handleUpdate(editingId)}>Update</button>
              <button style={{ ...styles.button, backgroundColor: '#6a0dad' }} onClick={() => handleSetDoc(editingId)}>Set</button>
            </>
          ) : (
            <button style={styles.button} onClick={handleAdd}>Add</button>
          )}
        </div>

        <ul style={styles.list}>
          {todos.map(todo => (
            <li key={todo.id} style={styles.todoItem}>
              <span>{todo.text}</span>
              <div>
                <button style={styles.smallBtn} onClick={() => handleEdit(todo.id)}>✏️</button>
                <button style={styles.smallBtn} onClick={() => handleDelete(todo.id)}>🗑️</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer/>
    </div>
    
  );
};



// 🎨 Inline CSS styles
const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #74ebd5 0%, #9face6 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  card: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 12,
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    maxWidth: 500,
    width: '100%',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: '1.8em',
    color: '#333'
  },
  inputGroup: {
    display: 'flex',
    gap: 10,
    marginBottom: 20
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 6,
    border: '1px solid #ccc',
    fontSize: 16
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 16px',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  todoItem: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  smallBtn: {
    marginLeft: 6,
    background: 'none',
    border: 'none',
    fontSize: 18,
    cursor: 'pointer'
  }
};

export default TodoApp;
