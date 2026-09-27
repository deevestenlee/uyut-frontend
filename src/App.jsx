import React, { useState, useEffect } from 'react';

// Словари локализации для полного перевода меню и интерфейса
const translations = {
  RU: {
    bakeryName: 'SWEET BAKERY',
    bakerySub: 'ПРЕМИАЛЬНАЯ КОНДИТЕРСКАЯ',
    address: '📍 Сеул, Каннам-гу 12-3',
    phone: '📞 010-1234-5678',
    searchPlaceholder: 'Поиск по изысканному меню...',
    allCategories: 'Все',
    catCroissants: 'Круассаны',
    catCakes: 'Торты',
    catPies: 'Пироги',
    catCookies: 'Печенье',
    catDrinks: 'Напитки',
    signatureCollection: 'Сигнатурная коллекция',
    specialEvent: 'СПЕЦ-АКЦИЯ',
    promoText: 'Введите промокод "SWEET20" и получите скидку 20% на первый заказ!',
    addToCart: 'В корзину +',
    adminPanel: 'Админ',
    addProductTitle: '✨ Добавить премиум товар',
    dishNamePlaceholder: 'Название блюда',
    pricePlaceholder: 'Цена (₩)',
    oldPricePlaceholder: 'Старая цена (₩)',
    descPlaceholder: 'Описание',
    photoLabel: 'Фото:',
    addButton: 'Добавить в базу',
    checkoutTitle: '📋 Оформление заказа',
    nameLabel: 'Ваше имя (только буквы) *',
    namePlaceholder: 'Например: Alexander',
    phoneLabel: 'Номер телефона (010-****-****) *',
    deliveryTypeLabel: 'Способ получения *',
    pickup: '🏃 Самовывоз',
    delivery: '🛵 Доставка',
    addressLabel: 'Адрес доставки *',
    addressPlaceholder: 'Seoul, Gangnam-gu...',
    commentLabel: 'Комментарий (необязательно)',
    commentPlaceholder: 'Пожелания к заказу...',
    confirmButton: 'Подтвердить заказ ➔',
    selectedItems: 'Выбрано тов.',
    total: 'Итого:',
    checkoutBtn: 'Оформить ➔',
    homeTab: 'Домой',
    searchTab: 'Поиск',
    likesTab: 'Нравится',
    ordersTab: 'Мои заказы',
    emptyLikes: 'В разделе «Нравится» пока ничего нет ❤️',
    emptyOrders: 'История заказов пуста 📦',
    orderHistoryTitle: '📦 История ваших заказов',
    orderDate: 'Дата и время:',
    statusCompleted: 'Принят в работу ✅',
    adminLoginTitle: 'Вход для администратора',
    adminPasswordPlaceholder: 'Пароль (1234)',
    cancel: 'Отмена',
    login: 'Войти',
    badgeHit: 'ХИТ',
    badgeNew: 'НОВИНКА',
    badgePrem: 'ПРЕМИУМ',
    notFound: 'Ничего не найдено 😢'
  },
  EN: {
    bakeryName: 'SWEET BAKERY',
    bakerySub: 'PREMIUM BAKERY',
    address: '📍 Seoul, Gangnam-gu 12-3',
    phone: '📞 010-1234-5678',
    searchPlaceholder: 'Search premium menu...',
    allCategories: 'All',
    catCroissants: 'Croissants',
    catCakes: 'Cakes',
    catPies: 'Pies',
    catCookies: 'Cookies',
    catDrinks: 'Drinks',
    signatureCollection: 'Signature Collection',
    specialEvent: 'SPECIAL EVENT',
    promoText: 'Use promo code "SWEET20" for 20% off your first order!',
    addToCart: 'Add to cart +',
    adminPanel: 'Admin',
    addProductTitle: '✨ Add Premium Item',
    dishNamePlaceholder: 'Dish name',
    pricePlaceholder: 'Price (₩)',
    oldPricePlaceholder: 'Old price (₩)',
    descPlaceholder: 'Description',
    photoLabel: 'Photo:',
    addButton: 'Add to database',
    checkoutTitle: '📋 Checkout',
    nameLabel: 'Your name (letters only) *',
    namePlaceholder: 'E.g., Alexander',
    phoneLabel: 'Phone number (010-****-****) *',
    deliveryTypeLabel: 'Delivery method *',
    pickup: '🏃 Pickup',
    delivery: '🛵 Delivery',
    addressLabel: 'Delivery address *',
    addressPlaceholder: 'Seoul, Gangnam-gu...',
    commentLabel: 'Comment (optional)',
    commentPlaceholder: 'Wishes for the order...',
    confirmButton: 'Confirm order ➔',
    selectedItems: 'Selected items',
    total: 'Total:',
    checkoutBtn: 'Checkout ➔',
    homeTab: 'Home',
    searchTab: 'Search',
    likesTab: 'Favorites',
    ordersTab: 'My Orders',
    emptyLikes: 'No favorite items yet ❤️',
    emptyOrders: 'Order history is empty 📦',
    orderHistoryTitle: '📦 Your Order History',
    orderDate: 'Date & Time:',
    statusCompleted: 'Accepted ✅',
    adminLoginTitle: 'Admin Login',
    adminPasswordPlaceholder: 'Password (1234)',
    cancel: 'Cancel',
    login: 'Log in',
    badgeHit: 'HIT',
    badgeNew: 'NEW',
    badgePrem: 'PREMIUM',
    notFound: 'Nothing found 😢'
  },
  KO: {
    bakeryName: 'SWEET BAKERY',
    bakerySub: '프리미엄 베이커리',
    address: '📍 서울 강남구 12-3',
    phone: '📞 010-1234-5678',
    searchPlaceholder: '프리미엄 메뉴 검색...',
    allCategories: '전체',
    catCroissants: '크루아상',
    catCakes: '케이크',
    catPies: '파이',
    catCookies: '쿠키',
    catDrinks: '음료',
    signatureCollection: '시그니처 컬렉션',
    specialEvent: '스페셜 이벤트',
    promoText: '프로모션 코드 "SWEET20" 입력 시 첫 주문 20% 할인!',
    addToCart: '담기 +',
    adminPanel: '관리자',
    addProductTitle: '✨ 프리미엄 상품 추가',
    dishNamePlaceholder: '상품명',
    pricePlaceholder: '가격 (₩)',
    oldPricePlaceholder: '할인 전 가격 (₩)',
    descPlaceholder: '설명',
    photoLabel: '사진:',
    addButton: '데이터베이스에 추가',
    checkoutTitle: '📋 주문하기',
    nameLabel: '이름 (문자만) *',
    namePlaceholder: '예: Alexander',
    phoneLabel: '전화번호 (010-****-****) *',
    deliveryTypeLabel: '수령 방법 *',
    pickup: '🏃 픽업',
    delivery: '🛵 배달',
    addressLabel: '배달 주소 *',
    addressPlaceholder: 'Seoul, Gangnam-gu...',
    commentLabel: '요청사항 (선택)',
    commentPlaceholder: '주문 요청사항...',
    confirmButton: '주문 확정 ➔',
    selectedItems: '선택됨',
    total: '합계:',
    checkoutBtn: '결제하기 ➔',
    homeTab: '홈',
    searchTab: '검색',
    likesTab: '찜',
    ordersTab: '내 주문',
    emptyLikes: '찜한 상품이 없습니다 ❤️',
    emptyOrders: '주문 내역이 없습니다 📦',
    orderHistoryTitle: '📦 주문 내역',
    orderDate: '날짜 및 시간:',
    statusCompleted: '접수 완료 ✅',
    adminLoginTitle: '관리자 로그인',
    adminPasswordPlaceholder: '비밀번호 (1234)',
    cancel: '취소',
    login: '로그인',
    badgeHit: '인기',
    badgeNew: '신메뉴',
    badgePrem: '프리미엄',
    notFound: '검색 결과가 없습니다 😢'
  }
};

export default function App() {
  const [lang, setLang] = useState('RU');
  const t = translations[lang];

  const [activeTab, setActiveTab] = useState('home');
  const [activeCategory, setActiveCategory] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [cart, setCart] = useState([]);
  const [likes, setLikes] = useState([]); // ID понравившихся товаров
  const [ordersHistory, setOrdersHistory] = useState([]); // История заказов

  // Скролл нижней панели
  const [showBottomNav, setShowBottomNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowBottomNav(false);
      } else {
        setShowBottomNav(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Админка
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  // Модалка товара
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Оформление заказа
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('010');
  const [deliveryType, setDeliveryType] = useState('pickup');
  const [clientAddress, setClientAddress] = useState('');
  const [clientComment, setClientComment] = useState('');

  // База товаров с поддержкой мультиязычности (названия и описания для RU, EN, KO)
  const [products, setProducts] = useState([
    { 
      id: 1, 
      names: { RU: 'Миндальный круассан', EN: 'Almond Croissant', KO: '아몬드 크루아상' },
      category: 'Круассаны', 
      price: 4500, 
      oldPrice: 5000,
      rating: '4.9', 
      descs: { 
        RU: 'Изысканное слоеное тесто на французском масле с нежным франжипаном...', 
        EN: 'Crispy pastry made with French butter and smooth frangipane cream...', 
        KO: '프랑스 버터로 만든 바삭한 페이스트리와 부드러운 프랑지판 크림...' 
      },
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80', 
      badge: 'ХИТ' 
    },
    { 
      id: 2, 
      names: { RU: 'Шоколадный бриошь', EN: 'Chocolate Brioche', KO: '초콜릿 브리오슈' },
      category: 'Торты', 
      price: 5500, 
      oldPrice: 6500,
      rating: '4.8', 
      descs: { 
        RU: 'Пышное сдобное тесто ручной работы, бельгийский шоколад и какао...', 
        EN: 'Soft handmade brioche dough with Belgian cocoa...', 
        KO: '정성껏 만든 부드러운 브리오슈 반죽에 벨기에산 코코아...' 
      },
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80', 
      badge: 'НОВИНКА' 
    },
    { 
      id: 3, 
      names: { RU: 'Премиум капкейк', EN: 'Premium Cupcake', KO: '프리미엄 컵케이크' },
      category: 'Торты', 
      price: 6000, 
      oldPrice: null,
      rating: '5.0', 
      descs: { 
        RU: 'Нежнейший крем, ванильный бисквит и авторский декор...', 
        EN: 'Sweet cream and vanilla sponge...', 
        KO: '달콤한 크림과 바닐라 시트...' 
      },
      image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=600&q=80', 
      badge: 'ПРЕМИУМ' 
    }
  ]);

  // Поля админки для добавления товара
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
      alert('Неверный пароль!');
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;
    const newItem = {
      id: Date.now(),
      names: { RU: newTitle, EN: newTitle, KO: newTitle },
      category: newCat,
      price: Number(newPrice),
      oldPrice: newOldPrice ? Number(newOldPrice) : null,
      rating: '5.0',
      descs: { RU: newDesc || 'Премиальная выпечка', EN: newDesc || 'Premium pastry', KO: newDesc || '프리미엄 베이커리' },
      image: newImage || 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
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

  // Валидация телефона (010-****-****)
  const handlePhoneChange = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (!val.startsWith('010')) {
      val = '010' + val.replace(/^0+/, '');
    }
    if (val.length > 11) val = val.slice(0, 11);
    let formatted = '010';
    if (val.length > 3) formatted += '-' + val.slice(3, 7);
    if (val.length > 7) formatted += '-' + val.slice(7, 11);
    setClientPhone(formatted);
  };

  const handleNameChange = (e) => {
    const val = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁㄱ-ㅎㅏ-ㅣ가-힣\s]/g, '');
    setClientName(val);
  };

  // Лайки
  const toggleLike = (productId) => {
    if (likes.includes(productId)) {
      setLikes(likes.filter(id => id !== productId));
    } else {
      setLikes([...likes, productId]);
    }
  };

  // Оформление заказа (без WhatsApp, сохранение в истории)
  const handleSendOrder = (e) => {
    e.preventDefault();
    if (!clientName.trim() || clientPhone.length < 13) {
      alert('Заполните имя (только буквы) и телефон.');
      return;
    }

    const now = new Date();
    const dateStr = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newOrder = {
      id: Date.now(),
      date: dateStr,
      items: [...cart],
      total: cart.reduce((sum, item) => sum + item.price, 0),
      clientName,
      clientPhone,
      deliveryType,
      clientAddress
    };

    setOrdersHistory([newOrder, ...ordersHistory]);
    setCart([]);
    setShowCheckoutModal(false);
    setActiveTab('orders');
    alert('Заказ успешно оформлен и сохранен в истории!');
  };

  const filteredProducts = products.filter(item => {
    const itemName = item.names[lang] || item.names['RU'];
    const matchesCat = activeCategory === 'Все' || activeCategory === 'All' || activeCategory === '전체' || item.category === activeCategory;
    const matchesSearch = itemName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{
      background: '#0b0e14', minHeight: '100dvh', width: '100%',
      fontFamily: 'Inter, sans-serif', boxSizing: 'border-box',
      margin: 0, padding: '16px 16px 110px 16px', color: '#fff', overflowX: 'hidden'
    }}>
      
      {/* МОДАЛКА ПРОСМОТРА ТОВАРА */}
      {selectedProduct && (
        <div onClick={() => setSelectedProduct(null)} style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh',
          background: 'rgba(5, 7, 10, 0.92)', backdropFilter: 'blur(10px)',
          zIndex: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', boxSizing: 'border-box'
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: '#141822', border: '1px solid rgba(245, 158, 11, 0.4)',
            borderRadius: '24px', padding: '20px', width: '100%', maxWidth: '380px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.8)', position: 'relative'
          }}>
            <button onClick={() => setSelectedProduct(null)} style={{
              position: 'absolute', top: '14px', right: '14px', background: 'rgba(255,255,255,0.1)',
              border: 'none', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer'
            }}>✕</button>

            <div style={{ width: '100%', height: '220px', borderRadius: '16px', overflow: 'hidden', marginBottom: '16px', border: '1px solid rgba(245,158,11,0.2)' }}>
              <img src={selectedProduct.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#fff' }}>
                {selectedProduct.names[lang] || selectedProduct.names['RU']}
              </h2>
              <span style={{ background: 'rgba(245,158,11,0.15)', color: '#fcd34d', padding: '4px 8px', borderRadius: '8px', fontSize: '12px', fontWeight: '700' }}>
                ★ {selectedProduct.rating}
              </span>
            </div>

            <p style={{ fontSize: '13px', color: '#9ca3af', lineHeight: '1.5', margin: '0 0 16px 0' }}>
              {selectedProduct.descs[lang] || selectedProduct.descs['RU']}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '14px' }}>
              <div>
                <div style={{ fontSize: '18px', fontWeight: '900', color: '#fcd34d' }}>{selectedProduct.price.toLocaleString()} ₩</div>
                {selectedProduct.oldPrice && (
                  <div style={{ fontSize: '12px', color: '#6b7280', textDecoration: 'line-through' }}>{selectedProduct.oldPrice.toLocaleString()} ₩</div>
                )}
              </div>
              <button onClick={() => { setCart([...cart, selectedProduct]); setSelectedProduct(null); }} style={{
                background: '#f59e0b', color: '#0b0e14', border: 'none', padding: '12px 20px', borderRadius: '12px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer'
              }}>
                {t.addToCart}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* МОДАЛКА ОФОРМЛЕНИЯ ЗАКАЗА */}
      {showCheckoutModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh',
          background: 'rgba(6, 8, 12, 0.95)', backdropFilter: 'blur(8px)',
          zIndex: 140, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
          padding: '20px 16px', boxSizing: 'border-box', overflowY: 'auto'
        }}>
          <div style={{
            background: '#141822', border: '1px solid rgba(245, 158, 11, 0.4)',
            borderRadius: '20px', padding: '20px', width: '100%', maxWidth: '420px', boxSizing: 'border-box'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', color: '#fcd34d' }}>{t.checkoutTitle}</h3>
              <button onClick={() => setShowCheckoutModal(false)} style={{ background: 'transparent', border: 'none', color: '#9ca3af', fontSize: '18px', cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ background: '#0b0e14', borderRadius: '12px', padding: '10px', marginBottom: '16px', maxHeight: '130px', overflowY: 'auto' }}>
              {cart.map((item, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', marginBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '4px' }}>
                  <span>{item.names[lang] || item.names['RU']}</span>
                  <span style={{ color: '#fcd34d', fontWeight: 'bold' }}>{item.price.toLocaleString()} ₩</span>
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
                <input type="text" placeholder={t.namePlaceholder} value={clientName} onChange={handleNameChange} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', outline: 'none' }} required />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>{t.phoneLabel}</label>
                <input type="text" value={clientPhone} onChange={handlePhoneChange} maxLength={13} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', outline: 'none', letterSpacing: '1px' }} required />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>{t.deliveryTypeLabel}</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="button" onClick={() => setDeliveryType('pickup')} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: deliveryType === 'pickup' ? '1px solid #f59e0b' : '1px solid #334155', background: deliveryType === 'pickup' ? 'rgba(245, 158, 11, 0.15)' : '#0b0e14', color: '#fff', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}>{t.pickup}</button>
                  <button type="button" onClick={() => setDeliveryType('delivery')} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: deliveryType === 'delivery' ? '1px solid #f59e0b' : '1px solid #334155', background: deliveryType === 'delivery' ? 'rgba(245, 158, 11, 0.15)' : '#0b0e14', color: '#fff', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}>{t.delivery}</button>
                </div>
              </div>

              {deliveryType === 'delivery' && (
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>{t.addressLabel}</label>
                  <input type="text" placeholder={t.addressPlaceholder} value={clientAddress} onChange={e => setClientAddress(e.target.value)} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', outline: 'none' }} required />
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>{t.commentLabel}</label>
                <textarea placeholder={t.commentPlaceholder} value={clientComment} onChange={e => setClientComment(e.target.value)} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', outline: 'none', minHeight: '40px' }} />
              </div>

              <button type="submit" style={{ background: '#f59e0b', color: '#0b0e14', border: 'none', borderRadius: '12px', padding: '12px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', marginTop: '6px' }}>
                {t.confirmButton}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* МОДАЛКА ВХОДА АДМИНА */}
      {showLoginModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh', background: 'rgba(6, 8, 12, 0.9)', backdropFilter: 'blur(6px)', zIndex: 130, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', boxSizing: 'border-box' }}>
          <form onSubmit={handleLogin} style={{ background: '#141822', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '20px', padding: '20px', width: '100%', maxWidth: '340px', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '15px', color: '#fff' }}>{t.adminLoginTitle}</h3>
            <input type="password" placeholder={t.adminPasswordPlaceholder} value={passwordInput} onChange={e => setPasswordInput(e.target.value)} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px 12px', color: '#fff', fontSize: '14px', boxSizing: 'border-box', marginBottom: '14px', outline: 'none' }} autoFocus />
            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="button" onClick={() => setShowLoginModal(false)} style={{ flex: 1, background: '#334155', color: '#fff', border: 'none', borderRadius: '10px', padding: '10px', fontSize: '13px', cursor: 'pointer' }}>{t.cancel}</button>
              <button type="submit" style={{ flex: 1, background: '#f59e0b', color: '#0b0e14', border: 'none', borderRadius: '10px', padding: '10px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>{t.login}</button>
            </div>
          </form>
        </div>
      )}

      {/* ШАПКА: 3 & 4. ЛОГОТИП КЕКС/ТОРТ И ВЫРАВНИВАНИЕ ПО ЛЕВОМУ КРАЮ */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left' }}>
          <div style={{
            width: '46px', height: '46px', background: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)',
            borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', boxShadow: '0 6px 16px rgba(245,158,11,0.35)', border: '1px solid rgba(255,255,255,0.2)'
          }}>🧁</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ fontSize: '16px', fontWeight: '900', letterSpacing: '0.8px', color: '#fff', lineHeight: '1.2' }}>{t.bakeryName}</div>
            <div style={{ fontSize: '10px', fontWeight: '700', color: '#fcd34d', textTransform: 'uppercase', letterSpacing: '1.2px', lineHeight: '1.2', marginTop: '2px' }}>
              {t.bakerySub}
            </div>
          </div>
        </div>

        <button onClick={() => setShowLoginModal(true)} style={{
          background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)',
          color: '#f59e0b', padding: '7px 12px', borderRadius: '10px', fontSize: '11px', fontWeight: '700', cursor: 'pointer'
        }}>
          ⚙️ {t.adminPanel}
        </button>
      </div>

      {/* АДРЕС, ТЕЛЕФОН И 5. ЯЗЫКОВАЯ ПАНЕЛЬ ПОСЛЕ АДРЕСА */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '10px 12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <div style={{ fontSize: '11px', color: '#fcd34d', fontWeight: '700' }}>{t.phone}</div>
          <div style={{ fontSize: '10px', color: '#9ca3af' }}>{t.address}</div>
        </div>

        {/* Языковая панель с флагами */}
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '3px', gap: '3px' }}>
          {[
            { code: 'RU', flag: '🇷🇺' },
            { code: 'EN', flag: '🇬🇧' },
            { code: 'KO', flag: '🇰🇷' }
          ].map((item) => (
            <button
              key={item.code}
              onClick={() => setLang(item.code)}
              style={{
                background: lang === item.code ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : 'transparent',
                color: lang === item.code ? '#0b0e14' : '#9ca3af',
                border: 'none', borderRadius: '9px', padding: '5px 8px',
                fontSize: '10px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px'
              }}
            >
              <span>{item.flag}</span>
              <span>{item.code}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ПАНЕЛЬ АДМИНА ДОБАВЛЕНИЯ ТОВАРА */}
      {isAdminLoggedIn && (
        <div style={{ background: '#141822', border: '1px solid #f59e0b', borderRadius: '16px', padding: '14px', marginBottom: '16px' }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#f59e0b' }}>{t.addProductTitle}</h3>
          <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input type="text" placeholder={t.dishNamePlaceholder} value={newTitle} onChange={e => setNewTitle(e.target.value)} style={{ background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px 10px', color: '#fff', fontSize: '13px', outline: 'none' }} required />
            <div style={{ display: 'flex', gap: '8px' }}>
              <input type="number" placeholder={t.pricePlaceholder} value={newPrice} onChange={e => setNewPrice(e.target.value)} style={{ flex: 1, background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px 10px', color: '#fff', fontSize: '13px', outline: 'none' }} required />
              <input type="number" placeholder={t.oldPricePlaceholder} value={newOldPrice} onChange={e => setNewOldPrice(e.target.value)} style={{ flex: 1, background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px 10px', color: '#fff', fontSize: '13px', outline: 'none' }} />
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <select value={newCat} onChange={e => setNewCat(e.target.value)} style={{ flex: 1, background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px 10px', color: '#fff', fontSize: '13px', outline: 'none' }}>
                <option value="Круассаны">{t.catCroissants}</option>
                <option value="Торты">{t.catCakes}</option>
                <option value="Пироги">{t.catPies}</option>
                <option value="Печенье">{t.catCookies}</option>
                <option value="Напитки">{t.catDrinks}</option>
              </select>
              <select value={newBadge} onChange={e => setNewBadge(e.target.value)} style={{ flex: 1, background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px 10px', color: '#fff', fontSize: '13px', outline: 'none' }}>
                <option value="ХИТ">{t.badgeHit}</option>
                <option value="НОВИНКА">{t.badgeNew}</option>
                <option value="ПРЕМИУМ">{t.badgePrem}</option>
              </select>
            </div>
            <input type="text" placeholder={t.descPlaceholder} value={newDesc} onChange={e => setNewDesc(e.target.value)} style={{ background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px 10px', color: '#fff', fontSize: '13px', outline: 'none' }} />
            <div>
              <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>{t.photoLabel}</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ fontSize: '11px', color: '#9ca3af', width: '100%' }} />
            </div>
            <button type="submit" style={{ background: '#f59e0b', color: '#0b0e14', border: 'none', borderRadius: '8px', padding: '10px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', marginTop: '4px' }}>{t.addButton}</button>
          </form>
        </div>
      )}

      {/* ВКЛАДКА: «НРАВИТСЯ» */}
      {activeTab === 'likes' && (
        <div style={{ paddingBottom: '20px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '14px', color: '#fcd34d' }}>❤️ {t.likesTab}</h2>
          {likes.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#6b7280', padding: '40px 0', fontSize: '13px' }}>{t.emptyLikes}</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '14px' }}>
              {products.filter(p => likes.includes(p.id)).map(item => (
                <div key={item.id} style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
                  <div onClick={() => setSelectedProduct(item)} style={{ height: '140px', width: '100%', overflow: 'hidden', background: '#141822', cursor: 'pointer' }}>
                    <img src={item.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '12px' }}>
                    <div style={{ fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>{item.names[lang] || item.names['RU']}</div>
                    <div style={{ fontSize: '13px', fontWeight: '800', color: '#fcd34d' }}>{item.price.toLocaleString()} ₩</div>
                  </div>
                  <button onClick={() => toggleLike(item.id)} style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', fontSize: '14px' }}>❤️</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ВКЛАДКА: «МОИ ЗАКАЗЫ» (ИСТОРИЯ) */}
      {activeTab === 'orders' && (
        <div style={{ paddingBottom: '20px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '14px', color: '#fcd34d' }}>{t.orderHistoryTitle}</h2>
          {ordersHistory.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#6b7280', padding: '40px 0', fontSize: '13px' }}>{t.emptyOrders}</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {ordersHistory.map(ord => (
                <div key={ord.id} style={{ background: '#141822', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '14px', padding: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#9ca3af', marginBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '6px' }}>
                    <span>{t.orderDate} {ord.date}</span>
                    <span style={{ color: '#34d399', fontWeight: 'bold' }}>{t.statusCompleted}</span>
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>
                    {ord.clientName} ({ord.clientPhone}) • {ord.deliveryType === 'pickup' ? t.pickup : t.delivery}
                  </div>
                  {ord.items.map((it, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#e5e7eb', marginBottom: '4px' }}>
                      <span>• {it.names[lang] || it.names['RU']}</span>
                      <span style={{ color: '#fcd34d' }}>{it.price.toLocaleString()} ₩</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', paddingTop: '6px', borderTop: '1px dashed rgba(255,255,255,0.1)', fontWeight: '900', fontSize: '13px' }}>
                    <span>{t.total}</span>
                    <span style={{ color: '#fcd34d' }}>{ord.total.toLocaleString()} ₩</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ОСНОВНОЙ КОНТЕНТ ВКЛАДКИ ДОМОЙ / ПОИСК */}
      {(activeTab === 'home' || activeTab === 'search') && (
        <>
          {/* АКЦИЯ */}
          <div style={{
            background: 'linear-gradient(135deg, #1e1b10 0%, #141822 100%)',
            border: '1px solid rgba(245, 158, 11, 0.4)', borderRadius: '18px', padding: '16px', marginBottom: '18px',
            display: 'flex', alignItems: 'center', gap: '14px', position: 'relative', overflow: 'hidden',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
          }}>
            <div style={{
              position: 'absolute', top: 0, right: 0, width: '120px', height: '100%',
              backgroundImage: 'url("https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80")',
              backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.25,
              maskImage: 'linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0))',
              WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0))'
            }}></div>

            <div style={{ flex: 1, zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ background: 'linear-gradient(90deg, #f59e0b, #d97706)', color: '#0b0e14', fontSize: '10px', fontWeight: '900', padding: '2px 8px', borderRadius: '6px', textTransform: 'uppercase' }}>
                  {t.specialEvent}
                </span>
                <span style={{ fontSize: '10px', color: '#fcd34d', fontWeight: 'bold' }}>✨ -20% OFF</span>
              </div>
              <div style={{ fontSize: '12px', color: '#e5e7eb', lineHeight: '1.4', fontWeight: '500' }}>
                {t.promoText}
              </div>
            </div>
          </div>

          {/* ПОИСК */}
          <div style={{ margin: '0 0 16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{ flex: 1, background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '16px', padding: '0 14px', height: '46px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>🔍</span>
              <input type="text" placeholder={t.searchPlaceholder} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ background: 'transparent', border: 'none', outline: 'none', color: '#f3f4f6', fontSize: '14px', width: '100%' }} />
            </div>
          </div>

          {/* КАТЕГОРИИ */}
          <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '14px', scrollbarWidth: 'none' }}>
            {[
              { id: 'Все', name: t.allCategories, icon: '🌟' },
              { id: 'Круассаны', name: t.catCroissants, icon: '🥐' },
              { id: 'Торты', name: t.catCakes, icon: '🍰' },
              { id: 'Пироги', name: t.catPies, icon: '🥧' },
              { id: 'Печенье', name: t.catCookies, icon: '🍪' },
              { id: 'Напитки', name: t.catDrinks, icon: '☕' }
            ].map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <div key={cat.id} onClick={() => setActiveCategory(cat.id)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer', flexShrink: 0 }}>
                  <div style={{ width: '52px', height: '52px', background: isActive ? '#f59e0b' : 'rgba(255, 255, 255, 0.04)', border: `1px solid ${isActive ? '#f59e0b' : 'rgba(255, 255, 255, 0.06)'}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                    {cat.icon}
                  </div>
                  <span style={{ fontSize: '11px', color: isActive ? '#fcd34d' : '#9ca3af', fontWeight: isActive ? '700' : '500' }}>{cat.name}</span>
                </div>
              );
            })}
          </div>

          {/* ЗАГОЛОВОК МЕНЮ */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0 14px' }}>
            <div style={{ fontSize: '16px', fontWeight: '800' }}>
              {t.signatureCollection} ({filteredProducts.length}) ✨
            </div>
          </div>

          {/* СЕТКА ТОВАРОВ */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '14px', paddingBottom: '20px' }}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => {
                const isLiked = likes.includes(item.id);
                const itemName = item.names[lang] || item.names['RU'];
                const itemDesc = item.descs[lang] || item.descs['RU'];

                return (
                  <div key={item.id} style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
                    
                    {/* Бейдж с языковым переводом плашек */}
                    {item.badge && (
                      <div style={{ position: 'absolute', top: '8px', left: '0', background: 'linear-gradient(90deg, #f59e0b, #d97706)', color: '#0b0e14', fontSize: '9px', fontWeight: '900', padding: '3px 8px', borderRadius: '0 8px 8px 0', zIndex: 2 }}>
                        {item.badge === 'ХИТ' ? t.badgeHit : item.badge === 'НОВИНКА' ? t.badgeNew : t.badgePrem}
                      </div>
                    )}

                    {/* Кнопка лайка */}
                    <button onClick={() => toggleLike(item.id)} style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', zIndex: 2, fontSize: '14px' }}>
                      {isLiked ? '❤️' : '🤍'}
                    </button>

                    <div onClick={() => setSelectedProduct(item)} style={{ height: '140px', width: '100%', overflow: 'hidden', background: '#141822', cursor: 'pointer' }}>
                      <img src={item.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    <div style={{ padding: '12px' }}>
                      <div style={{ fontSize: '13px', fontWeight: '700', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{itemName}</div>
                      <div style={{ fontSize: '11px', color: '#f59e0b', fontWeight: '700', marginBottom: '4px' }}>★ {item.rating}</div>
                      <div style={{ fontSize: '10px', color: '#9ca3af', marginBottom: '10px', lineHeight: '1.3', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{itemDesc}</div>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '8px' }}>
                        <div>
                          <span style={{ fontSize: '13px', fontWeight: '800', color: '#fcd34d' }}>{item.price.toLocaleString()} ₩</span>
                        </div>
                        <button onClick={() => setCart([...cart, item])} style={{ width: '30px', height: '30px', background: '#f59e0b', color: '#0b0e14', borderRadius: '10px', border: 'none', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px' }}>
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ gridColumn: 'span 2', textAlign: 'center', color: '#6b7280', padding: '30px', fontSize: '13px' }}>
                {t.notFound}
              </div>
            )}
          </div>
        </>
      )}

      {/* ПЛАШКА КОРЗИНЫ */}
      {cart.length > 0 && (
        <div style={{
          position: 'fixed', bottom: showBottomNav ? '70px' : '16px', left: '16px', right: '16px',
          background: 'rgba(20, 24, 34, 0.95)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(245, 158, 11, 0.4)', borderRadius: '16px', padding: '12px 16px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 50,
          boxShadow: '0 10px 25px rgba(0,0,0,0.5)', transition: 'bottom 0.3s ease'
        }}>
          <div>
            <div style={{ fontSize: '11px', color: '#9ca3af' }}>{t.selectedItems}: {cart.length}</div>
            <div style={{ fontSize: '14px', fontWeight: '800', color: '#fcd34d' }}>{totalPrice.toLocaleString()} ₩</div>
          </div>
          <button onClick={() => setShowCheckoutModal(true)} style={{ background: '#f59e0b', color: '#0b0e14', border: 'none', padding: '10px 18px', borderRadius: '10px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>
            {t.checkoutBtn}
          </button>
        </div>
      )}

      {/* НИЖНЯЯ ПАНЕЛЬ НАВИГАЦИИ */}
      <div style={{
        position: 'fixed', bottom: showBottomNav ? 0 : '-70px', left: 0, right: 0, height: '60px',
        background: '#0e121b', borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 40,
        transition: 'bottom 0.3s ease'
      }}>
        {[
          { id: 'home', label: t.homeTab, icon: '🏠' },
          { id: 'search', label: t.searchTab, icon: '🔍' },
          { id: 'likes', label: t.likesTab, icon: '❤️' },
          { id: 'orders', label: t.ordersTab, icon: '📦' }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <div key={tab.id} onClick={() => {
              setActiveTab(tab.id);
              if (tab.id === 'home') {
                setActiveCategory('Все');
                setSearchQuery('');
              }
            }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', cursor: 'pointer', flex: 1 }}>
              <span style={{ fontSize: '18px', opacity: isActive ? 1 : 0.5 }}>{tab.icon}</span>
              <span style={{ fontSize: '10px', color: isActive ? '#f59e0b' : '#9ca3af', fontWeight: isActive ? '700' : '500' }}>{tab.label}</span>
            </div>
          );
        })}
      </div>

    </div>
  );
}