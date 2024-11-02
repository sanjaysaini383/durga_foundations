import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeCard from './components/EmployeeCard';
import EmployeeDetails from './components/EmployeeDetails';
import Profile from './components/Profile';
import './App.css';

const initialEmployees = [
  { id: 1, name: 'Johnson Wood', role: 'Front-End Developer', email: 'johnsonwood@microsoft.com', status: 'active', about: 'Experienced front-end developer specializing in React and Vue.' },
  { id: 2, name: 'John Doe', role: 'Team Lead', email: 'johndoe@microsoft.com', status: 'inactive', about: 'Team lead with 5+ years of experience in software development.' },
  { id: 3, name: 'Fakhar Naveed', role: 'UI/UX Designer', email: 'fakhar@microsoft.com', status: 'active', about: 'UI/UX designer with a passion for creating intuitive user experiences.' },
  { id: 4, name: 'Alex Made', role: 'Backend Developer', email: 'alexmade@microsoft.com', status: 'active', about: 'Backend developer with expertise in Node.js and Express.' },
  { id: 5, name: 'Johnson Wood', role: 'Front-End Developer', email: 'johnsonwood@microsoft.com', status: 'active', about: 'Experienced front-end developer specializing in React and Vue.' },
  { id: 6, name: 'John Doe', role: 'Team Lead', email: 'johndoe@microsoft.com', status: 'inactive', about: 'Team lead with 5+ years of experience in software development.' },
  { id: 7, name: 'Mark Peter', role: 'Front-End Developer', email: 'markpeter@microsoft.com', status: 'active', about: 'Creative front-end developer with a knack for innovative design.' },
  { id: 8, name: 'Tony Stark', role: 'Team Lead', email: 'tonystark@microsoft.com', status: 'inactive', about: 'Highly skilled team lead with extensive experience in AI and robotics.' },
];

function App() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const filteredEmployees = employees.filter(employee => 
    (filter === 'All' || (filter === 'Active' && employee.status === 'active') || (filter === 'Inactive' && employee.status === 'inactive')) &&
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      const filteredSuggestions = employees
        .filter(emp => emp.name.toLowerCase().includes(value.toLowerCase()))
        .map(emp => emp.name);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
  };

  const handleBlock = (id) => {
    setEmployees(employees.filter(employee => employee.id !== id));
  };

  return (
    <Router>
      <div className="app">
        <header>
          <Profile />
          <div className='heading'>
          <h1 > Employees</h1>
          </div>
          
          <div className="search-container">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {suggestions.length > 0 && (
              <ul className="suggestions">
                {suggestions.map((suggestion, index) => (
                  <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="filter-buttons">
            <button onClick={() => setFilter('All')} className={filter === 'All' ? 'active' : ''}>All</button>
            <button onClick={() => setFilter('Active')} className={filter === 'Active' ? 'active' : ''}>Active</button>
            <button onClick={() => setFilter('Inactive')} className={filter === 'Inactive' ? 'active' : ''}>Inactive</button>
          </div>
        </header>
        
        <Routes>
          <Route
            path="/"
            element={
              <div className="employee-grid">
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map(employee => (
                    <EmployeeCard key={employee.id} employee={employee} onBlock={handleBlock} />
                  ))
                ) : (
                  <p>No employees found</p>
                )}
              </div>
            }
          />
          <Route path="/employee/:id" element={<EmployeeDetails employees={employees} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
