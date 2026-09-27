import React, { useState } from 'react';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('Круассаны');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  
  // Управление админкой и паролем
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  // Состояние для увеличения картинки товара при клике
  const [selectedImage, setSelectedImage] = useState(null);

  // Список товаров со старой и новой ценой
  const [products, setProducts] = useState([
    { 
      id: 1, 
      name: 'Миндальный круассан', 
      category: 'Круассаны', 
      price: 4500, 
      oldPrice: 5000,
      rating: '4.9', 
      desc: 'Слоёное тесто, франжипан, миндаль', 
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80', 
      badge: 'ХИТ' 
    },
    { 
      id: 2, 
      name: 'Шоколадный бриошь', 
      category: 'Торты', 
      price: 5500, 
      oldPrice: 6500,
      rating: '4.8', 
      desc: 'Сдобное тесто, бельгийский шоколад', 
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80', 
      badge: 'НОВИНКА' 
    }
  ]);

  // Состояния для формы добавления товара (включая старую цену)
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newOldPrice, setNewOldPrice] = useState('');
  const [newCat, setNewCat] = useState('Круассаны');
  const [newDesc, setNewDesc] = useState('');
  const [newImage, setNewImage] = useState('');
  const [newBadge, setNewBadge] = useState('ХИТ');

  // Загрузка файла с устройства
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === '1234') {
      setIsAdminLoggedIn(true);
      setShowLoginModal(false);
      setPasswordInput('');
    } else {
      alert('Неверный пароль! (подсказка: 1234)');
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;
    const newItem = {
      id: Date.now(),
      name: newTitle,
      category: newCat,
      price: Number(newPrice),
      oldPrice: newOldPrice ? Number(newOldPrice) : null,
      rating: '5.0',
      desc: newDesc || 'Свежая выпечка ручной работы',
      image: newImage || 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80',
      badge: newBadge
    };
    setProducts([newItem, ...products]);
    setNewTitle('');
    setNewPrice('');
    setNewOldPrice('');
    setNewDesc('');
    setNewImage('');
    alert('Товар успешно добавлен на витрину!');
  };

  const filteredProducts = products.filter(item => {
    const matchesCat = activeCategory === 'Все' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
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
      padding: '16px'
    }}>
      {/* Мобильный фрейм */}
      <div style={{
        maxWidth: '390px',
        width: '100%',
        background: '#0b0e14',
        borderRadius: '44px',
        boxShadow: '0 30px 60px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(245, 158, 11, 0.12)',
        overflow: 'hidden',
        padding: '20px 18px 24px',
        position: 'relative',
        color: '#fff',
        boxSizing: 'border-box'
      }}>
        
        {/* Модальное окно увеличения картинки */}
        {selectedImage && (
          <div 
            onClick={() => setSelectedImage(null)}
            style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              background: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)',
              zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', boxSizing: 'border-box', cursor: 'pointer'
            }}
          >
            <img src={selectedImage} alt="Zoomed" style={{ width: '100%', maxHeight: '300px', objectFit: 'contain', borderRadius: '16px', border: '1px solid rgba(245, 158, 11, 0.3)' }} />
            <span style={{ color: '#f59e0b', fontSize: '12px', marginTop: '12px', fontWeight: 'bold' }}>Нажмите, чтобы закрыть ✕</span>
          </div>
        )}

        {/* Верхняя строка: Адрес + Вход админа */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px 8px', fontSize: '11px', color: '#9ca3af' }}>
          <span>📍 Сеул, Каннам-гу 12-3</span>
          {!isAdminLoggedIn ? (
            <button 
              onClick={() => setShowLoginModal(true)}
              style={{
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                color: '#f59e0b',
                padding: '2px 8px',
                borderRadius: '8px',
                fontSize: '10px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              ⚙️ Вход для админа
            </button>
          ) : (
            <button 
              onClick={() => setIsAdminLoggedIn(false)}
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#ef4444',
                padding: '2px 8px',
                borderRadius: '8px',
                fontSize: '10px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Выйти
            </button>
          )}
        </div>

        {/* Модалка входа */}
        {showLoginModal && (
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(6, 8, 12, 0.9)', backdropFilter: 'blur(6px)',
            zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', boxSizing: 'border-box'
          }}>
            <form onSubmit={handleLogin} style={{
              background: '#141822', border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '20px', padding: '20px', width: '100%', textAlign: 'center'
            }}>
              <h3 style={{ margin: '0 0 6px 0', fontSize: '15px', color: '#fff' }}>Вход для администратора</h3>
              <p style={{ margin: '0 0 14px 0', fontSize: '10px', color: '#9ca3af' }}>Пароль по умолчанию: 1234</p>
              <input 
                type="password" placeholder="Пароль" value={passwordInput} onChange={e => setPasswordInput(e.target.value)}
                style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '8px 12px', color: '#fff', fontSize: '13px', boxSizing: 'border-box', marginBottom: '12px', outline: 'none' }}
                autoFocus
              />
              <div style={{ display: 'flex', gap: '8px' }}>
                <button type="button" onClick={() => setShowLoginModal(false)} style={{ flex: 1, background: '#334155', color: '#fff', border: 'none', borderRadius: '10px', padding: '8px', fontSize: '12px', cursor: 'pointer' }}>Отмена</button>
                <button type="submit" style={{ flex: 1, background: '#f59e0b', color: '#0b0e14', border: 'none', borderRadius: '10px', padding: '8px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>Войти</button>
              </div>
            </form>
          </div>
        )}

        {/* Форма админа с поддержкой старой цены и ленточки */}
        {isAdminLoggedIn && (
          <div style={{
            background: '#141822', border: '1px solid #f59e0b',
            borderRadius: '16px', padding: '12px', marginBottom: '14px'
          }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#f59e0b' }}>✨ Добавить товар со скидкой</h3>
            <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input 
                type="text" placeholder="Название блюда" value={newTitle} onChange={e => setNewTitle(e.target.value)}
                style={{ background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '6px 10px', color: '#fff', fontSize: '12px', outline: 'none' }} required
              />
              <div style={{ display: 'flex', gap: '8px' }}>
                <input 
                  type="number" placeholder="Цена (₩) 95" value={newPrice} onChange={e => setNewPrice(e.target.value)}
                  style={{ flex: 1, background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '6px 10px', color: '#fff', fontSize: '12px', outline: 'none' }} required
                />
                <input 
                  type="number" placeholder="Старая цена (₩) 100" value={newOldPrice} onChange={e => setNewOldPrice(e.target.value)}
                  style={{ flex: 1, background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '6px 10px', color: '#fff', fontSize: '12px', outline: 'none' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <select 
                  value={newCat} onChange={e => setNewCat(e.target.value)}
                  style={{ flex: 1, background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '6px 10px', color: '#fff', fontSize: '12px', outline: 'none' }}
                >
                  <option value="Круассаны">Круассаны</option>
                  <option value="Торты">Торты</option>
                  <option value="Пироги">Пироги</option>
                  <option value="Печенье">Печенье</option>
                  <option value="Напитки">Напитки</option>
                </select>
                <select 
                  value={newBadge} onChange={e => setNewBadge(e.target.value)}
                  style={{ flex: 1, background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '6px 10px', color: '#fff', fontSize: '12px', outline: 'none' }}
                >
                  <option value="ХИТ">Ленточка: ХИТ</option>
                  <option value="НОВИНКА">Ленточка: НОВИНКА</option>
                  <option value="СКИДКА">Ленточка: СКИДКА</option>
                </select>
              </div>
              <input 
                type="text" placeholder="Описание" value={newDesc} onChange={e => setNewDesc(e.target.value)}
                style={{ background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '6px 10px', color: '#fff', fontSize: '12px', outline: 'none' }}
              />
              <div>
                <label style={{ display: 'block', fontSize: '10px', color: '#9ca3af', marginBottom: '2px' }}>Фото:</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ fontSize: '10px', color: '#9ca3af', width: '100%' }} />
              </div>
              <button type="submit" style={{ background: '#f59e0b', color: '#0b0e14', border: 'none', borderRadius: '8px', padding: '8px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer', marginTop: '4px' }}>
                Добавить на витрину
              </button>
            </form>
          </div>
        )}

        {/* Шапка */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0 12px', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px', height: '38px', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px'
            }}>🥐</div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase' }}>Уютная Пекарня</div>
              <div style={{ fontSize: '9px', fontWeight: '500', color: '#f59e0b' }}>📞 +82 10-1234-5678</div>
            </div>
          </div>
          <div style={{
            width: '38px', height: '38px', background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '14px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', position: 'relative'
          }}>
            🛒
            {cart.length > 0 && (
              <span style={{
                position: 'absolute', top: '-4px', right: '-4px', background: '#f59e0b', color: '#0b0e14',
                fontSize: '9px', fontWeight: '800', width: '16px', height: '16px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #0b0e14'
              }}>{cart.length}</span>
            )}
          </div>
        </div>

        {/* Поиск */}
        <div style={{ margin: '4px 0 14px', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{
            flex: 1, background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '16px', padding: '0 14px', height: '46px', display: 'flex', alignItems: 'center', gap: '10px'
          }}>
            <span>🔍</span>
            <input 
              type="text" placeholder="Поиск по меню..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              style={{ background: 'transparent', border: 'none', outline: 'none', color: '#f3f4f6', fontSize: '13px', width: '100%' }} 
            />
          </div>
        </div>

        {/* Категории */}
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '14px', scrollbarWidth: 'none' }}>
          {['Все', 'Круассаны', 'Торты', 'Пироги', 'Печенье', 'Напитки'].map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <div 
                key={cat} onClick={() => setActiveCategory(cat)}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer', flexShrink: 0 }}
              >
                <div style={{
                  width: '46px', height: '46px', background: isActive ? '#f59e0b' : 'rgba(255, 255, 255, 0.04)',
                  border: `1px solid ${isActive ? '#f59e0b' : 'rgba(255, 255, 255, 0.06)'}`, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', transition: '0.2s'
                }}>
                  {cat === 'Все' ? '🌟' : cat === 'Круассаны' ? '🥐' : cat === 'Торты' ? '🍰' : cat === 'Пироги' ? '🥧' : cat === 'Печенье' ? '🍪' : '☕'}
                </div>
                <span style={{ fontSize: '10px', color: isActive ? '#fcd34d' : '#9ca3af', fontWeight: isActive ? '700' : '500' }}>{cat}</span>
              </div>
            );
          })}
        </div>

        {/* Заголовок */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '6px 0 12px' }}>
          <div style={{ fontSize: '15px', fontWeight: '800' }}>Меню ({filteredProducts.length}) 🔥</div>
        </div>

        {/* Сетка товаров с красивой ленточкой и кликом по фото */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', maxHeight: '280px', overflowY: 'auto', paddingRight: '2px' }}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <div key={item.id} style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
                
                {/* Красивая ленточка (бейджик) */}
                {item.badge && (
                  <div style={{
                    position: 'absolute', top: '8px', left: '0', background: 'linear-gradient(90deg, #f59e0b, #d97706)',
                    color: '#0b0e14', fontSize: '8px', fontWeight: '900', padding: '3px 8px', borderRadius: '0 8px 8px 0',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.3)', zIndex: 2, textTransform: 'uppercase', letterSpacing: '0.5px'
                  }}>
                    {item.badge}
                  </div>
                )}

                {/* Картинка с лупой при наведении и кликом для увеличения */}
                <div 
                  onClick={() => setSelectedImage(item.image)}
                  style={{ height: '90px', width: '100%', overflow: 'hidden', background: '#141822', position: 'relative', cursor: 'pointer' }}
                  title="Нажмите для увеличения"
                >
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }} />
                  <div style={{ position: 'absolute', right: '6px', bottom: '6px', background: 'rgba(0,0,0,0.6)', borderRadius: '6px', padding: '2px 5px', fontSize: '10px' }}>🔍</div>
                </div>

                <div style={{ padding: '8px' }}>
                  <div style={{ fontSize: '11px', fontWeight: '700', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
                  <div style={{ fontSize: '9px', color: '#f59e0b', fontWeight: '700', marginBottom: '2px' }}>★ {item.rating}</div>
                  <div style={{ fontSize: '8px', color: '#6b7280', marginBottom: '6px', lineHeight: '1.2', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.desc}</div>
                  
                  {/* Цены: новая и перечеркнутая старая */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                      <span style={{ fontSize: '11px', fontWeight: '800', color: '#fcd34d' }}>{item.price.toLocaleString()} ₩</span>
                      {item.oldPrice && (
                        <span style={{ fontSize: '8px', color: '#6b7280', textDecoration: 'line-through' }}>{item.oldPrice.toLocaleString()} ₩</span>
                      )}
                    </div>
                    <button 
                      onClick={() => addToCart(item)}
                      style={{ width: '24px', height: '24px', background: '#f59e0b', color: '#0b0e14', borderRadius: '6px', border: 'none', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: 'span 2', textAlign: 'center', color: '#6b7280', padding: '20px', fontSize: '12px' }}>
              Ничего не найдено 😢
            </div>
          )}
        </div>

        {/* Корзина */}
        {cart.length > 0 && (
          <div style={{ marginTop: '12px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '12px', padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px' }}>В корзине: {cart.length} тов. ({totalPrice.toLocaleString()} ₩)</span>
            <button onClick={() => alert('Заказ успешно оформлен!')} style={{ background: '#f59e0b', color: '#0b0e14', border: 'none', padding: '6px 12px', borderRadius: '8px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}>
              Оформить
            </button>
          </div>
        )}

      </div>
    </div>
  );
}