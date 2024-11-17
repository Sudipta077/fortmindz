import React, { useEffect, useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../slice/userSlice';
import { useNavigate } from 'react-router-dom';
import ModalForm from '../components/ModalForm';
import { createUser } from '../slice/newSlice';
import { deleteUser } from '../slice/deleteSlice';
import { IoSearch } from "react-icons/io5";
import { CiViewList } from "react-icons/ci";
function Home() {
    const [show, setShow] = useState(false);
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const dataToDisplay = search ? filteredData : user.data?.data || [];

    useEffect(() => {
        if (user.data === null) {
            dispatch(fetchUser());
        }
    }, [dispatch, user.data]);

    useEffect(() => {
        if (user.data && user.data.data) {
            const filtered = user.data.data.filter(item =>
                item.fullName.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredData(filtered);
        }
    }, [search, user.data]);

    const handleFormSubmit = (formData) => {
        dispatch(createUser(formData));
        alert("Employee has been created successfully.");
        dispatch(fetchUser());
        setShow(false); // Close modal after submission
    };

    const handleDelete = (item) => {
        dispatch(deleteUser(item._id));
        alert("Employee has been deleted.");
        window.location.reload();
    };

    return (
        <div>
            {show ? (
                <ModalForm isOpen={show} onClose={() => setShow(false)} onSubmit={handleFormSubmit} />
            ) : (
                <>
                    <div className='flex justify-center items-center gap-1'>
                        <CiViewList className='text-3xl mt-1' />
                        <h1 className='text-2xl text-slate-900 text-center font-semibold'>Employee List</h1>
                    </div>
                    <div className='md:w-[80%] w-full m-auto mt-10 items-center flex flex-col'>
                        <div className='flex flex-col md:flex-row justify-between items-center w-full'>
                            <div className='w-full md:w-fit justify-between flex items-center bg-slate-100 px-1 py-1 border-slate-600 border rounded'>
                                <input
                                    type="text"
                                    placeholder='search by name'
                                    className='px-2 py-1 text-slate-800 bg-slate-100 focus:outline-none'
                                    onChange={(e) => setSearch(e.target.value)}
                                    value={search}
                                />
                                <IoSearch className='bg-slate-400 text-3xl rounded p-1 hover:cursor-pointer hover:text-slate-100 transition' />
                            </div>
                            <button
                                className='bg-blue-400 m-2 flex items-center py-1 px-2 rounded gap-1 font-semibold text-slate-900 border-b-4 border-b-blue-600 border-r-4 border-r-blue-600 hover:text-slate-100 transition'
                                onClick={() => setShow(true)}
                            >
                                <FaPlus /> Create new
                            </button>
                        </div>
                        {dataToDisplay.length > 0 ? (
                            <div className='w-full shadow-md text-left mt-2 pl-5 bg-slate-100'>
                            <table className='w-full'>
                                <thead className=''>
                                    <tr >
                                        <th className='text-xl font-semibold text-slate-900'>Name</th>
                                        <th className='text-xl font-semibold text-slate-900'>Email</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                  

                                </thead>
                                <tbody >
                                    {dataToDisplay.map((item, key) => (
                                        <tr className='hover:bg-slate-200 bg-slate-100 transition' key={key}>
                                            <td className='text-slate-800 sm:text-xl text-sm'>{item.fullName}</td>
                                            <td className='text-slate-800 sm:text-xl text-sm'>{item.email}</td>
                                            <td className='p-1'>
                                                <button
                                                    className='bg-yellow-500 border-b-4 border-b-yellow-600 border-r-4 border-r-yellow-600 py-1 px-2 rounded text-slate-900 hover:bg-yellow-400 transition w-fit sm:w-20'
                                                    onClick={() => navigate(`/update/${item._id}`)}
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                            <td className='p-1'>
                                                <button
                                                    className='bg-red-500 border-b-4 border-b-red-600 border-r-4 border-r-red-600 py-1 px-2 rounded text-slate-900 hover:bg-red-400 transition w-fit sm:w-20'
                                                    onClick={() => handleDelete(item)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            </div>
                        ) : (
                            <p className='text-center text-slate-500 mt-4'>No data found !</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default Home;
