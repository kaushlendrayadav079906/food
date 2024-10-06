import React, { useState, useEffect } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {
  const url = "http://localhost:8889/ecomm/api/v1/auth";
  const [list, setList] = useState([]);

  // Fetch list function
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/ecomm/api/v1/auth`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error('Failed to fetch the list');
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  // Fetch list on component mount
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list-container'>
      <h2>Product List</h2>
      <table className='product-table'>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list.length > 0 ? (
            list.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price}</td>
                <td><button>Edit</button></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No products available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default List;
