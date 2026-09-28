import React, { useState, useMemo } from 'react';

// ==========================================
// 1. СЛОВАРЬ ЛОКАЛИЗАЦИИ И ДАННЫЕ
// ==========================================
const TRANSLATIONS = {
  RU: {
    bakeryName: 'Sweet Bakery',
    bakerySub: 'Boutique Patisserie',
    address: 'ул. Кондитерская, 12',
    phone: '+82 10-0000-0000',
    allCategories: 'Все',
    specialEvent: 'АКЦИЯ ДНЯ',
    promoText: 'Свежайшие круассаны на сливочном масле со скидкой 15%!',
    searchPlaceholder: 'Поиск десертов...',
    notFound: 'Ничего не найдено',
    editItem: 'Изм.',
    deleteItem: 'Удалить',
    adminMode: 'Админ',
    clientMode: 'Клиент',
    homeTab: 'Главная',
    searchTab: 'Поиск',
    likesTab: 'Избранное',
    ordersTab: 'Заказы',
    emptyLikes: 'В избранном пока ничего нет',
    emptyOrders: 'У вас пока нет заказов',
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
    imageUrl: 'URL картинки',
    categoryLabel: 'Категория',
    badgeLabel: 'Бейдж',
    badges: { hit: 'ХИТ', new: 'НОВИНКА', sale: 'СКИДКА', premium: 'ПРЕМИУМ' },
    menu: { home: 'Главная', catalog: 'Каталог', about: 'О нас', contacts: 'Контакты' },
    orderNum: 'Заказ #',
    editPricePrompt: 'Новая цена (₩):',
    productAdded: 'Товар успешно добавлен!',
    orderSuccess: 'Заказ успешно оформлен!'
  },
  EN: {
    bakeryName: 'Sweet Bakery',
    bakerySub: 'Boutique Patisserie',
    address: '12 Bakery Street',
    phone: '+82 10-0000-0000',
    allCategories: 'All',
    specialEvent: 'SPECIAL OFFER',
    promoText: 'Fresh butter croissants with 15% discount today!',
    searchPlaceholder: 'Search desserts...',
    notFound: 'No desserts found',
    editItem: 'Edit',
    deleteItem: 'Delete',
    adminMode: 'Admin',
    clientMode: 'Client',
    homeTab: 'Home',
    searchTab: 'Search',
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
    addButton: 'Add Product',
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
    productAdded: 'Product added successfully!',
    orderSuccess: 'Order placed successfully!'
  },
  KO: {
    bakeryName: 'Sweet Bakery',
    bakerySub: '부티크 파티스리',
    address: '베이커리길 12',
    phone: '+82 10-0000-0000',
    allCategories: '전체',
    specialEvent: '오늘의 이벤트',
    promoText: '신선한 버터 크루아상 15% 할인 행사 진행 중!',
    searchPlaceholder: '디저트 검색...',
    notFound: '검색 결과가 없습니다',
    editItem: '수정',
    deleteItem: '삭제',
    adminMode: '관리자',
    clientMode: '고객',
    homeTab: '홈',
    searchTab: '검색',
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
    addButton: '등록하기',
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
    badges: { hit: '히트', new: '신상품', sale: '할인', premium: '프리미엄' },
    menu: { home: '홈', catalog: '카탈로그', about: '소개', contacts: '문의처' },
    orderNum: '주문번호 #',
    editPricePrompt: '새 가격 (₩):',
    productAdded: '상품이 성공적으로 추가되었습니다!',
    orderSuccess: '주문이 성공적으로 완료되었습니다!'
  }
};

const CATEGORIES = [
  { id: 'all', names: { RU: 'Все', EN: 'All', KO: '전체' } },
  { id: 'croissants', names: { RU: 'Круассаны и выпечка', EN: 'Croissants & Bakery', KO: '크루아상 및 베이커리' } },
  { id: 'cakes', names: { RU: 'Торты', EN: 'Cakes', KO: '케이크' } },
  { id: 'pastries', names: { RU: 'Пирожные', EN: 'Pastries', KO: '페이스트리' } },
  { id: 'cookies', names: { RU: 'Печенье', EN: 'Cookies', KO: '쿠키' } },
  { id: 'drinks', names: { RU: 'Напитки', EN: 'Drinks', KO: '음료' } }
];

const INITIAL_PRODUCTS = [
  {
    id: 1,
    category: 'croissants',
    names: { RU: 'Миндальный круассан', EN: 'Almond Croissant', KO: '아몬드 크루아상' },
    descs: {
      RU: 'Французский круассан с миндальным кремом франжипан и миндальными лепестками.',
      EN: 'French croissant with frangipane almond cream and toasted almond flakes.',
      KO: '고소한 프란지팡 아몬드 크림과 플레이크가 가득한 프랑스식 크루아상.'
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
      RU: 'Нежный бисквит с ванильным кремом муслин и свежей клубникой.',
      EN: 'Sponge cake with mousseline vanilla cream and fresh strawberries.',
      KO: '부드러운 시트 사이에 바닐라 크림과 생딸기가 가득한 케이크.'
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
      RU: 'Заварное пирожное с заварным кремом из 100% фисташковой пасты.',
      EN: 'Choux pastry filled with rich 100% natural pistachio custard.',
      KO: '100% 천연 피스타치오 커스터드 크림이 가득 찬 슈 슈크림.'
    },
    price: 6000,
    oldPrice: null,
    badge: 'premium',
    image: 'https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=500&auto=format&fit=crop'
  }
];

// ==========================================
// 2. ОСНОВНОЙ КОМПОНЕНТ
// ==========================================
export default function App() {
  // Состояния интерфейса
  const [lang, setLang] = useState('RU');
  const t = TRANSLATIONS[lang] || TRANSLATIONS.RU;

  const [activeTab, setActiveTab] = useState('home');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdmin, setIsAdmin] = useState(true); // Переключатель режимов Админ/Клиент

  // Состояния данных
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [likes, setLikes] = useState([]);
  const [ordersHistory, setOrdersHistory] = useState([]);

  // Настройки Telegram
  const [tgBotToken, setTgBotToken] = useState('');
  const [tgChatId, setTgChatId] = useState('');

  // Модальные окна
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Поля формы нового товара
  const [newTitleRu, setNewTitleRu] = useState('');
  const [newTitleEn, setNewTitleEn] = useState('');
  const [newTitleKo, setNewTitleKo] = useState('');
  const [newDescRu, setNewDescRu] = useState('');
  const [newDescEn, setNewDescEn] = useState('');
  const [newDescKo, setNewDescKo] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newOldPrice, setNewOldPrice] = useState('');
  const [newCategory, setNewCategory] = useState('croissants');
  const [newBadge, setNewBadge] = useState('hit');
  const [newImage, setNewImage] = useState('');

  // === ВЫЧИСЛЯЕМЫЕ ЗНАЧЕНИЯ ===
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchCategory = activeCategory === 'all' || item.category === activeCategory;
      
      const name = (item.names[lang] || item.names.RU || '').toLowerCase();
      const desc = (item.descs[lang] || item.descs.RU || '').toLowerCase();
      const query = searchQuery.toLowerCase();

      const matchSearch = name.includes(query) || desc.includes(query);
      return matchCategory && matchSearch;
    });
  }, [products, activeCategory, searchQuery, lang]);

  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => sum + Number(item.price), 0);
  }, [cart]);

  // === ОБРАБОТЧИКИ ===
  const toggleLike = (id) => {
    setLikes((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
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
    if (window.confirm('Удалить этот товар?')) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    const newProd = {
      id: Date.now(),
      category: newCategory,
      names: {
        RU: newTitleRu || 'Без названия',
        EN: newTitleEn || newTitleRu || 'No title',
        KO: newTitleKo || newTitleRu || '제목 없음'
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

    // Сброс полей
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

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0b0e14',
      color: '#f3f4f6',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      paddingBottom: '90px',
      boxSizing: 'border-box'
    }}>

      {/* ==========================================
          1. СТИЛЬНАЯ ЛЮКС-ШАПКА (HEADER)
          ========================================== */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 90,
        backgroundColor: 'rgba(11, 14, 20, 0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(245, 158, 11, 0.2)',
        padding: '12px 16px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between'
        }}>
          {/* Левый блок: Меню + Брендинг */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              onClick={() => setIsMenuOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                color: '#f59e0b',
                fontSize: '22px',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              ☰
            </button>

            <div 
              onClick={() => { setActiveTab('home'); setActiveCategory('all'); }}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
            >
              <div style={{
                width: '36px', height: '36px',
                background: 'linear-gradient(135deg, #d97706, #78350f)',
                borderRadius: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '18px',
                border: '1px solid rgba(252, 211, 77, 0.4)'
              }}>
                🥐
              </div>
              <div>
                <h1 style={{ margin: 0, fontSize: '17px', fontWeight: 'bold', color: '#fcd34d', letterSpacing: '0.5px' }}>
                  {t.bakeryName}
                </h1>
                <div style={{ fontSize: '9px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {t.bakerySub}
                </div>
              </div>
            </div>
          </div>

          {/* Правый блок: Языки + Режим Админа */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value)}
              style={{
                background: '#141822',
                color: '#fcd34d',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: '8px',
                padding: '5px 6px',
                fontSize: '11px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              <option value="RU">RU</option>
              <option value="EN">EN</option>
              <option value="KO">KO</option>
            </select>

            <button 
              onClick={() => setIsAdmin(!isAdmin)}
              style={{
                background: isAdmin ? 'rgba(245, 158, 11, 0.2)' : '#141822',
                color: isAdmin ? '#fcd34d' : '#9ca3af',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: '8px',
                padding: '5px 8px',
                fontSize: '10px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              {isAdmin ? `⚙️ ${t.adminMode}` : `👤 ${t.clientMode}`}
            </button>
          </div>
        </div>
      </header>

      {/* ==========================================
          2. ВЫДВИЖНОЕ БОКОВОЕ МЕНЮ (DRAWER)
          ========================================== */}
      {isMenuOpen && (
        <div 
          onClick={() => setIsMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(4px)',
            zIndex: 1000,
            display: 'flex'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '80%',
              maxWidth: '300px',
              height: '100%',
              backgroundColor: '#141822',
              borderRight: '1px solid rgba(245, 158, 11, 0.3)',
              padding: '24px 18px',
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ color: '#fcd34d', fontWeight: 'bold', fontSize: '16px' }}>{t.bakeryName}</div>
              <button 
                onClick={() => setIsMenuOpen(false)}
                style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: '20px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <button 
                onClick={() => { setActiveTab('home'); setIsMenuOpen(false); }}
                style={{ background: 'none', border: 'none', color: '#fff', textAlign: 'left', fontSize: '14px', cursor: 'pointer' }}
              >
                🏠 {t.menu.home}
              </button>
              <button 
                onClick={() => { setActiveTab('search'); setIsMenuOpen(false); }}
                style={{ background: 'none', border: 'none', color: '#fff', textAlign: 'left', fontSize: '14px', cursor: 'pointer' }}
              >
                🔍 {t.menu.catalog}
              </button>
              <button 
                onClick={() => { setActiveTab('likes'); setIsMenuOpen(false); }}
                style={{ background: 'none', border: 'none', color: '#fff', textAlign: 'left', fontSize: '14px', cursor: 'pointer' }}
              >
                ❤️ {t.likesTab}
              </button>
              <button 
                onClick={() => { setActiveTab('orders'); setIsMenuOpen(false); }}
                style={{ background: 'none', border: 'none', color: '#fff', textAlign: 'left', fontSize: '14px', cursor: 'pointer' }}
              >
                📦 {t.ordersTab}
              </button>
            </nav>

            <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px', fontSize: '11px', color: '#9ca3af' }}>
              <div>📍 {t.address}</div>
              <div style={{ marginTop: '4px' }}>📞 {t.phone}</div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          3. ОСНОВНОЙ КОНТЕНТ (PAGES & TABS)
          ========================================== */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px' }}>

        {/* АДМИН-ПАНЕЛЬ (Панель управления) */}
        {isAdmin && (
          <div style={{
            background: '#141822',
            border: '1px dashed #f59e0b',
            borderRadius: '16px',
            padding: '16px',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '14px', color: '#fcd34d' }}>⚙️ {t.menu.catalog} - Admin Panel</h3>
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
                  style={{ flex: 1, minWidth: '130px', background: '#0b0e14', border: '1px solid #334155', borderRadius: '6px', padding: '6px', color: '#fff', fontSize: '11px' }}
                />
                <input 
                  type="text" 
                  placeholder={t.tgChatIdLabel} 
                  value={tgChatId} 
                  onChange={(e) => setTgChatId(e.target.value)}
                  style={{ flex: 1, minWidth: '130px', background: '#0b0e14', border: '1px solid #334155', borderRadius: '6px', padding: '6px', color: '#fff', fontSize: '11px' }}
                />
              </div>
            </div>
          </div>
        )}

        {/* ВКЛАДКА: ГЛАВНАЯ И ПОИСК */}
        {(activeTab === 'home' || activeTab === 'search') && (
          <>
            {/* Акционный Баннер */}
            {activeTab === 'home' && (
              <div style={{
                width: '100%',
                height: '130px',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                marginBottom: '16px',
                border: '1px solid rgba(245, 158, 11, 0.2)'
              }}>
                <img 
                  src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1000&auto=format&fit=crop" 
                  alt="Promo" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.5)' }} 
                />
                <div style={{ position: 'absolute', bottom: '12px', left: '14px', right: '14px' }}>
                  <span style={{ background: '#f59e0b', color: '#0b0e14', fontSize: '9px', fontWeight: 'bold', padding: '2px 6px', borderRadius: '4px' }}>
                    {t.specialEvent}
                  </span>
                  <p style={{ margin: '4px 0 0 0', fontSize: '12px', fontWeight: '600', color: '#fff' }}>
                    {t.promoText}
                  </p>
                </div>
              </div>
            )}

            {/* Поисковая строка */}
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
                  padding: '10px 14px 10px 36px',
                  color: '#fff',
                  fontSize: '13px',
                  boxSizing: 'border-box'
                }} 
              />
              <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '13px' }}>🔍</span>
            </div>

            {/* Фильтр Категорий */}
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '16px', scrollbarWidth: 'none' }}>
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
                      padding: '7px 14px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      whiteSpace: 'nowrap',
                      cursor: 'pointer'
                    }}
                  >
                    {catName}
                  </button>
                );
              })}
            </div>

            {/* Сетка Товаров */}
            {filteredProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#9ca3af', fontSize: '13px' }}>
                {t.notFound}
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))', gap: '12px' }}>
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
                        position: 'relative'
                      }}
                    >
                      {/* Картинка */}
                      <div 
                        style={{ width: '100%', aspectRatio: '1 / 1', position: 'relative', overflow: 'hidden', cursor: 'pointer', backgroundColor: '#1e293b' }} 
                        onClick={() => setSelectedProduct(item)}
                      >
                        <img src={item.image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        
                        {item.badge && (
                          <span style={{ position: 'absolute', top: '8px', left: '8px', background: 'rgba(11,14,20,0.85)', color: '#fcd34d', padding: '2px 6px', borderRadius: '6px', fontSize: '9px', fontWeight: 'bold' }}>
                            {badgeText}
                          </span>
                        )}

                        <button 
                          onClick={(e) => { e.stopPropagation(); toggleLike(item.id); }} 
                          style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(11,14,20,0.85)', border: 'none', width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          {isLiked ? '❤️' : '🤍'}
                        </button>
                      </div>

                      {/* Текстовый блок */}
                      <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                        <div onClick={() => setSelectedProduct(item)} style={{ cursor: 'pointer' }}>
                          <h4 style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: 'bold', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {title}
                          </h4>
                          <p style={{ margin: 0, fontSize: '11px', color: '#9ca3af', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.3' }}>
                            {desc}
                          </p>
                        </div>

                        <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#fcd34d' }}>{Number(item.price).toLocaleString()} ₩</div>
                            {item.oldPrice && (
                              <div style={{ fontSize: '10px', color: '#6b7280', textDecoration: 'line-through' }}>{Number(item.oldPrice).toLocaleString()} ₩</div>
                            )}
                          </div>
                          <button 
                            onClick={() => handleAddToCart(item)} 
                            style={{ background: '#f59e0b', color: '#0b0e14', border: 'none', width: '30px', height: '30px', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}
                          >
                            +
                          </button>
                        </div>

                        {/* Панель редактирования для Админа */}
                        {isAdmin && (
                          <div style={{ display: 'flex', gap: '4px', marginTop: '8px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '6px' }}>
                            <button 
                              onClick={() => handleEditPrice(item)} 
                              style={{ flex: 1, background: '#334155', color: '#fff', border: 'none', padding: '4px', borderRadius: '6px', fontSize: '10px', cursor: 'pointer' }}
                            >
                              {t.editItem}
                            </button>
                            <button 
                              onClick={() => handleDeleteProduct(item.id)} 
                              style={{ background: 'rgba(239,68,68,0.2)', color: '#fca5a5', border: 'none', padding: '4px', borderRadius: '6px', fontSize: '10px', cursor: 'pointer' }}
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
            <h2 style={{ fontSize: '18px', color: '#fcd34d', marginBottom: '14px' }}>{t.likesTab}</h2>
            {likes.length === 0 ? (
              <p style={{ color: '#9ca3af', fontSize: '13px', textAlign: 'center', marginTop: '40px' }}>{t.emptyLikes}</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '12px' }}>
                {products.filter((p) => likes.includes(p.id)).map((item) => (
                  <div key={item.id} style={{ background: '#141822', borderRadius: '12px', padding: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <img src={item.image} alt="" style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }} />
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
            <h2 style={{ fontSize: '18px', color: '#fcd34d', marginBottom: '14px' }}>{t.orderHistoryTitle}</h2>
            {ordersHistory.length === 0 ? (
              <p style={{ color: '#9ca3af', fontSize: '13px', textAlign: 'center', marginTop: '40px' }}>{t.emptyOrders}</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {ordersHistory.map((order, idx) => (
                  <div key={order.id} style={{ background: '#141822', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '14px', padding: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#9ca3af', marginBottom: '8px' }}>
                      <span>{t.orderNum}{idx + 101}</span>
                      <span style={{ color: '#34d399' }}>{t.statusCompleted}</span>
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

      {/* Модалка Детального просмотра товара */}
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
                style={{ background: '#f59e0b', color: '#0b0e14', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                + {t.selectedItems}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модалка Добавления Товара (Админ) */}
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
              <input type="text" placeholder={t.dishNameRu} value={newTitleRu} onChange={(e) => setNewTitleRu(e.target.value)} style={{ background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px', color: '#fff', fontSize: '12px' }} required />
              <input type="text" placeholder={t.dishNameEn} value={newTitleEn} onChange={(e) => setNewTitleEn(e.target.value)} style={{ background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px', color: '#fff', fontSize: '12px' }} />
              <input type="text" placeholder={t.dishNameKo} value={newTitleKo} onChange={(e) => setNewTitleKo(e.target.value)} style={{ background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px', color: '#fff', fontSize: '12px' }} />

              <div style={{ display: 'flex', gap: '8px' }}>
                <input type="number" placeholder={t.pricePlaceholder} value={newPrice} onChange={(e) => setNewPrice(e.target.value)} style={{ flex: 1, background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px', color: '#fff', fontSize: '12px' }} required />
                <input type="number" placeholder={t.oldPricePlaceholder} value={newOldPrice} onChange={(e) => setNewOldPrice(e.target.value)} style={{ flex: 1, background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px', color: '#fff', fontSize: '12px' }} />
              </div>

              <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} style={{ background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px', color: '#fff', fontSize: '12px' }}>
                {CATEGORIES.filter(c => c.id !== 'all').map((c) => (
                  <option key={c.id} value={c.id}>{c.names[lang] || c.names.RU}</option>
                ))}
              </select>

              <select value={newBadge} onChange={(e) => setNewBadge(e.target.value)} style={{ background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px', color: '#fff', fontSize: '12px' }}>
                <option value="hit">{t.badges.hit}</option>
                <option value="new">{t.badges.new}</option>
                <option value="sale">{t.badges.sale}</option>
                <option value="premium">{t.badges.premium}</option>
              </select>

              <textarea placeholder={t.descRu} value={newDescRu} onChange={(e) => setNewDescRu(e.target.value)} style={{ background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px', color: '#fff', fontSize: '12px', minHeight: '40px' }} />
              <input type="text" placeholder={t.imageUrl} value={newImage} onChange={(e) => setNewImage(e.target.value)} style={{ background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px', color: '#fff', fontSize: '12px' }} />

              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
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
          position: 'fixed', bottom: '70px', left: '16px', right: '16px',
          background: 'linear-gradient(135deg, #f59e0b, #d97706)', borderRadius: '14px', padding: '10px 16px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 8px 20px rgba(245,158,11,0.3)', zIndex: 80
        }}>
          <div>
            <div style={{ fontSize: '10px', color: '#000', fontWeight: 'bold' }}>{t.selectedItems}: {cart.length}</div>
            <div style={{ fontSize: '14px', color: '#000', fontWeight: 'bold' }}>{totalPrice.toLocaleString()} ₩</div>
          </div>
          <button 
            onClick={handleCheckout}
            style={{ background: '#0b0e14', color: '#fcd34d', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}
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
        <button onClick={() => setActiveTab('home')} style={{ background: 'none', border: 'none', color: activeTab === 'home' ? '#f59e0b' : '#9ca3af', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '10px', cursor: 'pointer' }}>
          <span style={{ fontSize: '16px' }}>🏠</span> {t.homeTab}
        </button>
        <button onClick={() => setActiveTab('search')} style={{ background: 'none', border: 'none', color: activeTab === 'search' ? '#f59e0b' : '#9ca3af', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '10px', cursor: 'pointer' }}>
          <span style={{ fontSize: '16px' }}>🔍</span> {t.searchTab}
        </button>
        <button onClick={() => setActiveTab('likes')} style={{ background: 'none', border: 'none', color: activeTab === 'likes' ? '#f59e0b' : '#9ca3af', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '10px', cursor: 'pointer', position: 'relative' }}>
          <span style={{ fontSize: '16px' }}>❤️</span> {t.likesTab}
          {likes.length > 0 && <span style={{ position: 'absolute', top: '-2px', right: '12px', background: '#f59e0b', color: '#000', fontSize: '8px', fontWeight: 'bold', borderRadius: '50%', padding: '2px 4px' }}>{likes.length}</span>}
        </button>
        <button onClick={() => setActiveTab('orders')} style={{ background: 'none', border: 'none', color: activeTab === 'orders' ? '#f59e0b' : '#9ca3af', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '10px', cursor: 'pointer' }}>
          <span style={{ fontSize: '16px' }}>📦</span> {t.ordersTab}
        </button>
      </nav>

    </div>
  );
}