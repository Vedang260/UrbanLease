import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faLock, 
  faArrowRight, 
  faShieldAlt,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../apis/auth';
import toast from 'react-hot-toast';
import { loginSuccess } from '../redux/slice/authSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  // Your existing form handling logic
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
         dispatch(loginSuccess({
          user: result?.user,
          token: result?.token
        }));
        toast.success('Welcome back to UrbanLease!');
        navigate('/');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* Left Side - Visual Branding */}
      <motion.div 
        className="lg:w-1/2 bg-gradient-to-br from-primary-dark to-accent p-12 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Luxury property background */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80')] bg-cover bg-center opacity-20" />
        
        {/* Content */}
        <motion.div
          className="relative z-10 text-white h-full flex flex-col justify-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h2 className="text-4xl font-serif font-bold mb-6">
            Welcome to <span className="text-amber-200">UrbanLease</span>
          </h2>
          <p className="text-xl mb-8 max-w-md">
            Your gateway to premium real estate experiences
          </p>
          
          {/* Benefits List */}
          <motion.ul className="space-y-4">
            {[
              "Access your saved properties",
              "Manage your listings dashboard",
              "Get personalized recommendations"
            ].map((item, i) => (
              <motion.li 
                key={i}
                className="flex items-start"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <span className="bg-accent/20 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                  <FontAwesomeIcon icon={faUserCircle} className="text-accent text-xs" />
                </span>
                <span>{item}</span>
              </motion.li>
            ))}
          </motion.ul>

          {/* Trust Badge */}
          <motion.div
            className="mt-12 flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <FontAwesomeIcon icon={faShieldAlt} className="text-accent mr-2" />
            <span className="text-sm text-white/80">256-bit SSL Encryption</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Right Side - Login Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
        <motion.div 
          className="w-full max-w-md bg-white lg:shadow-xl lg:rounded-xl lg:p-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h1 
              className="text-3xl font-serif font-bold text-secondary-dark mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Sign In
            </motion.h1>
            <motion.p 
              className="text-secondary-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {location.state?.registrationSuccess 
                ? 'Registration successful! Please log in.'
                : 'Access your UrbanLease account'}
            </motion.p>
          </div>

          {/* Form - Preserving all your Formik/Yup logic */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-5">
                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="relative">
                    <Field
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      className="w-full p-3 pl-11 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    />
                    <FontAwesomeIcon 
                      icon={faEnvelope} 
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400" 
                    />
                  </div>
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                </motion.div>

                {/* Password Field */}
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
                      className="w-full p-3 pl-11 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    />
                    <FontAwesomeIcon 
                      icon={faLock} 
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400" 
                    />
                  </div>
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                </motion.div>

                {/* Remember Me & Forgot Password */}
                <motion.div
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex items-center">
                    <Field
                      id="rememberMe"
                      name="rememberMe"
                      type="checkbox"
                      className="h-4 w-4 text-accent focus:ring-accent border-neutral-300 rounded"
                    />
                    <label htmlFor="rememberMe" className="ml-2 block text-sm text-secondary-600">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <Link 
                      to="/forgot-password" 
                      className="font-medium text-accent hover:text-accent-dark hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-accent hover:bg-accent-dark text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 mt-6 flex items-center justify-center shadow-md hover:shadow-lg"
                >
                  {isSubmitting ? (
                    'Signing in...'
                  ) : (
                    <>
                      Sign In <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                    </>
                  )}
                </motion.button>
              </Form>
            )}
          </Formik>

          {/* Social Login (Optional) */}
          
          <motion.div
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-secondary-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-neutral-200 rounded-md shadow-sm bg-white text-sm font-medium text-secondary-500 hover:bg-neutral-50"
              >
                <span>Google</span>
              </button>
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-neutral-200 rounded-md shadow-sm bg-white text-sm font-medium text-secondary-500 hover:bg-neutral-50"
              >
                <span>Apple</span>
              </button>
            </div>
          </motion.div>
          

          {/* Sign Up Link */}
          <motion.div 
            className="text-center mt-6 text-secondary-500 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            New to UrbanLease?{' '}
            <Link 
              to="/register" 
              className="text-accent font-medium hover:underline"
            >
              Create an account
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;