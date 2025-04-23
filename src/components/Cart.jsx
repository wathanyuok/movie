import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import CheckoutModal from './CheckoutModal';

const Cart = () => {
  const {
    cart,
    clearCart,
    calculateTotal,
    decreaseQuantity,
    increaseQuantity
  } = useCart();
  const [showModal, setShowModal] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  let discount = 0;
  if (totalItems > 5) discount = subtotal * 0.2;
  else if (totalItems > 3) discount = subtotal * 0.1;

  return (
    <div className="cart">
      <h2>ตะกร้าสินค้า ({totalItems} ชิ้น)</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            <span style={{ fontWeight: 'bold' }}>{item.title}</span>
            <span style={{ margin: '0 8px', color: '#ffb74d' }}>
              (x{item.quantity}) - ฿{item.price * item.quantity}
            </span>
            <button
              onClick={() => decreaseQuantity(item.id)}
              style={{
                margin: '0 4px',
                fontWeight: 'bold',
                width: 28,
                height: 28,
                borderRadius: 4,
                border: 'none',
                background: '#444',
                color: '#fff',
                cursor: 'pointer'
              }}
              aria-label="ลดจำนวน"
            >-</button>
            <button
              onClick={() => increaseQuantity(item.id)}
              style={{
                margin: '0 4px',
                fontWeight: 'bold',
                width: 28,
                height: 28,
                borderRadius: 4,
                border: 'none',
                background: '#444',
                color: '#fff',
                cursor: 'pointer'
              }}
              aria-label="เพิ่มจำนวน"
            >+</button>
          </li>
        ))}
      </ul>
      <div className="price-details">
        <p>ยอดรวม: ฿{subtotal.toFixed(2)}</p>
        {discount > 0 && <p>ส่วนลด: ฿{discount.toFixed(2)}</p>}
        <p style={{ fontWeight: 'bold', color: '#4CAF50' }}>
          ยอดสุทธิ: ฿{calculateTotal().toFixed(2)}
        </p>
      </div>
      <div className="cart-buttons">
        <button
          onClick={() => setShowModal(true)}
          disabled={cart.length === 0}
          style={{
            background: cart.length === 0 ? '#aaa' : '#ff9800',
            color: '#fff',
            border: 'none',
            borderRadius: 7,
            padding: '8px 16px',
            fontWeight: 'bold',
            cursor: cart.length === 0 ? 'not-allowed' : 'pointer'
          }}
        >
          ชำระเงิน
        </button>
        <button
          onClick={clearCart}
          style={{
            background: '#ff9800',
            color: '#fff',
            border: 'none',
            borderRadius: 7,
            padding: '8px 16px',
            fontWeight: 'bold',
            marginLeft: 8
          }}
        >
          ลบทั้งหมด
        </button>
      </div>
      {showModal && <CheckoutModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Cart;
