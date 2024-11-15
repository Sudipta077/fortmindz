import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { fetchUser } from '../slice/userSlice';
import { useNavigate } from 'react-router-dom';
function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state)=>state.user);
    useEffect(() => {
        if (user.data === null) {
            dispatch(fetchUser());
        }
    }, [dispatch, user.data]);
    console.log("user  dtata =====>",user.data);
    return (
        <>
            <h1 className='text-2xl text-slate-900 text-center font-semibold'>Employee List</h1>

            <table className='border border-black w-[60%] m-auto mt-10 text-center '>
                <thead className='bg-slate-400'>
                    <td className='text-xl'>Name</td>
                    <td className='text-xl'>email</td>
                    <td></td>
                    <td></td>
                </thead>
                <hr/>
                <tbody>
                    {
                        user.data && user.data.data.map((item,key)=>{
                        return(
                                <tr className='border border-b-0 border-black hover:bg-slate-300 transition'>
                                    <td className='text-slate-800 '>{item.fullName}</td>
                                    <td className='text-slate-800 '>{item.email}</td>
                                    <td className='p-1'> <button className='bg-green-700 px-2 rounded' onClick={()=> navigate(`/update/${item._id}`)}>Edit</button> </td>
                                    <td className='p-1'> <button className='bg-red-500 px-2 rounded'>Delete</button> </td>
                                </tr>
                        );
                           
                        })
                    }
                </tbody>
            </table>



        </>
    );
}

export default Home;