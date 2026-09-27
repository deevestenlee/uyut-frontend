import React, { useState } from 'react';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('Все');
  const [cart, setCart] = useState([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('ru');

  // Начальный список товаров, который сразу появится на экране
  const [products, setProducts] = useState([
    { id: 1, name: 'Миндальный круассан', category: 'Круассаны', price: 4500, rating: '4.9', desc: 'Слоёное тесто, франжипан, миндаль', emoji: '🥐', badge: 'ХИТ' },
    { id: 2, name: 'Классический круассан', category: 'Круассаны', price: 3500, rating: '4.8', desc: 'Воздушное тесто на сливочном масле', emoji: '🥐', badge: 'СВЕЖЕЕ' },
    { id: 3, name: 'Шоколадный бриошь', category: 'Торты', price: 5500, rating: '4.8', desc: 'Сдобное тесто, бельгийский шоколад', emoji: '🍰', badge: 'НОВИНКА' },
    { id: 4, name: 'Вишневый пай', category: 'Пироги', price: 6000, rating: '4.7', desc: 'Сочная вишня, песочное тесто', emoji: '🥧', badge: 'ТОП' },
    { id: 5, name: 'Фирменное печенье', category: 'Печенье', price: 3000, rating: '4.9', desc: 'С кусочками бельгийского шоколада', emoji: '🍪', badge: '' },
    { id: 6, name: 'Капучино на овсяном', category: 'Напитки', price: 4500, rating: '5.0', desc: 'Ароматный кофе с нежной пенкой', emoji: '☕', badge: '' }
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCat, setNewCat] = useState('Круассаны');
  const [newDesc, setNewDesc] = useState('');

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;
    const newItem = {
      id: Date.now(),
      name: newTitle,
      category: newCat,
      price: Number(newPrice),
      rating: '5.0',
      desc: newDesc || 'Свежая выпечка ручной работы',
      emoji: '🍞',
      badge: 'НОВОЕ'
    };
    setProducts([newItem, ...products]);
    setNewTitle('');
    setNewPrice('');
    setNewDesc('');
    alert('Товар успешно добавлен!');
  };

  const filteredProducts = products.filter(item => {
    return activeCategory === 'Все' || item.category === activeCategory;
  });

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{
      background: '#06080c',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      fontFamily: 'Inter, sans-serif',
      padding: '16px',
      color: '#fff'
    }}>
      <div style={{
        maxWidth: '390px',
        width: '100%',
        background: '#0b0e14',
        borderRadius: '44px',
        boxShadow: '0 30px 60px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(245, 158, 11, 0.12)',
        overflow: 'hidden',
        padding: '20px 18px 24px',
        boxSizing: 'border-box'
      }}>
        
        {/* Шапка */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px 8px', fontSize: '11px', color: '#9ca3af' }}>
          <span>📍 Сеул, Каннам-гу 12-3</span>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button 
              onClick={() => setCurrentLang(currentLang === 'ru' ? 'en' : 'ru')}
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '2px 6px', borderRadius: '8px', fontSize: '10px', cursor: 'pointer' }}
            >
              🌐 {currentLang.toUpperCase()}
            </button>
            <button 
              onClick={() => setIsAdminOpen(!isAdminOpen)}
              style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', color: '#f59e0b', padding: '2px 8px', borderRadius: '8px', fontSize: '10px', fontWeight: '700', cursor: 'pointer' }}
            >
              {isAdminOpen ? '✕ Закрыть' : '⚙️ Админ'}
            </button>
          </div>
        </div>

        {/* Панель админа */}
        {isAdminOpen && (
          <div style={{ background: '#141822', border: '1px solid #f59e0b', borderRadius: '16px', padding: '12px', marginBottom: '14px' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#f59e0b' }}>Добавить товар в меню</h3>
            <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input type="text" placeholder="Название блюда" value={newTitle} onChange={e => setNewTitle(e.target.value)} style={{ background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '6px 10px', color: '#fff', fontSize: '12px' }} />
              <input type="number" placeholder="Цена (₩, например 4000)" value={newPrice} onChange={e => setNewPrice(e.target.value)} style={{ background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '6px 10px', color: '#fff', fontSize: '12px' }} />
              <select value={newCat} onChange={e => setNewCat(e.target.value)} style={{ background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '6px 10px', color: '#fff', fontSize: '12px' }}>
                <option value="Круассаны">Круассаны</option>
                <option value="Торты">Торты</option>
                <option value="Пироги">Пироги</option>
                <option value="Печенье">Печенье</option>
                <option value="Напитки">Напитки</option>
              </select>
              <input type="text" placeholder="Описание" value={newDesc} onChange={e => setNewDesc(e.target.value)} style={{ background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '6px 10px', color: '#fff', fontSize: '12px' }} />
              <button type="submit" style={{ background: '#f59e0b', color: '#0b0e14', border: 'none', borderRadius: '8px', padding: '8px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>Добавить на витрину</button>
            </form>
          </div>
        )}

        {/* Бренд и корзина */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0 12px', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '38px', height: '38px', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🥐</div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase' }}>Уют Кафе</div>
              <div style={{ fontSize: '9px', fontWeight: '500', color: '#f59e0b' }}>📞 +82 10-1234-5678</div>
            </div>
          </div>
          <div style={{ width: '38px', height: '38px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', position: 'relative' }}>
            🛒
            {cart.length > 0 && (
              <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: '#f59e0b', color: '#0b0e14', fontSize: '9px', fontWeight: '800', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #0b0e14' }}>{cart.length}</span>
            )}
          </div>
        </div>

        {/* Категории */}
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '14px', scrollbarWidth: 'none' }}>
          {['Все', 'Круассаны', 'Торты', 'Пироги', 'Печенье', 'Напитки'].map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <div key={cat} onClick={() => setActiveCategory(cat)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer', flexShrink: 0 }}>
                <div style={{ width: '46px', height: '46px', background: isActive ? '#f59e0b' : 'rgba(255, 255, 255, 0.04)', border: `1px solid ${isActive ? '#f59e0b' : 'rgba(255, 255, 255, 0.06)'}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                  {cat === 'Все' ? '🌟' : cat === 'Круассаны' ? '🥐' : cat === 'Торты' ? '🍰' : cat === 'Пироги' ? '🥧' : cat === 'Печенье' ? '🍪' : '☕'}
                </div>
                <span style={{ fontSize: '10px', color: isActive ? '#fcd34d' : '#9ca3af', fontWeight: isActive ? '700' : '500' }}>{cat}</span>
              </div>
            );
          })}
        </div>

        <div style={{ fontSize: '15px', fontWeight: '800', margin: '6px 0 12px' }}>Меню ({filteredProducts.length}) 🔥</div>

        {/* Сетка товаров */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', maxHeight: '320px', overflowY: 'auto', paddingRight: '2px' }}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <div key={item.id} style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '16px', padding: '10px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                {item.badge && (
                  <span style={{ position: 'absolute', top: '10px', left: '10px', background: '#f59e0b', color: '#0b0e14', fontSize: '8px', fontWeight: '800', padding: '2px 5px', borderRadius: '4px', zIndex: 2 }}>{item.badge}</span>
                )}
                <div style={{ background: '#141822', borderRadius: '12px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', marginBottom: '6px' }}>{item.emoji}</div>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: '700', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
                  <div style={{ fontSize: '9px', color: '#f59e0b', fontWeight: '700', marginBottom: '2px' }}>★ {item.rating}</div>
                  <div style={{ fontSize: '8px', color: '#6b7280', marginBottom: '6px', lineHeight: '1.2' }}>{item.desc}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '6px' }}>
                  <div style={{ fontSize: '11px', fontWeight: '800', color: '#fcd34d' }}>{item.price.toLocaleString()} ₩</div>
                  <button onClick={() => addToCart(item)} style={{ width: '24px', height: '24px', background: '#f59e0b', color: '#0b0e14', borderRadius: '6px', border: 'none', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                </div>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: 'span 2', textAlign: 'center', color: '#6b7280', padding: '20px', fontSize: '12px' }}>Товары не найдены 😢</div>
          )}
        </div>

        {/* Корзина */}
        {cart.length > 0 && (
          <div style={{ marginTop: '12px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '12px', padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px' }}>В корзине: {cart.length} тов. ({totalPrice.toLocaleString()} ₩)</span>
            <button onClick={() => alert('Заказ успешно оформлен!')} style={{ background: '#f59e0b', color: '#0b0e14', border: 'none', padding: '6px 12px', borderRadius: '8px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}>Оформить</button>
          </div>
        )}

      </div>
    </div>
  );
}