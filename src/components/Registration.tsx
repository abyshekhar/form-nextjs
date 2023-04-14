"use client";
import React, { FormEvent, useEffect, useState } from "react";

const initialFormData = {
  first: "",
  last: "",
};
interface ErrorMessage {
  first: string;
  last: string;
}
const errorMessage: ErrorMessage = {
  first: "",
  last: "",
};
function Registration() {
  const [formData, setFormData] = useState(initialFormData);
  const [errorMessages, setErrorMessages] = useState(errorMessage);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setErrorMessages(validate(formData));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessages(validate(formData));
  };
  
  const validate = (formValues: any) => {
    let error: ErrorMessage = {
      first: "",
      last: "",
    };
    console.log(formValues);
    if (!formValues.first) {
      error.first = "Firstname is required";
    } else if (formValues.first.length < 10) {
      error.first = "Firstname should be minimum 10 characters.";
    } else {
      error.first = "";
    }
    if (!formValues.last) {
      error.last = "Lastname is required";
    } else {
      error.last = "";
    }
    return error;
  };
  return (
    <div className="p-2 w-1/2">
      <h1 className="mx-1 mb-5 text-yellow-900 text-2xl font-semibold">
        Registration
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-yellow-100 border-2 border-yellow-500 border-solid rounded-sm flex flex-col p-6"
      >
        <label htmlFor="first" className="m-1 p-1">
          First
        </label>
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          value={formData.first}
          type="text"
          name="first"
          id="first"
          className="border-2 border-yellow-300 outline-2 outline-yellow-500 m-1 p-1"
        />
        <span className="text-red-500">{errorMessages.first}</span>
        <label htmlFor="last" className="m-1 p-1">
          Last
        </label>
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          value={formData.last}
          type="text"
          name="last"
          id="last"
          className="invalid:border-red-500 m-1 p-1 outline-2 outline-yellow-500 border-2 border-yellow-300"
        />
        <span className="text-red-500">{errorMessages.last}</span>
        <button className="bg-yellow-600 p-2 m-2 rounded-sm text-white outline-2 outline-yellow-800">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Registration;
