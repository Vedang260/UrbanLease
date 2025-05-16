import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faHome, faKey, faArrowRight, faShieldAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
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

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const result = await registerUser(values);
      if (result.success) {
        toast.success(result.message);
        navigate('/login');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Registration failed:', error);
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
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80')] bg-cover bg-center opacity-20" />
        
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
            Join the premier platform for luxury real estate transactions.
          </p>
          
          <motion.ul className="space-y-6">
            {[
              { icon: faCheckCircle, text: "Instant access to 15K+ premium properties" },
              { icon: faCheckCircle, text: "AI-powered matchmaking for your perfect home" },
              { icon: faCheckCircle, text: "Dedicated concierge service" }
            ].map((item, i) => (
              <motion.li 
                key={i}
                className="flex items-start"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <FontAwesomeIcon icon={item.icon} className="text-accent mt-1 mr-3" />
                <span>{item.text}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            className="mt-12 flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <FontAwesomeIcon icon={faShieldAlt} className="text-accent mr-2" />
            <span className="text-sm text-white/80">SSL Secured • 256-bit Encryption</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Right Side - Registration Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
        <motion.div 
          className="w-full max-w-md bg-white lg:shadow-xl lg:rounded-xl lg:p-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <motion.h1 
              className="text-3xl font-serif font-bold text-secondary-dark mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Create Your Account
            </motion.h1>
            <motion.p 
              className="text-secondary-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Join 10,000+ property owners and tenants
            </motion.p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values }) => (
              <Form className="space-y-5">
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
                      className="w-full p-3 pl-11 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
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

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="relative">
                    <Field
                      name="password"
                      type="password"
                      placeholder="Password (min 6 characters)"
                      className="w-full p-3 pl-11 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
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
                  className="pt-2"
                >
                  <label className="block text-sm font-medium text-secondary-600 mb-3">
                    I am a:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: "OWNER", icon: faHome, label: "Owner" },
                      { value: "TENANT", icon: faKey, label: "Tenant" }
                    ].map((role) => (
                      <div key={role.value}>
                        <Field
                          name="role"
                          type="radio"
                          id={role.value}
                          value={role.value}
                          className="hidden peer"
                        />
                        <motion.label
                          htmlFor={role.value}
                          whileHover={{ scale: 1.03 }}
                          className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                            values.role === role.value
                              ? 'border-accent bg-accent/10'
                              : 'border-neutral-200 hover:border-accent/30'
                          }`}
                        >
                          <FontAwesomeIcon 
                            icon={role.icon} 
                            className={`mr-2 ${
                              values.role === role.value ? 'text-accent' : 'text-secondary-400'
                            }`}
                          />
                          <span className={values.role === role.value ? 'text-accent' : 'text-secondary-600'}>
                            {role.label}
                          </span>
                        </motion.label>
                      </div>
                    ))}
                  </div>
                  <ErrorMessage name="role" component="div" className="text-red-500 text-sm mt-1" />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-accent hover:bg-accent-dark text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 mt-6 flex items-center justify-center shadow-md hover:shadow-lg"
                >
                  {isSubmitting ? (
                    'Creating account...'
                  ) : (
                    <>
                      Register Now <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                    </>
                  )}
                </motion.button>
              </Form>
            )}
          </Formik>

          <motion.div 
            className="text-center mt-6 text-secondary-500 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-accent font-medium hover:underline"
            >
              Sign In
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;