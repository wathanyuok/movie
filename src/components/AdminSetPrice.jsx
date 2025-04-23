import React, { useState, useEffect } from 'react';

const AdminSetPrice = ({ movies }) => {
  const [moviePrices, setMoviePrices] = useState({});
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    const prices = JSON.parse(localStorage.getItem('moviePrices') || '{}');
    setMoviePrices(prices);
  }, []);

  const handleEdit = (id, currentPrice) => {
    setEditId(id);
    setEditValue(currentPrice);
  };

  const handleSave = (id) => {
    if (!editValue) return;
    const prices = { ...moviePrices, [id]: Number(editValue) };
    setMoviePrices(prices);
    localStorage.setItem('moviePrices', JSON.stringify(prices));
    setEditId(null);
    setEditValue('');
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div style={{
      background: '#222',
      padding: 24,
      borderRadius: 12,
      maxWidth: 800, 
      margin: '40px auto',
      color: '#fff'
    }}>
      <h2>เปลี่ยนราคาหนัง (Admin)</h2>


      <h4>ราคาปัจจุบัน</h4>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse',
          marginTop: '16px'
        }}>
          <thead>
            <tr style={{ 
              backgroundColor: '#333', 
              color: '#ffb74d',
              textAlign: 'left'
            }}>
              <th style={{ padding: '12px', border: '1px solid #444' }}>ID</th>
              <th style={{ padding: '12px', border: '1px solid #444' }}>ชื่อหนัง</th>
              <th style={{ padding: '12px', border: '1px solid #444' }}>ราคา</th>
              <th style={{ padding: '12px', border: '1px solid #444' }}>แก้ไข</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(moviePrices).map(([id, price]) => {
              const movie = movies.find(m => m.id === Number(id));
              return (
                <tr key={id} style={{ borderBottom: '1px solid #444' }}>
                  <td style={{ padding: '12px', color: '#fff' }}>{id}</td>
                  <td style={{ padding: '12px', color: '#fff' }}>
                    {movie?.title || <span style={{ color: '#ff6666' }}>ไม่พบชื่อหนัง</span>}
                  </td>
                  <td style={{ padding: '12px', color: '#fff' }}>
                    {editId === id ? (
                      <input
                        type="number"
                        min={1}
                        value={editValue}
                        onChange={e => setEditValue(e.target.value)}
                        style={{ 
                          padding: '5px 8px', 
                          borderRadius: 6, 
                          border: 'none',
                          width: '80px',
                          fontSize: '0.9rem'
                        }}
                      />
                    ) : (
                      <>฿{price}</>
                    )}
                  </td>
                  <td style={{ padding: '12px', color: '#fff' }}>
                    {editId === id ? (
                      <button
                        onClick={() => handleSave(id)}
                        style={{ 
                          background: '#4CAF50',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 6,
                          padding: '6px 12px',
                          fontWeight: 'bold',
                          cursor: 'pointer'
                        }}
                      >
                        บันทึก
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(id, price)}
                        style={{ 
                          background: '#ff9800',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 6,
                          padding: '6px 12px',
                          fontWeight: 'bold',
                          cursor: 'pointer'
                        }}
                      >
                        แก้ไข
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSetPrice;
