import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarAlt,
  faMoneyBillWave,
  faClock,
  faCheckCircle,
  faExclamationCircle,
  faCreditCard,
  faChevronLeft,
  faChevronRight,
  faEllipsisH
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { fetchUpcomingPaymentsForTenant } from '../../apis/payments';
import { useAppSelector } from '../../hooks/hooks';
import { setLoading } from '../../redux/slice/loadingSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { format, parseISO } from 'date-fns';
import type { Payment } from '../../types/payments';
import { initiatePayment } from '../../apis/payments';

const UpcomingPaymentsForTenant: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // 6 cards per page
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadPayments = async () => {
      try {
        dispatch(setLoading(true));
        if (token) {
          const response = await fetchUpcomingPaymentsForTenant(token);
          if (response.success) {
            setPayments(response.payments);
          } else {
            toast.error(response.message);
          }
        }
      } catch (err) {
        console.log(err);
        toast.error('Failed to load upcoming payments');
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadPayments();
  }, [token, dispatch]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPayments = payments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(payments.length / itemsPerPage);

  // Format date to readable format
  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), 'MMM dd, yyyy');
  };

  // Calculate days remaining until due date
  const getDaysRemaining = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? `${diffDays} days` : 'Due today';
  };

  // Handle payment action
  const handlePayment = async (paymentId: string) => {
    // Implement payment processing logic here
    try {
        dispatch(setLoading(true));
        if (token) {
          const response = await initiatePayment(paymentId, token);
          if (response.success) {
            window.location.href = response?.url
          } else {
            toast.error(response.message);
          }
        }
      } catch (err) {
        console.log(err);
        toast.error('Failed to load upcoming payments');
      } finally {
        dispatch(setLoading(false));
      }
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          Upcoming Payments
        </h1>
        <p className="text-gray-600">
          {payments.length} payments found
        </p>
      </div>

      {/* Payments Grid */}
      {currentPayments.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-xl font-bold text-secondary-600 mb-4">
            No upcoming payments found
          </h3>
          <p className="text-secondary-500">
            You don't have any pending payments at this time
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPayments.map((payment, index) => (
              <motion.div
                key={payment.paymentId}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.05 }}
              >
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="p-6">
                    {/* Payment Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          Payment #{payment.agreementId}
                        </h3>
                        <p className="text-sm text-gray-500">
                          ID: {payment.paymentId.slice(0, 8)}...
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        payment.status === 'pending' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : payment.status === 'paid'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </div>

                    {/* Payment Amount */}
                    <div className="flex items-center mb-4">
                      <div className="bg-accent/10 p-3 rounded-lg mr-4">
                        <FontAwesomeIcon 
                          icon={faMoneyBillWave} 
                          className="text-accent text-xl"
                        />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Amount Due</p>
                        <p className="text-2xl font-bold text-gray-800">
                          ₹{parseFloat(payment.amount).toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>

                    {/* Payment Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center">
                        <FontAwesomeIcon 
                          icon={faCalendarAlt} 
                          className="text-gray-400 mr-3" 
                        />
                        <div>
                          <p className="text-sm text-gray-500">Due Date</p>
                          <p className="text-gray-800">
                            {formatDate(payment.dueDate)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <FontAwesomeIcon 
                          icon={faClock} 
                          className="text-gray-400 mr-3" 
                        />
                        <div>
                          <p className="text-sm text-gray-500">Time Remaining</p>
                          <p className="text-gray-800">
                            {getDaysRemaining(payment.dueDate)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <FontAwesomeIcon 
                          icon={faCreditCard} 
                          className="text-gray-400 mr-3" 
                        />
                        <div>
                          <p className="text-sm text-gray-500">Payment Method</p>
                          <p className="text-gray-800 capitalize">
                            {payment.paymentMethod}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Pay Now Button */}
                    <button
                      onClick={() => handlePayment(payment.paymentId)}
                      className={`w-full py-3 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center ${
                        payment.status === 'pending'
                          ? 'bg-accent text-white hover:bg-accent-dark'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={payment.status !== 'pending'}
                    >
                      {payment.status === 'pending' ? (
                        <>
                          <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                          Pay Now
                        </>
                      ) : payment.status === 'paid' ? (
                        <>
                          <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                          Payment Completed
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" />
                          Payment Failed
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {payments.length > itemsPerPage && (
            <div className="flex justify-center mt-10">
              <nav className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 border border-gray-200 rounded-lg flex items-center ${
                    currentPage === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
                  Previous
                </button>

                {/* Page numbers */}
                {currentPage > 2 && (
                  <button
                    onClick={() => setCurrentPage(1)}
                    className={`px-4 py-2 border rounded-lg ${
                      1 === currentPage
                        ? 'bg-accent text-white border-accent'
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    1
                  </button>
                )}

                {currentPage > 3 && (
                  <span className="px-2 text-gray-500">
                    <FontAwesomeIcon icon={faEllipsisH} />
                  </span>
                )}

                {[
                  currentPage - 1,
                  currentPage,
                  currentPage + 1,
                ]
                  .filter(page => page > 0 && page <= totalPages)
                  .map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 border rounded-lg ${
                        page === currentPage
                          ? 'bg-accent text-white border-accent'
                          : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                {currentPage < totalPages - 2 && (
                  <span className="px-2 text-gray-500">
                    <FontAwesomeIcon icon={faEllipsisH} />
                  </span>
                )}

                {currentPage < totalPages - 1 && (
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className={`px-4 py-2 border rounded-lg ${
                      totalPages === currentPage
                        ? 'bg-accent text-white border-accent'
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {totalPages}
                  </button>
                )}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 border border-gray-200 rounded-lg flex items-center ${
                    currentPage === totalPages
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Next
                  <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
                </button>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UpcomingPaymentsForTenant;