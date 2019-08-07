// import dependencies
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Form, Field, withFormik } from 'formik'
import * as Yup from 'yup'

const UserForm = ({ errors, touched, values, isSubmitting, status }) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (status) {
      setUsers([...users, status])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  return (
    <div className="user-form">
      <h1>Add Users</h1>
      <Form>
        <Field type="text" name="name" placeholder="Name" />
        {touched.name && errors.name && <p className="error">{errors.name}</p>}
        <Field type="email" name="email" placeholder="Email" />
        {touched.email && errors.email && (
          <p className="error">{errors.email}</p>
        )}
        <Field type="password" name="password" placeholder="Password" />
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}
        <label className="checkbox-container">
          Terms of Service
          <Field type="checkbox" name="tos" checked={values.tos} />
          {touched.tos && errors.tos && <p className="error">{errors.tos}</p>}
          <span className="checkmark" />
        </label>
        <button type="submit" disabled={isSubmitting}>
          Submit!
        </button>
      </Form>
    </div>
  )
}

const FormikUserForm = withFormik({
  mapPropsToValues({ name, email, password, tos }) {
    return {
      name: name || '',
      email: email || '',
      password: password || '',
      tos: tos || false
    }
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string()
      .email('Email address not valid')
      .required('Email is required'),
    password: Yup.string()
      .min(9, 'Password must be 9 characters or longer')
      .required('Password is required'),
    tos: Yup.boolean().required(
      'Please indicate that you have read and accept our terms of service.'
    )
  }),

  handleSubmit(values, { resetForm, setStatus, setSubmitting }) {
    axios
      .post('https://reqres.in/api/users/', values)
      .then(results => {
        setStatus(results.data)
        resetForm()
        setSubmitting(false)
      })
      .catch(error => console.log('ERROR! ', error.response))
  }
})(UserForm)

export default FormikUserForm
