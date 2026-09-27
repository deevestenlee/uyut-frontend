import React, { useState } from 'react';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  
  // Языки и активная вкладка нижнего меню
  const [lang, setLang] = useState('RU');
  const [activeTab, setActiveTab] = useState('home');

  // Управление админкой
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  // Управление модальным окном оформления заказа (телефон сразу 010)
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('010');
  const [deliveryType, setDeliveryType] = useState('pickup');
  const [clientAddress, setClientAddress] = useState('');
  const [clientComment, setClientComment] = useState('');

  const [products, setProducts] = useState([
    { 
      id: 1, 
      name: lang === 'KO' ? '아몬드 크루아상' : lang === 'EN' ? 'Almond Croissant' : 'Миндальный круассан', 
      category: 'Круассаны', 
      price: 4500, 
      oldPrice: 5000,
      rating: '4.9', 
      desc: lang === 'KO' ? '프랑스 버터로 만든 바삭한 페이스트리와 부드러운 프랑지판 크림...' : 'Франс буттердо онёк башакэн пейстри...', 
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80', 
      badge: 'ХИТ' 
    },
    { 
      id: 2, 
      name: lang === 'KO' ? '초콜릿 브리오슈' : lang === 'EN' ? 'Chocolate Brioche' : 'Шоколадный бриошь', 
      category: 'Торты', 
      price: 5500, 
      oldPrice: 6500,
      rating: '4.8', 
      desc: lang === 'KO' ? '정성껏 만든 부드러운 브리오슈 반죽에 벨기에산 코코아...' : 'Пышное сдобное тесто ручной работы...', 
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80', 
      badge: 'НОВИНКА' 
    },
    { 
      id: 3, 
      name: lang === 'KO' ? '프리미엄 컵케이크' : lang === 'EN' ? 'Premium Cupcake' : 'Премиум капкейк', 
      category: 'Торты', 
      price: 6000, 
      oldPrice: null,
      rating: '5.0', 
      desc: lang === 'KO' ? '달콤한 크림과 바닐라 시트...' : 'Нежный крем и ванильный бисквит...', 
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80', 
      badge: 'ПРЕМИУМ' 
    }
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newOldPrice, setNewOldPrice] = useState('');
  const [newCat, setNewCat] = useState('Круассаны');
  const [newDesc, setNewDesc] = useState('');
  const [newImage, setNewImage] = useState('');
  const [newBadge, setNewBadge] = useState('ХИТ');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setNewImage(reader.result);
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
    alert('Товар успешно добавлен!');
  };

  const filteredProducts = products.filter(item => {
    const matchesCat = activeCategory === 'Все' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const addToCart = (item) => setCart([...cart, item]);
  
  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const handleSendOrder = (e) => {
    e.preventDefault();
    if (!clientName || clientPhone.length < 5) {
      alert('Пожалуйста, заполните обязательные поля (Имя и Телефон).');
      return;
    }

    let orderText = `🥐 *Новый заказ в Sweet Bakery!*\n\n`;
    orderText += `👤 *Имя:* ${clientName}\n`;
    orderText += `📞 *Телефон:* ${clientPhone}\n`;
    orderText += `📦 *Способ:* ${deliveryType === 'pickup' ? 'Самовывоз 🏃' : 'Доставка 🛵'}\n`;
    if (deliveryType === 'delivery') {
      orderText += `📍 *Адрес:* ${clientAddress}\n`;
    }
    if (clientComment) {
      orderText += `💬 *Комментарий:* ${clientComment}\n`;
    }
    orderText += `\n🛒 *Состав заказа:*\n`;
    cart.forEach((item, idx) => {
      orderText += `${idx + 1}. ${item.name} — ${item.price.toLocaleString()} ₩\n`;
    });
    orderText += `\n💰 *Итого:* *${totalPrice.toLocaleString()} ₩*`;

    const bakeryWhatsAppNumber = '821012345678'; 
    const encodedUrl = `https://wa.me/${bakeryWhatsAppNumber}?text=${encodeURIComponent(orderText)}`;

    window.open(encodedUrl, '_blank');
    setCart([]);
    setShowCheckoutModal(false);
    alert('Перенаправляем в WhatsApp...');
  };

  return (
    <div style={{
      background: '#0b0e14', minHeight: '100dvh', width: '100%',
      fontFamily: 'Inter, sans-serif', boxSizing: 'border-box',
      margin: 0, padding: '16px 16px 110px 16px', color: '#fff', overflowX: 'hidden'
    }}>
      
      {/* Просмотр фото */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh',
            background: 'rgba(0, 0, 0, 0.9)', backdropFilter: 'blur(8px)',
            zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', boxSizing: 'border-box', cursor: 'pointer'
          }}
        >
          <img src={selectedImage} alt="Zoomed" style={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain', borderRadius: '16px', border: '1px solid rgba(245, 158, 11, 0.3)' }} />
          <span style={{ color: '#f59e0b', fontSize: '13px', marginTop: '16px', fontWeight: 'bold' }}>Нажмите, чтобы закрыть ✕</span>
        </div>
      )}

      {/* ОФОРМЛЕНИЕ ЗАКАЗА */}
      {showCheckoutModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh',
          background: 'rgba(6, 8, 12, 0.95)', backdropFilter: 'blur(8px)',
          zIndex: 95, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
          padding: '20px 16px', boxSizing: 'border-box', overflowY: 'auto'
        }}>
          <div style={{
            background: '#141822', border: '1px solid rgba(245, 158, 11, 0.4)',
            borderRadius: '20px', padding: '20px', width: '100%', maxWidth: '420px', boxSizing: 'border-box'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', color: '#fcd34d' }}>📋 Оформление заказа</h3>
                <span style={{ fontSize: '10px', color: '#9ca3af' }}>Все поля обязательные, кроме комментариев</span>
              </div>
              <button onClick={() => setShowCheckoutModal(false)} style={{ background: 'transparent', border: 'none', color: '#9ca3af', fontSize: '18px', cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ background: '#0b0e14', borderRadius: '12px', padding: '10px', marginBottom: '16px', maxHeight: '150px', overflowY: 'auto' }}>
              <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '6px' }}>Ваш выбор:</div>
              {cart.map((item, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', marginBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '4px' }}>
                  <span>{item.name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#fcd34d', fontWeight: 'bold' }}>{item.price.toLocaleString()} ₩</span>
                    <button onClick={() => removeFromCart(index)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '12px' }}>🗑️</button>
                  </div>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', paddingTop: '6px', borderTop: '1px dashed rgba(255,255,255,0.1)', fontWeight: 'bold', fontSize: '13px' }}>
                <span>Итого:</span>
                <span style={{ color: '#fcd34d' }}>{totalPrice.toLocaleString()} ₩</span>
              </div>
            </div>

            <form onSubmit={handleSendOrder} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>Ваше имя *</label>
                <input 
                  type="text" placeholder="Например: Александр" value={clientName} onChange={e => setClientName(e.target.value)}
                  style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box', outline: 'none' }} required 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>Номер телефона *</label>
                <input 
                  type="text" value={clientPhone} onChange={e => setClientPhone(e.target.value)}
                  style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box', outline: 'none' }} required 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>Способ получения *</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    type="button" onClick={() => setDeliveryType('pickup')}
                    style={{ flex: 1, padding: '10px', borderRadius: '10px', border: deliveryType === 'pickup' ? '1px solid #f59e0b' : '1px solid #334155', background: deliveryType === 'pickup' ? 'rgba(245, 158, 11, 0.15)' : '#0b0e14', color: '#fff', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    🏃 Самовывоз
                  </button>
                  <button 
                    type="button" onClick={() => setDeliveryType('delivery')}
                    style={{ flex: 1, padding: '10px', borderRadius: '10px', border: deliveryType === 'delivery' ? '1px solid #f59e0b' : '1px solid #334155', background: deliveryType === 'delivery' ? 'rgba(245, 158, 11, 0.15)' : '#0b0e14', color: '#fff', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    🛵 Доставка
                  </button>
                </div>
              </div>

              {deliveryType === 'delivery' && (
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>Адрес доставки *</label>
                  <input 
                    type="text" placeholder="Город, улица, дом" value={clientAddress} onChange={e => setClientAddress(e.target.value)}
                    style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box', outline: 'none' }} required 
                  />
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>Комментарий (необязательно)</label>
                <textarea 
                  placeholder="Пожелания..." value={clientComment} onChange={e => setClientComment(e.target.value)}
                  style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box', outline: 'none', minHeight: '50px' }} 
                />
              </div>

              <button type="submit" style={{ background: '#f59e0b', color: '#0b0e14', border: 'none', borderRadius: '12px', padding: '12px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', marginTop: '6px' }}>
                Подтвердить и отправить ➔
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Верхняя премиальная панель (Языки + Админ) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '3px', gap: '2px' }}>
          {['RU', 'EN', 'KO'].map((item) => (
            <button
              key={item}
              onClick={() => setLang(item)}
              style={{
                background: lang === item ? '#f59e0b' : 'transparent',
                color: lang === item ? '#0b0e14' : '#9ca3af',
                border: 'none', borderRadius: '8px', padding: '4px 10px',
                fontSize: '11px', fontWeight: '800', cursor: 'pointer', transition: '0.2s'
              }}
            >
              {item}
            </button>
          ))}
        </div>

        <button 
          onClick={() => setShowLoginModal(true)}
          style={{
            background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)',
            color: '#f59e0b', padding: '6px 12px', borderRadius: '10px', fontSize: '12px', fontWeight: '700', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '6px'
          }}
        >
          ⚙️ {lang === 'KO' ? '관리자' : lang === 'EN' ? 'Admin' : 'Админ'}
        </button>
      </div>

      {/* Модалка входа */}
      {showLoginModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh',
          background: 'rgba(6, 8, 12, 0.9)', backdropFilter: 'blur(6px)',
          zIndex: 90, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', boxSizing: 'border-box'
        }}>
          <form onSubmit={handleLogin} style={{
            background: '#141822', border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '20px', padding: '20px', width: '100%', maxWidth: '340px', textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 6px 0', fontSize: '15px', color: '#fff' }}>Вход для администратора</h3>
            <p style={{ margin: '0 0 14px 0', fontSize: '11px', color: '#9ca3af' }}>Пароль по умолчанию: 1234</p>
            <input 
              type="password" placeholder="Пароль" value={passwordInput} onChange={e => setPasswordInput(e.target.value)}
              style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px 12px', color: '#fff', fontSize: '14px', boxSizing: 'border-box', marginBottom: '14px', outline: 'none' }}
              autoFocus
            />
            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="button" onClick={() => setShowLoginModal(false)} style={{ flex: 1, background: '#334155', color: '#fff', border: 'none', borderRadius: '10px', padding: '10px', fontSize: '13px', cursor: 'pointer' }}>Отмена</button>
              <button type="submit" style={{ flex: 1, background: '#f59e0b', color: '#0b0e14', border: 'none', borderRadius: '10px', padding: '10px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>Войти</button>
            </div>
          </form>
        </div>
      )}

      {/* Панель добавления товара для админа */}
      {isAdminLoggedIn && (
        <div style={{
          background: '#141822', border: '1px solid #f59e0b',
          borderRadius: '16px', padding: '14px', marginBottom: '16px'
        }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#f59e0b' }}>✨ Добавить товар в меню</h3>
          <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input 
              type="text" placeholder="Название блюда" value={newTitle} onChange={e => setNewTitle(e.target.value)}
              style={{ background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px 10px', color: '#fff', fontSize: '13px', outline: 'none' }} required
            />
            <div style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="number" placeholder="Цена (₩)" value={newPrice} onChange={e => setNewPrice(e.target.value)}
                style={{ flex: 1, background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px 10px', color: '#fff', fontSize: '13px', outline: 'none' }} required
              />
              <input 
                type="number" placeholder="Старая цена (₩)" value={newOldPrice} onChange={e => setNewOldPrice(e.target.value)}
                style={{ flex: 1, background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px 10px', color: '#fff', fontSize: '13px', outline: 'none' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <select 
                value={newCat} onChange={e => setNewCat(e.target.value)}
                style={{ flex: 1, background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px 10px', color: '#fff', fontSize: '13px', outline: 'none' }}
              >
                <option value="Круассаны">Круассаны</option>
                <option value="Торты">Торты</option>
                <option value="Пироги">Пироги</option>
                <option value="Печенье">Печенье</option>
                <option value="Напитки">Напитки</option>
              </select>
              <select 
                value={newBadge} onChange={e => setNewBadge(e.target.value)}
                style={{ flex: 1, background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px 10px', color: '#fff', fontSize: '13px', outline: 'none' }}
              >
                <option value="ХИТ">ХИТ</option>
                <option value="НОВИНКА">НОВИНКА</option>
                <option value="ПРЕМИУМ">ПРЕМИУМ</option>
              </select>
            </div>
            <input 
              type="text" placeholder="Описание" value={newDesc} onChange={e => setNewDesc(e.target.value)}
              style={{ background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px 10px', color: '#fff', fontSize: '13px', outline: 'none' }}
            />
            <div>
              <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>Фото с устройства:</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ fontSize: '11px', color: '#9ca3af', width: '100%' }} />
            </div>
            <button type="submit" style={{ background: '#f59e0b', color: '#0b0e14', border: 'none', borderRadius: '8px', padding: '10px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', marginTop: '4px' }}>
              Добавить
            </button>
          </form>
        </div>
      )}

      {/* Логотип и контакты в шапке */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '46px', height: '46px', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', boxShadow: '0 4px 12px rgba(245,158,11,0.3)'
          }}>🥐</div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: '900', letterSpacing: '0.5px' }}>SWEET BAKERY</div>
            <div style={{ fontSize: '10px', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {lang === 'KO' ? '프리미엄 베이커리' : lang === 'EN' ? 'Premium Bakery' : 'Премиальная кондитерская'}
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '13px', fontWeight: '800', color: '#fcd34d' }}>📞 010-1234-5678</div>
          <div style={{ fontSize: '10px', color: '#9ca3af' }}>📍 서울 강남구 12-3</div>
        </div>
      </div>

      {/* Баннер акции */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(20, 24, 34, 0.8) 100%)',
        border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '16px', padding: '14px', marginBottom: '16px',
        display: 'flex', flexDirection: 'column', gap: '8px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ background: '#f59e0b', color: '#0b0e14', fontSize: '10px', fontWeight: '900', padding: '2px 8px', borderRadius: '6px' }}>
            {lang === 'KO' ? '이벤트' : lang === 'EN' ? 'EVENT' : 'АКЦИЯ'}
          </span>
          <span style={{ fontSize: '11px', color: '#fcd34d', fontWeight: 'bold' }}>스페셜 이벤트</span>
        </div>
        <div style={{ fontSize: '12px', color: '#e5e7eb', lineHeight: '1.4' }}>
          {lang === 'KO' ? '프로모션 코드 "SWEET20" 입력 시 첫 주문 20% 할인 혜택을 드립니다' : 'Промокод "SWEET20" дает скидку 20% на первый заказ!'}
        </div>
      </div>

      {/* Поиск */}
      <div style={{ margin: '0 0 16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
        <div style={{
          flex: 1, background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '16px', padding: '0 14px', height: '46px', display: 'flex', alignItems: 'center', gap: '10px'
        }}>
          <span>🔍</span>
          <input 
            type="text" placeholder={lang === 'KO' ? '프리미엄 메뉴 검색...' : lang === 'EN' ? 'Search premium menu...' : 'Поиск по изысканному меню...'} 
            value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            style={{ background: 'transparent', border: 'none', outline: 'none', color: '#f3f4f6', fontSize: '14px', width: '100%' }} 
          />
        </div>
      </div>

      {/* Категории */}
      <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '14px', scrollbarWidth: 'none' }}>
        {[
          { id: 'Все', name: lang === 'KO' ? '전체' : lang === 'EN' ? 'All' : 'Все', icon: '🌟' },
          { id: 'Круассаны', name: lang === 'KO' ? '크루아상' : lang === 'EN' ? 'Croissants' : 'Круассаны', icon: '🥐' },
          { id: 'Торты', name: lang === 'KO' ? '케이크' : lang === 'EN' ? 'Cakes' : 'Торты', icon: '🍰' },
          { id: 'Пироги', name: lang === 'KO' ? '파이' : lang === 'EN' ? 'Pies' : 'Пироги', icon: '🥧' },
          { id: 'Печенье', name: lang === 'KO' ? '쿠키' : lang === 'EN' ? 'Cookies' : 'Печенье', icon: '🍪' },
          { id: 'Напитки', name: lang === 'KO' ? '음료' : lang === 'EN' ? 'Drinks' : 'Напитки', icon: '☕' }
        ].map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <div 
              key={cat.id} onClick={() => setActiveCategory(cat.id)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer', flexShrink: 0 }}
            >
              <div style={{
                width: '52px', height: '52px', background: isActive ? '#f59e0b' : 'rgba(255, 255, 255, 0.04)',
                border: `1px solid ${isActive ? '#f59e0b' : 'rgba(255, 255, 255, 0.06)'}`, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', transition: '0.2s'
              }}>
                {cat.icon}
              </div>
              <span style={{ fontSize: '11px', color: isActive ? '#fcd34d' : '#9ca3af', fontWeight: isActive ? '700' : '500' }}>{cat.name}</span>
            </div>
          );
        })}
      </div>

      {/* Заголовок меню */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0 14px' }}>
        <div style={{ fontSize: '16px', fontWeight: '800' }}>
          {lang === 'KO' ? '시그니처 컬렉션' : lang === 'EN' ? 'Signature Collection' : 'Сигнатурная коллекция'} ({filteredProducts.length}) ✨
        </div>
      </div>

      {/* Сетка товаров */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '14px', paddingBottom: '20px' }}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <div key={item.id} style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
              
              {item.badge && (
                <div style={{
                  position: 'absolute', top: '8px', left: '0', background: 'linear-gradient(90deg, #f59e0b, #d97706)',
                  color: '#0b0e14', fontSize: '9px', fontWeight: '900', padding: '3px 8px', borderRadius: '0 8px 8px 0',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.3)', zIndex: 2, textTransform: 'uppercase', letterSpacing: '0.5px'
                }}>
                  {item.badge}
                </div>
              )}

              <div 
                onClick={() => setSelectedImage(item.image)}
                style={{ height: '140px', width: '100%', overflow: 'hidden', background: '#141822', position: 'relative', cursor: 'pointer' }}
              >
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', right: '8px', bottom: '8px', background: 'rgba(0,0,0,0.6)', borderRadius: '8px', padding: '4px 6px', fontSize: '11px' }}>🔍</div>
              </div>

              <div style={{ padding: '12px' }}>
                <div style={{ fontSize: '13px', fontWeight: '700', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
                <div style={{ fontSize: '11px', color: '#f59e0b', fontWeight: '700', marginBottom: '4px' }}>★ {item.rating}</div>
                <div style={{ fontSize: '10px', color: '#9ca3af', marginBottom: '10px', lineHeight: '1.3', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.desc}</div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '8px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '13px', fontWeight: '800', color: '#fcd34d' }}>{item.price.toLocaleString()} ₩</span>
                    {item.oldPrice && (
                      <span style={{ fontSize: '10px', color: '#6b7280', textDecoration: 'line-through' }}>{item.oldPrice.toLocaleString()} ₩</span>
                    )}
                  </div>
                  <button 
                    onClick={() => addToCart(item)}
                    style={{ width: '30px', height: '30px', background: '#f59e0b', color: '#0b0e14', borderRadius: '10px', border: 'none', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px' }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: 'span 2', textAlign: 'center', color: '#6b7280', padding: '30px', fontSize: '13px' }}>
            Ничего не найдено 😢
          </div>
        )}
      </div>

      {/* Плашка корзины если есть товары */}
      {cart.length > 0 && (
        <div style={{
          position: 'fixed', bottom: '70px', left: '16px', right: '16px',
          background: 'rgba(20, 24, 34, 0.95)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(245, 158, 11, 0.4)', borderRadius: '16px', padding: '12px 16px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxSizing: 'border-box', zIndex: 50,
          boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
        }}>
          <div>
            <div style={{ fontSize: '11px', color: '#9ca3af' }}>Выбрано: {cart.length} тов.</div>
            <div style={{ fontSize: '14px', fontWeight: '800', color: '#fcd34d' }}>{totalPrice.toLocaleString()} ₩</div>
          </div>
          <button 
            onClick={() => setShowCheckoutModal(true)} 
            style={{ background: '#f59e0b', color: '#0b0e14', border: 'none', padding: '10px 18px', borderRadius: '10px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}
          >
            Оформить ➔
          </button>
        </div>
      )}

      {/* Нижняя навигация */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, height: '60px',
        background: '#0e121b', borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 40,
        paddingBottom: 'env(safe-area-inset-bottom)'
      }}>
        {[
          { id: 'home', label: lang === 'KO' ? '홈' : lang === 'EN' ? 'Home' : 'Домой', icon: '🏠' },
          { id: 'search', label: lang === 'KO' ? '검색' : lang === 'EN' ? 'Search' : 'Поиск', icon: '🔍' },
          { id: 'likes', label: lang === 'KO' ? '찜' : lang === 'EN' ? 'Favorites' : 'Нравится', icon: '❤️' },
          { id: 'orders', label: lang === 'KO' ? '주문' : lang === 'EN' ? 'Orders' : 'Мои заказы', icon: '📦' }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <div 
              key={tab.id} onClick={() => {
                setActiveTab(tab.id);
                if (tab.id === 'orders' && cart.length > 0) setShowCheckoutModal(true);
              }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', cursor: 'pointer', flex: 1 }}
            >
              <span style={{ fontSize: '18px', opacity: isActive ? 1 : 0.5 }}>{tab.icon}</span>
              <span style={{ fontSize: '10px', color: isActive ? '#f59e0b' : '#9ca3af', fontWeight: isActive ? '700' : '500' }}>{tab.label}</span>
            </div>
          );
        })}
      </div>

    </div>
  );
}