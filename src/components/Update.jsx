import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchDetails } from '../slice/detailSlice';
import { fetchUpdate } from '../slice/updateSlice';
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../slice/userSlice';
const Update = () => {
  const navigate = useNavigate();
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

  const [initialValues, setInitialValues] = useState({
    uname: fullName || '',
    uemail: email || '',
    uphone: phone || '',
    uage: age || '',
    usalary: salary || '',
  });

  useEffect(() => {
    if (userDetail?.data?.data) {
      setUname(fullName);
      setUemail(email);
      setPhone(phone);
      setUage(age);
      setUsalary(salary);

      // Set the initial values
      setInitialValues({
        uname: fullName,
        uemail: email,
        uphone: phone,
        uage: age,
        usalary: salary,
      });
    }
  }, [ fullName, email, phone, age, salary]);

  if (!userDetail?.data) {
    return <div>Loading...</div>;
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
      usalary !== initialValues.usalary
    );
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    const formData = {
      fullName: uname,
      email: uemail,
      phone: uphone,
      age: uage,
      salary: usalary,
      image:image,
      id:id
    };
    console.log("formData------>",formData);
    dispatch(fetchUpdate(formData));
    dispatch(fetchUser());
    window.location.reload();    
    alert("Your profile updated successfully.")
  }

  return (
    <>
      <h1 className="text-2xl font-semibold">Edit Profile</h1>

      <div className="border border-black h-fit sm:w-[80%] md:w-[50%] w-full p-5 m-auto">
        <div className="m-auto w-56 border border-slate-400">
          <img src={image} alt="User profile" className="object-cover object-top" />
        </div>

        <form action="" className="border border-black mt-10 w-[70%] m-auto p-3" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={uname}
            className="rounded px-3 py-1 w-full mt-2"
            onChange={(e) => handleInputChange(e, setUname)}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={uemail}
            className="rounded px-3 py-1 w-full mt-2"
            onChange={(e) => handleInputChange(e, setUemail)}
          />
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            value={uphone}
            className="rounded px-3 py-1 w-full mt-2"
            onChange={(e) => handleInputChange(e, setPhone)}
          />
          <label htmlFor="salary">Salary</label>
          <input
            type="number"
            value={usalary}
            className="rounded px-3 py-1 w-full mt-2"
            onChange={(e) => handleInputChange(e, setUsalary)}
          />
          <label htmlFor="age">Age</label>
          <input
            type="number"
            value={uage}
            className="rounded px-3 py-1 w-full mt-2"
            onChange={(e) => handleInputChange(e, setUage)}
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
