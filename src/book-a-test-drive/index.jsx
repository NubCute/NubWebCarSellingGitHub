import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import testDriveDetails from './../Shared/bookatestdriveDetail.json';
import bookingChecks from './../Shared/bookingchecks.json';
import InputField from './components/InputField';
import DropdownField from './components/DropdownField';
import TextAreaField from './components/TextAreaField';
import CheckBoxField from './components/CheckBoxField';
import { Button } from '../components/ui/button';
import { db } from '../../configs';
import { BookingListing, CarListing } from '../../configs/schema';
import IconField from './components/IconField';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

function BookATestDrive() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [allChecked, setAllChecked] = useState(false);
  const [availableCars, setAvailableCars] = useState([]); // List of available cars
  const navigate=useNavigate();

  // Fetch available cars from the database when the component is loaded
  useEffect(() => {
    const fetchAvailableCars = async () => {
      try {
        const cars = await db.select().from(CarListing);
        setAvailableCars(cars.map(car => car.make)); // Store available car makes
      } catch (error) {
        console.error("Error fetching available cars:", error);
      }
    };

    fetchAvailableCars();
  }, []);

  useEffect(() => {
    console.log("Updated formData:", formData);
    validateCheckboxes();
  }, [formData]);

  const sanitizeInput = (input) => {
    if (typeof input === 'string') {
      return input.replace(/<script.*?>.*?<\/script>/gi, '');
    }
    return input;
  };

  const handleInputChange = (name, value) => {
    setFormData(prevData => {
      const newData = { ...prevData, [name]: value }; 
      validateCheckboxes();
      return newData;
    });

    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
  };

  // Validate checkboxes
  const validateCheckboxes = () => {
    if (!bookingChecks || !bookingChecks.bookingchecks) return;
    const requiredCheckboxes = bookingChecks.bookingchecks.slice(0, 3);
    const allCheckedNow = requiredCheckboxes.every(item => formData[item.name] === true);
    setAllChecked(allCheckedNow);
  };

  // Validate the form
  const validateForm = () => {
    let newErrors = {};

    testDriveDetails.TestDriveDetails.forEach((item) => {
      if (item.required && !formData[item.name]) {
        newErrors[item.name] = `${item.label} is required.`;
      }
      if (item.fieldType === 'email' && formData[item.name]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[item.name])) {
          newErrors[item.name] = `Invalid email format.`;
        }
      }
      if (item.fieldType === 'tel' && formData[item.name]) {
        const phoneRegex = /^[0-9]{10,15}$/;
        if (!phoneRegex.test(formData[item.name])) {
          newErrors[item.name] = `Invalid phone number.`;
        }
      }
    });

    // Check if `preferredCar` is available in the list
    if (!availableCars.includes(formData.preferredCar)) {
      newErrors.preferredCar = "No available car for test drive.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    toast('Please wait a moment...');

    if (!validateForm()) {
      console.log("Validation errors", errors);
      return;
    }

    if (!allChecked) {
      alert("You must agree to all terms before submitting.");
      return;
    }

    if (!formData.message) {
      formData.message = "No message provided";
    }

    console.log("Submitting formData:", formData);

    try {
      const result = await db.insert(BookingListing).values(formData);
      if (result) {
        console.log("Data saved successfully");
        navigate('/');
      }
    } catch (e) {
      console.log("Error submitting form:", e);
    }
  };

  return (
    <div>
      <Header />
      <div className='absolute top-[8%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100.05%] h-[20%] bg-[#1d1207] flex flex-col items-center justify-center px-4 py-8 mt-40'>
            <h2 className='text-4xl absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-center text-white p-5 px-40 font-[Gistesy] w-[120%] max-w-[1200px]'>
              Register for a BMW Test Drive
            </h2>
        </div>

      <div className="container mx-auto py-8">
        <form onSubmit={onSubmit} className='absolute top-[80%] left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-center text-[#1d1207] p-10 px-40 font-[Gistesy] h-[90%] max-h-[2800px] w-[100.05%] max-w-[2000px] bg-white'>
          
          <h2 className='text-2xl font-bold text-[#1d1207] mb-5 mt-[-10px]'>
                Book a Test Drive
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testDriveDetails.TestDriveDetails.map((item, index) => (
              <div key={index} className="flex flex-col">
                <label className="mb-1 font-semibold">
                  <IconField icon={item?.icon}/>
                  {item.label} {item.required && <span className="text-red-500">*</span>}
                </label>
                {item.fieldType === 'text' ||
                item.fieldType === 'email' ||
                item.fieldType === 'tel' ||
                item.fieldType === 'number' ||
                item.fieldType === 'date' ? (
                  <InputField item={item} handleInputChange={handleInputChange} />
                ) : item.fieldType === 'dropdown' ? (
                  <DropdownField item={item} handleInputChange={handleInputChange} />
                ) : item.fieldType === 'textarea' ? (
                  <TextAreaField item={item} handleInputChange={handleInputChange} />
                ) : null}
                {errors[item.name] && (
                  <span className="text-red-500 text-sm">{errors[item.name]}</span>
                )}
              </div>
            ))}
          </div>

          <h2 className='font-bold text-2xl my-6'>Terms & Conditions</h2>
          <div className='grid grid-cols-1 gap-4'>
            {bookingChecks.bookingchecks.map((item, index) => (
              <div key={index}>
                <CheckBoxField item={item} handleInputChange={handleInputChange} />
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <Button type="submit" disabled={!allChecked}>Submit</Button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default BookATestDrive;
