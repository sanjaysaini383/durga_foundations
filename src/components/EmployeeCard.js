import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EmployeeCard.css';

function EmployeeCard({ employee, onBlock }) {
  const navigate = useNavigate();

  return (
    <div className="employee-card">
      <img src={`https://i.pravatar.cc/150?img=${employee.id}`} alt={employee.name} className="profile-picture" />
      <h3>{employee.name}</h3>
      <p>{employee.role}</p>
      <p>Email : {employee.email}</p>
      <div className="card-buttons">
        <button className="block-button" onClick={() => onBlock(employee.id)}>Block</button>
        <button className="details-button" onClick={() => navigate(`/employee/${employee.id}`)}>Details</button>
      </div>
    </div>
  );
}

export default EmployeeCard;
