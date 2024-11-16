import React, { useEffect, useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../slice/userSlice';
import { useNavigate } from 'react-router-dom';
import ModalForm from '../components/ModalForm';
import { createUser } from '../slice/newSlice';
import { deleteUser } from '../slice/deleteSlice';

function Home() {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (user.data === null) {
            dispatch(fetchUser());
        }
    }, [dispatch, user.data]);

    const handleFormSubmit = (formData) => {
        dispatch(createUser(formData));
        alert("Employee has been created successfully.");
        dispatch(fetchUser());
        console.log("Form submitted:", formData);
        setShow(false); // Close modal after submission
    };

    const handleDelete = (item) => {
        dispatch(deleteUser(item._id));
        alert("Employee has been deleted.");
        window.location.reload();
    };

    console.log("user data =====>", user.data);

    return (
        <div>
            {show ? (
                <ModalForm isOpen={show} onClose={() => setShow(false)} onSubmit={handleFormSubmit} />
            ) : (
                <>
                    <h1 className='text-2xl text-slate-900 text-center font-semibold'>Employee List</h1>
                    <div className='w-[60%] m-auto mt-10 items-center flex flex-col'>
                        <button 
                            className='bg-blue-500 m-2 flex items-center py-1 px-2 rounded-sm gap-1 font-semibold text-slate-900' 
                            onClick={() => setShow(true)}
                        >
                            <FaPlus /> Create new
                        </button>

                        {user.data && user.data.data && user.data.data.length > 0 ? (
                            <table className='w-full border border border-black text-center'>
                                <thead className='bg-slate-400'>
                                    <tr>
                                        <th className='text-xl'>Name</th>
                                        <th className='text-xl'>Email</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user.data.data.map((item, key) => (
                                        <tr className='hover:bg-slate-300 transition' key={key}>
                                            <td className='text-slate-800'>{item.fullName}</td>
                                            <td className='text-slate-800'>{item.email}</td>
                                            <td className='p-1'>
                                                <button 
                                                    className='bg-green-700 px-2 rounded' 
                                                    onClick={() => navigate(`/update/${item._id}`)}
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                            <td className='p-1'>
                                                <button 
                                                    className='bg-red-500 px-2 rounded' 
                                                    onClick={() => { handleDelete(item); }}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : user.data && user.data.data && user.data.data.length === 0 ? (
                            <h1 className='text-xl '>No users</h1>
                        ) : null}
                    </div>
                </>
            )}
        </div>
    );
}

export default Home;
