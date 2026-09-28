import React, { useState, useEffect } from 'react';

// Полные переводы интерфейса и базы данных
const translations = {
  RU: {
    bakeryName: 'Sweet Bakery',
    bakerySub: 'домашняя выпечка',
    address: '📍 Сеул, Каннам-гу 12-3',
    phone: '📞 010-1234-5678',
    searchPlaceholder: 'Поиск по изысканному меню...',
    allCategories: 'Все',
    catCroissants: 'Круассаны',
    catCakes: 'Торты',
    catPies: 'Пироги',
    catCookies: 'Печенье',
    catDrinks: 'Напитки',
    specialEvent: 'СПЕЦ-АКЦИЯ',
    promoText: 'Введите промокод "SWEET20" и получите скидку 20% на первый заказ!',
    addToCart: 'В корзину +',
    loginBtn: 'Login',
    exitBtn: 'Exit (Выйти)',
    editBannerTitle: '🖼️ Управление баннером',
    uploadBannerLabel: 'Загрузить новый баннер (JPG/PNG):',
    removeBannerBtn: 'Удалить баннер',
    adminEditMenuTitle: '🛠️ Управление меню и товарами',
    editItem: 'Редактировать',
    deleteItem: 'Удалить',
    saveChanges: 'Сохранить изменения',
    addNewItemBtn: '+ Добавить товар',
    addNewCatBtn: '+ Добавить категорию',
    dishNamePlaceholder: 'Название блюда',
    pricePlaceholder: 'Цена (₩)',
    oldPricePlaceholder: 'Старая цена (₩)',
    descPlaceholder: 'Описание',
    photoLabel: 'Фото (файл или ссылка):',
    addButton: 'Добавить в меню',
    addCatButton: 'Создать категорию',
    catNamePlaceholder: 'Название категории (например, Пирожные)',
    cancel: 'Отмена',
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
    login: 'Войти',
    badgeHit: 'ХИТ',
    badgeNew: 'НОВИНКА',
    badgePrem: 'ПРЕМИУМ',
    notFound: 'Ничего не найдено 😢',
    telegramSettingsTitle: '🔔 Telegram уведомления админа',
    tgTokenLabel: 'Токен бота (Bot Token):',
    tgChatIdLabel: 'Ваш Chat ID (@leedkor):',
    saveTgSettings: 'Сохранить Telegram настройки'
  },
  EN: {
    bakeryName: 'Sweet Bakery',
    bakerySub: 'home baking',
    address: '📍 Seoul, Gangnam-gu 12-3',
    phone: '📞 010-1234-5678',
    searchPlaceholder: 'Search menu...',
    allCategories: 'All',
    catCroissants: 'Croissants',
    catCakes: 'Cakes',
    catPies: 'Pies',
    catCookies: 'Cookies',
    catDrinks: 'Drinks',
    specialEvent: 'SPECIAL EVENT',
    promoText: 'Use promo code "SWEET20" for 20% off your first order!',
    addToCart: 'Add to cart +',
    loginBtn: 'Login',
    exitBtn: 'Exit',
    editBannerTitle: '🖼️ Banner Management',
    uploadBannerLabel: 'Upload new banner (JPG/PNG):',
    removeBannerBtn: 'Remove banner',
    adminEditMenuTitle: '🛠️ Menu & Item Management',
    editItem: 'Edit',
    deleteItem: 'Delete',
    saveChanges: 'Save changes',
    addNewItemBtn: '+ Add item',
    addNewCatBtn: '+ Add category',
    dishNamePlaceholder: 'Dish name',
    pricePlaceholder: 'Price (₩)',
    oldPricePlaceholder: 'Old price (₩)',
    descPlaceholder: 'Description',
    photoLabel: 'Photo (file or URL):',
    addButton: 'Add to menu',
    addCatButton: 'Create category',
    catNamePlaceholder: 'Category name (e.g. Pastries)',
    cancel: 'Cancel',
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
    login: 'Log in',
    badgeHit: 'HIT',
    badgeNew: 'NEW',
    badgePrem: 'PREMIUM',
    notFound: 'Nothing found 😢',
    telegramSettingsTitle: '🔔 Telegram Admin Alerts',
    tgTokenLabel: 'Bot Token:',
    tgChatIdLabel: 'Your Chat ID (@leedkor):',
    saveTgSettings: 'Save Telegram Settings'
  },
  KO: {
    bakeryName: 'Sweet Bakery',
    bakerySub: '홈 베이킹',
    address: '📍 서울 강남구 12-3',
    phone: '📞 010-1234-5678',
    searchPlaceholder: '메뉴 검색...',
    allCategories: '전체',
    catCroissants: '크루아상',
    catCakes: '케이크',
    catPies: '파이',
    catCookies: '쿠키',
    catDrinks: '음료',
    specialEvent: '스페셜 이벤트',
    promoText: '프로모션 코드 "SWEET20" 입력 시 첫 주문 20% 할인!',
    addToCart: '담기 +',
    loginBtn: 'Login',
    exitBtn: 'Exit (나가기)',
    editBannerTitle: '🖼️ 배너 관리',
    uploadBannerLabel: '새 배너 업로드 (JPG/PNG):',
    removeBannerBtn: '배너 삭제',
    adminEditMenuTitle: '🛠️ 메뉴 및 상품 관리',
    editItem: '수정',
    deleteItem: '삭제',
    saveChanges: '변경사항 저장',
    addNewItemBtn: '+ 상품 추가',
    addNewCatBtn: '+ 카테고리 추가',
    dishNamePlaceholder: '상품명',
    pricePlaceholder: '가격 (₩)',
    oldPricePlaceholder: '할인 전 가격 (₩)',
    descPlaceholder: '설명',
    photoLabel: '사진 (파일 또는 URL):',
    addButton: '메뉴에 추가',
    addCatButton: '카테고리 생성',
    catNamePlaceholder: '카테고리 이름 (예: 패스트리)',
    cancel: '취소',
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
    login: '로그인',
    badgeHit: '인기',
    badgeNew: '신메뉴',
    badgePrem: '프리미엄',
    notFound: '검색 결과가 없습니다 😢',
    telegramSettingsTitle: '🔔 텔레그램 관리자 알림',
    tgTokenLabel: '봇 토큰 (Bot Token):',
    tgChatIdLabel: '챗 ID (@leedkor):',
    saveTgSettings: '텔레그램 설정 저장'
  }
};

export default function App() {
  const [lang, setLang] = useState('RU');
  const t = translations[lang];

  const [activeTab, setActiveTab] = useState('home');
  const [activeCategory, setActiveCategory] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [cart, setCart] = useState([]);
  const [likes, setLikes] = useState([]);
  const [ordersHistory, setOrdersHistory] = useState([]);

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

  // Настройки Telegram для администратора (@leedkor)
  const [tgBotToken, setTgBotToken] = useState('');
  const [tgChatId, setTgChatId] = useState('');

  // Кастомизация логотипа и баннера администратором
  const [customLogo, setCustomLogo] = useState('🧁');
  const [bannerImage, setBannerImage] = useState('https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80');

  // Модалки
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddCatModal, setShowAddCatModal] = useState(false);

  // Список категорий
  const [categories, setCategories] = useState(['Круассаны', 'Торты', 'Пироги', 'Печенье', 'Напитки']);
  const [newCategoryName, setNewCategoryName] = useState('');

  // Поля формы добавления товара
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newOldPrice, setNewOldPrice] = useState('');
  const [newCat, setNewCat] = useState('Круассаны');
  const [newDesc, setNewDesc] = useState('');
  const [newImage, setNewImage] = useState('');
  const [newBadge, setNewBadge] = useState('ХИТ');

  // Оформление заказа
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('010');
  const [deliveryType, setDeliveryType] = useState('pickup');
  const [clientAddress, setClientAddress] = useState('');
  const [clientComment, setClientComment] = useState('');

  // База товаров
  const [products, setProducts] = useState([
    { 
      id: 1, 
      names: { RU: 'Миндальный круассан', EN: 'Almond Croissant', KO: '아몬드 크루아상' },
      category: 'Круассаны', 
      price: 4500, 
      oldPrice: 5000,
      rating: 4.9, 
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
      rating: 4.8, 
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
      rating: 5.0, 
      descs: { 
        RU: 'Нежнейший крем, ванильный бисквит и авторский декор...', 
        EN: 'Sweet cream and vanilla sponge...', 
        KO: '달콤한 크림과 바닐라 시트...' 
      },
      image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=600&q=80', 
      badge: 'ПРЕМИУМ' 
    }
  ]);

  const handleImageUpload = (e, setter) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setter(reader.result);
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

  const handleExit = () => {
    setIsAdminLoggedIn(false);
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
      rating: 5.0,
      descs: { RU: newDesc || 'Домашняя выпечка', EN: newDesc || 'Home baking', KO: newDesc || '홈 베이킹' },
      image: newImage || 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
      badge: newBadge
    };
    setProducts([newItem, ...products]);
    setNewTitle('');
    setNewPrice('');
    setNewOldPrice('');
    setNewDesc('');
    setNewImage('');
    setShowAddModal(false);
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    if (!categories.includes(newCategoryName)) {
      setCategories([...categories, newCategoryName]);
    }
    setNewCategoryName('');
    setShowAddCatModal(false);
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Удалить этот товар из меню?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

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

  const toggleLike = (productId) => {
    if (likes.includes(productId)) {
      setLikes(likes.filter(id => id !== productId));
    } else {
      setLikes([...likes, productId]);
    }
  };

  // Функция отправки уведомления в Telegram админу (@leedkor)
  const sendTelegramNotification = async (orderData) => {
    if (!tgBotToken || !tgChatId) return;
    const itemsList = orderData.items.map(i => `• ${i.names.RU} — ${i.price.toLocaleString()} ₩`).join('\n');
    const message = `🚨 <b>Новый заказ #${orderData.id}</b>\n\n👤 Имя: ${orderData.clientName}\n📞 Телефон: ${orderData.clientPhone}\n🚚 Способ: ${orderData.deliveryType === 'pickup' ? 'Самовывоз' : 'Доставка'}\n📍 Адрес: ${orderData.clientAddress || 'Самовывоз'}\n\n🛒 <b>Состав заказа:</b>\n${itemsList}\n\n💰 <b>Итого:</b> ${orderData.total.toLocaleString()} ₩`;

    try {
      await fetch(`https://api.telegram.org/bot${tgBotToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: tgChatId,
          text: message,
          parse_mode: 'HTML'
        })
      });
    } catch (err) {
      console.error('Ошибка отправки в Telegram:', err);
    }
  };

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
    sendTelegramNotification(newOrder);

    setCart([]);
    setShowCheckoutModal(false);
    setActiveTab('orders');
    alert('Заказ успешно оформлен!');
  };

  // Фильтрация товаров по категории и поиску
  const filteredProducts = products.filter(item => {
    const itemName = item.names[lang] || item.names['RU'];
    const matchesCat = activeCategory === 'Все' || activeCategory === 'All' || activeCategory === '전체' || item.category === activeCategory;
    const matchesSearch = itemName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const goToHome = () => {
    setActiveTab('home');
    setActiveCategory('Все');
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{
      background: '#0b0e14', minHeight: '100dvh', width: '100%',
      fontFamily: 'Inter, sans-serif', boxSizing: 'border-box',
      margin: 0, padding: '16px 16px 110px 16px', color: '#fff', overflowX: 'hidden'
    }}>
      
      {/* Премиальные шрифты */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=Montserrat:wght@400;500;600&display=swap');
        .premium-title {
          font-family: 'Playfair Display', serif;
          font-size: 24px !important;
          font-weight: 700;
          letter-spacing: 0.8px;
          color: #ffffff;
        }
        .premium-subtitle {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 13px !important;
          color: #fcd34d;
          font-weight: 400;
          letter-spacing: 0.5px;
        }
      `}</style>

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
                <input type="text" placeholder={t.namePlaceholder} value={clientName} onChange={handleNameChange} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }} required />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>{t.phoneLabel}</label>
                <input type="text" value={clientPhone} onChange={handlePhoneChange} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }} required />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>{t.deliveryTypeLabel}</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="button" onClick={() => setDeliveryType('pickup')} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: deliveryType === 'pickup' ? '1px solid #f59e0b' : '1px solid #334155', background: deliveryType === 'pickup' ? 'rgba(245,158,11,0.15)' : '#0b0e14', color: '#fff', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>{t.pickup}</button>
                  <button type="button" onClick={() => setDeliveryType('delivery')} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: deliveryType === 'delivery' ? '1px solid #f59e0b' : '1px solid #334155', background: deliveryType === 'delivery' ? 'rgba(245,158,11,0.15)' : '#0b0e14', color: '#fff', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>{t.delivery}</button>
                </div>
              </div>

              {deliveryType === 'delivery' && (
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>{t.addressLabel}</label>
                  <input type="text" placeholder={t.addressPlaceholder} value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }} required />
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>{t.commentLabel}</label>
                <textarea placeholder={t.commentPlaceholder} value={clientComment} onChange={(e) => setClientComment(e.target.value)} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box', resize: 'vertical', minHeight: '50px' }} />
              </div>

              <button type="submit" style={{ background: '#f59e0b', color: '#0b0e14', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', marginTop: '6px' }}>
                {t.confirmButton}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* МОДАЛКА ВХОДА АДМИНИСТРАТОРА */}
      {showLoginModal && (
        <div onClick={() => setShowLoginModal(false)} style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh',
          background: 'rgba(5, 7, 10, 0.9)', backdropFilter: 'blur(8px)',
          zIndex: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', boxSizing: 'border-box'
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: '#141822', border: '1px solid rgba(245,158,11,0.4)', borderRadius: '20px', padding: '24px', width: '100%', maxWidth: '320px', boxSizing: 'border-box'
          }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#fcd34d' }}>{t.adminLoginTitle}</h3>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="password" placeholder={t.adminPasswordPlaceholder} value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }} autoFocus />
              <button type="submit" style={{ background: '#f59e0b', color: '#0b0e14', border: 'none', padding: '10px', borderRadius: '10px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>{t.login}</button>
            </form>
          </div>
        </div>
      )}

      {/* МОДАЛКА СОЗДАНИЯ КАТЕГОРИИ */}
      {showAddCatModal && (
        <div onClick={() => setShowAddCatModal(false)} style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh',
          background: 'rgba(5, 7, 10, 0.9)', backdropFilter: 'blur(8px)',
          zIndex: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', boxSizing: 'border-box'
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: '#141822', border: '1px solid rgba(245,158,11,0.4)', borderRadius: '20px', padding: '24px', width: '100%', maxWidth: '340px', boxSizing: 'border-box'
          }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#fcd34d' }}>{t.addNewCatBtn}</h3>
            <form onSubmit={handleAddCategory} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="text" placeholder={t.catNamePlaceholder} value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }} required autoFocus />
              <button type="submit" style={{ background: '#f59e0b', color: '#0b0e14', border: 'none', padding: '10px', borderRadius: '10px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>{t.addCatButton}</button>
            </form>
          </div>
        </div>
      )}

      {/* МОДАЛКА ДОБАВЛЕНИЯ ТОВАРА */}
      {showAddModal && (
        <div onClick={() => setShowAddModal(false)} style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh',
          background: 'rgba(5, 7, 10, 0.9)', backdropFilter: 'blur(8px)',
          zIndex: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', boxSizing: 'border-box', overflowY: 'auto'
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: '#141822', border: '1px solid rgba(245,158,11,0.4)', borderRadius: '20px', padding: '20px', width: '100%', maxWidth: '380px', boxSizing: 'border-box', maxHeight: '90dvh', overflowY: 'auto'
          }}>
            <h3 style={{ margin: '0 0 14px 0', fontSize: '16px', color: '#fcd34d' }}>{t.addNewItemBtn}</h3>
            <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input type="text" placeholder={t.dishNamePlaceholder} value={newTitle} onChange={(e) => setNewTitle(e.target.value)} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }} required />
              <div style={{ display: 'flex', gap: '8px' }}>
                <input type="number" placeholder={t.pricePlaceholder} value={newPrice} onChange={(e) => setNewPrice(e.target.value)} style={{ flex: 1, background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }} required />
                <input type="number" placeholder={t.oldPricePlaceholder} value={newOldPrice} onChange={(e) => setNewOldPrice(e.target.value)} style={{ flex: 1, background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }} />
              </div>
              <select value={newCat} onChange={(e) => setNewCat(e.target.value)} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }}>
                {categories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
              </select>
              <textarea placeholder={t.descPlaceholder} value={newDesc} onChange={(e) => setNewDesc(e.target.value)} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box', resize: 'vertical', minHeight: '60px' }} />
              <div>
                <label style={{ fontSize: '11px', color: '#9ca3af', display: 'block', marginBottom: '4px' }}>{t.photoLabel}</label>
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setNewImage)} style={{ fontSize: '11px', color: '#fff', marginBottom: '4px' }} />
                <input type="text" placeholder="Или URL картинки" value={newImage} onChange={(e) => setNewImage(e.target.value)} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '8px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }} />
              </div>
              <select value={newBadge} onChange={(e) => setNewBadge(e.target.value)} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }}>
                <option value="ХИТ">Хит</option>
                <option value="НОВИНКА">Новинка</option>
                <option value="ПРЕМИУМ">Премиум</option>
              </select>
              <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                <button type="button" onClick={() => setShowAddModal(false)} style={{ flex: 1, background: '#334155', color: '#fff', border: 'none', padding: '10px', borderRadius: '10px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>{t.cancel}</button>
                <button type="submit" style={{ flex: 1, background: '#f59e0b', color: '#0b0e14', border: 'none', padding: '10px', borderRadius: '10px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>{t.addButton}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ШАПКА САЙТА */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div onClick={goToHome} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <div style={{
            width: '42px', height: '42px', background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px',
            boxShadow: '0 4px 12px rgba(245,158,11,0.3)'
          }}>
            {customLogo}
          </div>
          <div>
            <h1 className="premium-title" style={{ margin: 0 }}>{t.bakeryName}</h1>
            <span className="premium-subtitle">{t.bakerySub}</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <select value={lang} onChange={(e) => setLang(e.target.value)} style={{
            background: '#141822', color: '#fcd34d', border: '1px solid rgba(245,158,11,0.3)',
            borderRadius: '8px', padding: '6px 8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer'
          }}>
            <option value="RU">RU</option>
            <option value="EN">EN</option>
            <option value="KO">KO</option>
          </select>

          {!isAdminLoggedIn ? (
            <button onClick={() => setShowLoginModal(true)} style={{
              background: 'transparent', color: '#9ca3af', border: '1px solid #334155',
              borderRadius: '8px', padding: '6px 10px', fontSize: '11px', cursor: 'pointer'
            }}>
              {t.loginBtn}
            </button>
          ) : (
            <button onClick={handleExit} style={{
              background: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5', border: '1px solid rgba(239, 68, 68, 0.4)',
              borderRadius: '8px', padding: '6px 10px', fontSize: '11px', cursor: 'pointer', fontWeight: 'bold'
            }}>
              {t.exitBtn}
            </button>
          )}
        </div>
      </header>

      {/* АДМИН ПАНЕЛЬ */}
      {isAdminLoggedIn && (
        <div style={{
          background: '#141822', border: '1px dashed #f59e0b', borderRadius: '16px', padding: '16px', marginBottom: '20px'
        }}>
          <h3 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#fcd34d' }}>{t.telegramSettingsTitle}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            <input type="text" placeholder={t.tgTokenLabel} value={tgBotToken} onChange={(e) => setTgBotToken(e.target.value)} style={{ background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px', color: '#fff', fontSize: '12px' }} />
            <input type="text" placeholder={t.tgChatIdLabel} value={tgChatId} onChange={(e) => setTgChatId(e.target.value)} style={{ background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px', color: '#fff', fontSize: '12px' }} />
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button onClick={() => setShowAddModal(true)} style={{ background: '#f59e0b', color: '#0b0e14', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>{t.addNewItemBtn}</button>
            <button onClick={() => setShowAddCatModal(true)} style={{ background: '#334155', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>{t.addNewCatBtn}</button>
          </div>
        </div>
      )}

      {/* ВКЛАДКА: ГЛАВНАЯ */}
      {activeTab === 'home' && (
        <>
          {/* Баннер акции */}
          <div style={{
            width: '100%', height: '140px', borderRadius: '16px', overflow: 'hidden', position: 'relative',
            marginBottom: '16px', border: '1px solid rgba(245, 158, 11, 0.2)', boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
          }}>
            <img src={bannerImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }} />
            <div style={{ position: 'absolute', bottom: '14px', left: '14px', right: '14px' }}>
              <span style={{ background: '#f59e0b', color: '#0b0e14', fontSize: '10px', fontWeight: '900', padding: '3px 8px', borderRadius: '6px' }}>{t.specialEvent}</span>
              <p style={{ margin: '6px 0 0 0', fontSize: '12px', fontWeight: '600', color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>{t.promoText}</p>
            </div>
          </div>

          {/* Строка поиска */}
          <div style={{ position: 'relative', marginBottom: '16px' }}>
            <input type="text" placeholder={t.searchPlaceholder} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{
              width: '100%', background: '#141822', border: '1px solid #334155', borderRadius: '12px',
              padding: '12px 14px 12px 38px', color: '#fff', fontSize: '13px', boxSizing: 'border-box'
            }} />
            <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '14px' }}>🔍</span>
          </div>

          {/* Чипсы категорий */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '16px', scrollbarWidth: 'none' }}>
            <button onClick={() => setActiveCategory('Все')} style={{
              background: activeCategory === 'Все' ? '#f59e0b' : '#141822',
              color: activeCategory === 'Все' ? '#0b0e14' : '#9ca3af',
              border: '1px solid #334155', borderRadius: '10px', padding: '8px 14px', fontSize: '12px', fontWeight: 'bold', whiteSpace: 'nowrap', cursor: 'pointer'
            }}>
              {t.allCategories}
            </button>
            {categories.map((cat, i) => (
              <button key={i} onClick={() => setActiveCategory(cat)} style={{
                background: activeCategory === cat ? '#f59e0b' : '#141822',
                color: activeCategory === cat ? '#0b0e14' : '#9ca3af',
                border: '1px solid #334155', borderRadius: '10px', padding: '8px 14px', fontSize: '12px', fontWeight: 'bold', whiteSpace: 'nowrap', cursor: 'pointer'
              }}>
                {cat}
              </button>
            ))}
          </div>

          {/* Список товаров */}
          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#9ca3af', fontSize: '14px' }}>{t.notFound}</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '12px' }}>
              {filteredProducts.map(item => {
                const isLiked = likes.includes(item.id);
                return (
                  <div key={item.id} style={{
                    background: '#141822', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px',
                    overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative', boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                  }}>
                    <div style={{ width: '100%', height: '130px', position: 'relative', overflow: 'hidden', cursor: 'pointer' }} onClick={() => setSelectedProduct(item)}>
                      <img src={item.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <span style={{ position: 'absolute', top: '8px', left: '8px', background: 'rgba(11,14,20,0.8)', color: '#fcd34d', padding: '2px 6px', borderRadius: '6px', fontSize: '9px', fontWeight: 'bold' }}>{item.badge}</span>
                      <button onClick={(e) => { e.stopPropagation(); toggleLike(item.id); }} style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(11,14,20,0.8)', border: 'none', width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {isLiked ? '❤️' : '🤍'}
                      </button>
                    </div>

                    <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                      <div onClick={() => setSelectedProduct(item)} style={{ cursor: 'pointer' }}>
                        <h4 style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: 'bold', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.names[lang] || item.names['RU']}
                        </h4>
                        <p style={{ margin: 0, fontSize: '11px', color: '#9ca3af', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.3' }}>
                          {item.descs[lang] || item.descs['RU']}
                        </p>
                      </div>

                      <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: '900', color: '#fcd34d' }}>{item.price.toLocaleString()} ₩</div>
                          {item.oldPrice && (
                            <div style={{ fontSize: '10px', color: '#6b7280', textDecoration: 'line-through' }}>{item.oldPrice.toLocaleString()} ₩</div>
                          )}
                        </div>
                        <button onClick={() => setCart([...cart, item])} style={{ background: '#f59e0b', color: '#0b0e14', border: 'none', width: '30px', height: '30px', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          +
                        </button>
                      </div>

                      {/* Кнопки управления для админа прямо в карточке */}
                      {isAdminLoggedIn && (
                        <div style={{ display: 'flex', gap: '4px', marginTop: '8px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '6px' }}>
                          <button onClick={() => {
                            const newPriceVal = prompt('Новая цена:', item.price);
                            if (newPriceVal) {
                              setProducts(products.map(p => p.id === item.id ? { ...p, price: Number(newPriceVal) } : p));
                            }
                          }} style={{ flex: 1, background: '#334155', color: '#fff', border: 'none', padding: '4px', borderRadius: '6px', fontSize: '10px', cursor: 'pointer' }}>{t.editItem}</button>
                          <button onClick={() => handleDeleteProduct(item.id)} style={{ background: 'rgba(239,68,68,0.2)', color: '#fca5a5', border: 'none', padding: '4px', borderRadius: '6px', fontSize: '10px', cursor: 'pointer' }}>{t.deleteItem}</button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* ВКЛАДКА: ПОИСК */}
      {activeTab === 'search' && (
        <div>
          <h2 style={{ fontSize: '18px', color: '#fcd34d', marginBottom: '14px' }}>{t.searchTab}</h2>
          <input type="text" placeholder={t.searchPlaceholder} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{
            width: '100%', background: '#141822', border: '1px solid #334155', borderRadius: '12px',
            padding: '12px 14px', color: '#fff', fontSize: '13px', boxSizing: 'border-box', marginBottom: '14px'
          }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '12px' }}>
            {filteredProducts.map(item => (
              <div key={item.id} onClick={() => setSelectedProduct(item)} style={{ background: '#141822', borderRadius: '12px', padding: '10px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.06)' }}>
                <img src={item.image} alt="" style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }} />
                <h4 style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#fff' }}>{item.names[lang] || item.names['RU']}</h4>
                <div style={{ fontSize: '12px', color: '#fcd34d', fontWeight: 'bold' }}>{item.price.toLocaleString()} ₩</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ВКЛАДКА: ИЗБРАННОЕ */}
      {activeTab === 'likes' && (
        <div>
          <h2 style={{ fontSize: '18px', color: '#fcd34d', marginBottom: '14px' }}>{t.likesTab}</h2>
          {likes.length === 0 ? (
            <p style={{ color: '#9ca3af', fontSize: '13px', textAlign: 'center', marginTop: '40px' }}>{t.emptyLikes}</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '12px' }}>
              {products.filter(p => likes.includes(p.id)).map(item => (
                <div key={item.id} onClick={() => setSelectedProduct(item)} style={{ background: '#141822', borderRadius: '12px', padding: '10px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <img src={item.image} alt="" style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }} />
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#fff' }}>{item.names[lang] || item.names['RU']}</h4>
                  <div style={{ fontSize: '12px', color: '#fcd34d', fontWeight: 'bold' }}>{item.price.toLocaleString()} ₩</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ВКЛАДКА: ЗАКАЗЫ */}
      {activeTab === 'orders' && (
        <div>
          <h2 style={{ fontSize: '18px', color: '#fcd34d', marginBottom: '14px' }}>{t.orderHistoryTitle}</h2>
          {ordersHistory.length === 0 ? (
            <p style={{ color: '#9ca3af', fontSize: '13px', textAlign: 'center', marginTop: '40px' }}>{t.emptyOrders}</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {ordersHistory.map(order => (
                <div key={order.id} style={{ background: '#141822', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '14px', padding: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#9ca3af', marginBottom: '8px' }}>
                    <span>Заказ #{order.id.toString().slice(-5)}</span>
                    <span style={{ color: '#fcd34d' }}>{order.date}</span>
                  </div>
                  <div style={{ fontSize: '12px', marginBottom: '8px' }}>
                    {order.items.map((it, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span>{it.names[lang] || it.names['RU']}</span>
                        <span style={{ color: '#fcd34d' }}>{it.price.toLocaleString()} ₩</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', fontWeight: 'bold', fontSize: '13px' }}>
                    <span>{t.total} <span style={{ color: '#fcd34d' }}>{order.total.toLocaleString()} ₩</span></span>
                    <span style={{ fontSize: '11px', color: '#34d399', background: 'rgba(52,211,153,0.1)', padding: '2px 6px', borderRadius: '6px' }}>{t.statusCompleted}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* НИЖНЯЯ ПЛАВАЮЩАЯ КОРЗИНА И НАВИГАЦИЯ */}
      {cart.length > 0 && activeTab === 'home' && (
        <div style={{
          position: 'fixed', bottom: '74px', left: '16px', right: '16px',
          background: 'linear-gradient(135deg, #f59e0b, #d97706)', borderRadius: '16px', padding: '12px 16px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 8px 24px rgba(245,158,11,0.4)', zIndex: 120
        }}>
          <div>
            <div style={{ fontSize: '11px', color: '#0b0e14', fontWeight: 'bold' }}>{t.selectedItems}: {cart.length}</div>
            <div style={{ fontSize: '15px', color: '#0b0e14', fontWeight: '900' }}>{totalPrice.toLocaleString()} ₩</div>
          </div>
          <button onClick={() => setShowCheckoutModal(true)} style={{
            background: '#0b0e14', color: '#fcd34d', border: 'none', padding: '10px 18px', borderRadius: '10px',
            fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
          }}>
            {t.checkoutBtn}
          </button>
        </div>
      )}

      {/* НИЖНЯЯ ПАНЕЛЬ НАВИГАЦИИ */}
      <nav style={{
        position: 'fixed', bottom: 0, left: 0, width: '100vw', background: '#141822',
        borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-around',
        padding: '10px 0', zIndex: 130, transform: showBottomNav ? 'translateY(0)' : 'translateY(100%)', transition: 'transform 0.3s ease'
      }}>
        <button onClick={goToHome} style={{ background: 'transparent', border: 'none', color: activeTab === 'home' ? '#f59e0b' : '#9ca3af', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '10px', cursor: 'pointer', gap: '2px' }}>
          <span style={{ fontSize: '16px' }}>🏠</span> {t.homeTab}
        </button>
        <button onClick={() => setActiveTab('search')} style={{ background: 'transparent', border: 'none', color: activeTab === 'search' ? '#f59e0b' : '#9ca3af', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '10px', cursor: 'pointer', gap: '2px' }}>
          <span style={{ fontSize: '16px' }}>🔍</span> {t.searchTab}
        </button>
        <button onClick={() => setActiveTab('likes')} style={{ background: 'transparent', border: 'none', color: activeTab === 'likes' ? '#f59e0b' : '#9ca3af', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '10px', cursor: 'pointer', gap: '2px', position: 'relative' }}>
          <span style={{ fontSize: '16px' }}>❤️</span> {t.likesTab}
          {likes.length > 0 && <span style={{ position: 'absolute', top: '-2px', right: '10px', background: '#f59e0b', color: '#0b0e14', fontSize: '8px', fontWeight: 'bold', width: '14px', height: '14px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{likes.length}</span>}
        </button>
        <button onClick={() => setActiveTab('orders')} style={{ background: 'transparent', border: 'none', color: activeTab === 'orders' ? '#f59e0b' : '#9ca3af', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '10px', cursor: 'pointer', gap: '2px', position: 'relative' }}>
          <span style={{ fontSize: '16px' }}>📦</span> {t.ordersTab}
          {ordersHistory.length > 0 && <span style={{ position: 'absolute', top: '-2px', right: '10px', background: '#f59e0b', color: '#0b0e14', fontSize: '8px', fontWeight: 'bold', width: '14px', height: '14px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{ordersHistory.length}</span>}
        </button>
      </nav>

    </div>
  );
}