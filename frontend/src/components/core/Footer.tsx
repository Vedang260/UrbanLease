import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { 
  faEnvelope, 
  faPhone, 
  faMapMarkerAlt, 
  faArrowRight,
  faHome,
  faBriefcase,
  faBookOpen
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: faFacebook, url: "#", name: "Facebook" },
    { icon: faTwitter, url: "#", name: "Twitter" },
    { icon: faInstagram, url: "#", name: "Instagram" },
    { icon: faLinkedin, url: "#", name: "LinkedIn" }
  ];

  const footerLinks = [
    { 
      title: "Company", 
      icon: faBriefcase,
      links: [
        { name: "About Us", path: "/about" },
        { name: "Careers", path: "/careers" },
        { name: "Blog", path: "/blog" },
        { name: "Press", path: "/press" }
      ] 
    },
    { 
      title: "Properties", 
      icon: faHome,
      links: [
        { name: "Buy", path: "/properties/buy" },
        { name: "Rent", path: "/properties/rent" },
        { name: "Sell", path: "/properties/sell" },
        { name: "Property Management", path: "/services/management" }
      ] 
    },
    { 
      title: "Resources", 
      icon: faBookOpen,
      links: [
        { name: "Help Center", path: "/help" },
        { name: "Safety Guidelines", path: "/safety" },
        { name: "Terms of Service", path: "/terms" },
        { name: "Privacy Policy", path: "/privacy" }
      ] 
    }
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
    <footer className="bg-secondary-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <motion.div 
          className="mb-16 bg-primary-dark/30 rounded-xl p-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute right-0 bottom-0 w-64 h-64 bg-accent/10 rounded-full -mr-20 -mb-20 blur-3xl"></div>
          <div className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-serif font-bold mb-3">Subscribe to Our Newsletter</h3>
                <p className="text-neutral-300 mb-6">
                  Get the latest property listings, market insights, and exclusive offers directly to your inbox.
                </p>
              </div>
              <div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-accent flex-grow"
                  />
                  <motion.button 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-6 py-3 bg-accent hover:bg-accent-dark text-white font-medium rounded-lg flex items-center justify-center transition-colors duration-300"
                  >
                    Subscribe
                    <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                  </motion.button>
                </div>
                <p className="text-xs text-neutral-400 mt-2">
                  By subscribing, you agree to our privacy policy and consent to receive updates.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-8 mb-12">
          {/* Brand Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h3 className="text-2xl font-serif font-bold mb-4">
              Urban<span className="text-accent-default">Lease</span>
            </h3>
            <p className="text-neutral-300 mb-4">
              Finding your perfect property with trust and transparency. Your journey to the ideal home starts here.
            </p>
            
            {/* Social Media Links */}
            <motion.div 
              className="flex space-x-4 mb-6"
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={fadeInUp}
                  whileHover={{ y: -4, color: "#D4B483" }}
                  className="w-10 h-10 bg-secondary-800 rounded-full flex items-center justify-center text-neutral-300 hover:text-accent-default transition-all duration-300"
                  aria-label={social.name}
                >
                  <FontAwesomeIcon icon={social.icon} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <h4 className="text-lg font-medium mb-4 text-primary-light flex items-center">
                <FontAwesomeIcon icon={section.icon} className="mr-2 text-accent-default" />
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <motion.li 
                    key={linkIndex}
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Link 
                      to={link.path} 
                      className="text-neutral-300 hover:text-accent-default transition-colors duration-300 block py-1"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h4 className="text-lg font-medium mb-4 text-primary-light flex items-center">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-accent-default" />
              Contact Us
            </h4>
            <ul className="space-y-4">
              <motion.li 
                className="flex items-start group"
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mt-1 mr-3 text-accent-default group-hover:text-accent" />
                <span className="text-neutral-300 group-hover:text-white transition-colors duration-300">
                  123 Property St, Real Estate City<br/>
                  New York, NY 10001
                </span>
              </motion.li>
              <motion.li 
                className="flex items-center group"
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <FontAwesomeIcon icon={faEnvelope} className="mr-3 text-accent-default group-hover:text-accent" />
                <a href="mailto:info@urbanlease.com" className="text-neutral-300 group-hover:text-white transition-colors duration-300">
                  info@urbanlease.com
                </a>
              </motion.li>
              <motion.li 
                className="flex items-center group"
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <FontAwesomeIcon icon={faPhone} className="mr-3 text-accent-default group-hover:text-accent" />
                <a href="tel:+15551234567" className="text-neutral-300 group-hover:text-white transition-colors duration-300">
                  +1 (555) 123-4567
                </a>
              </motion.li>
            </ul>

            {/* Office Hours */}
            <div className="mt-6 bg-secondary-800/50 p-4 rounded-lg">
              <h5 className="font-medium text-primary-light mb-2">Office Hours</h5>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-neutral-400">Monday - Friday:</div>
                <div className="text-neutral-300">9:00 AM - 6:00 PM</div>
                <div className="text-neutral-400">Saturday:</div>
                <div className="text-neutral-300">10:00 AM - 4:00 PM</div>
                <div className="text-neutral-400">Sunday:</div>
                <div className="text-neutral-300">Closed</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-t border-secondary-800 my-8"
        ></motion.div>

        {/* Copyright and Bottom Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-neutral-400 text-sm">
            © {currentYear} UrbanLease. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6">
            <Link to="/terms" className="text-sm text-neutral-400 hover:text-accent-default transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-sm text-neutral-400 hover:text-accent-default transition-colors">
              Privacy Policy
            </Link>
            <Link to="/cookies" className="text-sm text-neutral-400 hover:text-accent-default transition-colors">
              Cookie Policy
            </Link>
            <Link to="/accessibility" className="text-sm text-neutral-400 hover:text-accent-default transition-colors">
              Accessibility
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;