import React, { useState } from 'react';
import './App.css'; // Import the plain CSS file

const EmployeeManagementPortal = () => {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  // Hardcoded credentials for admin login
  const ADMIN_USER_ID = 'admin123';
  const ADMIN_PASSWORD = 'password123';

  const handleLogin = () => {
    if (userId === ADMIN_USER_ID && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
    } else {
      alert('Invalid User ID or Password');
    }
  };

  const handleAdd = () => {
    if (name && position) {
      if (editIndex === -1) {
        setEmployees([...employees, { name, position }]);
      } else {
        const updatedEmployees = employees.map((emp, index) =>
          index === editIndex ? { name, position } : emp
        );
        setEmployees(updatedEmployees);
        setEditIndex(-1);
      }
      setName('');
      setPosition('');
    }
  };

  const handleEdit = (index) => {
    setName(employees[index].name);
    setPosition(employees[index].position);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setEmployees(employees.filter((_, i) => i !== index));
  };

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <div className="login-box">
          <h1>Admin Login</h1>
          <input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
          <button onClick={handleLogin} className="login-button">
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="portal-container">
      <h1>Employee Management Portal</h1>
      <h2>Managed by Admin</h2>
      <div className="form-container">
        <input
          type="text"
          placeholder="Employee Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="input"
        />
        <button onClick={handleAdd} className="add-button">
          {editIndex === -1 ? 'Add' : 'Update Employee'}
        </button>
      </div>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee, index) => (
              <tr key={index}>
                <td>{employee.name}</td>
                <td>{employee.position}</td>
                <td>
                  <button onClick={() => handleEdit(index)} className="edit-button">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(index)} className="delete-button">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No employees added yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeManagementPortal;
