import "../styles/components/WhatsAppButton.css";
import whatsappImage from '../assets/whatsapp.png'; // Adjust the path to the actual image location
import PropTypes from "prop-types";

const WhatsAppButton = ({ phoneNumber }) => {
  // Format phone number: remove any non-digit characters and add country code if not present
  const formattedNumber = phoneNumber.replace(/\D/g, '');
  const numberWithCountryCode = formattedNumber.startsWith('91') ? formattedNumber : `91${formattedNumber}`;
  
  const whatsappUrl = `https://wa.me/${numberWithCountryCode}`;

  return (
    <a href={whatsappUrl} className="whatsapp-button" target="_blank" rel="noopener noreferrer">
      <img src={whatsappImage} alt="WhatsApp" />
    </a>
  );
};

WhatsAppButton.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
};

export default WhatsAppButton; 