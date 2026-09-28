import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  ShoppingBag, Heart, Menu, User, Home, Search, 
  ChevronLeft, ChevronRight, Plus, Minus, X, Check, 
  Globe, MapPin, Truck, Store, Clock, ArrowRight, 
  Lock, LogOut, Package, Sparkles, Star, ShieldCheck
} from 'lucide-react';

// Инициализация Supabase (используйте ваши переменные окружения)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-project.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Локализация интерфейса (RU, EN, KO)
const t = {
  RU: {
    home: 'Главная', menu: 'Меню', favorites: 'Избранное', orders: 'Заказы',
    newArrivals: 'Новинки', bestsellers: 'Хиты продаж', sale: 'Скидки',
    cart: 'Корзина', emptyCart: 'Ваша корзина пуста', checkout: 'Оформить заказ',
    total: 'Итого', pickup: 'Самовывоз', delivery: 'Доставка',
    name: 'Имя покупателя', phone: 'Номер телефона', address: 'Адрес доставки',
    apartment: 'Кв / Офис', floor: 'Этаж', intercom: 'Домофон', comment: 'Комментарий',
    date: 'Дата получения', time: 'Время', submitOrder: 'Подтвердить заказ',
    employeeLogin: 'Вход для сотрудников', email: 'Электронная почта', password: 'Пароль',
    loginBtn: 'Войти', logoutBtn: 'Выйти', errorFill: 'Заполните обязательные поля',
    successOrder: 'Заказ успешно оформлен!', categories: 'Категории', allProducts: 'Все товары'
  },
  EN: {
    home: 'Home', menu: 'Menu', favorites: 'Favorites', orders: 'Orders',
    newArrivals: 'New Arrivals', bestsellers: 'Bestsellers', sale: 'Sale',
    cart: 'Cart', emptyCart: 'Your cart is empty', checkout: 'Checkout',
    total: 'Total', pickup: 'Pickup', delivery: 'Delivery',
    name: 'Full Name', phone: 'Phone Number', address: 'Delivery Address',
    apartment: 'Apt / Suite', floor: 'Floor', intercom: 'Intercom', comment: 'Comment',
    date: 'Pickup / Delivery Date', time: 'Time', submitOrder: 'Confirm Order',
    employeeLogin: 'Staff Login', email: 'Email', password: 'Password',
    loginBtn: 'Sign In', logoutBtn: 'Sign Out', errorFill: 'Please fill in required fields',
    successOrder: 'Order placed successfully!', categories: 'Categories', allProducts: 'All Products'
  },
  KO: {
    home: '홈', menu: '메뉴', favorites: '즐겨찾기', orders: '주문내역',
    newArrivals: '신상품', bestsellers: '베스트셀러', sale: '할인상품',
    cart: '장바구니', emptyCart: '장바구니가 비어 있습니다', checkout: '주문하기',
    total: '합계', pickup: '매장 픽업', delivery: '배달',
    name: '주문자 성함', phone: '전화번호', address: '배달 주소',
    apartment: '상세 주소 (동/호수)', floor: '층수', intercom: '인터폰', comment: '요청사항',
    date: '수령 날짜', time: '시간', submitOrder: '주문 확정',
    employeeLogin: '직원 로그인', email: '이메일', password: '비밀번호',
    loginBtn: '로그인', logoutBtn: '로그아웃', errorFill: '필수 항목을 입력해주세요',
    successOrder: '주문이 완료되었습니다!', categories: '카테고리', allProducts: '전체 상품'
  }
};

export default function App() {
  // Состояния приложения
  const [lang, setLang] = useState(localStorage.getItem('sb_lang') || 'RU');
  const [currentTab, setCurrentTab] = useState('home');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('sb_cart') || '[]'));
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('sb_favs') || '[]'));
  
  // Модальные окна и экраны
  const [activeModal, setActiveModal] = useState(null); // 'product' | 'checkout' | 'auth' | 'menuSheet'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [checkoutType, setCheckoutType] = useState('pickup');
  const [checkoutForm, setCheckoutForm] = useState({ name: '', phone: '', address: '', apartment: '', floor: '', intercom: '', date: '', time: '', comment: '' });
  const [authForm, setAuthForm] = useState({ email: '', password: '' });
  const [user, setUser] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Управление нижней навигацией при скролле (Задача 6)
  const [showNav, setShowNav] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current + 15 && currentScrollY > 80) {
        setShowNav(false);
      } else if (currentScrollY < lastScrollY.current - 15 || currentScrollY < 20) {
        setShowNav(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Синхронизация с Supabase и localStorage
  useEffect(() => {
    localStorage.setItem('sb_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('sb_favs', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('sb_lang', lang);
  }, [lang]);

  useEffect(() => {
    fetchProducts();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase.from('products').select('*');
      if (error) throw error;
      if (data) {
        setProducts(data);
        // Извлечение уникальных категорий и подкатегорий
        const cats = [...new Set(data.map(item => item.category).filter(Boolean))];
        setCategories(cats);
      }
    } catch (err) {
      console.error('Ошибка загрузки данных из Supabase:', err.message);
    }
  };

  // Управление корзиной (Задача 4)
  const updateQuantity = (product, delta) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (!existing) {
        if (delta > 0) return [...prev, { ...product, quantity: 1 }];
        return prev;
      }
      const newQty = existing.quantity + delta;
      if (newQty <= 0) {
        return prev.filter(item => item.id !== product.id);
      }
      return prev.map(item => item.id === product.id ? { ...item, quantity: newQty } : item);
    });
  };

  const getProductQty = (productId) => {
    const item = cart.find(i => i.id === productId);
    return item ? item.quantity : 0;
  };

  const totalCartPrice = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [cart]);

  const totalCartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  // Избранное
  const toggleFavorite = (productId, e) => {
    e?.stopPropagation();
    setFavorites(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  // Оформление заказа (Задача 5)
  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    if (!checkoutForm.name || !checkoutForm.phone || (checkoutType === 'delivery' && !checkoutForm.address)) {
      alert(t[lang].errorFill);
      return;
    }
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('orders').insert([{
        type: checkoutType,
        customer_name: checkoutForm.name,
        phone: checkoutForm.phone,
        address: checkoutType === 'delivery' ? checkoutForm.address : 'Самовывоз',
        details: {
          apartment: checkoutForm.apartment,
          floor: checkoutForm.floor,
          intercom: checkoutForm.intercom,
          comment: checkoutForm.comment,
          date: checkoutForm.date,
          time: checkoutForm.time
        },
        items: cart,
        total: totalCartPrice,
        status: 'new',
        created_at: new Date()
      }]);

      if (error) throw error;
      setOrderSuccess(true);
      setCart([]);
      setTimeout(() => {
        setOrderSuccess(false);
        setActiveModal(null);
        setCurrentTab('home');
      }, 3000);
    } catch (err) {
      alert('Ошибка при оформлении заказа: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Авторизация сотрудников (Задача 8)
  const handleStaffLogin = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: authForm.email,
        password: authForm.password,
      });
      if (error) throw error;
      setActiveModal(null);
      setAuthForm({ email: '', password: '' });
    } catch (err) {
      alert('Ошибка входа: ' + err.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // Рендер карусели изображений для карточки товара (Задача 3)
  const ProductCard = ({ product }) => {
    const images = Array.isArray(product.images) && product.images.length > 0 
      ? product.images 
      : [product.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600'].filter(Boolean);
    
    const [currImg, setCurrImg] = useState(0);
    const qty = getProductQty(product.id);
    const isFav = favorites.includes(product.id);

    const nextImage = (e) => {
      e.stopPropagation();
      setCurrImg((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e) => {
      e.stopPropagation();
      setCurrImg((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
      <div 
        onClick={() => { setSelectedProduct(product); setActiveModal('product'); }}
        className="bg-[#1a1a1a] border border-[#333] rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between transition-all duration-300 hover:border-[#d4af37] cursor-pointer group"
      >
        <div className="relative aspect-square bg-[#121212] overflow-hidden">
          <img 
            src={images[currImg]} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Кнопка Избранное */}
          <button 
            onClick={(e) => toggleFavorite(product.id, e)}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-md text-white hover:text-[#d4af37] transition-colors"
          >
            <Heart className={`w-5 h-5 ${isFav ? 'fill-[#d4af37] text-[#d4af37]' : ''}`} />
          </button>

          {/* Скидка бейдж */}
          {product.old_price && (
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider">
              Sale
            </span>
          )}

          {/* Стрелки карусели при наличии нескольких фото */}
          {images.length > 1 && (
            <>
              <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/40 text-white hover:bg-black/70">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/40 text-white hover:bg-black/70">
                <ChevronRight className="w-4 h-4" />
              </button>
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
                {images.map((_, idx) => (
                  <span key={idx} className={`h-1.5 rounded-full transition-all ${idx === currImg ? 'w-4 bg-[#d4af37]' : 'w-1.5 bg-white/40'}`} />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="p-4 flex flex-col flex-grow justify-between">
          <div>
            <h3 className="font-serif text-lg font-bold text-white mb-1 line-clamp-1 group-hover:text-[#d4af37] transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-gray-400 line-clamp-2 mb-3">
              {product.description}
            </p>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-[#d4af37]">₩{product.price?.toLocaleString()}</span>
              {product.old_price && (
                <span className="text-xs text-gray-500 line-through">₩{product.old_price?.toLocaleString()}</span>
              )}
            </div>

            {/* Контроллер количества (Задача 4) */}
            <div onClick={(e) => e.stopPropagation()} className="flex items-center bg-[#242424] rounded-lg border border-[#444] overflow-hidden">
              <button 
                onClick={() => updateQuantity(product, -1)}
                className="p-2 text-gray-300 hover:bg-[#333] hover:text-[#d4af37] transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-3 text-sm font-bold text-white">{qty}</span>
              <button 
                onClick={() => updateQuantity(product, 1)}
                className="p-2 text-gray-300 hover:bg-[#333] hover:text-[#d4af37] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#121212] text-gray-100 font-sans pb-24 selection:bg-[#d4af37] selection:text-black">
      
      {/* Шапка сайта */}
      <header className="sticky top-0 z-40 bg-[#121212]/90 backdrop-blur-md border-b border-[#262626] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-serif text-2xl font-bold tracking-wider text-[#d4af37]">SWEET BAKERY</span>
        </div>

        <div className="flex items-center gap-4">
          {/* Компактный переключатель языка (Задача 7) */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#333] text-sm font-medium hover:border-[#d4af37] transition-colors">
              <Globe className="w-4 h-4 text-[#d4af37]" />
              <span>{lang}</span>
            </button>
            <div className="absolute right-0 mt-1 w-24 py-1 bg-[#1a1a1a] border border-[#333] rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              {['RU', 'EN', 'KO'].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${lang === l ? 'bg-[#d4af37]/20 text-[#d4af37] font-bold' : 'text-gray-300 hover:bg-[#262626]'}`}
                >
                  {l === 'RU' ? 'Русский' : l === 'EN' ? 'English' : '한국어'}
                </button>
              ))}
            </div>
          </div>

          {/* Кнопка входа сотрудников (Задача 8) */}
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#d4af37] hidden md:inline">{user.email}</span>
              <button onClick={handleLogout} className="p-2 rounded-lg bg-[#1a1a1a] border border-[#333] hover:border-red-500 text-red-400">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setActiveModal('auth')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#333] text-sm font-medium hover:border-[#d4af37] text-gray-300 hover:text-white transition-colors"
            >
              <Lock className="w-4 h-4 text-[#d4af37]" />
              <span className="hidden sm:inline">{t[lang].employeeLogin}</span>
            </button>
          )}
        </div>
      </header>

      {/* Основной контент по вкладкам */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        
        {/* Вкладка: ГЛАВНАЯ (Задача 1) */}
        {currentTab === 'home' && (
          <div className="space-y-10">
            {/* Приветственный баннер */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#1a1a1a] to-[#242424] border border-[#333] p-8 md:p-12 shadow-2xl">
              <div className="max-w-xl">
                <span className="text-[#d4af37] text-sm font-semibold tracking-widest uppercase flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4" /> Artisan Confectionery
                </span>
                <h1 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4">
                  Изысканные десерты ручной работы
                </h1>
                <p className="text-gray-400 mb-6">
                  Создано с любовью и вниманием к каждой детали. Премиальные ингредиенты и неповторимый вкус.
                </p>
                <button 
                  onClick={() => setCurrentTab('menu')}
                  className="px-6 py-3 rounded-xl bg-[#d4af37] text-black font-bold flex items-center gap-2 hover:bg-[#e6be40] transition-colors shadow-lg shadow-[#d4af37]/20"
                >
                  <span>Открыть меню</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Блок 1: Новинки */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
                  <Star className="w-5 h-5 text-[#d4af37]" /> {t[lang].newArrivals}
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.filter(p => p.is_new).slice(0, 4).map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            {/* Блок 2: Хиты продаж */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#d4af37]" /> {t[lang].bestsellers}
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.filter(p => p.is_bestseller).slice(0, 4).map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            {/* Блок 3: Скидки / Sale */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#d4af37]" /> {t[lang].sale}
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.filter(p => p.old_price).slice(0, 4).map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Вкладка: МЕНЮ И КАТЕГОРИИ (Задача 2) */}
        {currentTab === 'menu' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="font-serif text-3xl font-bold text-white">{t[lang].menu}</h1>
              <button 
                onClick={() => setActiveModal('menuSheet')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1a1a1a] border border-[#333] text-[#d4af37] font-medium hover:border-[#d4af37]"
              >
                <Menu className="w-5 h-5" />
                <span>{selectedCategory || t[lang].categories}</span>
              </button>
            </div>

            {/* Фильтры категорий быстрой доступности */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button 
                onClick={() => { setSelectedCategory(null); setSelectedSubcategory(null); }}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${!selectedCategory ? 'bg-[#d4af37] text-black font-bold' : 'bg-[#1a1a1a] border border-[#333] text-gray-300 hover:border-[#d4af37]'}`}
              >
                {t[lang].allProducts}
              </button>
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); setSelectedSubcategory(null); }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === cat ? 'bg-[#d4af37] text-black font-bold' : 'bg-[#1a1a1a] border border-[#333] text-gray-300 hover:border-[#d4af37]'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Сетка товаров по выбранной категории */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products
                .filter(p => !selectedCategory || p.category === selectedCategory)
                .map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          </div>
        )}

        {/* Вкладка: ИЗБРАННОЕ */}
        {currentTab === 'favorites' && (
          <div className="space-y-6">
            <h1 className="font-serif text-3xl font-bold text-white">{t[lang].favorites}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.filter(p => favorites.includes(p.id)).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {favorites.length === 0 && (
              <div className="text-center py-20 text-gray-500">
                <Heart className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p>В избранном пока ничего нет</p>
              </div>
            )}
          </div>
        )}

        {/* Вкладка: ЗАКАЗЫ И КОРЗИНА */}
        {currentTab === 'orders' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="font-serif text-3xl font-bold text-white">{t[lang].cart}</h1>
            {cart.length === 0 ? (
              <div className="text-center py-20 bg-[#1a1a1a] border border-[#333] rounded-3xl">
                <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                <p className="text-gray-400 mb-6">{t[lang].emptyCart}</p>
                <button 
                  onClick={() => setCurrentTab('menu')}
                  className="px-6 py-3 bg-[#d4af37] text-black font-bold rounded-xl"
                >
                  Перейти в меню
                </button>
              </div>
            ) : (
              <div className="bg-[#1a1a1a] border border-[#333] rounded-3xl p-6 space-y-6">
                <div className="divide-y divide-[#333]">
                  {cart.map(item => (
                    <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img src={item.image || item.images?.[0]} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
                        <div>
                          <h4 className="font-bold text-white">{item.name}</h4>
                          <p className="text-sm text-[#d4af37]">₩{item.price?.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center bg-[#242424] rounded-lg border border-[#444] overflow-hidden">
                          <button onClick={() => updateQuantity(item, -1)} className="p-1.5 text-gray-300 hover:text-[#d4af37]">
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-sm font-bold text-white">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item, 1)} className="p-1.5 text-gray-300 hover:text-[#d4af37]">
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#333] pt-4 flex items-center justify-between text-lg font-bold">
                  <span>{t[lang].total}:</span>
                  <span className="text-[#d4af37]">₩{totalCartPrice.toLocaleString()}</span>
                </div>

                <button 
                  onClick={() => setActiveModal('checkout')}
                  className="w-full py-4 bg-[#d4af37] hover:bg-[#e6be40] text-black font-bold rounded-xl text-center shadow-lg transition-colors"
                >
                  {t[lang].checkout}
                </button>
              </div>
            )}
          </div>
        )}

      </main>

      {/* Нижняя панель навигации (Задачи 2 & 6) */}
      <nav className={`fixed bottom-0 left-0 right-0 z-40 bg-[#121212]/95 backdrop-blur-md border-t border-[#262626] transition-transform duration-300 ${showNav ? 'translate-y-0' : 'translate-y-full'} pb-[env(safe-area-inset-bottom)]`}>
        <div className="max-w-md mx-auto px-6 py-3 flex items-center justify-between">
          
          <button 
            onClick={() => setCurrentTab('home')}
            className={`flex flex-col items-center gap-1 transition-colors ${currentTab === 'home' ? 'text-[#d4af37]' : 'text-gray-400 hover:text-white'}`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs font-medium">{t[lang].home}</span>
          </button>

          <button 
            onClick={() => setCurrentTab('menu')}
            className={`flex flex-col items-center gap-1 transition-colors ${currentTab === 'menu' ? 'text-[#d4af37]' : 'text-gray-400 hover:text-white'}`}
          >
            <Menu className="w-5 h-5" />
            <span className="text-xs font-medium">{t[lang].menu}</span>
          </button>

          <button 
            onClick={() => setCurrentTab('favorites')}
            className={`flex flex-col items-center gap-1 transition-colors ${currentTab === 'favorites' ? 'text-[#d4af37]' : 'text-gray-400 hover:text-white'}`}
          >
            <Heart className="w-5 h-5" />
            <span className="text-xs font-medium">{t[lang].favorites}</span>
          </button>

          <button 
            onClick={() => setCurrentTab('orders')}
            className={`relative flex flex-col items-center gap-1 transition-colors ${currentTab === 'orders' ? 'text-[#d4af37]' : 'text-gray-400 hover:text-white'}`}
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="text-xs font-medium">{t[lang].cart}</span>
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-[#d4af37] text-black text-[10px] font-bold flex items-center justify-center">
                {totalCartCount}
              </span>
            )}
          </button>

        </div>
      </nav>

      {/* МОДАЛЬНОЕ ОКНО: ОФОРМЛЕНИЕ ЗАКАЗА (Задача 5) */}
      {activeModal === 'checkout' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-[#1a1a1a] border border-[#333] w-full max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-[#333] pb-4">
              <h2 className="font-serif text-2xl font-bold text-white">{t[lang].checkout}</h2>
              <button onClick={() => setActiveModal(null)} className="p-2 text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            {orderSuccess ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-[#d4af37] text-black rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">{t[lang].successOrder}</h3>
              </div>
            ) : (
              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                {/* Выбор типа получения */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCheckoutType('pickup')}
                    className={`py-3 rounded-xl border font-bold flex items-center justify-center gap-2 transition-colors ${checkoutType === 'pickup' ? 'bg-[#d4af37] border-[#d4af37] text-black' : 'bg-[#242424] border-[#444] text-gray-300'}`}
                  >
                    <Store className="w-5 h-5" /> {t[lang].pickup}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCheckoutType('delivery')}
                    className={`py-3 rounded-xl border font-bold flex items-center justify-center gap-2 transition-colors ${checkoutType === 'delivery' ? 'bg-[#d4af37] border-[#d4af37] text-black' : 'bg-[#242424] border-[#444] text-gray-300'}`}
                  >
                    <Truck className="w-5 h-5" /> {t[lang].delivery}
                  </button>
                </div>

                <div>
                  <label className="text-xs text-gray-400 mb-1 block">{t[lang].name} *</label>
                  <input 
                    type="text" 
                    required
                    value={checkoutForm.name} 
                    onChange={e => setCheckoutForm({...checkoutForm, name: e.target.value})}
                    className="w-full bg-[#242424] border border-[#444] rounded-xl p-3 text-white focus:border-[#d4af37] outline-none" 
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400 mb-1 block">{t[lang].phone} *</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="010-XXXX-XXXX"
                    value={checkoutForm.phone} 
                    onChange={e => setCheckoutForm({...checkoutForm, phone: e.target.value})}
                    className="w-full bg-[#242424] border border-[#444] rounded-xl p-3 text-white focus:border-[#d4af37] outline-none" 
                  />
                </div>

                {checkoutType === 'delivery' && (
                  <>
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">{t[lang].address} *</label>
                      <input 
                        type="text" 
                        required
                        value={checkoutForm.address} 
                        onChange={e => setCheckoutForm({...checkoutForm, address: e.target.value})}
                        className="w-full bg-[#242424] border border-[#444] rounded-xl p-3 text-white focus:border-[#d4af37] outline-none" 
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <input 
                        type="text" placeholder={t[lang].apartment}
                        value={checkoutForm.apartment} onChange={e => setCheckoutForm({...checkoutForm, apartment: e.target.value})}
                        className="bg-[#242424] border border-[#444] rounded-xl p-3 text-white focus:border-[#d4af37] outline-none"
                      />
                      <input 
                        type="text" placeholder={t[lang].floor}
                        value={checkoutForm.floor} onChange={e => setCheckoutForm({...checkoutForm, floor: e.target.value})}
                        className="bg-[#242424] border border-[#444] rounded-xl p-3 text-white focus:border-[#d4af37] outline-none"
                      />
                      <input 
                        type="text" placeholder={t[lang].intercom}
                        value={checkoutForm.intercom} onChange={e => setCheckoutForm({...checkoutForm, intercom: e.target.value})}
                        className="bg-[#242424] border border-[#444] rounded-xl p-3 text-white focus:border-[#d4af37] outline-none"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="text-xs text-gray-400 mb-1 block">{t[lang].comment}</label>
                  <textarea 
                    value={checkoutForm.comment} 
                    onChange={e => setCheckoutForm({...checkoutForm, comment: e.target.value})}
                    className="w-full bg-[#242424] border border-[#444] rounded-xl p-3 text-white focus:border-[#d4af37] outline-none resize-none h-20" 
                  />
                </div>

                <div className="border-t border-[#333] pt-4 flex items-center justify-between font-bold text-lg">
                  <span>{t[lang].total}:</span>
                  <span className="text-[#d4af37]">₩{totalCartPrice.toLocaleString()}</span>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#d4af37] hover:bg-[#e6be40] text-black font-bold rounded-xl shadow-lg transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Обработка...' : t[lang].submitOrder}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* МОДАЛЬНОЕ ОКНО: ВХОД ДЛЯ СОТРУДНИКОВ (Задача 8) */}
      {activeModal === 'auth' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] border border-[#333] w-full max-w-md rounded-3xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-[#333] pb-4">
              <h2 className="font-serif text-2xl font-bold text-white">{t[lang].employeeLogin}</h2>
              <button onClick={() => setActiveModal(null)} className="p-2 text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleStaffLogin} className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">{t[lang].email}</label>
                <input 
                  type="email" 
                  required
                  value={authForm.email} 
                  onChange={e => setAuthForm({...authForm, email: e.target.value})}
                  className="w-full bg-[#242424] border border-[#444] rounded-xl p-3 text-white focus:border-[#d4af37] outline-none" 
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 mb-1 block">{t[lang].password}</label>
                <input 
                  type="password" 
                  required
                  value={authForm.password} 
                  onChange={e => setAuthForm({...authForm, password: e.target.value})}
                  className="w-full bg-[#242424] border border-[#444] rounded-xl p-3 text-white focus:border-[#d4af37] outline-none" 
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-4 bg-[#d4af37] hover:bg-[#e6be40] text-black font-bold rounded-xl shadow-lg transition-colors"
              >
                {t[lang].loginBtn}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* МОДАЛЬНОЕ ОКНО: ВЫБОР КАТЕГОРИЙ (Задача 2) */}
      {activeModal === 'menuSheet' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-[#1a1a1a] border border-[#333] w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#333] pb-4">
              <h2 className="font-serif text-xl font-bold text-white">{t[lang].categories}</h2>
              <button onClick={() => setActiveModal(null)} className="p-2 text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-2">
              <button 
                onClick={() => { setSelectedCategory(null); setActiveModal(null); }}
                className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-colors ${!selectedCategory ? 'bg-[#d4af37] text-black font-bold' : 'bg-[#242424] text-gray-300 hover:bg-[#333]'}`}
              >
                {t[lang].allProducts}
              </button>
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); setActiveModal(null); }}
                  className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-colors ${selectedCategory === cat ? 'bg-[#d4af37] text-black font-bold' : 'bg-[#242424] text-gray-300 hover:bg-[#333]'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}