import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faHome, 
  faChartLine, 
  faHandshake, 
  faMapMarkerAlt, 
  faBed, 
  faBath, 
  faRulerCombined, 
  faHeart, 
  faNewspaper, 
  faKey
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Home = () => {
  const [activeTab, setActiveTab] = useState('buy');
  
  const properties = [
    {
      id: 1,
      title: "Luxury Waterfront Villa",
      location: "Miami Beach, FL",
      price: "$2,500,000",
      rent: "$12,500/mo",
      beds: 5,
      baths: 4,
      sqft: 3500,
      featured: true,
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 2,
      title: "Modern Downtown Loft",
      location: "New York, NY",
      price: "$1,200,000",
      rent: "$6,800/mo",
      beds: 2,
      baths: 2,
      sqft: 1800,
      featured: true,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1980&q=80"
    },
    {
      id: 3,
      title: "Suburban Family Home",
      location: "Austin, TX",
      price: "$750,000",
      rent: "$3,900/mo",
      beds: 4,
      baths: 3,
      sqft: 2800,
      featured: false,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 4,
      title: "Coastal Ocean View Retreat",
      location: "Malibu, CA",
      price: "$3,750,000",
      rent: "$15,500/mo",
      beds: 4,
      baths: 5,
      sqft: 4200,
      featured: true,
      image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80"
    },
    {
      id: 5,
      title: "Mountain View Cabin",
      location: "Aspen, CO",
      price: "$1,950,000",
      rent: "$8,200/mo",
      beds: 3,
      baths: 2,
      sqft: 2200,
      featured: false,
      image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 6,
      title: "Urban Penthouse Suite",
      location: "Chicago, IL",
      price: "$1,850,000",
      rent: "$9,800/mo",
      beds: 3,
      baths: 3.5,
      sqft: 2800,
      featured: false,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    }
  ];

  const features = [
    {
      icon: faSearch,
      title: "Smart Search",
      description: "Find properties that match your exact criteria with our AI-powered search"
    },
    {
      icon: faHome,
      title: "Virtual Tours",
      description: "Explore properties from the comfort of your home with 3D walkthroughs"
    },
    {
      icon: faChartLine,
      title: "Market Insights",
      description: "Get real-time pricing data and neighborhood analytics"
    },
    {
      icon: faHandshake,
      title: "Trusted Agents",
      description: "Connect with our certified real estate professionals"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "First-time Homebuyer",
      image: "https://randomuser.me/api/portraits/women/12.jpg",
      text: "UrbanLease made my first home buying experience incredibly smooth. Their agents were patient and knowledgeable, guiding me through every step of the process."
    },
    {
      name: "Michael Rodriguez",
      role: "Property Investor",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      text: "I've used multiple real estate platforms, but UrbanLease's market analytics and instant property valuations have been game-changers for my investment strategy."
    },
    {
      name: "Emma Thompson",
      role: "Luxury Home Seller",
      image: "https://randomuser.me/api/portraits/women/23.jpg",
      text: "The virtual staging and professional photography services helped me sell my property above asking price in less than a week. Couldn't be happier!"
    }
  ];

  const stats = [
    { number: "15K+", label: "Properties" },
    { number: "99%", label: "Customer Satisfaction" },
    { number: "250+", label: "Cities Covered" },
    { number: "10K+", label: "Successful Deals" }
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section with Parallax */}
      <section className="relative h-screen max-h-[800px] flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-40"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/10 via-transparent to-white" />
        </div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-secondary-dark mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Find Your <span className="text-accent">Dream</span> Home
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-secondary-600 max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover premium properties across the globe with our trusted real estate platform
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link 
              to="/register" 
              className="inline-block bg-accent hover:bg-accent-dark text-white font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Browse Properties
            </Link>
            <Link 
              to="/register" 
              className="inline-block bg-transparent border-2 border-secondary-dark text-secondary-dark hover:bg-secondary-dark hover:text-white font-medium py-3 px-8 rounded-full transition-all duration-300"
            >
              Contact an Agent
            </Link>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        />
      </section>

      {/* Enhanced Search Bar Section */}
      <motion.section 
        className="relative z-20 -mt-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white rounded-xl shadow-xl p-6">
          <div className="flex border-b border-neutral-200 mb-6">
            <button
              className={`py-2 px-6 font-medium text-lg transition-all duration-300 ${
                activeTab === 'buy' 
                  ? 'text-accent border-b-2 border-accent' 
                  : 'text-secondary-600 hover:text-secondary-800'
              }`}
              onClick={() => setActiveTab('buy')}
            >
              Buy
            </button>
            <button
              className={`py-2 px-6 font-medium text-lg transition-all duration-300 ${
                activeTab === 'rent' 
                  ? 'text-accent border-b-2 border-accent' 
                  : 'text-secondary-600 hover:text-secondary-800'
              }`}
              onClick={() => setActiveTab('rent')}
            >
              Rent
            </button>
            <button
              className={`py-2 px-6 font-medium text-lg transition-all duration-300 ${
                activeTab === 'sell' 
                  ? 'text-accent border-b-2 border-accent' 
                  : 'text-secondary-600 hover:text-secondary-800'
              }`}
              onClick={() => setActiveTab('sell')}
            >
              Sell
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium text-secondary-600 mb-1">Location</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="City, neighborhood, or ZIP" 
                  className="w-full p-3 pl-10 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
                <FontAwesomeIcon icon={faMapMarkerAlt} className="absolute left-3 top-3.5 text-secondary-400" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary-600 mb-1">Property Type</label>
              <select className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent appearance-none bg-white">
                <option>Any Type</option>
                <option>House</option>
                <option>Apartment</option>
                <option>Condo</option>
                <option>Land</option>
                <option>Commercial</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary-600 mb-1">Price Range</label>
              <select className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent appearance-none bg-white">
                <option>Any Price</option>
                <option>$0 - $500,000</option>
                <option>$500,000 - $1M</option>
                <option>$1M - $2M</option>
                <option>$2M - $5M</option>
                <option>$5M+</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button className="w-full bg-primary-dark hover:bg-secondary-dark text-white py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center">
                <FontAwesomeIcon icon={faSearch} className="mr-2" />
                Search
              </button>
            </div>
          </div>

          {/* Advanced filters - expandable */}
          <div className="mt-4">
            <button className="text-accent text-sm font-medium flex items-center hover:underline">
              Advanced Filters
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </motion.section>

      {/* Quick Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <p className="text-4xl md:text-5xl font-serif font-bold text-accent mb-2">{stat.number}</p>
              <p className="text-secondary-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Properties - Enhanced Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary-dark mb-3">Featured Properties</h2>
            <p className="text-secondary-600 max-w-2xl">
              Handpicked premium properties curated by our expert agents
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <button className="p-2 rounded-lg border border-neutral-200 hover:border-accent transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="p-2 rounded-lg border border-neutral-200 hover:border-accent transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {properties.slice(0, 6).map((property, index) => (
            <motion.div 
              key={property.id}
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              variants={fadeInUp}
              whileHover={{ y: -8 }}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {property.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-accent text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">Featured</span>
                  </div>
                )}
                
                <button className="absolute top-4 right-4 h-10 w-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-accent hover:text-accent-dark transition-colors duration-300">
                  <FontAwesomeIcon icon={faHeart} />
                </button>
                
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-white font-medium text-lg drop-shadow-md">
                    {activeTab === 'rent' ? property.rent : property.price}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-secondary-800 mb-2 group-hover:text-accent transition-colors duration-300">{property.title}</h3>
                <p className="text-secondary-600 mb-4 flex items-center">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-accent" />
                  {property.location}
                </p>
                
                <div className="flex justify-between text-sm text-secondary-500 border-t border-neutral-100 pt-4">
                  <span className="flex items-center">
                    <FontAwesomeIcon icon={faBed} className="mr-2 text-secondary-400" />
                    {property.beds} Beds
                  </span>
                  <span className="flex items-center">
                    <FontAwesomeIcon icon={faBath} className="mr-2 text-secondary-400" />
                    {property.baths} Baths
                  </span>
                  <span className="flex items-center">
                    <FontAwesomeIcon icon={faRulerCombined} className="mr-2 text-secondary-400" />
                    {property.sqft.toLocaleString()} sqft
                  </span>
                </div>
              </div>
              
              <div className="px-6 pb-6">
                <Link 
                  to={`/property/${property.id}`}
                  className="block w-full py-3 text-center bg-primary-light text-secondary-dark font-medium rounded-lg hover:bg-primary transition-colors duration-300"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link 
            to="/properties" 
            className="inline-block border-2 border-accent text-accent hover:bg-accent hover:text-white font-medium py-3 px-8 rounded-full transition-all duration-300"
          >
            View All Properties
          </Link>
        </motion.div>
      </section>

      {/* Features Section with Enhanced Design */}
      <section className="py-24 bg-neutral-50">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent font-medium">Our Advantages</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary-dark mt-2 mb-4">Why Choose UrbanLease</h2>
            <p className="text-secondary-600 max-w-2xl mx-auto">
              Our platform is designed to make your property journey seamless and successful
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-b-4 border-transparent hover:border-accent"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-6 text-accent text-2xl group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                  <FontAwesomeIcon icon={feature.icon} />
                </div>
                <h3 className="text-xl font-bold text-secondary-800 mb-3 text-center">{feature.title}</h3>
                <p className="text-secondary-600 text-center">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - New */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent font-medium">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary-dark mt-2 mb-4">What Our Clients Say</h2>
          <p className="text-secondary-600 max-w-2xl mx-auto">
            Here's what some of our happy clients have to say about their experience with UrbanLease
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="bg-white p-8 rounded-xl shadow-md relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="text-primary-dark text-5xl absolute -top-5 -left-2 opacity-20">"</div>
              <p className="text-secondary-600 mb-6 relative z-10">{testimonial.text}</p>
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-secondary-800">{testimonial.name}</h4>
                  <p className="text-sm text-secondary-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Section - New */}
      <section className="py-20 bg-gradient-to-b from-white to-primary-light/30">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent font-medium">Our Services</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary-dark mt-2 mb-4">Complete Real Estate Solutions</h2>
            <p className="text-secondary-600 max-w-2xl mx-auto">
              From finding your dream home to managing rental properties, we offer comprehensive services
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <div className="h-48 bg-primary-dark flex items-center justify-center">
                <FontAwesomeIcon icon={faHome} className="text-6xl text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-secondary-800 mb-3">Property Sales</h3>
                <p className="text-secondary-600 mb-6">
                  Find your dream home with our extensive listings or sell your property with our expert agents at the best market value.
                </p>
                <Link to="/services/buy-sell" className="text-accent font-medium hover:underline flex items-center">
                  Learn More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="h-48 bg-secondary-dark flex items-center justify-center">
                <FontAwesomeIcon icon={faKey} className="text-6xl text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-secondary-800 mb-3">Property Rentals</h3>
                <p className="text-secondary-600 mb-6">
                  Streamlined rental process with easy application, secure agreements, and hassle-free payment tracking for landlords and tenants.
                </p>
                <Link to="/services/rentals" className="text-accent font-medium hover:underline flex items-center">
                  Learn More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="h-48 bg-accent flex items-center justify-center">
                <FontAwesomeIcon icon={faNewspaper} className="text-6xl text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-secondary-800 mb-3">Property Management</h3>
                <p className="text-secondary-600 mb-6">
                  Full-service property management including tenant screening, maintenance coordination, and financial reporting.
                </p>
                <Link to="/services/management" className="text-accent font-medium hover:underline flex items-center">
                  Learn More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
};

export default Home;