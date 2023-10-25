import React from 'react';
import Table from 'react-bootstrap/Table';
const ResultGrid = ({ records }) => {
  return (
    <div>
      <h2>Record Grid</h2>
      <Table striped bordered hove>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Date</th>
            <th>Selected Items</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index}>
              <td>{record.name}</td>
              <td>{record.description}</td>
              <td>{record.category}</td>
              <td>{record.date}</td>
              <td>{record.multiselect.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ResultGrid;
