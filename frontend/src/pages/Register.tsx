import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faHome, faKey, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '../apis/auth';
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();

  const initialValues = {
    fullName: '',
    email: '',
    password: '',
    role: ''
  };

  const validationSchema = Yup.object({
    fullName: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must be 20 characters or less')
      .required('Username is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    role: Yup.string()
      .required('Please select a role')
  });

  const handleSubmit = async (values: any, { setSubmitting }: any ) => {
    try {
      const result = await registerUser(values);
      if(result.success){
        toast.success(result.message);
        navigate('/login');
      }
      else{
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Motivational Section */}
      <motion.div 
        className="hidden lg:flex w-1/2 bg-gradient-to-br from-primary-dark to-accent p-12 flex-col justify-center relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20" />
        
        <motion.div
          className="relative z-10 text-white"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h2 className="text-4xl font-serif font-bold mb-6">Join Our Community</h2>
          <p className="text-xl mb-8 max-w-md">
            Whether you're looking to rent your dream home or find the perfect tenant, we make the process simple and rewarding.
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
                <p className="text-white/90">Maximize your rental income with our platform's advanced tools and wide tenant network.</p>
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
                <p className="text-white/90">Find verified properties with transparent pricing and no hidden fees.</p>
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
          Already have an account?{' '}
          <Link to="/login" className="text-white font-medium hover:underline">
            Sign In
          </Link>
        </motion.div>
      </motion.div>

      {/* Right Side - Registration Form */}
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
              Create Your Account
            </motion.h1>
            <motion.p 
              className="text-secondary-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Join thousands of property owners and tenants
            </motion.p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values }) => (
              <Form className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="relative">
                    <Field
                      name="fullName"
                      type="text"
                      placeholder="Full Name"
                      className="w-full p-4 pl-12 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                    <FontAwesomeIcon 
                      icon={faUser} 
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400" 
                    />
                  </div>
                  <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm mt-1" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
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
                  transition={{ delay: 0.6 }}
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
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-secondary-600 mb-3">
                      I want to register as:
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Field
                          name="role"
                          type="radio"
                          id="owner"
                          value="OWNER"
                          className="hidden peer"
                        />
                        <label
                          htmlFor="owner"
                          className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                            values.role === 'owner'
                              ? 'border-accent bg-accent/10'
                              : 'border-neutral-200 hover:border-accent/50'
                          }`}
                        >
                          <FontAwesomeIcon 
                            icon={faHome} 
                            className={`text-2xl mb-2 ${
                              values.role === 'OWNER' ? 'text-accent' : 'text-secondary-400'
                            }`} 
                          />
                          <span className={`font-medium ${
                            values.role === 'OWNER' ? 'text-accent' : 'text-secondary-600'
                          }`}>
                            Property Owner
                          </span>
                        </label>
                      </div>
                      <div>
                        <Field
                          name="role"
                          type="radio"
                          id="tenant"
                          value="TENANT"
                          className="hidden peer"
                        />
                        <label
                          htmlFor="tenant"
                          className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                            values.role === 'tenant'
                              ? 'border-accent bg-accent/10'
                              : 'border-neutral-200 hover:border-accent/50'
                          }`}
                        >
                          <FontAwesomeIcon 
                            icon={faKey} 
                            className={`text-2xl mb-2 ${
                              values.role === 'TENANT' ? 'text-accent' : 'text-secondary-400'
                            }`} 
                          />
                          <span className={`font-medium ${
                            values.role === 'TENANT' ? 'text-accent' : 'text-secondary-600'
                          }`}>
                            Tenant
                          </span>
                        </label>
                      </div>
                    </div>
                    <ErrorMessage name="role" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent hover:bg-accent-dark text-white font-medium py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      'Creating account...'
                    ) : (
                      <>
                        Register Now
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
            Already have an account?{' '}
            <Link to="/login" className="text-accent font-medium hover:underline">
              Sign In
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;