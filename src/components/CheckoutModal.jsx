import React, { useState, useEffect } from 'react';

const CheckoutModal = ({ onClose }) => {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>โอนเงินไปที่บัญชี 123-456-7890</h3>
        <p>เวลาที่เหลือ: {timeLeft} วินาที</p>
        <button onClick={onClose}>ปิด</button>
      </div>
    </div>
  );
};

export default CheckoutModal;
