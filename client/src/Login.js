// Login.js
import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const loginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      fetch('http://localhost:5555/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((user) => {
              setUser(user);
              // Redirect to home page after successful login
              navigate('/');
            });
          } else {
            response.json().then((data) => {
              formik.setErrors(data.errors || { _error: 'An error occurred during login.' });
            });
          }
        })
        .catch((error) => {
          console.error('Error during login:', error);
          formik.setErrors({ _error: 'An error occurred during login.' });
        });
    },
  });

  const navigate = useNavigate();

  return (
    <Paper
      elevation={3}
      style={{
        padding: '20px',
        margin: '20px',
        backgroundImage: 'url("https://wallpaperaccess.com/full/3407562.jpg")',
        backgroundSize: 'cover',
        minHeight: '100vh',
        display: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom style={{ color: 'black' }}>
        Welcome to Flatify!
      </Typography>
      <Typography variant="body1" paragraph style={{ color: 'black' }}>
        Log in to access personalized features and enhance your music experience.
      </Typography>
      {formik.errors._error && <Typography variant="body2" style={{ color: 'red' }}>{formik.errors._error}</Typography>}
      <form onSubmit={formik.handleSubmit} style={{ width: '300px', textAlign: 'center' }}>
        <TextField
          type="text"
          label="Username"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          type="password"
          label="Password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Sign In
        </Button>
      </form>
    </Paper>
  );
};

export default Login;
