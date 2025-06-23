import React from 'react';

const WhatsAppButton = () => {
  const phoneNumber = "529811153639"; 
  const message = "Hola, quiero más información sobre sus productos";
  const link = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a href={link}
       target="_blank"
       rel="noopener noreferrer"
       className="whatsapp-float">
      <img
        src="https://cdn-icons-png.flaticon.com/512/124/124034.png"
        alt="WhatsApp"
        width={50}
        height={50}
      />
    </a>
  );
};

export default WhatsAppButton;
