import React, { useState, useEffect } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {
    const url = "http://localhost:8889";
    const [list, setList] = useState([]);

    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            if (response.data.success) {
                setList(response.data.data);
            } else {
                toast.error('Failed to fetch the list');
            }
        } catch (error) {
            toast.error(`Error: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleDelete = async (id, name) => {
        try {
            const response = await axios.delete(`${url}/api/food/remove/${id}`);
            if (response.data.success) {
                setList((prevList) => prevList.filter((item) => item._id !== id));
                toast.success(`${name} has been removed`);
            } else {
                toast.error('Failed to delete the item');
            }
        } catch (error) {
            toast.error(`Error: ${error.response?.data?.message || error.message}`);
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className="list-container">
            <h2>All Food List</h2>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {list.map((item) => (
                    <div key={item._id} className="list-table-format">
                        <img src={`${url}/image/${item.image}`} alt={item.name} />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>₹{item.price}</p>
                        <button onClick={() => handleDelete(item._id, item.name)}>X</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default List;
