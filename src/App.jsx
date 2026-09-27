import React, { useState, useEffect, useRef } from 'react';

const translations = {
  RU: {
    bakeryName: 'Sweet Bakery',
    bakerySub: 'домашняя выпечка',
    address: '📍 Сеул, Каннам-гу 12-3',
    phone: '📞 010-1234-5678',
    allCategories: 'Все',
    addToCart: 'В корзину +',
    loginBtn: 'Login',
    exitBtn: 'Exit',
    editBannerTitle: '🖼️ Управление баннером',
    uploadBannerLabel: 'Загрузить новый баннер (заменит текущий):',
    removeBannerBtn: 'Удалить баннер',
    adminEditMenuTitle: '🛠️ Управление меню и товарами',
    editItem: 'Редактировать',
    deleteItem: 'Удалить',
    saveChanges: 'Сохранить изменения',
    addNewItemBtn: '+ Добавить товар',
    addNewCatBtn: '+ Добавить категорию',
    dishNamePlaceholder: 'Название блюда',
    pricePlaceholder: 'Новая цена (₩)',
    oldPricePlaceholder: 'Старая цена (₩)',
    descPlaceholder: 'Описание',
    photoLabel: 'Фото (файл или ссылка):',
    addButton: 'Добавить в меню',
    addCatButton: 'Создать категорию',
    catNamePlaceholder: 'Название категории',
    cancel: 'Отмена',
    checkoutTitle: '📋 Оформление заказа',
    nameLabel: 'Ваше имя *',
    namePlaceholder: 'Alexander',
    phoneLabel: 'Телефон (010-****-****) *',
    deliveryTypeLabel: 'Способ получения *',
    pickup: '🏃 Самовывоз',
    delivery: '🛵 Доставка',
    addressLabel: 'Адрес доставки *',
    addressPlaceholder: 'Seoul, Gangnam-gu...',
    commentLabel: 'Комментарий',
    commentPlaceholder: 'Пожелания...',
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
    adminPasswordPlaceholder: 'Введите пароль',
    login: 'Войти',
    badgeHit: 'ХИТ',
    badgeNew: 'НОВИНКА',
    badgePrem: 'ПРЕМИУМ',
    notFound: 'Ничего не найдено 😢',
    menuMain: 'Главная',
    menuPromos: 'Акции',
    menuContacts: 'Контакты',
    menuAbout: 'О нас',
    aboutText: 'Sweet Bakery — семейная пекарня в самом сердце Сеула. Мы готовим для вас традиционную французскую выпечку по авторским рецептам, используя только натуральные и свежие ингредиенты премиум-класса каждый день.',
    contactsText: 'Мы ждем вас ежедневно с 09:00 до 21:00 по адресу: Сеул, Каннам-гу 12-3. Телефон для предзаказа: 010-1234-5678.',
    promoSectionTitle: '✨ Специальные предложения и акции'
  },
  EN: {
    bakeryName: 'Sweet Bakery',
    bakerySub: 'home baking',
    address: '📍 Seoul, Gangnam-gu 12-3',
    phone: '📞 010-1234-5678',
    allCategories: 'All',
    addToCart: 'Add to cart +',
    loginBtn: 'Login',
    exitBtn: 'Exit',
    editBannerTitle: '🖼️ Banner Management',
    uploadBannerLabel: 'Upload new banner (replaces current):',
    removeBannerBtn: 'Remove banner',
    adminEditMenuTitle: '🛠️ Menu & Item Management',
    editItem: 'Edit',
    deleteItem: 'Delete',
    saveChanges: 'Save changes',
    addNewItemBtn: '+ Add item',
    addNewCatBtn: '+ Add category',
    dishNamePlaceholder: 'Dish name',
    pricePlaceholder: 'New price (₩)',
    oldPricePlaceholder: 'Old price (₩)',
    descPlaceholder: 'Description',
    photoLabel: 'Photo (file or URL):',
    addButton: 'Add to menu',
    addCatButton: 'Create category',
    catNamePlaceholder: 'Category name',
    cancel: 'Cancel',
    checkoutTitle: '📋 Checkout',
    nameLabel: 'Your name *',
    namePlaceholder: 'Alexander',
    phoneLabel: 'Phone (010-****-****) *',
    deliveryTypeLabel: 'Delivery method *',
    pickup: '🏃 Pickup',
    delivery: '🛵 Delivery',
    addressLabel: 'Delivery address *',
    addressPlaceholder: 'Seoul, Gangnam-gu...',
    commentLabel: 'Comment',
    commentPlaceholder: 'Wishes...',
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
    adminPasswordPlaceholder: 'Enter password',
    login: 'Log in',
    badgeHit: 'HIT',
    badgeNew: 'NEW',
    badgePrem: 'PREMIUM',
    notFound: 'Nothing found 😢',
    menuMain: 'Home',
    menuPromos: 'Promotions',
    menuContacts: 'Contacts',
    menuAbout: 'About us',
    aboutText: 'Sweet Bakery is a family bakery in the heart of Seoul. We bake traditional French pastries using only premium natural ingredients every day.',
    contactsText: 'We are open daily from 09:00 to 21:00 at Seoul, Gangnam-gu 12-3. Phone: 010-1234-5678.',
    promoSectionTitle: '✨ Special Offers & Promos'
  },
  KO: {
    bakeryName: 'Sweet Bakery',
    bakerySub: '홈 베이킹',
    address: '📍 서울 강남구 12-3',
    phone: '📞 010-1234-5678',
    allCategories: '전체',
    addToCart: '담기 +',
    loginBtn: 'Login',
    exitBtn: '나가기',
    editBannerTitle: '🖼️ 배너 관리',
    uploadBannerLabel: '새 배너 업로드 (기존 교체):',
    removeBannerBtn: '배너 삭제',
    adminEditMenuTitle: '🛠️ 메뉴 및 상품 관리',
    editItem: '수정',
    deleteItem: '삭제',
    saveChanges: '저장',
    addNewItemBtn: '+ 상품 추가',
    addNewCatBtn: '+ 카테고리 추가',
    dishNamePlaceholder: '상품명',
    pricePlaceholder: '새 가격 (₩)',
    oldPricePlaceholder: '할인 전 가격 (₩)',
    descPlaceholder: '설명',
    photoLabel: '사진 (파일 또는 URL):',
    addButton: '추가하기',
    addCatButton: '카테고리 생성',
    catNamePlaceholder: '카테고리 이름',
    cancel: '취소',
    checkoutTitle: '📋 주문하기',
    nameLabel: '이름 *',
    namePlaceholder: 'Alexander',
    phoneLabel: '전화번호 (010-****-****) *',
    deliveryTypeLabel: '수령 방법 *',
    pickup: '🏃 픽업',
    delivery: '🛵 배달',
    addressLabel: '주소 *',
    addressPlaceholder: 'Seoul, Gangnam-gu...',
    commentLabel: '요청사항',
    commentPlaceholder: '요청사항...',
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
    orderDate: '날짜:',
    statusCompleted: '접수 완료 ✅',
    adminLoginTitle: '관리자 로그인',
    adminPasswordPlaceholder: '비밀번호 입력',
    login: '로그인',
    badgeHit: '인기',
    badgeNew: '신메뉴',
    badgePrem: '프리미엄',
    notFound: '검색 결과가 없습니다 😢',
    menuMain: '홈',
    menuPromos: '이벤트',
    menuContacts: '연락처',
    menuAbout: '소개',
    aboutText: '스위트 베이커리는 서울 중심부에 위치한 홈 베이커리입니다. 매일 신선한 천연 재료로 정성껏 빵을 굽습니다.',
    contactsText: '매일 오전 9시부터 오후 9시까지 운영합니다. 주소: 서울 강남구 12-3. 전화: 010-1234-5678.',
    promoSectionTitle: '✨ 스페셜 이벤트 및 프로모션'
  }
};

export default function App() {
  const [lang, setLang] = useState('RU');
  const t = translations[lang];

  const [activeTab, setActiveTab] = useState('home');
  const [activeCategory, setActiveCategory] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [showBottomNav, setShowBottomNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  const [customLogo] = useState('🧁');
  const [bannerImage, setBannerImage] = useState('https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80');

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddCatModal, setShowAddCatModal] = useState(false);

  const [categories, setCategories] = useState(['Круассаны', 'Торты', 'Пироги', 'Печенье', 'Напитки']);
  const [newCategoryName, setNewCategoryName] = useState('');

  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newOldPrice, setNewOldPrice] = useState('');
  const [newCat, setNewCat] = useState('Круассаны');
  const [newDesc, setNewDesc] = useState('');
  const [newImage, setNewImage] = useState('');
  const [newBadge, setNewBadge] = useState('ХИТ');

  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('010');
  const [deliveryType, setDeliveryType] = useState('pickup');
  const [clientAddress, setClientAddress] = useState('');
  const [clientComment, setClientComment] = useState('');

  const [cart, setCart] = useState([]);
  const [likes, setLikes] = useState([]);
  const [ordersHistory, setOrdersHistory] = useState([]);

  // Состояние для выпадающего меню языков
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langDropdownRef = useRef(null);

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
    }
  ]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target)) {
        setIsLangOpen(false);
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

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
    if (!newTitle || newPrice === '') return;
    const newItem = {
      id: Date.now(),
      names: { RU: newTitle, EN: newTitle, KO: newTitle },
      category: newCat,
      price: Number(newPrice) || 0,
      oldPrice: newOldPrice !== '' ? Number(newOldPrice) : null,
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

  const handleSaveEditedProduct = (e) => {
    e.preventDefault();
    const updated = {
      ...editingProduct,
      price: editingProduct.price !== '' ? Number(editingProduct.price) : 0,
      oldPrice: editingProduct.oldPrice !== '' && editingProduct.oldPrice !== null ? Number(editingProduct.oldPrice) : null
    };
    setProducts(products.map(p => p.id === updated.id ? updated : p));
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

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const decreaseQuantity = (productId) => {
    const existing = cart.find(item => item.id === productId);
    if (existing.quantity > 1) {
      setCart(cart.map(item => item.id === productId ? { ...item, quantity: item.quantity - 1 } : item));
    } else {
      setCart(cart.filter(item => item.id !== productId));
    }
  };

  const handleSendOrder = (e) => {
    e.preventDefault();
    if (!clientName.trim() || clientPhone.length < 13) {
      alert('Заполните имя и телефон.');
      return;
    }

    const now = new Date();
    const dateStr = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newOrder = {
      id: Date.now(),
      date: dateStr,
      items: [...cart],
      total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      clientName,
      clientPhone,
      deliveryType,
      clientAddress
    };

    setOrdersHistory([newOrder, ...ordersHistory]);
    setCart([]);
    setShowCheckoutModal(false);
    setActiveTab('orders');
    alert('Заказ успешно оформлен!');
  };

  const filteredProducts = products.filter(item => {
    const itemName = item.names[lang] || item.names['RU'];
    const matchesCat = activeCategory === 'Все' || activeCategory === 'All' || activeCategory === '전체' || item.category === activeCategory;
    const matchesSearch = itemName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const totalCartPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div style={{
      background: '#0b0e14', minHeight: '100dvh', width: '100%',
      fontFamily: 'Inter, sans-serif', boxSizing: 'border-box',
      margin: 0, padding: '16px 16px 110px 16px', color: '#fff', overflowX: 'hidden'
    }}>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=Montserrat:wght@400;500;600&display=swap');
        .premium-title {
          font-family: 'Playfair Display', serif;
          font-size: 16px !important;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: #ffffff;
          white-space: nowrap;
          line-height: 1.1;
        }
        .premium-subtitle {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 10px !important;
          color: #fcd34d;
          font-weight: 400;
          letter-spacing: 0.3px;
          white-space: nowrap;
        }
      `}</style>

      {/* ШАПКА САЙТА (HEADER) СОГЛАСНО ТРЕБОВАНИЯМ */}
      <header style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        paddingBottom: '16px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        marginBottom: '16px'
      }}>
        {/* 1. Слева: Логотип и название */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => { setActiveTab('home'); setActiveCategory('Все'); }}>
          <div style={{ fontSize: '32px', background: 'rgba(245,158,11,0.1)', padding: '6px', borderRadius: '12px', border: '1px solid rgba(245,158,11,0.3)' }}>
            {customLogo}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="premium-title">{t.bakeryName}</span>
            <span className="premium-subtitle">{t.bakerySub}</span>
          </div>
        </div>

        {/* 2. Справа от логотипа и названия: Адрес сверху, телефон снизу */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', fontSize: '12px', color: '#cbd5e1', gap: '2px' }}>
          <div>{t.address}</div>
          <div style={{ color: '#fcd34d', fontWeight: '600' }}>{t.phone}</div>
        </div>

        {/* 3. С крайнего правого края: Логин, меню и языковая панель в один ряд */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Логин / Выход */}
          {isAdminLoggedIn ? (
            <button onClick={handleExit} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
              {t.exitBtn}
            </button>
          ) : (
            <button onClick={() => setShowLoginModal(true)} style={{ background: '#334155', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
              {t.loginBtn}
            </button>
          )}

          {/* Меню в шапке */}
          <button onClick={() => setActiveTab('home')} style={{ background: activeTab === 'home' ? 'rgba(245,158,11,0.2)' : 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '6px 10px', borderRadius: '8px', fontSize: '11px', cursor: 'pointer' }}>
            {t.homeTab}
          </button>

          {/* Языковая панель с исправленным выравниванием и без боковых рамок */}
          <div ref={langDropdownRef} style={{ position: 'relative' }}>
            <button onClick={() => setIsLangOpen(!isLangOpen)} style={{
              background: '#1e293b', border: '1px solid rgba(245,158,11,0.4)', color: '#fcd34d',
              padding: '6px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '4px'
            }}>
              {lang} ▼
            </button>
            {isLangOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 'auto',
                background: '#141822', border: 'none', borderRadius: '8px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.5)', zIndex: 100, minWidth: '60px',
                overflow: 'hidden', padding: '4px 0'
              }}>
                {['RU', 'EN', 'KO'].map((l) => (
                  <div key={l} onClick={() => { setLang(l); setIsLangOpen(false); }} style={{
                    padding: '8px 12px', fontSize: '12px', color: lang === l ? '#fcd34d' : '#fff',
                    background: lang === l ? 'rgba(245,158,11,0.1)' : 'transparent', cursor: 'pointer',
                    textAlign: 'left', fontWeight: lang === l ? 'bold' : 'normal'
                  }}>
                    {l}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* МЕНЮ ПОД БАННЕРОМ С ИСПРАВЛЕННЫМИ ПЕРЕВОДАМИ */}
      <nav style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '16px' }}>
        <button onClick={() => { setActiveTab('home'); setActiveCategory('Все'); }} style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '8px 14px', borderRadius: '10px', fontSize: '12px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
          {t.menuMain}
        </button>
        <button onClick={() => { setActiveTab('home'); setActiveCategory('Круассаны'); }} style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '8px 14px', borderRadius: '10px', fontSize: '12px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
          {t.menuPromos}
        </button>
        <button onClick={() => alert(t.contactsText)} style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '8px 14px', borderRadius: '10px', fontSize: '12px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
          {t.menuContacts}
        </button>
        <button onClick={() => alert(t.aboutText)} style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '8px 14px', borderRadius: '10px', fontSize: '12px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
          {t.menuAbout}
        </button>
      </nav>

      {/* ОСНОВНОЙ КОНТЕНТ ВКЛАДОК */}
      {activeTab === 'home' && (
        <div>
          {/* Баннер */}
          <div style={{ width: '100%', height: '160px', borderRadius: '16px', overflow: 'hidden', marginBottom: '16px', position: 'relative' }}>
            <img src={bannerImage} alt="Banner" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,14,20,0.8), transparent)', display: 'flex', alignItems: 'flex-end', padding: '16px' }}>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#fcd34d' }}>{t.promoSectionTitle}</span>
            </div>
          </div>

          {/* Панель администратора / управление баннером и товарами */}
          {isAdminLoggedIn && (
            <div style={{ background: '#141822', border: '1px dashed #f59e0b', borderRadius: '16px', padding: '16px', marginBottom: '16px' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#fcd34d', fontSize: '14px' }}>{t.adminEditMenuTitle}</h4>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button onClick={() => setShowAddModal(true)} style={{ background: '#f59e0b', color: '#0b0e14', border: 'none', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                  {t.addNewItemBtn}
                </button>
                <button onClick={() => setShowAddCatModal(true)} style={{ background: '#334155', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                  {t.addNewCatBtn}
                </button>
              </div>
            </div>
          )}

          {/* Категории */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '16px' }}>
            <button onClick={() => setActiveCategory('Все')} style={{
              background: activeCategory === 'Все' ? '#f59e0b' : '#1e293b',
              color: activeCategory === 'Все' ? '#0b0e14' : '#fff',
              border: 'none', padding: '8px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', whiteSpace: 'nowrap'
            }}>
              {t.allCategories}
            </button>
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                background: activeCategory === cat ? '#f59e0b' : '#1e293b',
                color: activeCategory === cat ? '#0b0e14' : '#fff',
                border: 'none', padding: '8px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', whiteSpace: 'nowrap'
              }}>
                {cat}
              </button>
            ))}
          </div>

          {/* Список товаров */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '12px' }}>
            {filteredProducts.map((item) => (
              <div key={item.id} style={{ background: '#141822', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', height: '120px', cursor: 'pointer' }} onClick={() => setSelectedProduct(item)}>
                  <img src={item.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button onClick={(e) => { e.stopPropagation(); toggleLike(item.id); }} style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', color: likes.includes(item.id) ? '#ef4444' : '#fff' }}>
                    ♥
                  </button>
                </div>
                <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <h5 style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: 'bold', color: '#fff' }}>
                      {item.names[lang] || item.names['RU']}
                    </h5>
                    <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '8px' }}>
                      {item.price.toLocaleString()} ₩
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button onClick={() => addToCart(item)} style={{ flex: 1, background: '#f59e0b', color: '#0b0e14', border: 'none', padding: '6px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
                      {t.addToCart}
                    </button>
                    {isAdminLoggedIn && (
                      <button onClick={() => setEditingProduct(item)} style={{ background: '#334155', color: '#fff', border: 'none', padding: '6px 8px', borderRadius: '8px', fontSize: '11px', cursor: 'pointer' }}>
                        ⚙
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ВКЛАДКА ИЗБРАННОЕ */}
      {activeTab === 'likes' && (
        <div>
          <h3 style={{ fontSize: '16px', color: '#fcd34d', marginBottom: '12px' }}>{t.likesTab}</h3>
          {likes.length === 0 ? (
            <p style={{ color: '#9ca3af', fontSize: '13px' }}>{t.emptyLikes}</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '12px' }}>
              {products.filter(p => likes.includes(p.id)).map(item => (
                <div key={item.id} style={{ background: '#141822', borderRadius: '16px', padding: '10px' }}>
                  <img src={item.image} alt="" style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '10px' }} />
                  <div style={{ fontSize: '13px', fontWeight: 'bold', marginTop: '6px' }}>{item.names[lang] || item.names['RU']}</div>
                  <div style={{ color: '#fcd34d', fontSize: '12px' }}>{item.price.toLocaleString()} ₩</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ВКЛАДКА ЗАКАЗЫ */}
      {activeTab === 'orders' && (
        <div>
          <h3 style={{ fontSize: '16px', color: '#fcd34d', marginBottom: '12px' }}>{t.orderHistoryTitle}</h3>
          {ordersHistory.length === 0 ? (
            <p style={{ color: '#9ca3af', fontSize: '13px' }}>{t.emptyOrders}</p>
          ) : (
            ordersHistory.map(order => (
              <div key={order.id} style={{ background: '#141822', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '16px', padding: '14px', marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#9ca3af', marginBottom: '6px' }}>
                  <span>{order.date}</span>
                  <span style={{ color: '#22c55e', fontWeight: 'bold' }}>{t.statusCompleted}</span>
                </div>
                <div style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '6px' }}>{order.clientName} ({order.clientPhone})</div>
                <div style={{ fontSize: '12px', color: '#fcd34d', fontWeight: 'bold' }}>{t.total} {order.total.toLocaleString()} ₩</div>
              </div>
            ))
          )}
        </div>
      )}

      {/* МОДАЛЬНОЕ ОКНО ДОБАВЛЕНИЯ ТОВАРА ДЛЯ АДМИНА */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(5,7,10,0.9)', zIndex: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: '#141822', border: '1px solid #f59e0b', borderRadius: '20px', padding: '20px', width: '100%', maxWidth: '380px' }}>
            <h3 style={{ margin: '0 0 14px 0', fontSize: '16px', color: '#fcd34d' }}>{t.addNewItemBtn}</h3>
            <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input type="text" placeholder={t.dishNamePlaceholder} value={newTitle} onChange={(e) => setNewTitle(e.target.value)} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }} required />
              <input type="text" inputMode="numeric" placeholder={t.pricePlaceholder} value={newPrice} onChange={(e) => setNewPrice(e.target.value)} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }} required />
              <select value={newCat} onChange={(e) => setNewCat(e.target.value)} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px' }}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <textarea placeholder={t.descPlaceholder} value={newDesc} onChange={(e) => setNewDesc(e.target.value)} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', minHeight: '50px' }} />
              <input type="text" placeholder="URL картинки" value={newImage} onChange={(e) => setNewImage(e.target.value)} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }} />
              <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                <button type="button" onClick={() => setShowAddModal(false)} style={{ flex: 1, background: '#334155', color: '#fff', border: 'none', padding: '10px', borderRadius: '10px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>{t.cancel}</button>
                <button type="submit" style={{ flex: 1, background: '#f59e0b', color: '#0b0e14', border: 'none', padding: '10px', borderRadius: '10px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>{t.addButton}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* МОДАЛЬНОЕ ОКНО ДОБАВЛЕНИЯ КАТЕГОРИИ */}
      {showAddCatModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(5,7,10,0.9)', zIndex: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: '#141822', border: '1px solid #f59e0b', borderRadius: '20px', padding: '20px', width: '100%', maxWidth: '320px' }}>
            <h3 style={{ margin: '0 0 14px 0', fontSize: '16px', color: '#fcd34d' }}>{t.addNewCatBtn}</h3>
            <form onSubmit={handleAddCategory} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input type="text" placeholder={t.catNamePlaceholder} value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }} required />
              <button type="submit" style={{ background: '#f59e0b', color: '#0b0e14', border: 'none', padding: '10px', borderRadius: '10px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>{t.addCatButton}</button>
            </form>
          </div>
        </div>
      )}

      {/* МОДАЛЬНОЕ ОКНО РЕДАКТИРОВАНИЯ ТОВАРА */}
      {editingProduct && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(5,7,10,0.9)', zIndex: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: '#141822', border: '1px solid #f59e0b', borderRadius: '20px', padding: '20px', width: '100%', maxWidth: '380px' }}>
            <h3 style={{ margin: '0 0 14px 0', fontSize: '16px', color: '#fcd34d' }}>{t.editItem}</h3>
            <form onSubmit={handleSaveEditedProduct} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input type="text" value={editingProduct.names[lang] || editingProduct.names['RU']} onChange={(e) => setEditingProduct({...editingProduct, names: {...editingProduct.names, [lang]: e.target.value}})} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }} required />
              <input type="text" inputMode="numeric" value={editingProduct.price} onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }} required />
              <div style={{ display: 'flex', gap: '8px' }}>
                <button type="button" onClick={() => handleDeleteProduct(editingProduct.id)} style={{ flex: 1, background: '#ef4444', color: '#fff', border: 'none', padding: '10px', borderRadius: '10px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>{t.deleteItem}</button>
                <button type="submit" style={{ flex: 1, background: '#22c55e', color: '#fff', border: 'none', padding: '10px', borderRadius: '10px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>{t.saveChanges}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* МОДАЛЬНОЕ ОКНО АДМИН-ВХОДА */}
      {showLoginModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(5,7,10,0.9)', zIndex: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: '#141822', border: '1px solid rgba(245,158,11,0.4)', borderRadius: '20px', padding: '24px', width: '100%', maxWidth: '320px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#fcd34d' }}>{t.adminLoginTitle}</h3>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="password" placeholder={t.adminPasswordPlaceholder} value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }} autoFocus />
              <button type="submit" style={{ background: '#f59e0b', color: '#0b0e14', border: 'none', padding: '10px', borderRadius: '10px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>{t.login}</button>
            </form>
          </div>
        </div>
      )}

      {/* НИЖНЯЯ ПАНЕЛЬ С КОРЗИНОЙ И ПЕРЕКЛЮЧАТЕЛЯМИ */}
      {showBottomNav && (
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          background: 'rgba(20, 24, 34, 0.95)', backdropFilter: 'blur(10px)',
          borderTop: '1px solid rgba(255,255,255,0.08)', padding: '12px 16px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100
        }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button onClick={() => setActiveTab('home')} style={{ background: 'transparent', border: 'none', color: activeTab === 'home' ? '#fcd34d' : '#9ca3af', fontSize: '12px', cursor: 'pointer' }}>{t.homeTab}</button>
            <button onClick={() => setActiveTab('likes')} style={{ background: 'transparent', border: 'none', color: activeTab === 'likes' ? '#fcd34d' : '#9ca3af', fontSize: '12px', cursor: 'pointer' }}>{t.likesTab} ({likes.length})</button>
            <button onClick={() => setActiveTab('orders')} style={{ background: 'transparent', border: 'none', color: activeTab === 'orders' ? '#fcd34d' : '#9ca3af', fontSize: '12px', cursor: 'pointer' }}>{t.ordersTab} ({ordersHistory.length})</button>
          </div>

          {cart.length > 0 && (
            <button onClick={() => setShowCheckoutModal(true)} style={{ background: '#f59e0b', color: '#0b0e14', border: 'none', padding: '10px 16px', borderRadius: '12px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>
              {t.checkoutBtn} ({totalCartPrice.toLocaleString()} ₩)
            </button>
          )}
        </div>
      )}

      {/* МОДАЛЬНОЕ ОКНО ОФОРМЛЕНИЯ ЗАКАЗА */}
      {showCheckoutModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(6,8,12,0.95)', zIndex: 140, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '20px 16px', overflowY: 'auto' }}>
          <div style={{ background: '#141822', border: '1px solid rgba(245,158,11,0.4)', borderRadius: '20px', padding: '20px', width: '100%', maxWidth: '420px', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', color: '#fcd34d' }}>{t.checkoutTitle}</h3>
              <button onClick={() => setShowCheckoutModal(false)} style={{ background: 'transparent', border: 'none', color: '#9ca3af', fontSize: '18px', cursor: 'pointer' }}>✕</button>
            </div>
            
            <div style={{ background: '#0b0e14', borderRadius: '12px', padding: '10px', marginBottom: '16px', maxHeight: '130px', overflowY: 'auto' }}>
              {cart.map((item, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', marginBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '4px' }}>
                  <span>{item.names[lang] || item.names['RU']} (x{item.quantity})</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ color: '#fcd34d', fontWeight: 'bold' }}>{(item.price * item.quantity).toLocaleString()} ₩</span>
                    <button onClick={() => decreaseQuantity(item.id)} style={{ background: '#ef4444', color: '#fff', border: 'none', width: '20px', height: '20px', borderRadius: '4px', cursor: 'pointer', fontSize: '10px' }}>-</button>
                    <button onClick={() => addToCart(item)} style={{ background: '#22c55e', color: '#fff', border: 'none', width: '20px', height: '20px', borderRadius: '4px', cursor: 'pointer', fontSize: '10px' }}>+</button>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendOrder} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="text" placeholder={t.namePlaceholder} value={clientName} onChange={handleNameChange} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }} required />
              <input type="text" value={clientPhone} onChange={handlePhoneChange} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }} required />
              <button type="submit" style={{ background: '#f59e0b', color: '#0b0e14', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}>{t.confirmButton}</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}