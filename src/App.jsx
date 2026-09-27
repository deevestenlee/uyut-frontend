import React, { useState } from 'react';

const TRANSLATIONS = {
  ru: {
    brandName: 'Sweet Bakery',
    address: 'Сеул, Каннам-гу 12-3',
    adminLogin: '⚙️ Вход для админа',
    adminLogout: 'Выйти',
    searchPlaceholder: 'Поиск по меню...',
    menuTitle: 'Меню',
    cartSelected: 'Выбрано',
    itemsWord: 'тов.',
    total: 'Итого:',
    checkout: 'Оформить',
    cartTitle: '🛒 Ваша корзина',
    cartEmpty: 'Корзина пуста',
    close: 'Закрыть',
    checkoutTitle: '📋 Оформление заказа',
    checkoutSub: 'Заполните данные для отправки заказа',
    yourChoice: 'Ваш выбор:',
    nameLabel: 'Ваше имя * (только буквы)',
    namePlaceholder: 'Например: Александр',
    nameError: 'Только буквы!',
    phoneLabel: 'Номер телефона * (только цифры)',
    phonePlaceholder: '01012345678',
    phoneError: 'Только цифры!',
    deliveryType: 'Способ получения *',
    pickup: '🏃 Самовывоз',
    delivery: '🛵 Доставка',
    addressLabel: 'Адрес доставки *',
    addressPlaceholder: 'Город, улица, дом, квартира',
    commentLabel: 'Комментарий (необязательно)',
    commentPlaceholder: 'Пожелания к заказу...',
    confirmOrder: 'Подтвердить и оформить заказ',
    successTitle: 'Заказ успешно оформлен!',
    successDesc: 'Спасибо, {name}! Мы приняли ваш заказ и свяжемся с вами в ближайшее время по номеру {phone}.',
    backToMenu: 'Вернуться в меню',
    categories: {
      All: 'Все',
      Croissants: 'Круассаны',
      Cakes: 'Торты',
      Pies: 'Пироги',
      Cookies: 'Печенье',
      Drinks: 'Напитки'
    }
  },
  en: {
    brandName: 'Sweet Bakery',
    address: 'Seoul, Gangnam-gu 12-3',
    adminLogin: '⚙️ Admin Login',
    adminLogout: 'Logout',
    searchPlaceholder: 'Search menu...',
    menuTitle: 'Menu',
    cartSelected: 'Selected',
    itemsWord: 'items',
    total: 'Total:',
    checkout: 'Checkout',
    cartTitle: '🛒 Your Cart',
    cartEmpty: 'Cart is empty',
    close: 'Close',
    checkoutTitle: '📋 Checkout Order',
    checkoutSub: 'Fill in the details to place your order',
    yourChoice: 'Your selection:',
    nameLabel: 'Your Name * (letters only)',
    namePlaceholder: 'Example: Alexander',
    nameError: 'Letters only!',
    phoneLabel: 'Phone Number * (numbers only)',
    phonePlaceholder: '01012345678',
    phoneError: 'Numbers only!',
    deliveryType: 'Delivery Method *',
    pickup: '🏃 Pickup',
    delivery: '🛵 Delivery',
    addressLabel: 'Delivery Address *',
    addressPlaceholder: 'City, street, house, apartment',
    commentLabel: 'Comment (optional)',
    commentPlaceholder: 'Wishes for the order...',
    confirmOrder: 'Confirm and Place Order',
    successTitle: 'Order Successfully Placed!',
    successDesc: 'Thank you, {name}! We have received your order and will contact you shortly at {phone}.',
    backToMenu: 'Back to Menu',
    categories: {
      All: 'All',
      Croissants: 'Croissants',
      Cakes: 'Cakes',
      Pies: 'Pies',
      Cookies: 'Cookies',
      Drinks: 'Drinks'
    }
  },
  ko: {
    brandName: 'Sweet Bakery',
    address: '서울 강남구 12-3',
    adminLogin: '⚙️ 관리자 로그인',
    adminLogout: '로그아웃',
    searchPlaceholder: '메뉴 검색...',
    menuTitle: '메뉴',
    cartSelected: '선택됨',
    itemsWord: '개',
    total: '합계:',
    checkout: '주문하기',
    cartTitle: '🛒 장바구니',
    cartEmpty: '장바구니가 비어 있습니다',
    close: '닫기',
    checkoutTitle: '📋 주문하기',
    checkoutSub: '주문 정보를 입력해주세요',
    yourChoice: '선택한 상품:',
    nameLabel: '이름 * (문자만)',
    namePlaceholder: '예: 홍길동',
    nameError: '문자만 입력하세요!',
    phoneLabel: '전화번호 * (숫자만)',
    phonePlaceholder: '01012345678',
    phoneError: '숫자만 입력하세요!',
    deliveryType: '수령 방법 *',
    pickup: '🏃 매장 픽업',
    delivery: '🛵 배달',
    addressLabel: '배달 주소 *',
    addressPlaceholder: '도시, 거리, 건물, 호실',
    commentLabel: '요청사항 (선택)',
    commentPlaceholder: '주문 요청사항을 입력하세요...',
    confirmOrder: '주문 확정하기',
    successTitle: '주문이 완료되었습니다!',
    successDesc: '감사합니다, {name}님! 주문이 접수되었으며 {phone} 번호로 곧 연락드리겠습니다.',
    backToMenu: '메뉴로 돌아가기',
    categories: {
      All: '전체',
      Croissants: '크루아상',
      Cakes: '케이크',
      Pies: '파이',
      Cookies: '쿠키',
      Drinks: '음료'
    }
  }
};

export default function App() {
  const [lang, setLang] = useState('ru');
  const t = TRANSLATIONS[lang];

  const [activeCategory, setActiveCategory] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  
  // Управление админкой
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  // Управление корзиной и заказом
  const [showCartModal, setShowCartModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [deliveryType, setDeliveryType] = useState('pickup');
  const [clientAddress, setClientAddress] = useState('');
  const [clientComment, setClientComment] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);

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
    alert('Товар успешно добавлен на витрину!');
  };

  const handlePhoneChange = (e) => {
    const val = e.target.value;
    const onlyNums = val.replace(/\D/g, '');
    setPhoneError(val !== onlyNums);
    setClientPhone(onlyNums);
  };

  const handleNameChange = (e) => {
    const val = e.target.value;
    const onlyLetters = val.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, '');
    setNameError(val !== onlyLetters);
    setClientName(onlyLetters);
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
      alert('Пожалуйста, заполните корректно Имя и Телефон.');
      return;
    }
    setOrderSuccess(true);
  };

  return (
    <div style={{
      background: '#0b0e14', minHeight: '100dvh', width: '100%',
      fontFamily: 'Inter, sans-serif', boxSizing: 'border-box',
      margin: 0, padding: '16px 16px 130px 16px', color: '#fff', overflowX: 'hidden'
    }}>
      
      {/* 1. Модальное окно просмотра картинки */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh',
            background: 'rgba(0, 0, 0, 0.9)', backdropFilter: 'blur(8px)',
            zIndex: 2000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', boxSizing: 'border-box', cursor: 'pointer'
          }}
        >
          <img src={selectedImage} alt="Zoomed" style={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain', borderRadius: '16px', border: '1px solid rgba(245, 158, 11, 0.3)' }} />
          <span style={{ color: '#f59e0b', fontSize: '13px', marginTop: '16px', fontWeight: 'bold' }}>Нажмите, чтобы закрыть ✕</span>
        </div>
      )}

      {/* 2. Модальное окно предварительного просмотра корзины */}
      {showCartModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh',
          background: 'rgba(6, 8, 12, 0.95)', backdropFilter: 'blur(8px)',
          zIndex: 1500, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
          padding: '20px 16px', boxSizing: 'border-box', overflowY: 'auto'
        }}>
          <div style={{
            background: '#141822', border: '1px solid rgba(245, 158, 11, 0.4)',
            borderRadius: '20px', padding: '20px', width: '100%', maxWidth: '420px', boxSizing: 'border-box', marginTop: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', color: '#fcd34d' }}>{t.cartTitle}</h3>
              <button type="button" onClick={() => setShowCartModal(false)} style={{ background: 'transparent', border: 'none', color: '#9ca3af', fontSize: '18px', cursor: 'pointer' }}>✕</button>
            </div>

            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#9ca3af', padding: '20px', fontSize: '13px' }}>{t.cartEmpty}</div>
            ) : (
              <>
                <div style={{ background: '#0b0e14', borderRadius: '12px', padding: '10px', marginBottom: '16px', maxHeight: '250px', overflowY: 'auto' }}>
                  {cart.map((item, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', marginBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '6px' }}>
                      <span>{item.name}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: '#fcd34d', fontWeight: 'bold' }}>{item.price.toLocaleString()} ₩</span>
                        <button type="button" onClick={() => removeFromCart(index)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '12px' }}>🗑️</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontWeight: 'bold', fontSize: '14px' }}>
                  <span>{t.total}</span>
                  <span style={{ color: '#fcd34d' }}>{totalPrice.toLocaleString()} ₩</span>
                </div>
                <button 
                  type="button" 
                  onClick={() => { setShowCartModal(false); setShowCheckoutModal(true); }}
                  style={{ background: '#f59e0b', color: '#0b0e14', border: 'none', borderRadius: '12px', padding: '12px', width: '100%', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}
                >
                  {t.checkout} ➔
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* 3. Успешное оформление заказа */}
      {orderSuccess && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh',
          background: 'rgba(6, 8, 12, 0.95)', backdropFilter: 'blur(8px)',
          zIndex: 2500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', boxSizing: 'border-box'
        }}>
          <div style={{ background: '#141822', border: '1px solid #f59e0b', borderRadius: '20px', padding: '24px', width: '100%', maxWidth: '360px', textAlign: 'center' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🎉</div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#fcd34d' }}>{t.successTitle}</h3>
            <p style={{ margin: '0 0 20px 0', fontSize: '12px', color: '#9ca3af', lineHeight: '1.4' }}>
              {t.successDesc.replace('{name}', clientName).replace('{phone}', clientPhone)}
            </p>
            <button 
              type="button"
              onClick={() => {
                setCart([]);
                setOrderSuccess(false);
                setShowCheckoutModal(false);
                setClientName('');
                setClientPhone('');
                setClientAddress('');
                setClientComment('');
              }}
              style={{ background: '#f59e0b', color: '#0b0e14', border: 'none', borderRadius: '12px', padding: '12px', width: '100%', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}
            >
              {t.backToMenu}
            </button>
          </div>
        </div>
      )}

      {/* 4. Модальное окно оформления заказа */}
      {showCheckoutModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh',
          background: 'rgba(6, 8, 12, 0.95)', backdropFilter: 'blur(8px)',
          zIndex: 1500, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
          padding: '20px 16px', boxSizing: 'border-box', overflowY: 'auto'
        }}>
          <div style={{
            background: '#141822', border: '1px solid rgba(245, 158, 11, 0.4)',
            borderRadius: '20px', padding: '20px', width: '100%', maxWidth: '420px', boxSizing: 'border-box', marginTop: '20px', marginBottom: '40px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', color: '#fcd34d' }}>{t.checkoutTitle}</h3>
                <span style={{ fontSize: '10px', color: '#9ca3af' }}>{t.checkoutSub}</span>
              </div>
              <button type="button" onClick={() => setShowCheckoutModal(false)} style={{ background: 'transparent', border: 'none', color: '#9ca3af', fontSize: '18px', cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ background: '#0b0e14', borderRadius: '12px', padding: '10px', marginBottom: '16px', maxHeight: '150px', overflowY: 'auto' }}>
              <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '6px' }}>{t.yourChoice}</div>
              {cart.map((item, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', marginBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '4px' }}>
                  <span>{item.name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#fcd34d', fontWeight: 'bold' }}>{item.price.toLocaleString()} ₩</span>
                    <button type="button" onClick={() => removeFromCart(index)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '12px' }}>🗑️</button>
                  </div>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', paddingTop: '6px', borderTop: '1px dashed rgba(255,255,255,0.1)', fontWeight: 'bold', fontSize: '13px' }}>
                <span>{t.total}</span>
                <span style={{ color: '#fcd34d' }}>{totalPrice.toLocaleString()} ₩</span>
              </div>
            </div>

            <form onSubmit={handleSendOrder} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>{t.nameLabel}</label>
                <input 
                  type="text" placeholder={t.namePlaceholder} value={clientName} onChange={handleNameChange}
                  style={{ width: '100%', background: '#0b0e14', border: nameError ? '1px solid #ef4444' : '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box', outline: 'none' }} required 
                />
                {nameError && <span style={{ fontSize: '10px', color: '#ef4444', marginTop: '3px', display: 'block' }}>{t.nameError}</span>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>{t.phoneLabel}</label>
                <input 
                  type="text" placeholder={t.phonePlaceholder} value={clientPhone} onChange={handlePhoneChange}
                  style={{ width: '100%', background: '#0b0e14', border: phoneError ? '1px solid #ef4444' : '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box', outline: 'none' }} required 
                />
                {phoneError && <span style={{ fontSize: '10px', color: '#ef4444', marginTop: '3px', display: 'block' }}>{t.phoneError}</span>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>{t.deliveryType}</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    type="button" onClick={() => setDeliveryType('pickup')}
                    style={{ flex: 1, padding: '10px', borderRadius: '10px', border: deliveryType === 'pickup' ? '1px solid #f59e0b' : '1px solid #334155', background: deliveryType === 'pickup' ? 'rgba(245, 158, 11, 0.15)' : '#0b0e14', color: '#fff', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    {t.pickup}
                  </button>
                  <button 
                    type="button" onClick={() => setDeliveryType('delivery')}
                    style={{ flex: 1, padding: '10px', borderRadius: '10px', border: deliveryType === 'delivery' ? '1px solid #f59e0b' : '1px solid #334155', background: deliveryType === 'delivery' ? 'rgba(245, 158, 11, 0.15)' : '#0b0e14', color: '#fff', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    {t.delivery}
                  </button>
                </div>
              </div>

              {deliveryType === 'delivery' && (
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>{t.addressLabel}</label>
                  <input 
                    type="text" placeholder={t.addressPlaceholder} value={clientAddress} onChange={e => setClientAddress(e.target.value)}
                    style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box', outline: 'none' }} required 
                  />
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>{t.commentLabel}</label>
                <textarea 
                  placeholder={t.commentPlaceholder} value={clientComment} onChange={e => setClientComment(e.target.value)}
                  style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box', outline: 'none', minHeight: '50px' }} 
                />
              </div>

              <button type="submit" style={{ background: '#f59e0b', color: '#0b0e14', border: 'none', borderRadius: '12px', padding: '12px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', marginTop: '6px' }}>
                {t.confirmOrder}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Верхняя панель: Языки и Вход */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2px 8px', fontSize: '11px', color: '#9ca3af' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          {['ru', 'en', 'ko'].map((itemLang) => (
            <button 
              key={itemLang}
              type="button"
              onClick={() => setLang(itemLang)}
              style={{
                background: lang === itemLang ? '#f59e0b' : 'rgba(255,255,255,0.05)',
                color: lang === itemLang ? '#0b0e14' : '#9ca3af',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '3px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase'
              }}
            >
              {itemLang}
            </button>
          ))}
        </div>

        {!isAdminLoggedIn ? (
          <button 
            type="button"
            onClick={() => setShowLoginModal(true)}
            style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', color: '#f59e0b', padding: '4px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}
          >
            {t.adminLogin}
          </button>
        ) : (
          <button 
            type="button"
            onClick={() => setIsAdminLoggedIn(false)}
            style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '4px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}
          >
            {t.adminLogout}
          </button>
        )}
      </div>

      {/* Модальное окно входа */}
      {showLoginModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh',
          background: 'rgba(6, 8, 12, 0.9)', backdropFilter: 'blur(6px)',
          zIndex: 1500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', boxSizing: 'border-box'
        }}>
          <form onSubmit={handleLogin} style={{ background: '#141822', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '20px', padding: '20px', width: '100%', maxWidth: '340px', textAlign: 'center' }}>
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

      {/* Админ-панель */}
      {isAdminLoggedIn && (
        <div style={{ background: '#141822', border: '1px solid #f59e0b', borderRadius: '16px', padding: '14px', marginBottom: '14px' }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#f59e0b' }}>✨ Добавить товар на витрину</h3>
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
                <option value="ХИТ">Ленточка: ХИТ</option>
                <option value="НОВИНКА">Ленточка: НОВИНКА</option>
                <option value="СКИДКА">Ленточка: СКИДКА</option>
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
              Добавить товар
            </button>
          </form>
        </div>
      )}

      {/* Шапка бренда (название слева, телефон справа) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0 12px', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>🥐</div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: '800', letterSpacing: '0.5px', textTransform: 'uppercase' }}>{t.brandName}</div>
            <div style={{ fontSize: '10px', fontWeight: '500', color: '#9ca3af' }}>{t.address}</div>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#f59e0b', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', padding: '6px 10px', borderRadius: '10px' }}>
            📞 010-1234-5678
          </div>
          {/* Интерактивная иконка корзины */}
          <div 
            onClick={() => setShowCartModal(true)}
            style={{ width: '40px', height: '40px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', position: 'relative', cursor: 'pointer' }}
          >
            🛒
            {cart.length > 0 && (
              <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: '#f59e0b', color: '#0b0e14', fontSize: '10px', fontWeight: '800', width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #0b0e14' }}>{cart.length}</span>
            )}
          </div>
        </div>
      </div>

      {/* Поиск */}
      <div style={{ margin: '4px 0 14px', display: 'flex', gap: '8px', alignItems: 'center' }}>
        <div style={{ flex: 1, background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '16px', padding: '0 14px', height: '46px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>🔍</span>
          <input 
            type="text" placeholder={t.searchPlaceholder} value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            style={{ background: 'transparent', border: 'none', outline: 'none', color: '#f3f4f6', fontSize: '14px', width: '100%' }} 
          />
        </div>
      </div>

      {/* Категории */}
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '14px', scrollbarWidth: 'none' }}>
        {[
          { key: 'Все', label: t.categories.All, icon: '🌟' },
          { key: 'Круассаны', label: t.categories.Croissants, icon: '🥐' },
          { key: 'Торты', label: t.categories.Cakes, icon: '🍰' },
          { key: 'Пироги', label: t.categories.Pies, icon: '🥧' },
          { key: 'Печенье', label: t.categories.Cookies, icon: '🍪' },
          { key: 'Напитки', label: t.categories.Drinks, icon: '☕' }
        ].map((catObj) => {
          const isActive = activeCategory === catObj.key;
          return (
            <div 
              key={catObj.key} onClick={() => setActiveCategory(catObj.key)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer', flexShrink: 0 }}
            >
              <div style={{ width: '48px', height: '48px', background: isActive ? '#f59e0b' : 'rgba(255, 255, 255, 0.04)', border: `1px solid ${isActive ? '#f59e0b' : 'rgba(255, 255, 255, 0.06)'}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', transition: '0.2s' }}>
                {catObj.icon}
              </div>
              <span style={{ fontSize: '11px', color: isActive ? '#fcd34d' : '#9ca3af', fontWeight: isActive ? '700' : '500' }}>{catObj.label}</span>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '6px 0 12px' }}>
        <div style={{ fontSize: '16px', fontWeight: '800' }}>{t.menuTitle} ({filteredProducts.length}) 🔥</div>
      </div>

      {/* Список товаров */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px', paddingBottom: '20px' }}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <div key={item.id} style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
              
              {item.badge && (
                <div style={{ position: 'absolute', top: '8px', left: '0', background: 'linear-gradient(90deg, #f59e0b, #d97706)', color: '#0b0e14', fontSize: '9px', fontWeight: '900', padding: '3px 8px', borderRadius: '0 8px 8px 0', boxShadow: '0 2px 6px rgba(0,0,0,0.3)', zIndex: 2, textTransform: 'uppercase' }}>
                  {item.badge}
                </div>
              )}

              <div 
                onClick={() => setSelectedImage(item.image)}
                style={{ height: '130px', width: '100%', overflow: 'hidden', background: '#141822', position: 'relative', cursor: 'pointer' }}
              >
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', right: '6px', bottom: '6px', background: 'rgba(0,0,0,0.6)', borderRadius: '6px', padding: '2px 6px', fontSize: '11px' }}>🔍</div>
              </div>

              <div style={{ padding: '10px' }}>
                <div style={{ fontSize: '12px', fontWeight: '700', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
                <div style={{ fontSize: '10px', color: '#f59e0b', fontWeight: '700', marginBottom: '3px' }}>★ {item.rating}</div>
                <div style={{ fontSize: '9px', color: '#6b7280', marginBottom: '8px', lineHeight: '1.3', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.desc}</div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '8px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '12px', fontWeight: '800', color: '#fcd34d' }}>{item.price.toLocaleString()} ₩</span>
                    {item.oldPrice && (
                      <span style={{ fontSize: '9px', color: '#6b7280', textDecoration: 'line-through' }}>{item.oldPrice.toLocaleString()} ₩</span>
                    )}
                  </div>
                  <button 
                    type="button"
                    onClick={() => addToCart(item)}
                    style={{ width: '28px', height: '28px', background: '#f59e0b', color: '#0b0e14', borderRadius: '8px', border: 'none', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}
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

      {/* 5. ФИКСИРОВАННАЯ НИЖНЯЯ ПЛАШКА КОРЗИНЫ */}
      {cart.length > 0 && (
        <div style={{
          position: 'fixed', bottom: '16px', left: '16px', right: '16px',
          background: 'rgba(20, 24, 34, 0.98)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(245, 158, 11, 0.5)', borderRadius: '16px', padding: '12px 16px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxSizing: 'border-box', zIndex: 1000,
          boxShadow: '0 10px 25px rgba(0,0,0,0.6)'
        }}>
          <div onClick={() => setShowCartModal(true)} style={{ cursor: 'pointer' }}>
            <div style={{ fontSize: '11px', color: '#9ca3af' }}>{t.cartSelected}: {cart.length} {t.itemsWord}</div>
            <div style={{ fontSize: '14px', fontWeight: '800', color: '#fcd34d' }}>{totalPrice.toLocaleString()} ₩</div>
          </div>
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowCheckoutModal(true);
            }}
            style={{ 
              background: '#f59e0b', 
              color: '#0b0e14', 
              border: 'none', 
              padding: '10px 20px', 
              borderRadius: '10px', 
              fontWeight: '900', 
              fontSize: '13px', 
              cursor: 'pointer' 
            }}
          >
            {t.checkout} ➔
          </button>
        </div>
      )}

    </div>
  );
}