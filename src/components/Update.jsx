import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchDetails } from '../slice/detailSlice';
import { fetchUpdate } from '../slice/updateSlice';
import { fetchUser } from '../slice/userSlice';
import { MdEdit } from "react-icons/md";
const Update = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.details);

  useEffect(() => {

    dispatch(fetchDetails(id));

  }, [id, dispatch, userDetail.data]);

  const { fullName, email, phone, age, salary, image } = userDetail?.data?.data || {};

  const [uname, setUname] = useState(fullName || '');
  const [uemail, setUemail] = useState(email || '');
  const [uphone, setPhone] = useState(phone || '');
  const [uage, setUage] = useState(age || '');
  const [usalary, setUsalary] = useState(salary || '');
  const [uimage, setUimage] = useState(image || '');


  const [initialValues, setInitialValues] = useState({
    uname: fullName || '',
    uemail: email || '',
    uphone: phone || '',
    uage: age || '',
    usalary: salary || '',
    uimage: image || '',

  });

  useEffect(() => {
    if (userDetail?.data?.data) {
      setUname(fullName);
      setUemail(email);
      setPhone(phone);
      setUage(age);
      setUsalary(salary);
      setUimage(image);

      // Set the initial values
      setInitialValues({
        uname: fullName,
        uemail: email,
        uphone: phone,
        uage: age,
        usalary: salary,
        uimage: image
      });
    }
  }, [userDetail?.data?.data,fullName, email, phone, age, salary, image]);


  if (!userDetail?.data) {
    return <div className='text-xl text-center'>Loading...</div>;
  }

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const isFormChanged = () => {
    return (
      uname !== initialValues.uname ||
      uemail !== initialValues.uemail ||
      uphone !== initialValues.uphone ||
      uage !== initialValues.uage ||
      usalary !== initialValues.usalary ||
      uimage !== initialValues.uimage
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      fullName: uname,
      email: uemail,
      phone: uphone,
      age: uage,
      salary: usalary,
      image: image,
      id: id
    };
    console.log("formData------>", formData);
    dispatch(fetchUpdate(formData));
    dispatch(fetchUser());
    window.location.reload();
    alert("Your profile updated successfully.")
  }

  return (
    <>
      <div className='flex gap-1 items-center'>
        <MdEdit className='text-2xl bottom-1 right-1 text-slate-800' />
        <h1 className="text-2xl font-semibold">Edit Profile</h1>
      </div>
      <div className="shadow-xl bg-slate-100 h-fit sm:w-[80%] md:w-[50%] w-full p-5 m-auto mt-5">
        <div className="m-auto w-56">
          <img src={image} alt="User profile" className="object-cover object-top" />

        </div>

        <form action="" className="shadow-md mt-10 sm:w-[70%] w-full m-auto p-3" onSubmit={handleSubmit}>
          <label htmlFor="name" className='font-semibold'>Name</label>
          <input
            type="text"
            name="name"
            value={uname}
            className="rounded px-3 py-1 w-full mt-2"
            onChange={(e) => handleInputChange(e, setUname)}
          />
          <label htmlFor="email" className='font-semibold'>Email</label>
          <input
            type="email"
            value={uemail}
            className="rounded px-3 py-1 w-full mt-2"
            onChange={(e) => handleInputChange(e, setUemail)}
          />
          <label htmlFor="phone" className='font-semibold'>Phone</label>
          <input
            type="text"
            value={uphone}
            className="rounded px-3 py-1 w-full mt-2"
            onChange={(e) => handleInputChange(e, setPhone)}
          />
          <label htmlFor="salary" className='font-semibold'>Salary</label>
          <input
            type="number"
            value={usalary}
            className="rounded px-3 py-1 w-full mt-2"
            onChange={(e) => handleInputChange(e, setUsalary)}
          />
          <label htmlFor="age" className='font-semibold'>Age</label>
          <input
            type="number"
            value={uage}
            className="rounded px-3 py-1 w-full mt-2"
            onChange={(e) => handleInputChange(e, setUage)}
          />
          <label htmlFor="image" className='font-semibold'>Image URL</label>
          <input
            type="text"
            value={uimage}
            className="rounded px-3 py-1 w-full mt-2"
            onChange={(e) => handleInputChange(e, setUsalary)}
          />

          <div className="flex gap-5 mt-5 justify-end">
            <button
              type="submit"
              className={`${isFormChanged() ? 'bg-blue-500' : 'bg-slate-500'
                } rounded px-2 py-1`}
              disabled={!isFormChanged()}

            >
              Save
            </button>

          </div>
        </form>
      </div>
    </>
  );
};

export default Update;