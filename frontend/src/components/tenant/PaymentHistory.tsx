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
  faEllipsisH,
  faBuilding,
  faHome,
  faCalendarCheck
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { fetchPaymentHistoryForTenant } from '../../apis/payments';
import { useAppSelector } from '../../hooks/hooks';
import { setLoading } from '../../redux/slice/loadingSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { format, parseISO } from 'date-fns';
import type { PaymentHistoryTenant } from '../../types/payments';

const PaymentHistoryForTenant: React.FC = () => {
  const [payments, setPayments] = useState<PaymentHistoryTenant[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // 10 rows per page
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadPayments = async () => {
      try {
        dispatch(setLoading(true));
        if (token) {
          const response = await fetchPaymentHistoryForTenant(token);
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

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
        status === 'pending' 
          ? 'bg-yellow-100 text-yellow-800' 
          : status === 'paid'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
      }`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          Payment History
        </h1>
        <p className="text-gray-600">
          {payments.length} payments found
        </p>
      </div>

      {/* Payments Table */}
      {currentPayments.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-xl font-bold text-secondary-600 mb-4">
            No payment history found
          </h3>
          <p className="text-secondary-500">
            You don't have any payments made at this time
          </p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <FontAwesomeIcon 
                              icon={faHome} 
                              className="text-accent mr-2"
                      />
                      Property
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <FontAwesomeIcon 
                            icon={faMoneyBillWave} 
                            className="text-accent mr-2"
                          />
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      TransactionId
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <FontAwesomeIcon 
                            icon={faCalendarCheck} 
                            className="text-accent mr-2"
                          />
                      Paid Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <FontAwesomeIcon 
                            icon={faCalendarAlt} 
                            className="text-gray-400 mr-2" 
                          />
                      Due Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <FontAwesomeIcon 
                            icon={faCreditCard} 
                            className="text-gray-400 mr-2" 
                          />
                        Method
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentPayments.map((payment, index) => (
                    <motion.tr
                      key={payment.paymentId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          #{payment.agreementId}
                        </div>
                        <div className="text-sm text-gray-500">
                          {payment.paymentId.slice(0, 8)}...
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            
                            <span 
                              className="text-sm font-medium text-gray-900"
                              title={payment.propertyTitle}  // Shows full title on hover
                            >
                              {payment.propertyTitle.length > 20 
                                ? payment.propertyTitle.slice(0, 20) + '...'
                                : payment.propertyTitle}
                            </span>
                          </div>
                        </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          
                          <span className="text-sm font-medium text-gray-900">
                            ₹{parseFloat(payment.amount).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          
                          <span className="text-sm text-gray-900">
                            {payment.transactionId}..
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          
                          <span className="text-sm text-gray-900">
                            {formatDate(payment.paidDate)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          
                          <span className="text-sm text-gray-900">
                            {formatDate(payment.dueDate)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          
                          <span className="text-sm text-gray-900 capitalize">
                            {payment.paymentMethod}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={payment.status} />
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handlePayment(payment.paymentId)}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
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
                            'Completed'
                          ) : (
                            'Failed'
                          )}
                        </button>
                      </td> */}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {payments.length > itemsPerPage && (
            <div className="flex justify-center mt-6">
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

export default PaymentHistoryForTenant;