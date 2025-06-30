'use client'
import React, { useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import { Button, IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
function Sidebar({ setFieldValue }) {
  const [profileImage, setProfileImage] = useState(null);
  const [logoImage, setLogoImage] = useState(null);
  const router = useRouter()
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue('profile', file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue('logo', file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <div className='absolute left-3 top-1.9'><IconButton sx={{ color: "white" }} onClick={() => router.push('/dashboard')} ><ArrowBackIcon /></IconButton></div>
      <div className='flex flex-col items-center p-6 md:p-11 w-full md:w-96 h-full md:h-screen'>
        <div className='relative mb-14'>
          {profileImage ? (
            <img src={profileImage} alt='Profile Preview' className='w-50 h-50 md:w-50 md:h-50 object-cover' />
          ) : (
            <div className='w-48 h-48 md:w-56 md:h-56 border-2 border-dashed border-gray-400 flex items-center justify-center text-white text-4xl'>
              +
            </div>
          )}
          <input
            type='file'
            id='profile'
            name='profile'
            accept='image/*'
            onChange={handleProfileImageChange}
            className='absolute inset-0 opacity-0 cursor-pointer'
          />
        </div>
        <div style={{ ...requiredStyle, marginLeft: ".7rem", marginTop: "-30px" }}><ErrorMessage name="profile" /></div>
        <div className="flex flex-col gap-3">
          <div className='mb-4 flex items-center'>
            <label className='w-1/3 text-slate-100 text-sm font-bold mb-2 mt-3' htmlFor='name'>
              Name
            </label>
            <Field
              type='text'
              id='name'
              name='name'
              className='w-2/3 py-2 px-3 text-[#add8e6] leading-tight focus:outline-none focus:border-white border-b-2 border-black bg-transparent placeholder:text-[#add8e6]'
              placeholder='Enter your name'
              style={{
                WebkitTextFillColor: '#add8e6', backgroundColor: 'transparent', /* or the color you want */
                boxShadow: '0 0 0 1000px transparent inset',
              }}
            />
          </div>
          <div style={requiredStyle}><ErrorMessage name="name" /></div>

          <div className='mb-4 flex items-center'>
            <label className='w-1/3 text-slate-100 text-sm font-bold mb-2 mt-3' htmlFor='position'>
              Position
            </label>
            <Field
              type='text'
              id='position'
              name='position'
              className='w-2/3 py-2 px-3 text-[#add8e6] leading-tight focus:outline-none focus:border-white border-b-2 border-black bg-transparent placeholder:text-[#add8e6]'
              placeholder='Enter your position'
              style={{
                WebkitTextFillColor: '#add8e6', backgroundColor: 'transparent', /* or the color you want */
                boxShadow: '0 0 0 1000px transparent inset',
              }}
            />
          </div>
          <div style={requiredStyle}><ErrorMessage name="position" /></div>

          <div className='mb-4 flex items-center'>
            <label className='w-1/3 text-slate-100 text-sm font-bold mb-2 mt-3' htmlFor='age'>
              Date of Birth
            </label>
            <Field
              type='date'
              id='age'
              name='age'
              className='w-2/3 py-2 px-3 text-[#add8e6] leading-tight focus:outline-none focus:border-white border-b-2 border-black bg-transparent placeholder:text-[#add8e6]'
              placeholder='Enter your DOB'
              style={{
                WebkitTextFillColor: '#add8e6', backgroundColor: 'transparent', /* or the color you want */
                boxShadow: '0 0 0 1000px transparent inset',
              }}
            />
          </div>
          <div style={requiredStyle}><ErrorMessage name="age" /></div>

          <div className='mb-6 flex items-center'>
            <label className='w-1/3 text-slate-100 text-sm font-bold mb-2 mt-3' htmlFor='team'>
              Team Name
            </label>
            <Field
              type='text'
              id='team'
              name='team'
              className='w-2/3 py-2 px-3 text-[#add8e6] leading-tight focus:outline-none focus:border-white border-b-2 border-black bg-transparent placeholder:text-[#add8e6]'
              placeholder='Enter your team name'
              style={{
                WebkitTextFillColor: '#add8e6', backgroundColor: 'transparent', /* or the color you want */
                boxShadow: '0 0 0 1000px transparent inset',
              }}
            />
          </div>
          <div style={requiredStyle}><ErrorMessage name="team" /></div>


          <div className='mb-6 flex items-center'>
            <label className='w-1/3 text-slate-100 text-sm font-bold mb-2 mt-3' htmlFor='season'>
              Season
            </label>
            <Field
              type='number'
              id='season'
              name='season'
              className='w-2/3 py-2 px-3 text-[#add8e6] leading-tight focus:outline-none focus:border-white border-b-2 border-black bg-transparent placeholder:text-[#add8e6]'
              placeholder='Enter Season number'
              style={{
                WebkitTextFillColor: '#add8e6',
                backgroundColor: 'transparent',
                boxShadow: '0 0 0 1000px transparent inset',
              }}
            />
          </div>
          <div style={requiredStyle}>
            <ErrorMessage name="season" />
          </div>

          <div className='mb-6 flex items-center'>
            <label className='w-1/3 text-slate-100 text-sm font-bold mb-2 mt-3' htmlFor='logo'>
              Team Logo
            </label>
            <div className='relative w-2/3'>
              {logoImage ? (
                <img src={logoImage} alt='Logo Preview' className='w-24 h-24 md:w-32 md:h-32 object-cover mb-4' />
              ) : (
                <div className='w-18 h-18 md:w-20 md:h-20 border-2 border-dashed border-gray-400 flex items-center justify-center text-white text-4xl mb-4'>
                  +
                </div>
              )}
              <input
                type='file'
                id='logo'
                name='logo'
                accept='image/*'
                onChange={handleLogoImageChange}
                className='absolute inset-0 opacity-0 cursor-pointer'
              />
            </div>
          </div>
          <div style={{ ...requiredStyle, marginTop: "-50px" }}><ErrorMessage name="logo" /></div>
        </div>
      </div>
    </>
  );
}

const requiredStyle = {
  color: "rgb(177 0 0)",
  fontWeight: 300,
  fontSize: "1rem",
  lineHeight: "1.66",
  textAlign: "left",
  marginTop: "-20px",
  marginRight: "14px",
  marginBottom: 0,
  marginLeft: "80px"
};

export default Sidebar;
