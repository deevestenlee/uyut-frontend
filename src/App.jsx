import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

// ==========================================
// ИНИЦИАЛИЗАЦИЯ SUPABASE (Сохранена оригинальная)
// ==========================================
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ==========================================
// ПОЛНЫЙ СЛОВАРЬ ЛОКАЛИЗАЦИИ (RU / EN / KO)
// ==========================================
const TRANSLATIONS = {
  RU: {
    bakeryName: 'Sweet Bakery',
    bakerySub: 'Boutique Patisserie',
    address: 'ул. Кондитерская, 12, Сеул',
    phone: '+82 10-0000-0000',
    allCategories: 'Все',
    newArrivals: 'Новинки',
    bestsellers: 'Хиты продаж',
    saleItems: 'Sale / Скидки',
    viewAll: 'Смотреть всё',
    searchPlaceholder: 'Поиск десертов...',
    notFound: 'Товары не найдены',
    cartTitle: 'Корзина',
    emptyCart: 'Ваша корзина пуста',
    checkoutBtn: 'Оформить заказ',
    total: 'Итого:',
    subtotal: 'Сумма товаров:',
    deliveryCost: 'Доставка:',
    freeDelivery: 'Бесплатно',
    pickup: 'Самовывоз',
    delivery: 'Доставка',
    firstName: 'Имя и фамилия',
    phoneLabel: 'Номер телефона',
    deliveryAddress: 'Адрес доставки (Город, район, улица, дом, квартира)',
    deliveryTime: 'Дата и время получения',
    commentLabel: 'Комментарий к заказу',
    confirmOrder: 'Подтвердить заказ',
    orderSuccess: 'Заказ успешно оформлен!',
    loginBtn: 'Вход',
    logoutBtn: 'Выйти',
    loginTitle: 'Вход для работников заведения',
    emailLabel: 'Электронная почта',
    passwordLabel: 'Пароль',
    signIn: 'Войти',
    authNotice: 'Тестовые данные для входа необходимо настроить',
    homeTab: 'Главная',
    menuTab: 'Меню',
    likesTab: 'Избранное',
    ordersTab: 'Заказы',
    backToCategories: '← Назад к категориям',
    clearFilter: 'Сбросить фильтр',
    badges: { hit: 'ХИТ', new: 'НОВИНКА', sale: 'SALE', premium: 'ПРЕМИУМ' },
    statusCompleted: 'Выполнен',
    orderHistoryTitle: 'История заказов',
    emptyLikes: 'В избранном пока ничего нет',
    emptyOrders: 'История заказов пуста',
    close: 'Закрыть',
    quantity: 'Количество'
  },
  EN: {
    bakeryName: 'Sweet Bakery',
    bakerySub: 'Boutique Patisserie',
    address: '12 Bakery Street, Seoul',
    phone: '+82 10-0000-0000',
    allCategories: 'All',
    newArrivals: 'New Arrivals',
    bestsellers: 'Bestsellers',
    saleItems: 'Sale / Discounts',
    viewAll: 'View All',
    searchPlaceholder: 'Search desserts...',
    notFound: 'No products found',
    cartTitle: 'Cart',
    emptyCart: 'Your cart is empty',
    checkoutBtn: 'Checkout',
    total: 'Total:',
    subtotal: 'Subtotal:',
    deliveryCost: 'Delivery:',
    freeDelivery: 'Free',
    pickup: 'Pickup',
    delivery: 'Delivery',
    firstName: 'Full Name',
    phoneLabel: 'Phone Number',
    deliveryAddress: 'Delivery Address (City, district, street, apt)',
    deliveryTime: 'Date and Time',
    commentLabel: 'Order Comment',
    confirmOrder: 'Confirm Order',
    orderSuccess: 'Order placed successfully!',
    loginBtn: 'Login',
    logoutBtn: 'Sign Out',
    loginTitle: 'Staff Login',
    emailLabel: 'Email Address',
    passwordLabel: 'Password',
    signIn: 'Sign In',
    authNotice: 'Test credentials must be configured',
    homeTab: 'Home',
    menuTab: 'Menu',
    likesTab: 'Favorites',
    ordersTab: 'Orders',
    backToCategories: '← Back to categories',
    clearFilter: 'Reset filter',
    badges: { hit: 'HIT', new: 'NEW', sale: 'SALE', premium: 'PREMIUM' },
    statusCompleted: 'Completed',
    orderHistoryTitle: 'Order History',
    emptyLikes: 'Your favorites list is empty',
    emptyOrders: 'No order history yet',
    close: 'Close',
    quantity: 'Quantity'
  },
  KO: {
    bakeryName: 'Sweet Bakery',
    bakerySub: '부티크 파티스리',
    address: '서울시 베이커리길 12',
    phone: '+82 10-0000-0000',
    allCategories: '전체',
    newArrivals: '신상품',
    bestsellers: '인기상품',
    saleItems: '할인 / 특가',
    viewAll: '전체보기',
    searchPlaceholder: '디저트 검색...',
    notFound: '상품이 없습니다',
    cartTitle: '장바구니',
    emptyCart: '장바구니가 비어 있습니다',
    checkoutBtn: '주문하기',
    total: '합계:',
    subtotal: '상품 금액:',
    deliveryCost: '배송비:',
    freeDelivery: '무료',
    pickup: '매장 픽업',
    delivery: '배달',
    firstName: '성함',
    phoneLabel: '전화번호',
    deliveryAddress: '배송 주소 (시, 구, 도로명, 상세주소)',
    deliveryTime: '수령 일시',
    commentLabel: '주문 요청사항',
    confirmOrder: '주문 확정',
    orderSuccess: '주문이 성공적으로 완료되었습니다!',
    loginBtn: '로그인',
    logoutBtn: '로그아웃',
    loginTitle: '직원 전용 로그인',
    emailLabel: '이메일 주소',
    passwordLabel: '비밀번호',
    signIn: '로그인',
    authNotice: '테스트 계정 정보를 설정해야 합니다.',
    homeTab: '홈',
    menuTab: '메뉴',
    likesTab: '찜목록',
    ordersTab: '주문내역',
    backToCategories: '← 카테고리로 돌아가기',
    clearFilter: '필터 초기화',
    badges: { hit: 'HIT', new: 'NEW', sale: 'SALE', premium: 'PREMIUM' },
    statusCompleted: '완료됨',
    orderHistoryTitle: '주문 내역',
    emptyLikes: '찜한 상품이 없습니다.',
    emptyOrders: '주문 내역이 없습니다.',
    close: '닫기',
    quantity: '수량'
  }
};

export default function App() {
  // Локализация с сохранением в localStorage
  const [lang, setLang] = useState(() => localStorage.getItem('sweet_bakery_lang') || 'RU');
  useEffect(() => {
    localStorage.setItem('sweet_bakery_lang', lang);
  }, [lang]);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.RU;

  // Навигация и состояния страниц
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'menu' | 'likes' | 'orders'
  const [selectedCategory, setSelectedCategory] = useState(null); // ID выбранной категории
  const [selectedSubCategory, setSelectedSubCategory] = useState(null); // ID подкатегории
  const [searchQuery, setSearchQuery] = useState('');
  
  // Данные из Supabase
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Корзина и Избранное
  const [cart, setCart] = useState([]);
  const [likes, setLikes] = useState([]);
  const [ordersHistory, setOrdersHistory] = useState([]);

  // Модальные окна
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // Для детального просмотра товара
  const [activeImageIndex, setActiveImageIndex] = useState(0); // Карусель фото в карточке
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  // Авторизация
  const [user, setUser] = useState(null);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  // Форма оформления заказа
  const [orderType, setOrderType] = useState('pickup'); // 'pickup' | 'delivery'
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    phone: '',
    address: '',
    datetime: '',
    comment: ''
  });

  // Управление видимостью нижней панели при скролле
  const [showBottomNav, setShowBottomNav] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 60) {
        setShowBottomNav(false);
      } else {
        setShowBottomNav(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Загрузка данных из Supabase
  useEffect(() => {
    fetchData();
    checkUser();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Загружаем товары и категории из существующих таблиц Supabase
      const [prodRes, catRes] = await Promise.all([
        supabase.from('products').select('*'),
        supabase.from('categories').select('*')
      ]);

      if (prodRes.data) setProducts(prodRes.data);
      if (catRes.data) setCategories(catRes.data);
    } catch (err) {
      console.error('Error fetching data from Supabase:', err);
    } finally {
      setLoading(false);
    }
  };

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      setUser(session.user);
    }
  };

  // Обработчики авторизации
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailInput,
        password: passwordInput,
      });
      if (error) throw error;
      if (data?.user) {
        setUser(data.user);
        setShowAuthModal(false);
        setEmailInput('');
        setPasswordInput('');
      }
    } catch (err) {
      alert(err.message || 'Ошибка входа');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // Управление корзиной
  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
  };

  const updateQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  }, [cart]);

  const totalCartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  // Избранное
  const toggleLike = (productId) => {
    setLikes((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Оформление заказа через Supabase
  const handleConfirmOrder = async (e) => {
    e.preventDefault();
    if (!checkoutForm.name || !checkoutForm.phone) {
      alert('Пожалуйста, заполните обязательные поля');
      return;
    }

    try {
      const orderData = {
        user_id: user?.id || null,
        items: cart,
        total: totalPrice,
        order_type: orderType,
        customer_name: checkoutForm.name,
        phone: checkoutForm.phone,
        address: orderType === 'delivery' ? checkoutForm.address : 'Самовывоз',
        datetime: checkoutForm.datetime,
        comment: checkoutForm.comment,
        status: 'completed',
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabase.from('orders').insert([orderData]);
      if (error) throw error;

      setOrdersHistory((prev) => [{ id: Date.now(), ...orderData }, ...prev]);
      setCart([]);
      setShowCheckout(false);
      setShowCartDrawer(false);
      alert(t.orderSuccess);
      setActiveTab('orders');
    } catch (err) {
      console.error('Order error:', err);
      alert('Ошибка при оформлении заказа. Проверьте подключение к базе данных.');
    }
  };

  // Фильтрация товаров для главной и каталога
  const newProducts = useMemo(() => products.filter((p) => p.badge === 'new' || p.is_new), [products]);
  const hitProducts = useMemo(() => products.filter((p) => p.badge === 'hit' || p.is_hit), [products]);
  const saleProducts = useMemo(() => products.filter((p) => p.old_price || p.badge === 'sale'), [products]);

  const filteredCatalogProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesCategory = selectedCategory ? item.category_id === selectedCategory || item.category === selectedCategory : true;
      const matchesSubCategory = selectedSubCategory ? item.subcategory_id === selectedSubCategory || item.subcategory === selectedSubCategory : true;
      const name = (item.names?.[lang] || item.name || '').toLowerCase();
      const query = searchQuery.toLowerCase();
      return matchesCategory && matchesSubCategory && name.includes(query);
    });
  }, [products, selectedCategory, selectedSubCategory, searchQuery, lang]);

  // Вспомогательная функция для получения изображений товара (поддержка массива или строки)
  const getProductImages = (item) => {
    if (Array.isArray(item.images) && item.images.length > 0) return item.images;
    if (item.image) return [item.image];
    return ['https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600'];
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0b0e14',
      color: '#f3f4f6',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      paddingBottom: '110px',
      boxSizing: 'border-box'
    }}>

      {/* ==========================================
          1. ШАПКА САЙТА (COMPACT HEADER)
          ========================================== */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 90,
        backgroundColor: 'rgba(11, 14, 20, 0.92)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(245, 158, 11, 0.2)',
        padding: '10px 16px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px'
        }}>
          {/* Левый блок: Бургер-меню + Логотип */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button 
              onClick={() => setIsMenuOpen(true)}
              style={{
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                color: '#fcd34d',
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                fontSize: '16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="Menu"
            >
              ☰
            </button>

            <div 
              onClick={() => { setActiveTab('home'); setSelectedCategory(null); }}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
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
                <h1 style={{ margin: 0, fontSize: '15px', fontWeight: 'bold', color: '#fcd34d', lineHeight: '1.1' }}>
                  {t.bakeryName}
                </h1>
                <div style={{ fontSize: '8px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {t.bakerySub}
                </div>
              </div>
            </div>
          </div>

          {/* Правый блок: Переключатель языков + Корзина + Вход */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Языковой селектор */}
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                style={{
                  background: '#141822',
                  color: '#fcd34d',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  borderRadius: '8px',
                  padding: '6px 10px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                {lang} ▾
              </button>

              {isLangMenuOpen && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: '105%',
                  background: '#141822',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
                  zIndex: 100
                }}>
                  {['RU', 'EN', 'KO'].map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLang(l); setIsLangMenuOpen(false); }}
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '8px 16px',
                        background: lang === l ? 'rgba(245, 158, 11, 0.2)' : 'transparent',
                        color: lang === l ? '#fcd34d' : '#fff',
                        border: 'none',
                        textAlign: 'left',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Иконка корзины */}
            <button 
              onClick={() => setShowCartDrawer(true)}
              style={{
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                color: '#0b0e14',
                border: 'none',
                borderRadius: '8px',
                padding: '6px 10px',
                fontSize: '12px',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              🛒 {totalCartCount > 0 && <span>{totalCartCount}</span>}
            </button>

            {/* Вход для работников */}
            {user ? (
              <button 
                onClick={handleLogout}
                style={{
                  background: 'rgba(239, 68, 68, 0.2)',
                  color: '#fca5a5',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  borderRadius: '8px',
                  padding: '6px 10px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                {t.logoutBtn}
              </button>
            ) : (
              <button 
                onClick={() => setShowAuthModal(true)}
                style={{
                  background: '#141822',
                  color: '#fcd34d',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  borderRadius: '8px',
                  padding: '6px 10px',
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
          2. ВЫДВИЖНОЕ МЕНЮ (SIDE DRAWER)
          ========================================== */}
      {isMenuOpen && (
        <div 
          onClick={() => setIsMenuOpen(false)}
          style={{
            position: 'fixed', inset: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(4px)',
            zIndex: 1000,
            display: 'flex', justifyContent: 'flex-start'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '80%', maxWidth: '280px', height: '100%',
              backgroundColor: '#141822',
              borderRight: '1px solid rgba(245, 158, 11, 0.3)',
              padding: '20px',
              display: 'flex', flexDirection: 'column', boxSizing: 'border-box'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <span style={{ color: '#fcd34d', fontWeight: 'bold', fontSize: '15px' }}>{t.bakeryName}</span>
              <button onClick={() => setIsMenuOpen(false)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: '20px', cursor: 'pointer' }}>✕</button>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <button onClick={() => { setActiveTab('home'); setIsMenuOpen(false); }} style={{ background: 'none', border: 'none', color: '#fff', textAlign: 'left', fontSize: '14px', cursor: 'pointer' }}>🏠 {t.homeTab}</button>
              <button onClick={() => { setActiveTab('menu'); setIsMenuOpen(false); }} style={{ background: 'none', border: 'none', color: '#fff', textAlign: 'left', fontSize: '14px', cursor: 'pointer' }}>🍰 {t.menuTab}</button>
              <button onClick={() => { setActiveTab('likes'); setIsMenuOpen(false); }} style={{ background: 'none', border: 'none', color: '#fff', textAlign: 'left', fontSize: '14px', cursor: 'pointer' }}>❤️ {t.likesTab}</button>
              <button onClick={() => { setActiveTab('orders'); setIsMenuOpen(false); }} style={{ background: 'none', border: 'none', color: '#fff', textAlign: 'left', fontSize: '14px', cursor: 'pointer' }}>📦 {t.ordersTab}</button>
            </nav>

            <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px', fontSize: '11px', color: '#9ca3af' }}>
              <div>📍 {t.address}</div>
              <div style={{ marginTop: '6px' }}>📞 {t.phone}</div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          3. ОСНОВНОЙ КОНТЕНТ (STRINGS & VIEWS)
          ========================================== */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px' }}>

        {/* ВКЛАДКА: ГЛАВНАЯ (Home) */}
        {activeTab === 'home' && (
          <div>
            {/* Рендеринг трех блоков: Новинки, Хиты, Sale */}
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>Загрузка...</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                
                {/* 1. Новинки */}
                {newProducts.length > 0 && (
                  <section>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#fcd34d' }}>✨ {t.newArrivals}</h2>
                      <button onClick={() => setActiveTab('menu')} style={{ background: 'none', border: 'none', color: '#f59e0b', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}>{t.viewAll} →</button>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px', scrollbarWidth: 'none' }}>
                      {newProducts.map((item) => renderProductCard(item))}
                    </div>
                  </section>
                )}

                {/* 2. Хиты продаж */}
                {hitProducts.length > 0 && (
                  <section>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#fcd34d' }}>🔥 {t.bestsellers}</h2>
                      <button onClick={() => setActiveTab('menu')} style={{ background: 'none', border: 'none', color: '#f59e0b', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}>{t.viewAll} →</button>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px', scrollbarWidth: 'none' }}>
                      {hitProducts.map((item) => renderProductCard(item))}
                    </div>
                  </section>
                )}

                {/* 3. Sale / Скидки */}
                {saleProducts.length > 0 && (
                  <section>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#fcd34d' }}>🏷️ {t.saleItems}</h2>
                      <button onClick={() => setActiveTab('menu')} style={{ background: 'none', border: 'none', color: '#f59e0b', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}>{t.viewAll} →</button>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px', scrollbarWidth: 'none' }}>
                      {saleProducts.map((item) => renderProductCard(item))}
                    </div>
                  </section>
                )}

              </div>
            )}
          </div>
        )}

        {/* ВКЛАДКА: МЕНЮ И КАТЕГОРИИ (Menu) */}
        {activeTab === 'menu' && (
          <div>
            <div style={{ position: 'relative', marginBottom: '16px' }}>
              <input 
                type="text" 
                placeholder={t.searchPlaceholder} 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%', background: '#141822', border: '1px solid #334155',
                  borderRadius: '12px', padding: '10px 14px 10px 38px', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box'
                }}
              />
              <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '13px' }}>🔍</span>
            </div>

            {/* Выбор категорий */}
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '16px', scrollbarWidth: 'none' }}>
              <button 
                onClick={() => { setSelectedCategory(null); setSelectedSubCategory(null); }}
                style={{
                  background: selectedCategory === null ? '#f59e0b' : '#141822',
                  color: selectedCategory === null ? '#0b0e14' : '#9ca3af',
                  border: '1px solid #334155', borderRadius: '10px', padding: '8px 12px', fontSize: '12px', fontWeight: 'bold', whiteSpace: 'nowrap', cursor: 'pointer'
                }}
              >
                {t.allCategories}
              </button>
              {categories.map((cat) => (
                <button 
                  key={cat.id}
                  onClick={() => { setSelectedCategory(cat.id); setSelectedSubCategory(null); }}
                  style={{
                    background: selectedCategory === cat.id ? '#f59e0b' : '#141822',
                    color: selectedCategory === cat.id ? '#0b0e14' : '#9ca3af',
                    border: '1px solid #334155', borderRadius: '10px', padding: '8px 12px', fontSize: '12px', fontWeight: 'bold', whiteSpace: 'nowrap', cursor: 'pointer'
                  }}
                >
                  {cat.names?.[lang] || cat.name}
                </button>
              ))}
            </div>

            {/* Кнопка сброса фильтра */}
            {selectedCategory && (
              <div style={{ marginBottom: '16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button 
                  onClick={() => { setSelectedCategory(null); setSelectedSubCategory(null); }}
                  style={{ background: 'none', border: 'none', color: '#f59e0b', fontSize: '12px', cursor: 'pointer', padding: 0 }}
                >
                  {t.backToCategories}
                </button>
              </div>
            )}

            {/* Сетка товаров каталога */}
            {filteredCatalogProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '50px 0', color: '#9ca3af', fontSize: '13px' }}>
                {t.notFound}
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px' }}>
                {filteredCatalogProducts.map((item) => renderProductCard(item, true))}
              </div>
            )}
          </div>
        )}

        {/* ВКЛАДКА: ИЗБРАННОЕ (Likes) */}
        {activeTab === 'likes' && (
          <div>
            <h2 style={{ fontSize: '16px', color: '#fcd34d', marginBottom: '16px' }}>{t.likesTab}</h2>
            {likes.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '50px 0', color: '#9ca3af', fontSize: '13px' }}>{t.emptyLikes}</div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px' }}>
                {products.filter((p) => likes.includes(p.id)).map((item) => renderProductCard(item, true))}
              </div>
            )}
          </div>
        )}

        {/* ВКЛАДКА: ЗАКАЗЫ (Orders) */}
        {activeTab === 'orders' && (
          <div>
            <h2 style={{ fontSize: '16px', color: '#fcd34d', marginBottom: '16px' }}>{t.orderHistoryTitle}</h2>
            {ordersHistory.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '50px 0', color: '#9ca3af', fontSize: '13px' }}>{t.emptyOrders}</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {ordersHistory.map((order, idx) => (
                  <div key={order.id || idx} style={{ background: '#141822', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '12px', padding: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#9ca3af', marginBottom: '6px' }}>
                      <span>Заказ #{idx + 1}</span>
                      <span style={{ color: '#34d399', fontWeight: 'bold' }}>{t.statusCompleted}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 'bold' }}>
                      <span>{order.customer_name}</span>
                      <span style={{ color: '#fcd34d' }}>{Number(order.total).toLocaleString()} ₩</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* ==========================================
          КОМПОНЕНТ КАРТОЧКИ ТОВАРА (CARD COMPONENT)
          ========================================== */}
      function renderProductCard(item, isGrid = false) {
        const isLiked = likes.includes(item.id);
        const title = item.names?.[lang] || item.name || 'Десерт';
        const desc = item.descs?.[lang] || item.description || '';
        const badgeText = t.badges[item.badge] || (item.badge ? item.badge.toUpperCase() : null);
        const images = getProductImages(item);

        return (
          <div 
            key={item.id}
            style={{
              flex: isGrid ? 'unset' : '0 0 160px',
              width: isGrid ? '100%' : '160px',
              background: '#141822',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '14px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}
          >
            {/* Картинка / Карусель в карточке */}
            <div 
              style={{ width: '100%', aspectRatio: '1/1', position: 'relative', cursor: 'pointer', backgroundColor: '#1e293b' }}
              onClick={() => { setSelectedProduct(item); setActiveImageIndex(0); }}
            >
              <img src={images[0]} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              
              {badgeText && (
                <span style={{ position: 'absolute', top: '6px', left: '6px', background: 'rgba(11,14,20,0.85)', color: '#fcd34d', padding: '2px 6px', borderRadius: '4px', fontSize: '8px', fontWeight: 'bold' }}>
                  {badgeText}
                </span>
              )}

              <button 
                onClick={(e) => { e.stopPropagation(); toggleLike(item.id); }}
                style={{ position: 'absolute', top: '6px', right: '6px', background: 'rgba(11,14,20,0.85)', border: 'none', width: '26px', height: '26px', borderRadius: '50%', cursor: 'pointer', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                aria-label="Like"
              >
                {isLiked ? '❤️' : '🤍'}
              </button>
            </div>

            {/* Контент карточки */}
            <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
              <div onClick={() => { setSelectedProduct(item); setActiveImageIndex(0); }} style={{ cursor: 'pointer' }}>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '12px', fontWeight: 'bold', color: '#fff', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {title}
                </h4>
                <p style={{ margin: 0, fontSize: '10px', color: '#9ca3af', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {desc}
                </p>
              </div>

              <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#fcd34d' }}>{Number(item.price).toLocaleString()} ₩</div>
                  {item.old_price && (
                    <div style={{ fontSize: '9px', color: '#6b7280', textDecoration: 'line-through' }}>{Number(item.old_price).toLocaleString()} ₩</div>
                  )}
                </div>
                <button 
                  onClick={() => addToCart(item)}
                  style={{ background: '#f59e0b', color: '#0b0e14', border: 'none', width: '28px', height: '28px', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  aria-label="Add"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        );
      }

      {/* ==========================================
          4. МОДАЛЬНОЕ ОКНО ДЕТАЛЕЙ ТОВАРА
          ========================================== */}
      {selectedProduct && (
        <div 
          onClick={() => setSelectedProduct(null)}
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{ backgroundColor: '#141822', border: '1px solid rgba(245,158,11,0.4)', borderRadius: '18px', padding: '20px', width: '100%', maxWidth: '380px', boxSizing: 'border-box' }}
          >
            {/* Карусель фото в модалке */}
            {(() => {
              const images = getProductImages(selectedProduct);
              return (
                <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', marginBottom: '14px', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#1e293b' }}>
                  <img src={images[activeImageIndex] || images[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {images.length > 1 && (
                    <div style={{ position: 'absolute', bottom: '8px', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '6px' }}>
                      {images.map((_, i) => (
                        <button 
                          key={i} 
                          onClick={() => setActiveImageIndex(i)}
                          style={{ width: '6px', height: '6px', borderRadius: '50%', background: activeImageIndex === i ? '#f59e0b' : 'rgba(255,255,255,0.4)', border: 'none', cursor: 'pointer', padding: 0 }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}

            <h3 style={{ margin: '0 0 6px 0', color: '#fff', fontSize: '15px' }}>{selectedProduct.names?.[lang] || selectedProduct.name}</h3>
            <p style={{ fontSize: '11px', color: '#9ca3af', lineHeight: '1.4', marginBottom: '16px' }}>{selectedProduct.descs?.[lang] || selectedProduct.description}</p>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#fcd34d' }}>{Number(selectedProduct.price).toLocaleString()} ₩</span>
              <button 
                onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                style={{ background: '#f59e0b', color: '#0b0e14', border: 'none', padding: '8px 16px', borderRadius: '10px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}
              >
                + {t.checkoutBtn.split(' ')[0]}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          5. КОРЗИНА И ОФОРМЛЕНИЕ ЗАКАЗА (CART DRAWER & CHECKOUT)
          ========================================== */}
      {showCartDrawer && (
        <div 
          onClick={() => { setShowCartDrawer(false); setShowCheckout(false); }}
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 120, display: 'flex', justifyContent: 'flex-end' }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{ width: '100%', maxWidth: '400px', height: '100%', backgroundColor: '#141822', borderLeft: '1px solid rgba(245,158,11,0.3)', padding: '20px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', color: '#fcd34d' }}>{showCheckout ? 'Оформление заказа' : t.cartTitle}</h3>
              <button onClick={() => { setShowCartDrawer(false); setShowCheckout(false); }} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: '20px', cursor: 'pointer' }}>✕</button>
            </div>

            {!showCheckout ? (
              // Список товаров в корзине
              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {cart.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '60px 0', color: '#9ca3af', fontSize: '13px' }}>{t.emptyCart}</div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#0b0e14', padding: '10px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
                        <img src={getProductImages(item)[0]} alt="" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '6px' }} />
                        <div style={{ overflow: 'hidden' }}>
                          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.names?.[lang] || item.name}</div>
                          <div style={{ fontSize: '11px', color: '#fcd34d' }}>{Number(item.price).toLocaleString()} ₩</div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <button onClick={() => updateQuantity(item.id, -1)} style={{ background: '#334155', color: '#fff', border: 'none', width: '22px', height: '22px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>-</button>
                        <span style={{ fontSize: '12px', width: '16px', textAlign: 'center' }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} style={{ background: '#334155', color: '#fff', border: 'none', width: '22px', height: '22px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>+</button>
                        <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '12px', cursor: 'pointer', marginLeft: '4px' }}>🗑️</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              // Пошаговая форма оформления заказа
              <form onSubmit={handleConfirmOrder} style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Переключатель способа получения */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button type="button" onClick={() => setOrderType('pickup')} style={{ flex: 1, background: orderType === 'pickup' ? '#f59e0b' : '#0b0e14', color: orderType === 'pickup' ? '#0b0e14' : '#9ca3af', border: '1px solid #334155', borderRadius: '8px', padding: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>{t.pickup}</button>
                  <button type="button" onClick={() => setOrderType('delivery')} style={{ flex: 1, background: orderType === 'delivery' ? '#f59e0b' : '#0b0e14', color: orderType === 'delivery' ? '#0b0e14' : '#9ca3af', border: '1px solid #334155', borderRadius: '8px', padding: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>{t.delivery}</button>
                </div>

                <div>
                  <label style={{ fontSize: '10px', color: '#9ca3af', display: 'block', marginBottom: '4px' }}>{t.firstName}</label>
                  <input type="text" value={checkoutForm.name} onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px', color: '#fff', fontSize: '12px', boxSizing: 'border-box', outline: 'none' }} required />
                </div>

                <div>
                  <label style={{ fontSize: '10px', color: '#9ca3af', display: 'block', marginBottom: '4px' }}>{t.phoneLabel}</label>
                  <input type="tel" placeholder="+82 10-0000-0000" value={checkoutForm.phone} onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px', color: '#fff', fontSize: '12px', boxSizing: 'border-box', outline: 'none' }} required />
                </div>

                {orderType === 'delivery' && (
                  <div>
                    <label style={{ fontSize: '10px', color: '#9ca3af', display: 'block', marginBottom: '4px' }}>{t.deliveryAddress}</label>
                    <textarea value={checkoutForm.address} onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px', color: '#fff', fontSize: '12px', boxSizing: 'border-box', minHeight: '50px', outline: 'none' }} required />
                  </div>
                )}

                <div>
                  <label style={{ fontSize: '10px', color: '#9ca3af', display: 'block', marginBottom: '4px' }}>{t.deliveryTime}</label>
                  <input type="text" placeholder="Сегодня, через 1 час / 14:30" value={checkoutForm.datetime} onChange={(e) => setCheckoutForm({ ...checkoutForm, datetime: e.target.value })} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px', color: '#fff', fontSize: '12px', boxSizing: 'border-box', outline: 'none' }} />
                </div>

                <div>
                  <label style={{ fontSize: '10px', color: '#9ca3af', display: 'block', marginBottom: '4px' }}>{t.commentLabel}</label>
                  <input type="text" value={checkoutForm.comment} onChange={(e) => setCheckoutForm({ ...checkoutForm, comment: e.target.value })} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px', color: '#fff', fontSize: '12px', boxSizing: 'border-box', outline: 'none' }} />
                </div>
              </form>
            )}

            {/* Итоги и кнопка действия */}
            {cart.length > 0 && (
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '14px', marginTop: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '10px' }}>
                  <span style={{ color: '#9ca3af' }}>{t.total}</span>
                  <span style={{ color: '#fcd34d', fontWeight: 'bold' }}>{totalPrice.toLocaleString()} ₩</span>
                </div>

                {!showCheckout ? (
                  <button 
                    onClick={() => setShowCheckout(true)}
                    style={{ width: '100%', background: '#f59e0b', color: '#0b0e14', border: 'none', padding: '10px', borderRadius: '10px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}
                  >
                    {t.checkoutBtn}
                  </button>
                ) : (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button type="button" onClick={() => setShowCheckout(false)} style={{ flex: 1, background: '#334155', color: '#fff', border: 'none', padding: '10px', borderRadius: '10px', cursor: 'pointer', fontSize: '12px' }}>Назад</button>
                    <button type="button" onClick={handleConfirmOrder} style={{ flex: 2, background: '#f59e0b', color: '#0b0e14', border: 'none', padding: '10px', borderRadius: '10px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>{t.confirmOrder}</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==========================================
          6. МОДАЛЬНОЕ ОКНО АВТОРИЗАЦИИ СОТРУДНИКОВ
          ========================================== */}
      {showAuthModal && (
        <div 
          onClick={() => setShowAuthModal(false)}
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{ backgroundColor: '#141822', border: '1px solid rgba(245,158,11,0.4)', borderRadius: '18px', padding: '24px', width: '100%', maxWidth: '340px', boxSizing: 'border-box' }}
          >
            <h3 style={{ margin: '0 0 14px 0', fontSize: '15px', color: '#fcd34d', textAlign: 'center' }}>{t.loginTitle}</h3>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '10px', color: '#9ca3af', display: 'block', marginBottom: '4px' }}>{t.emailLabel}</label>
                <input type="email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px', color: '#fff', fontSize: '12px', boxSizing: 'border-box', outline: 'none' }} required />
              </div>
              <div>
                <label style={{ fontSize: '10px', color: '#9ca3af', display: 'block', marginBottom: '4px' }}>{t.passwordLabel}</label>
                <input type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px', color: '#fff', fontSize: '12px', boxSizing: 'border-box', outline: 'none' }} required />
              </div>
              <div style={{ fontSize: '10px', color: '#6b7280', textAlign: 'center' }}>{t.authNotice}</div>
              <button type="submit" style={{ background: '#f59e0b', color: '#0b0e14', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer', marginTop: '6px' }}>{t.signIn}</button>
            </form>
          </div>
        </div>
      )}

      {/* ==========================================
          7. НИЖНЯЯ НАВИГАЦИОННАЯ ПАНЕЛЬ (BOTTOM NAV)
          ========================================== */}
      <nav style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        backgroundColor: '#141822',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', justifyContent: 'space-around',
        padding: '10px 0 calc(10px + env(safe-area-inset-bottom))',
        zIndex: 85,
        transform: showBottomNav ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.3s ease-in-out'
      }}>
        <button onClick={() => setActiveTab('home')} style={{ background: 'none', border: 'none', color: activeTab === 'home' ? '#f59e0b' : '#9ca3af', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '10px', cursor: 'pointer', gap: '2px' }}>
          <span style={{ fontSize: '16px' }}>🏠</span> {t.homeTab}
        </button>
        <button onClick={() => setActiveTab('menu')} style={{ background: 'none', border: 'none', color: activeTab === 'menu' ? '#f59e0b' : '#9ca3af', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '10px', cursor: 'pointer', gap: '2px' }}>
          <span style={{ fontSize: '16px' }}>🍰</span> {t.menuTab}
        </button>
        <button onClick={() => setActiveTab('likes')} style={{ background: 'none', border: 'none', color: activeTab === 'likes' ? '#f59e0b' : '#9ca3af', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '10px', cursor: 'pointer', gap: '2px', position: 'relative' }}>
          <span style={{ fontSize: '16px' }}>❤️</span> {t.likesTab}
          {likes.length > 0 && <span style={{ position: 'absolute', top: '-2px', right: '12px', background: '#f59e0b', color: '#000', fontSize: '7px', fontWeight: 'bold', borderRadius: '50%', padding: '2px 4px' }}>{likes.length}</span>}
        </button>
        <button onClick={() => setActiveTab('orders')} style={{ background: 'none', border: 'none', color: activeTab === 'orders' ? '#f59e0b' : '#9ca3af', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '10px', cursor: 'pointer', gap: '2px' }}>
          <span style={{ fontSize: '16px' }}>📦</span> {t.ordersTab}
        </button>
      </nav>

    </div>
  );
}