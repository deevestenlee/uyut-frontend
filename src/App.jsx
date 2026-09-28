import React, { useState, useMemo } from 'react';

// ==========================================
// 1. ПОЛНЫЙ СЛОВАРЬ ЛОКАЛИЗАЦИИ (RU / EN / KO)
// ==========================================
const TRANSLATIONS = {
  RU: {
    bakeryName: 'Sweet Bakery',
    bakerySub: 'Boutique Patisserie',
    address: 'ул. Кондитерская, 12, Сеул',
    phone: '+82 10-0000-0000',
    allCategories: 'Все',
    specialEvent: 'АКЦИЯ ДНЯ',
    promoText: 'Свежайшие круассаны на сливочном масле со скидкой 15%!',
    searchPlaceholder: 'Поиск изысканных десертов...',
    notFound: 'По вашему запросу ничего не найдено',
    editItem: 'Изм.',
    deleteItem: 'Удалить',
    adminMode: 'Админ',
    clientMode: 'Клиент',
    homeTab: 'Главная',
    searchTab: 'Каталог',
    likesTab: 'Избранное',
    ordersTab: 'Заказы',
    emptyLikes: 'В вашем избранном пока ничего нет',
    emptyOrders: 'У вас пока нет истории заказов',
    orderHistoryTitle: 'История заказов',
    selectedItems: 'Выбрано',
    total: 'Итого:',
    checkoutBtn: 'Оформить заказ',
    statusCompleted: 'Выполнен',
    addNewItemBtn: 'Добавить товар',
    telegramSettingsTitle: 'Настройки Telegram Бота',
    tgTokenLabel: 'Токен Telegram Бота',
    tgChatIdLabel: 'Chat ID Админа',
    cancel: 'Отмена',
    addButton: 'Добавить',
    saveButton: 'Сохранить',
    dishNameRu: 'Название (RU)',
    dishNameEn: 'Название (EN)',
    dishNameKo: 'Название (KO)',
    pricePlaceholder: 'Цена (₩)',
    oldPricePlaceholder: 'Старая цена (₩)',
    descRu: 'Описание (RU)',
    descEn: 'Описание (EN)',
    descKo: 'Описание (KO)',
    imageUrl: 'URL изображения',
    categoryLabel: 'Категория',
    badgeLabel: 'Метка',
    badges: { hit: 'ХИТ', new: 'НОВИНКА', sale: 'СКИДКА', premium: 'ПРЕМИУМ' },
    menu: { home: 'Главная', catalog: 'Каталог', about: 'О нас', contacts: 'Контакты' },
    orderNum: 'Заказ #',
    editPricePrompt: 'Новая цена (₩):',
    productAdded: 'Товар успешно добавлен в каталог!',
    orderSuccess: 'Заказ успешно оформлен! Спасибо за покупку.',
    loginBtn: 'Вход',
    logoutBtn: 'Выйти из аккаунта',
    profileTitle: 'Личный кабинет',
    loginTitle: 'Авторизация',
    emailLabel: 'Электронная почта',
    passwordLabel: 'Пароль',
    signIn: 'Войти',
    signUp: 'Зарегистрироваться',
    noAccount: 'Нет аккаунта?',
    hasAccount: 'Уже есть аккаунт?',
    myProfile: 'Мой профиль',
    myOrders: 'Мои заказы',
    closeBtn: 'Закрыть'
  },
  EN: {
    bakeryName: 'Sweet Bakery',
    bakerySub: 'Boutique Patisserie',
    address: '12 Bakery Street, Seoul',
    phone: '+82 10-0000-0000',
    allCategories: 'All',
    specialEvent: 'SPECIAL OFFER',
    promoText: 'Fresh butter croissants with 15% discount today!',
    searchPlaceholder: 'Search exquisite desserts...',
    notFound: 'No desserts found for your request',
    editItem: 'Edit',
    deleteItem: 'Delete',
    adminMode: 'Admin',
    clientMode: 'Client',
    homeTab: 'Home',
    searchTab: 'Catalog',
    likesTab: 'Favorites',
    ordersTab: 'Orders',
    emptyLikes: 'Your favorites list is empty',
    emptyOrders: 'You have no order history yet',
    orderHistoryTitle: 'Order History',
    selectedItems: 'Selected',
    total: 'Total:',
    checkoutBtn: 'Checkout',
    statusCompleted: 'Completed',
    addNewItemBtn: 'Add Product',
    telegramSettingsTitle: 'Telegram Bot Settings',
    tgTokenLabel: 'Telegram Bot Token',
    tgChatIdLabel: 'Admin Chat ID',
    cancel: 'Cancel',
    addButton: 'Add',
    saveButton: 'Save',
    dishNameRu: 'Name (RU)',
    dishNameEn: 'Name (EN)',
    dishNameKo: 'Name (KO)',
    pricePlaceholder: 'Price (₩)',
    oldPricePlaceholder: 'Old Price (₩)',
    descRu: 'Description (RU)',
    descEn: 'Description (EN)',
    descKo: 'Description (KO)',
    imageUrl: 'Image URL',
    categoryLabel: 'Category',
    badgeLabel: 'Badge',
    badges: { hit: 'BESTSELLER', new: 'NEW', sale: 'SALE', premium: 'PREMIUM' },
    menu: { home: 'Home', catalog: 'Catalog', about: 'About Us', contacts: 'Contacts' },
    orderNum: 'Order #',
    editPricePrompt: 'New price (₩):',
    productAdded: 'Product successfully added!',
    orderSuccess: 'Order placed successfully! Thank you.',
    loginBtn: 'Login',
    logoutBtn: 'Sign Out',
    profileTitle: 'My Account',
    loginTitle: 'Authorization',
    emailLabel: 'Email Address',
    passwordLabel: 'Password',
    signIn: 'Sign In',
    signUp: 'Register',
    noAccount: 'No account?',
    hasAccount: 'Already have an account?',
    myProfile: 'My Profile',
    myOrders: 'My Orders',
    closeBtn: 'Close'
  },
  KO: {
    bakeryName: 'Sweet Bakery',
    bakerySub: '부티크 파티스리',
    address: '서울시 베이커리길 12',
    phone: '+82 10-0000-0000',
    allCategories: '전체',
    specialEvent: '오늘의 이벤트',
    promoText: '신선한 버터 크루아상 15% 할인 행사 진행 중!',
    searchPlaceholder: '고품격 디저트 검색...',
    notFound: '검색 결과가 없습니다',
    editItem: '수정',
    deleteItem: '삭제',
    adminMode: '관리자',
    clientMode: '고객',
    homeTab: '홈',
    searchTab: '카탈로그',
    likesTab: '찜목록',
    ordersTab: '주문내역',
    emptyLikes: '찜한 상품이 없습니다',
    emptyOrders: '주문 내역이 없습니다',
    orderHistoryTitle: '주문 내역',
    selectedItems: '선택됨',
    total: '합계:',
    checkoutBtn: '주문하기',
    statusCompleted: '완료됨',
    addNewItemBtn: '상품 추가',
    telegramSettingsTitle: '텔레그램 봇 설정',
    tgTokenLabel: '텔레그램 봇 토큰',
    tgChatIdLabel: '관리자 Chat ID',
    cancel: '취소',
    addButton: '등록',
    saveButton: '저장',
    dishNameRu: '상품명 (RU)',
    dishNameEn: '상품명 (EN)',
    dishNameKo: '상품명 (KO)',
    pricePlaceholder: '가격 (₩)',
    oldPricePlaceholder: '이전 가격 (₩)',
    descRu: '설명 (RU)',
    descEn: '설명 (EN)',
    descKo: '설명 (KO)',
    imageUrl: '이미지 URL',
    categoryLabel: '카테고리',
    badgeLabel: '배지',
    badges: { hit: '인기', new: '신상품', sale: '할인', premium: '프리미엄' },
    menu: { home: '홈', catalog: '카탈로그', about: '소개', contacts: '문의처' },
    orderNum: '주문번호 #',
    editPricePrompt: '새 가격 (₩):',
    productAdded: '상품이 성공적으로 추가되었습니다!',
    orderSuccess: '주문이 완료되었습니다. 감사합니다!',
    loginBtn: '로그인',
    logoutBtn: '로그아웃',
    profileTitle: '내 계정',
    loginTitle: '로그인 및 회원가입',
    emailLabel: '이메일 주소',
    passwordLabel: '비밀번호',
    signIn: '로그인',
    signUp: '회원가입',
    noAccount: '계정이 없으신가요?',
    hasAccount: '이미 계정이 있으신가요?',
    myProfile: '내 프로필',
    myOrders: '주문 내역',
    closeBtn: '닫기'
  }
};

// ==========================================
// 2. РАСШИРЕННЫЕ КАТЕГОРИИ И КАТАЛОГ
// ==========================================
const CATEGORIES = [
  { id: 'all', names: { RU: 'Все', EN: 'All', KO: '전체' } },
  { id: 'cakes', names: { RU: 'Торты', EN: 'Cakes', KO: '케이크' } },
  { id: 'croissants', names: { RU: 'Круассаны и выпечка', EN: 'Croissants & Bakery', KO: '크루아상 및 베이커리' } },
  { id: 'pastries', names: { RU: 'Пирожные', EN: 'Pastries', KO: '페이스트리' } },
  { id: 'cookies', names: { RU: 'Печенье', EN: 'Cookies', KO: '쿠키' } },
  { id: 'bread', names: { RU: 'Хлеб', EN: 'Bread', KO: '빵' } },
  { id: 'desserts', names: { RU: 'Десерты', EN: 'Desserts', KO: '디저트' } },
  { id: 'drinks', names: { RU: 'Напитки', EN: 'Drinks', KO: '음료' } }
];

const INITIAL_PRODUCTS = [
  {
    id: 1,
    category: 'croissants',
    names: { RU: 'Миндальный круассан', EN: 'Almond Croissant', KO: '아몬드 크루아상' },
    descs: {
      RU: 'Французский круассан с миндальным кремом франжипан и обжаренными лепестками.',
      EN: 'French croissant with frangipane almond cream and toasted almond flakes.',
      KO: '고소한 프란지팡 아몬드 크림과 아몬드 슬라이스가 가득한 프랑스식 크루아상.'
    },
    price: 5500,
    oldPrice: 6500,
    badge: 'hit',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&auto=format&fit=crop'
  },
  {
    id: 2,
    category: 'cakes',
    names: { RU: 'Клубничный торт-фрезье', EN: 'Strawberry Fraisier Cake', KO: '딸기 프레지에 케이크' },
    descs: {
      RU: 'Нежный бисквит с ванильным кремом муслин и отборной свежей клубникой.',
      EN: 'Sponge cake with mousseline vanilla cream and fresh strawberries.',
      KO: '부드러운 시트 사이에 바닐라 크림과 신선한 생딸기가 가득한 프리미엄 케이크.'
    },
    price: 38000,
    oldPrice: 42000,
    badge: 'new',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&auto=format&fit=crop'
  },
  {
    id: 3,
    category: 'pastries',
    names: { RU: 'Фисташковый эклер', EN: 'Pistachio Eclair', KO: '피스타치오 에클레어' },
    descs: {
      RU: 'Заварное пирожное с кремом из натуральной сицилийской фисташковой пасты.',
      EN: 'Choux pastry filled with rich natural Sicilian pistachio custard.',
      KO: '시칠리아산 천연 피스타치오 페이스트로 만든 크림이 가득 찬 에클레어.'
    },
    price: 6000,
    oldPrice: null,
    badge: 'premium',
    image: 'https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=500&auto=format&fit=crop'
  },
  {
    id: 4,
    category: 'desserts',
    names: { RU: 'Классический макарон', EN: 'Classic Macaron Box', KO: '클래식 마카롱 세트' },
    descs: {
      RU: 'Набор хрустящих миндальных печений с изысканными ганашами.',
      EN: 'Selection of delicate almond cookies with rich ganache fillings.',
      KO: '풍부한 가나슈 필링이 들어간 바삭하고 쫀득한 마카롱 세트.'
    },
    price: 18000,
    oldPrice: 20000,
    badge: 'sale',
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=500&auto=format&fit=crop'
  },
  {
    id: 5,
    category: 'bread',
    names: { RU: 'Ремесленный батаard', EN: 'Artisan Sourdough Bread', KO: '아티산 사워도우 빵' },
    descs: {
      RU: 'Хрустящий хлеб на натуральной закваске с пористым мякишем.',
      EN: 'Crispy crust artisan sourdough bread with airy crumb structure.',
      KO: '바삭한 껍질과 촉촉하고 쫄깃한 식감의 천연 발효 사워도우.'
    },
    price: 7000,
    oldPrice: null,
    badge: 'new',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop'
  },
  {
    id: 6,
    category: 'drinks',
    names: { RU: 'Фирменный раф кофе', EN: 'Signature Raf Coffee', KO: '시그니처 라프 커피' },
    descs: {
      RU: 'Эспрессо со взбитыми сливками и ванильным сиропом ручной работы.',
      EN: 'Espresso blended with micro-foamed cream and artisanal vanilla syrup.',
      KO: '에스프레소와 부드러운 크림, 수제 바닐라 시럽이 어우러진 커피.'
    },
    price: 6500,
    oldPrice: null,
    badge: 'hit',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=500&auto=format&fit=crop'
  }
];

// ==========================================
// 3. ОСНОВНОЙ КОМПОНЕНТ ПРИЛОЖЕНИЯ
// ==========================================
export default function App() {
  const [lang, setLang] = useState('RU');
  const t = TRANSLATIONS[lang] || TRANSLATIONS.RU;

  const [activeTab, setActiveTab] = useState('home');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Состояния авторизации и аккаунта
  const [user, setUser] = useState(null); // { email: 'admin@sweetbakery.com', role: 'admin' } или null
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'signup'
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  // Данные магазина
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [likes, setLikes] = useState([]);
  const [ordersHistory, setOrdersHistory] = useState([]);

  // Настройки Telegram бота
  const [tgBotToken, setTgBotToken] = useState('');
  const [tgChatId, setTgChatId] = useState('');

  // Модальные окна
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Поля формы добавления товара
  const [newTitleRu, setNewTitleRu] = useState('');
  const [newTitleEn, setNewTitleEn] = useState('');
  const [newTitleKo, setNewTitleKo] = useState('');
  const [newDescRu, setNewDescRu] = useState('');
  const [newDescEn, setNewDescEn] = useState('');
  const [newDescKo, setNewDescKo] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newOldPrice, setNewOldPrice] = useState('');
  const [newCategory, setNewCategory] = useState('cakes');
  const [newBadge, setNewBadge] = useState('hit');
  const [newImage, setNewImage] = useState('');

  // Вычисляемые списки
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchCategory = activeCategory === 'all' || item.category === activeCategory;
      const name = (item.names[lang] || item.names.RU || '').toLowerCase();
      const desc = (item.descs[lang] || item.descs.RU || '').toLowerCase();
      const query = searchQuery.toLowerCase();
      return matchCategory && (name.includes(query) || desc.includes(query));
    });
  }, [products, activeCategory, searchQuery, lang]);

  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => sum + Number(item.price), 0);
  }, [cart]);

  // Обработчики
  const toggleLike = (id) => {
    setLikes((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const handleAddToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const handleEditPrice = (product) => {
    const val = prompt(t.editPricePrompt, product.price);
    if (val !== null && !isNaN(val) && val.trim() !== '') {
      const newPriceNum = Number(val);
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, price: newPriceNum } : p))
      );
    }
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm(t.deleteItem + '?')) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    const newProd = {
      id: Date.now(),
      category: newCategory,
      names: {
        RU: newTitleRu || 'Новый десерт',
        EN: newTitleEn || newTitleRu || 'New Dessert',
        KO: newTitleKo || newTitleRu || '신규 디저트'
      },
      descs: {
        RU: newDescRu || '',
        EN: newDescEn || newDescRu || '',
        KO: newDescKo || newDescRu || ''
      },
      price: Number(newPrice) || 0,
      oldPrice: newOldPrice ? Number(newOldPrice) : null,
      badge: newBadge,
      image: newImage || 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500'
    };

    setProducts((prev) => [newProd, ...prev]);
    setShowAddModal(false);
    setNewTitleRu(''); setNewTitleEn(''); setNewTitleKo('');
    setNewDescRu(''); setNewDescEn(''); setNewDescKo('');
    setNewPrice(''); setNewOldPrice(''); setNewImage('');
    alert(t.productAdded);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const newOrder = {
      id: Date.now(),
      total: totalPrice,
      itemsCount: cart.length,
      date: new Date().toLocaleDateString()
    };
    setOrdersHistory((prev) => [newOrder, ...prev]);
    setCart([]);
    alert(t.orderSuccess);
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!emailInput) return;
    const isUserAdmin = emailInput.toLowerCase().includes('admin');
    setUser({ email: emailInput, role: isUserAdmin ? 'admin' : 'client' });
    setIsAdmin(isUserAdmin);
    setShowAuthModal(false);
    setEmailInput('');
    setPasswordInput('');
  };

  const handleLogout = () => {
    setUser(null);
    setIsAdmin(false);
    setShowProfileModal(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0b0e14',
      color: '#f3f4f6',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      paddingBottom: '100px',
      boxSizing: 'border-box'
    }}>

      {/* ==========================================
          1. ПРЕМИАЛЬНАЯ ШАПКА (LUXURY HEADER)
          ========================================== */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 90,
        backgroundColor: 'rgba(11, 14, 20, 0.95)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(245, 158, 11, 0.25)',
        padding: '10px 16px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Левый блок: Кнопка меню + Брендинг */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              onClick={() => setIsMenuOpen(true)}
              style={{
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                color: '#fcd34d',
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                fontSize: '18px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s'
              }}
              aria-label="Menu"
            >
              ☰
            </button>

            <div 
              onClick={() => { setActiveTab('home'); setActiveCategory('all'); }}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
            >
              <div style={{
                width: '40px', height: '40px',
                background: 'linear-gradient(135deg, #d97706, #78350f)',
                borderRadius: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '20px',
                border: '1px solid rgba(252, 211, 77, 0.4)',
                boxShadow: '0 4px 12px rgba(217, 119, 6, 0.3)'
              }}>
                🥐
              </div>
              <div>
                <h1 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#fcd34d', letterSpacing: '0.5px', lineHeight: '1.2' }}>
                  {t.bakeryName}
                </h1>
                <div style={{ fontSize: '9px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1.2px', fontWeight: '500' }}>
                  {t.bakerySub}
                </div>
              </div>
            </div>
          </div>

          {/* Правый блок: Языки + Авторизация */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value)}
              style={{
                background: '#141822',
                color: '#fcd34d',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: '10px',
                padding: '6px 8px',
                fontSize: '11px',
                fontWeight: 'bold',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="RU">RU</option>
              <option value="EN">EN</option>
              <option value="KO">KO</option>
            </select>

            {user ? (
              <button 
                onClick={() => setShowProfileModal(true)}
                style={{
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  color: '#0b0e14',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '6px 12px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                👤 {user.email.split('@')[0]}
              </button>
            ) : (
              <button 
                onClick={() => setShowAuthModal(true)}
                style={{
                  background: '#141822',
                  color: '#fcd34d',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  borderRadius: '10px',
                  padding: '6px 12px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                {t.loginBtn}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ==========================================
          2. ВЫДВИЖНОЕ МЕНЮ СЛЕВА (LEFT DRAWER)
          ========================================== */}
      {isMenuOpen && (
        <div 
          onClick={() => setIsMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(6px)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'flex-start',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '85%',
              maxWidth: '300px',
              height: '100%',
              backgroundColor: '#141822',
              borderRight: '1px solid rgba(245, 158, 11, 0.3)',
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box',
              boxShadow: '10px 0 30px rgba(0,0,0,0.5)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px' }}>🥐</span>
                <span style={{ color: '#fcd34d', fontWeight: 'bold', fontSize: '16px' }}>{t.bakeryName}</span>
              </div>
              <button 
                onClick={() => setIsMenuOpen(false)}
                style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: '22px', cursor: 'pointer', padding: '4px' }}
              >
                ✕
              </button>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <button 
                onClick={() => { setActiveTab('home'); setActiveCategory('all'); setIsMenuOpen(false); }}
                style={{ background: 'none', border: 'none', color: '#f3f4f6', textAlign: 'left', fontSize: '15px', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}
              >
                🏠 {t.menu.home}
              </button>
              <button 
                onClick={() => { setActiveTab('search'); setIsMenuOpen(false); }}
                style={{ background: 'none', border: 'none', color: '#f3f4f6', textAlign: 'left', fontSize: '15px', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}
              >
                🔍 {t.menu.catalog}
              </button>
              <button 
                onClick={() => { setActiveTab('likes'); setIsMenuOpen(false); }}
                style={{ background: 'none', border: 'none', color: '#f3f4f6', textAlign: 'left', fontSize: '15px', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}
              >
                ❤️ {t.likesTab}
              </button>
              <button 
                onClick={() => { setActiveTab('orders'); setIsMenuOpen(false); }}
                style={{ background: 'none', border: 'none', color: '#f3f4f6', textAlign: 'left', fontSize: '15px', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}
              >
                📦 {t.ordersTab}
              </button>
            </nav>

            <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px', fontSize: '12px', color: '#9ca3af', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div>📍 {t.address}</div>
              <div>📞 {t.phone}</div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          3. ОСНОВНОЙ КОНТЕНТ (PAGES & TABS)
          ========================================== */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px' }}>

        {/* АДМИН-ПАНЕЛЬ (Только для администраторов) */}
        {isAdmin && (
          <div style={{
            background: '#141822',
            border: '1px dashed #f59e0b',
            borderRadius: '16px',
            padding: '16px',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '14px', color: '#fcd34d' }}>⚙️ {t.adminMode} Dashboard</h3>
              <span style={{ fontSize: '11px', background: 'rgba(245,158,11,0.2)', color: '#fcd34d', padding: '2px 8px', borderRadius: '6px' }}>Active</span>
            </div>
            
            <button 
              onClick={() => setShowAddModal(true)} 
              style={{ background: '#f59e0b', color: '#0b0e14', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}
            >
              + {t.addNewItemBtn}
            </button>

            {/* Настройки Telegram */}
            <div style={{ marginTop: '14px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '10px' }}>
              <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '6px' }}>{t.telegramSettingsTitle}</div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <input 
                  type="text" 
                  placeholder={t.tgTokenLabel} 
                  value={tgBotToken} 
                  onChange={(e) => setTgBotToken(e.target.value)}
                  style={{ flex: 1, minWidth: '130px', background: '#0b0e14', border: '1px solid #334155', borderRadius: '6px', padding: '6px', color: '#fff', fontSize: '11px', outline: 'none' }}
                />
                <input 
                  type="text" 
                  placeholder={t.tgChatIdLabel} 
                  value={tgChatId} 
                  onChange={(e) => setTgChatId(e.target.value)}
                  style={{ flex: 1, minWidth: '130px', background: '#0b0e14', border: '1px solid #334155', borderRadius: '6px', padding: '6px', color: '#fff', fontSize: '11px', outline: 'none' }}
                />
              </div>
            </div>
          </div>
        )}

        {/* ВКЛАДКА: ГЛАВНАЯ И КАТАЛОГ */}
        {(activeTab === 'home' || activeTab === 'search') && (
          <>
            {/* Акционный баннер на Главной */}
            {activeTab === 'home' && (
              <div style={{
                width: '100%',
                height: '140px',
                borderRadius: '18px',
                overflow: 'hidden',
                position: 'relative',
                marginBottom: '18px',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                boxShadow: '0 10px 25px rgba(0,0,0,0.4)'
              }}>
                <img 
                  src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1000&auto=format&fit=crop" 
                  alt="Promo" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.5)' }} 
                />
                <div style={{ position: 'absolute', bottom: '14px', left: '16px', right: '16px' }}>
                  <span style={{ background: '#f59e0b', color: '#0b0e14', fontSize: '9px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '6px', textTransform: 'uppercase' }}>
                    {t.specialEvent}
                  </span>
                  <p style={{ margin: '6px 0 0 0', fontSize: '13px', fontWeight: '600', color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                    {t.promoText}
                  </p>
                </div>
              </div>
            )}

            {/* Строка поиска */}
            <div style={{ position: 'relative', marginBottom: '16px' }}>
              <input 
                type="text" 
                placeholder={t.searchPlaceholder} 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                style={{
                  width: '100%',
                  background: '#141822',
                  border: '1px solid #334155',
                  borderRadius: '12px',
                  padding: '12px 16px 12px 40px',
                  color: '#fff',
                  fontSize: '13px',
                  boxSizing: 'border-box',
                  outline: 'none'
                }} 
              />
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '14px' }}>🔍</span>
            </div>

            {/* Фильтр Категорий */}
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '18px', scrollbarWidth: 'none' }}>
              {CATEGORIES.map((cat) => {
                const catName = cat.names[lang] || cat.names.RU;
                const isActive = activeCategory === cat.id;
                return (
                  <button 
                    key={cat.id} 
                    onClick={() => setActiveCategory(cat.id)} 
                    style={{
                      background: isActive ? '#f59e0b' : '#141822',
                      color: isActive ? '#0b0e14' : '#9ca3af',
                      border: '1px solid #334155',
                      borderRadius: '10px',
                      padding: '8px 14px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {catName}
                  </button>
                );
              })}
            </div>

            {/* Сетка Товаров */}
            {filteredProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '50px 0', color: '#9ca3af', fontSize: '13px' }}>
                {t.notFound}
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '14px' }}>
                {filteredProducts.map((item) => {
                  const isLiked = likes.includes(item.id);
                  const title = item.names[lang] || item.names.RU;
                  const desc = item.descs[lang] || item.descs.RU;
                  const badgeText = t.badges[item.badge] || t.badges.hit;

                  return (
                    <div 
                      key={item.id} 
                      style={{
                        background: '#141822',
                        border: '1px solid rgba(255,255,255,0.06)',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                      }}
                    >
                      {/* Картинка с фиксированным соотношением сторон для защиты от скачков */}
                      <div 
                        style={{ width: '100%', aspectRatio: '1 / 1', position: 'relative', overflow: 'hidden', cursor: 'pointer', backgroundColor: '#1e293b' }} 
                        onClick={() => setSelectedProduct(item)}
                      >
                        <img src={item.image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        
                        {item.badge && (
                          <span style={{ position: 'absolute', top: '8px', left: '8px', background: 'rgba(11,14,20,0.85)', color: '#fcd34d', padding: '3px 6px', borderRadius: '6px', fontSize: '9px', fontWeight: 'bold' }}>
                            {badgeText}
                          </span>
                        )}

                        <button 
                          onClick={(e) => { e.stopPropagation(); toggleLike(item.id); }} 
                          style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(11,14,20,0.85)', border: 'none', width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          aria-label="Like"
                        >
                          {isLiked ? '❤️' : '🤍'}
                        </button>
                      </div>

                      {/* Текст и цена */}
                      <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                        <div onClick={() => setSelectedProduct(item)} style={{ cursor: 'pointer' }}>
                          <h4 style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: 'bold', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {title}
                          </h4>
                          <p style={{ margin: 0, fontSize: '11px', color: '#9ca3af', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.3' }}>
                            {desc}
                          </p>
                        </div>

                        <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#fcd34d' }}>{Number(item.price).toLocaleString()} ₩</div>
                            {item.oldPrice && (
                              <div style={{ fontSize: '10px', color: '#6b7280', textDecoration: 'line-through' }}>{Number(item.oldPrice).toLocaleString()} ₩</div>
                            )}
                          </div>
                          <button 
                            onClick={() => handleAddToCart(item)} 
                            style={{ background: '#f59e0b', color: '#0b0e14', border: 'none', width: '32px', height: '32px', borderRadius: '10px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            aria-label="Add to cart"
                          >
                            +
                          </button>
                        </div>

                        {/* Панель управления админа */}
                        {isAdmin && (
                          <div style={{ display: 'flex', gap: '6px', marginTop: '10px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px' }}>
                            <button 
                              onClick={() => handleEditPrice(item)} 
                              style={{ flex: 1, background: '#334155', color: '#fff', border: 'none', padding: '5px', borderRadius: '6px', fontSize: '10px', cursor: 'pointer' }}
                            >
                              {t.editItem}
                            </button>
                            <button 
                              onClick={() => handleDeleteProduct(item.id)} 
                              style={{ background: 'rgba(239,68,68,0.2)', color: '#fca5a5', border: 'none', padding: '5px', borderRadius: '6px', fontSize: '10px', cursor: 'pointer' }}
                            >
                              {t.deleteItem}
                            </button>
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

        {/* ВКЛАДКА: ИЗБРАННОЕ */}
        {activeTab === 'likes' && (
          <div>
            <h2 style={{ fontSize: '18px', color: '#fcd34d', marginBottom: '16px' }}>{t.likesTab}</h2>
            {likes.length === 0 ? (
              <p style={{ color: '#9ca3af', fontSize: '13px', textAlign: 'center', marginTop: '50px' }}>{t.emptyLikes}</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '14px' }}>
                {products.filter((p) => likes.includes(p.id)).map((item) => (
                  <div key={item.id} style={{ background: '#141822', borderRadius: '14px', padding: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <img src={item.image} alt="" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '10px', marginBottom: '8px' }} />
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#fff' }}>{item.names[lang] || item.names.RU}</h4>
                    <div style={{ fontSize: '12px', color: '#fcd34d', fontWeight: 'bold' }}>{Number(item.price).toLocaleString()} ₩</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ВКЛАДКА: ЗАКАЗЫ */}
        {activeTab === 'orders' && (
          <div>
            <h2 style={{ fontSize: '18px', color: '#fcd34d', marginBottom: '16px' }}>{t.orderHistoryTitle}</h2>
            {ordersHistory.length === 0 ? (
              <p style={{ color: '#9ca3af', fontSize: '13px', textAlign: 'center', marginTop: '50px' }}>{t.emptyOrders}</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {ordersHistory.map((order, idx) => (
                  <div key={order.id} style={{ background: '#141822', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '14px', padding: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#9ca3af', marginBottom: '8px' }}>
                      <span>{t.orderNum}{idx + 101}</span>
                      <span style={{ color: '#34d399', fontWeight: '500' }}>{t.statusCompleted}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '11px', color: '#9ca3af' }}>{order.date} ({order.itemsCount} шт.)</div>
                      <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#fcd34d' }}>{order.total.toLocaleString()} ₩</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* ==========================================
          4. МОДАЛЬНЫЕ ОКНА
          ========================================== */}

      {/* Модалка просмотра товара */}
      {selectedProduct && (
        <div 
          onClick={() => setSelectedProduct(null)} 
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            style={{ backgroundColor: '#141822', border: '1px solid rgba(245,158,11,0.4)', borderRadius: '20px', padding: '20px', width: '100%', maxWidth: '380px' }}
          >
            <img src={selectedProduct.image} alt="" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '12px', marginBottom: '14px' }} />
            <h3 style={{ margin: '0 0 6px 0', color: '#fff', fontSize: '16px' }}>{selectedProduct.names[lang] || selectedProduct.names.RU}</h3>
            <p style={{ fontSize: '12px', color: '#9ca3af', lineHeight: '1.4', marginBottom: '16px' }}>{selectedProduct.descs[lang] || selectedProduct.descs.RU}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#fcd34d' }}>{Number(selectedProduct.price).toLocaleString()} ₩</span>
              <button 
                onClick={() => { handleAddToCart(selectedProduct); setSelectedProduct(null); }} 
                style={{ background: '#f59e0b', color: '#0b0e14', border: 'none', padding: '8px 16px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                + {t.selectedItems}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модалка Авторизации (Login / Sign Up) */}
      {showAuthModal && (
        <div 
          onClick={() => setShowAuthModal(false)} 
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            style={{ backgroundColor: '#141822', border: '1px solid rgba(245,158,11,0.4)', borderRadius: '20px', padding: '24px', width: '100%', maxWidth: '360px' }}
          >
            <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#fcd34d', textAlign: 'center' }}>{t.loginTitle}</h3>
            <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '11px', color: '#9ca3af', display: 'block', marginBottom: '4px' }}>{t.emailLabel}</label>
                <input 
                  type="email" 
                  placeholder="name@example.com (введите 'admin' для прав админа)" 
                  value={emailInput} 
                  onChange={(e) => setEmailInput(e.target.value)} 
                  style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '12px', boxSizing: 'border-box', outline: 'none' }}
                  required 
                />
              </div>
              <div>
                <label style={{ fontSize: '11px', color: '#9ca3af', display: 'block', marginBottom: '4px' }}>{t.passwordLabel}</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={passwordInput} 
                  onChange={(e) => setPasswordInput(e.target.value)} 
                  style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '12px', boxSizing: 'border-box', outline: 'none' }}
                  required 
                />
              </div>

              <button 
                type="submit" 
                style={{ background: '#f59e0b', color: '#0b0e14', border: 'none', padding: '10px', borderRadius: '10px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', marginTop: '6px' }}
              >
                {authMode === 'signin' ? t.signIn : t.signUp}
              </button>

              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <button 
                  type="button" 
                  onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
                  style={{ background: 'none', border: 'none', color: '#fcd34d', fontSize: '11px', cursor: 'pointer' }}
                >
                  {authMode === 'signin' ? `${t.noAccount} ${t.signUp}` : `${t.hasAccount} ${t.signIn}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Модалка Профиля аккаунта */}
      {showProfileModal && user && (
        <div 
          onClick={() => setShowProfileModal(false)} 
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            style={{ backgroundColor: '#141822', border: '1px solid rgba(245,158,11,0.4)', borderRadius: '20px', padding: '24px', width: '100%', maxWidth: '360px' }}
          >
            <h3 style={{ margin: '0 0 6px 0', fontSize: '16px', color: '#fcd34d' }}>{t.profileTitle}</h3>
            <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '20px' }}>{user.email} ({user.role.toUpperCase()})</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button 
                onClick={() => { setShowProfileModal(false); setActiveTab('orders'); }} 
                style={{ background: '#1e293b', color: '#fff', border: 'none', padding: '10px', borderRadius: '10px', textAlign: 'left', fontSize: '12px', cursor: 'pointer' }}
              >
                📦 {t.myOrders}
              </button>
              <button 
                onClick={handleLogout} 
                style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5', border: 'none', padding: '10px', borderRadius: '10px', textAlign: 'left', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                🚪 {t.logoutBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модалка добавления товара для Админа */}
      {showAddModal && (
        <div 
          onClick={() => setShowAddModal(false)} 
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            style={{ backgroundColor: '#141822', border: '1px solid rgba(245,158,11,0.4)', borderRadius: '20px', padding: '20px', width: '100%', maxWidth: '400px', maxHeight: '90vh', overflowY: 'auto' }}
          >
            <h3 style={{ margin: '0 0 14px 0', fontSize: '15px', color: '#fcd34d' }}>{t.addNewItemBtn}</h3>
            <form onSubmit={handleAddProductSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input type="text" placeholder={t.dishNameRu} value={newTitleRu} onChange={(e) => setNewTitleRu(e.target.value)} style={{ background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px', color: '#fff', fontSize: '12px', outline: 'none' }} required />
              <input type="text" placeholder={t.dishNameEn} value={newTitleEn} onChange={(e) => setNewTitleEn(e.target.value)} style={{ background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px', color: '#fff', fontSize: '12px', outline: 'none' }} />
              <input type="text" placeholder={t.dishNameKo} value={newTitleKo} onChange={(e) => setNewTitleKo(e.target.value)} style={{ background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px', color: '#fff', fontSize: '12px', outline: 'none' }} />

              <div style={{ display: 'flex', gap: '8px' }}>
                <input type="number" placeholder={t.pricePlaceholder} value={newPrice} onChange={(e) => setNewPrice(e.target.value)} style={{ flex: 1, background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px', color: '#fff', fontSize: '12px', outline: 'none' }} required />
                <input type="number" placeholder={t.oldPricePlaceholder} value={newOldPrice} onChange={(e) => setNewOldPrice(e.target.value)} style={{ flex: 1, background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px', color: '#fff', fontSize: '12px', outline: 'none' }} />
              </div>

              <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} style={{ background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px', color: '#fff', fontSize: '12px', outline: 'none' }}>
                {CATEGORIES.filter(c => c.id !== 'all').map((c) => (
                  <option key={c.id} value={c.id}>{c.names[lang] || c.names.RU}</option>
                ))}
              </select>

              <select value={newBadge} onChange={(e) => setNewBadge(e.target.value)} style={{ background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px', color: '#fff', fontSize: '12px', outline: 'none' }}>
                <option value="hit">{t.badges.hit}</option>
                <option value="new">{t.badges.new}</option>
                <option value="sale">{t.badges.sale}</option>
                <option value="premium">{t.badges.premium}</option>
              </select>

              <textarea placeholder={t.descRu} value={newDescRu} onChange={(e) => setNewDescRu(e.target.value)} style={{ background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px', color: '#fff', fontSize: '12px', minHeight: '50px', outline: 'none' }} />
              <input type="text" placeholder={t.imageUrl} value={newImage} onChange={(e) => setNewImage(e.target.value)} style={{ background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px', color: '#fff', fontSize: '12px', outline: 'none' }} />

              <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowAddModal(false)} style={{ flex: 1, background: '#334155', color: '#fff', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}>{t.cancel}</button>
                <button type="submit" style={{ flex: 1, background: '#f59e0b', color: '#0b0e14', border: 'none', padding: '8px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>{t.addButton}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Плавающая панель оформления заказа */}
      {cart.length > 0 && activeTab === 'home' && (
        <div style={{
          position: 'fixed', bottom: '75px', left: '16px', right: '16px',
          background: 'linear-gradient(135deg, #f59e0b, #d97706)', borderRadius: '14px', padding: '12px 18px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 8px 25px rgba(245,158,11,0.35)', zIndex: 80
        }}>
          <div>
            <div style={{ fontSize: '10px', color: '#000', fontWeight: 'bold', textTransform: 'uppercase' }}>{t.selectedItems}: {cart.length}</div>
            <div style={{ fontSize: '15px', color: '#000', fontWeight: 'bold' }}>{totalPrice.toLocaleString()} ₩</div>
          </div>
          <button 
            onClick={handleCheckout}
            style={{ background: '#0b0e14', color: '#fcd34d', border: 'none', padding: '8px 16px', borderRadius: '10px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}
          >
            {t.checkoutBtn}
          </button>
        </div>
      )}

      {/* ==========================================
          5. НИЖНЯЯ НАВИГАЦИОННАЯ ПАНЕЛЬ
          ========================================== */}
      <nav style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        backgroundColor: '#141822',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', justifyContent: 'space-around',
        padding: '10px 0 calc(10px + env(safe-area-inset-bottom))',
        zIndex: 85
      }}>
        <button onClick={() => setActiveTab('home')} style={{ background: 'none', border: 'none', color: activeTab === 'home' ? '#f59e0b' : '#9ca3af', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '10px', cursor: 'pointer', gap: '2px' }}>
          <span style={{ fontSize: '18px' }}>🏠</span> {t.homeTab}
        </button>
        <button onClick={() => setActiveTab('search')} style={{ background: 'none', border: 'none', color: activeTab === 'search' ? '#f59e0b' : '#9ca3af', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '10px', cursor: 'pointer', gap: '2px' }}>
          <span style={{ fontSize: '18px' }}>🔍</span> {t.searchTab}
        </button>
        <button onClick={() => setActiveTab('likes')} style={{ background: 'none', border: 'none', color: activeTab === 'likes' ? '#f59e0b' : '#9ca3af', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '10px', cursor: 'pointer', gap: '2px', position: 'relative' }}>
          <span style={{ fontSize: '18px' }}>❤️</span> {t.likesTab}
          {likes.length > 0 && <span style={{ position: 'absolute', top: '-2px', right: '10px', background: '#f59e0b', color: '#000', fontSize: '8px', fontWeight: 'bold', borderRadius: '50%', padding: '2px 4px' }}>{likes.length}</span>}
        </button>
        <button onClick={() => setActiveTab('orders')} style={{ background: 'none', border: 'none', color: activeTab === 'orders' ? '#f59e0b' : '#9ca3af', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '10px', cursor: 'pointer', gap: '2px' }}>
          <span style={{ fontSize: '18px' }}>📦</span> {t.ordersTab}
        </button>
      </nav>

    </div>
  );
}