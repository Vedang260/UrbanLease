import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faArrowRight, faHome, faKey } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../apis/auth';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
  });

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const result = await loginUser(values);
      if(result.success){
        toast.success('Welcome to UrbanLease!');
        navigate('/');
      }else{
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Motivational Section */}
      <motion.div 
        className="hidden lg:flex w-1/2 bg-gradient-to-br from-secondary-dark to-primary-dark p-12 flex-col justify-center relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20" />
        
        <motion.div
          className="relative z-10 text-white"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h2 className="text-4xl font-serif font-bold mb-6">Welcome Back</h2>
          <p className="text-xl mb-8 max-w-md">
            Access your personalized dashboard to manage your properties or find your next dream home.
          </p>
          
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1, delay: 0.4 }}
          >
            <motion.div 
              className="flex items-start"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <div className="bg-white/20 p-3 rounded-full mr-4">
                <FontAwesomeIcon icon={faHome} className="text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">For Property Owners</h3>
                <p className="text-white/90">Track applications, manage properties, and connect with tenants.</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-start"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-white/20 p-3 rounded-full mr-4">
                <FontAwesomeIcon icon={faKey} className="text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">For Tenants</h3>
                <p className="text-white/90">Save favorite properties and track your applications.</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-8 left-8 text-white/80 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Don't have an account?{' '}
          <Link to="/register" className="text-white font-medium hover:underline">
            Sign Up
          </Link>
        </motion.div>
      </motion.div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div 
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-10">
            <motion.h1 
              className="text-3xl font-serif font-bold text-secondary-dark mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Sign In
            </motion.h1>
            <motion.p 
              className="text-secondary-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {location.state?.registrationSuccess 
                ? 'Registration successful! Please log in.'
                : 'Access your account to continue'}
            </motion.p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="relative">
                    <Field
                      name="email"
                      type="email"
                      placeholder="Email"
                      className="w-full p-4 pl-12 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                    <FontAwesomeIcon 
                      icon={faEnvelope} 
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400" 
                    />
                  </div>
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="relative">
                    <Field
                      name="password"
                      type="password"
                      placeholder="Password"
                      className="w-full p-4 pl-12 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                    <FontAwesomeIcon 
                      icon={faLock} 
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400" 
                    />
                  </div>
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                </motion.div>

                <motion.div
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-accent focus:ring-accent border-neutral-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-secondary-600">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <Link to="/forgot-password" className="font-medium text-accent hover:text-accent-dark">
                      Forgot password?
                    </Link>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent hover:bg-accent-dark text-white font-medium py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      'Signing in...'
                    ) : (
                      <>
                        Sign In
                        <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                      </>
                    )}
                  </button>
                </motion.div>
              </Form>
            )}
          </Formik>

          <motion.div 
            className="text-center mt-8 text-secondary-600 text-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Don't have an account?{' '}
            <Link to="/register" className="text-accent font-medium hover:underline">
              Sign Up
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;