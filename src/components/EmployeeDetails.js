import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EmployeeDetails.css';

function EmployeeDetails({ employees }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const employee = employees.find(emp => emp.id === parseInt(id));

  if (!employee) {
    return <p>Employee not found</p>;
  }

  return (
    <div className="employee-details">
    <button onClick={() => navigate(-1)}>Back</button>
    <div className="employee-info">
      <img 
        src={`https://i.pravatar.cc/150?img=${employee.id}`} 
        alt={employee.name} 
        className="profile-picture" 
      />
      <h2>{employee.name}</h2>
      <p><strong>Role:</strong> {employee.role}</p>
      <p><strong>Email:</strong> {employee.email}</p>
      <p><strong>Status:</strong> {employee.status}</p>
      <p><strong>Bio:</strong> {employee.about }</p>
    </div>
  </div>
  );
}

export default EmployeeDetails;
