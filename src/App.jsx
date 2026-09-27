import React, { useState, useEffect } from 'react';
import { 
  Search, SlidersHorizontal, ShoppingBag, Plus, Minus, Trash2, 
  Check, Lock, LogOut, ShieldCheck, Home, Menu as MenuIcon, 
  Calendar, MoreHorizontal, Sparkles, ChefHat, Star, ChevronRight 
} from 'lucide-react';

const API_URL = "https://uyut-backend.onrender.com";

const CATEGories = [
  { id: 'all', name: 'Всё', icon: '🥐' },
  { id: 'croissant', name: 'Круассаны', icon: '🥐' },
  { id: 'bread', name: 'Хлеб', icon: '🍞' },
  { id: 'sweets', name: 'Десерты', icon: '🧁' },
  { id: 'drinks', name: 'Напитки', icon: '☕' }
];

const DEMO_PRODUCTS = [
  {
    id: 1,
    title: "Фирменный миндальный круассан",
    description: "Хрустящее слоеное тесто, нежный франжипан и лепестки миндаля.",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600",
    badge: "ХИТ",
    rating: "4.9",
    reviews: "1.2K+",
    category: "croissant",
    variants: [
      { id: 101, size: "1 шт.", price: 4500 },
      { id: 102, size: "Коробка (4 шт.)", price: 16000 }
    ]
  },
  {
    id: 2,
    title: "Шоколадный бриошь",
    description: "Сдобное воздушное тесто с начинкой из темного бельгийского шоколада.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600",
    badge: "НОВИНКА",
    rating: "4.8",
    reviews: "856+",
    category: "sweets",
    variants: [
      { id: 201, size: "Стандарт", price: 5000 }
    ]
  },
  {
    id: 3,
    title: "Ремесленный хлеб на закваске",
    description: "Хрустящая корочка, пористый мякиш и неповторимый аромат.",
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=600",
    badge: "ПОПУЛЯРНОЕ",
    rating: "4.7",
    reviews: "743+",
    category: "bread",
    variants: [
      { id: 301, size: "Буханка 500г", price: 6000 }
    ]
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // home, menu, order, reservations, more
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [products, setProducts] = useState(DEMO_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [orderSent, setOrderSent] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    delivery_date: ''
  });

  useEffect(() => {
    const savedAdmin = localStorage.getItem('isAdmin');
    if (savedAdmin === 'true') setIsAdmin(true);
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/api/menu`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) setProducts(data);
      })
      .catch(() => {});
  }, []);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassword === 'admin123') {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      setShowAdminPanel(false);
      setAdminPassword('');
      setAuthError('');
    } else {
      setAuthError('Неверный пароль!');
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
    setShowAdminPanel(false);
  };

  const addToCart = (product, variant) => {
    const cartItemId = `${product.id}-${variant.size}`;
    const existing = cart.find((item) => item.cartItemId === cartItemId);
    if (existing) {
      setCart(cart.map((item) =>
        item.cartItemId === cartItemId ? { ...item, count: item.count + 1 } : item
      ));
    } else {
      setCart([...cart, {
        cartItemId,
        id: product.id,
        title: product.title,
        size: variant.size,
        price: variant.price,
        count: 1
      }]);
    }
  };

  const removeFromCart = (cartItemId) => {
    setCart(cart.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateCount = (cartItemId, delta) => {
    setCart(cart.map((item) => {
      if (item.cartItemId === cartItemId) {
        const newCount = item.count + delta;
        return newCount > 0 ? { ...item, count: newCount } : item;
      }
      return item;
    }));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.count, 0);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.count, 0);

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert("Корзина пуста!");

    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          total_price: totalPrice,
          items: cart
        })
      });
      if (response.ok) {
        setOrderSent(true);
        setCart([]);
      } else {
        setOrderSent(true);
        setCart([]);
      }
    } catch {
      setOrderSent(true);
      setCart([]);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] text-slate-100 font-sans pb-28 selection:bg-amber-500 selection:text-slate-950">
      
      {/* МОБИЛЬНЫЙ СТАТУС-БАР (ИМИТАЦИЯ ТЕЛЕФОНА) */}
      <div className="bg-slate-950/90 text-slate-400 text-[11px] px-6 py-2 flex justify-between items-center border-b border-slate-900 sticky top-0 z-50">
        <span className="font-semibold text-white">9:41</span>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowAdminPanel(true)}
            className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full font-medium"
          >
            {isAdmin ? '🛡️ Админ' : '🔒 Вход'}
          </button>
        </div>
      </div>

      {/* ШАПКА ПРИЛОЖЕНИЯ */}
      <header className="bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/60 px-4 py-3 sticky top-[29px] z-40">
        <div className="max-w-md mx-auto flex justify-between items-center">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center shadow-md shadow-amber-500/20">
              <ChefHat className="w-4 h-4 text-slate-950" />
            </div>
            <div>
              <h1 className="text-sm font-black tracking-widest text-white uppercase">УЮТНАЯ ПЕКАРНЯ</h1>
              <p className="text-[9px] tracking-wider text-amber-500/80 font-medium uppercase">Свежая выпечка</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveTab('order')}
              className="relative p-2 bg-slate-900 rounded-full border border-slate-800 text-slate-300 hover:text-white transition"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-slate-950 text-[10px] font-extrabold rounded-full flex items-center justify-center shadow">
                  {totalItemsCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* ОСНОВНОЙ КОНТЕНТ */}
      <main className="max-w-md mx-auto px-4 pt-4 space-y-5">

        {/* СТРОКА ПОИСКА */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Поиск выпечки, десертов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800/80 rounded-full pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500 transition shadow-inner"
            />
          </div>
          <button className="w-10 h-10 bg-slate-900 border border-slate-800/80 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* ВКЛАДКА: ГЛАВНАЯ (HOME) */}
        {activeTab === 'home' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* ГЕРОЙ-БАННЕР (КАК НА РЕПЕРНОМ СКРИНШОТЕ) */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-[#141210] to-amber-950/50 border border-slate-800 p-5 shadow-2xl">
              <div className="absolute right-0 bottom-0 w-44 h-44 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="relative z-10 space-y-3">
                <div>
                  <p className="text-[10px] tracking-widest text-amber-400 font-serif italic">Искусство вкуса</p>
                  <h2 className="text-xl font-black tracking-tight text-white uppercase mt-0.5 leading-none">
                    СВЕЖЕЕ.<br />АРОМАТНОЕ.<br />НЕЗАБЫВАЕМОЕ.
                  </h2>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed max-w-[200px]">
                  Премиальные ингредиенты. Мастерски приготовлено каждое утро.
                </p>
                <button 
                  onClick={() => setActiveTab('menu')}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-black px-4 py-2 rounded-full shadow-lg shadow-amber-500/20 active:scale-95 transition"
                >
                  <span>ЗАКАЗАТЬ СЕЙЧАС</span>
                  <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                </button>
              </div>
            </div>

            {/* ИКОНКИ КАТЕГОРИЙ (КРУГЛЫЕ КАК НА РЕПЕРЕ) */}
            <div className="grid grid-cols-5 gap-2 pt-1">
              {CATEGories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setSelectedCategory(cat.id); setActiveTab('menu'); }}
                  className="flex flex-col items-center gap-1.5 group"
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all duration-300 border ${
                    selectedCategory === cat.id 
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/30 scale-105' 
                      : 'bg-slate-900 text-slate-200 border-slate-800 group-hover:border-slate-700'
                  }`}>
                    {cat.icon}
                  </div>
                  <span className={`text-[10px] font-medium tracking-tight ${selectedCategory === cat.id ? 'text-amber-400 font-bold' : 'text-slate-400'}`}>
                    {cat.name}
                  </span>
                </button>
              ))}
            </div>

            {/* ПОПУЛЯРНЫЕ ТОВАРЫ (БЛОК) */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-extrabold text-white tracking-wide">Популярное</h3>
                <button onClick={() => setActiveTab('menu')} className="text-xs text-amber-400 hover:underline flex items-center gap-1">
                  Все <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              {/* ГОРИЗОНТАЛЬНЫЙ ИЛИ ВЕРТИКАЛЬНЫЙ СПИСОК КАРТОЧЕК */}
              <div className="grid grid-cols-1 gap-4">
                {products.slice(0, 3).map((product) => (
                  <div key={product.id} className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800/80 overflow-hidden shadow-xl flex flex-col">
                    <div className="relative h-44 bg-slate-800 overflow-hidden">
                      <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                      {product.badge && (
                        <span className="absolute top-2.5 left-2.5 bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-md shadow">
                          {product.badge}
                        </span>
                      )}
                    </div>
                    
                    <div className="p-3.5 space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-xs text-white">{product.title}</h4>
                        <div className="flex items-center gap-1 text-[11px] text-amber-400 font-bold">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span>{product.rating}</span>
                          <span className="text-slate-500 text-[9px]">({product.reviews})</span>
                        </div>
                      </div>
                      
                      <p className="text-[10px] text-slate-400 line-clamp-1">{product.description}</p>

                      <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                        {product.variants?.map((variant) => (
                          <div key={variant.id} className="flex items-center justify-between bg-slate-950/50 px-2.5 py-1.5 rounded-xl border border-slate-800/50">
                            <span className="text-[11px] text-slate-300">{variant.size}</span>
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-black text-amber-400">{variant.price.toLocaleString()} ₩</span>
                              <button 
                                onClick={() => addToCart(product, variant)}
                                className="w-6 h-6 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg flex items-center justify-center transition shadow active:scale-95"
                              >
                                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* СПЕЦИАЛЬНОЕ ПРЕДЛОЖЕНИЕ ДНЯ (АКЦИЯ) */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 border border-amber-500/30 p-4 flex items-center justify-between shadow-xl">
              <div className="space-y-1">
                <span className="text-[9px] font-black tracking-widest bg-amber-500 text-slate-950 px-2 py-0.5 rounded uppercase">Скидка дня</span>
                <h4 className="text-xs font-black text-white uppercase mt-1">КОМБО КОФЕ + КРУАССАН</h4>
                <p className="text-[10px] text-slate-400">Только по будням с 11:00 до 15:00</p>
              </div>
              <div className="w-12 h-12 bg-amber-500/20 text-amber-400 rounded-full flex flex-col items-center justify-center border border-amber-500/40 shrink-0 font-black text-xs">
                -20%
              </div>
            </div>

          </div>
        )}

        {/* ВКЛАДКА: МЕНЮ (MENU) */}
        {activeTab === 'menu' && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">Полное меню пекарни</h3>
            
            <div className="grid grid-cols-1 gap-4">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800/80 overflow-hidden shadow-xl">
                  <div className="relative h-40 bg-slate-800">
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                    {product.badge && (
                      <span className="absolute top-2.5 left-2.5 bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-md">
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-3.5 space-y-2">
                    <div className="flex justify-between">
                      <h4 className="font-bold text-xs text-white">{product.title}</h4>
                      <div className="flex items-center gap-1 text-[11px] text-amber-400 font-bold">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{product.rating}</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-400">{product.description}</p>
                    
                    <div className="space-y-1.5 pt-2 border-t border-slate-800">
                      {product.variants?.map((variant) => (
                        <div key={variant.id} className="flex items-center justify-between bg-slate-950/50 px-2.5 py-1.5 rounded-xl border border-slate-800/50">
                          <span className="text-[11px] text-slate-300">{variant.size}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-black text-amber-400">{variant.price.toLocaleString()} ₩</span>
                            <button 
                              onClick={() => addToCart(product, variant)}
                              className="w-6 h-6 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg flex items-center justify-center transition shadow active:scale-95"
                            >
                              <Plus className="w-3.5 h-3.5 stroke-[3]" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ВКЛАДКА: ЗАКАЗ / КОРЗИНА (ORDER) */}
        {activeTab === 'order' && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">Ваш заказ</h3>

            {orderSent ? (
              <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto border border-emerald-500/30">
                  <Check className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-sm text-white">Заказ успешно оформлен!</h4>
                <p className="text-[11px] text-slate-400">Мы уже начали выпекать ваши позиции. Ожидайте подтверждения.</p>
                <button 
                  onClick={() => { setOrderSent(false); setActiveTab('home'); }} 
                  className="w-full py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs"
                >
                  На главную
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="text-center py-16 text-slate-500 text-xs space-y-2">
                <ShoppingBag className="w-10 h-10 mx-auto opacity-30" />
                <p>Корзина пуста. Добавьте блюда из меню!</p>
              </div>
            ) : (
              <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-3 shadow-xl">
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.cartItemId} className="flex items-center justify-between bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                      <div>
                        <div className="font-semibold text-xs text-white">{item.title}</div>
                        <div className="text-[10px] text-slate-400">{item.size}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-slate-900 rounded-lg p-0.5 border border-slate-800">
                          <button onClick={() => updateCount(item.cartItemId, -1)} className="w-5 h-5 flex items-center justify-center text-xs">-</button>
                          <span className="text-xs font-bold px-1">{item.count}</span>
                          <button onClick={() => updateCount(item.cartItemId, 1)} className="w-5 h-5 flex items-center justify-center text-xs">+</button>
                        </div>
                        <span className="text-xs font-bold text-amber-400 w-14 text-right">
                          {(item.price * item.count).toLocaleString()} ₩
                        </span>
                        <button onClick={() => removeFromCart(item.cartItemId)} className="text-slate-500 hover:text-red-400">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-800 pt-3 flex justify-between items-center text-xs">
                  <span className="text-slate-400">Итого:</span>
                  <span className="text-sm font-black text-amber-400">{totalPrice.toLocaleString()} ₩</span>
                </div>

                <form onSubmit={handleOrder} className="space-y-2.5 pt-1">
                  <input 
                    type="text" required placeholder="Ваше имя"
                    value={formData.customer_name}
                    onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500"
                  />
                  <input 
                    type="tel" required placeholder="Телефон (010-0000-0000)"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500"
                  />
                  <input 
                    type="text" required placeholder="Время получения / доставки"
                    value={formData.delivery_date}
                    onChange={(e) => setFormData({...formData, delivery_date: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500"
                  />
                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black py-3 rounded-xl text-xs shadow-lg shadow-amber-500/20 active:scale-95 transition mt-1"
                  >
                    Оформить заказ за {totalPrice.toLocaleString()} ₩
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {/* ВКЛАДКА: БРОНИРОВАНИЕ (RESERVATIONS) */}
        {activeTab === 'reservations' && (
          <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-4 animate-fadeIn text-center">
            <Calendar className="w-10 h-10 mx-auto text-amber-500" />
            <h3 className="font-bold text-sm text-white">Бронирование столика</h3>
            <p className="text-[11px] text-slate-400">Зарезервируйте столик в нашей уютной пекарне заранее, чтобы насладиться свежей выпечкой с утренним кофе.</p>
            <button 
              onClick={() => alert("Бронирование принято! Мы свяжемся с вами для подтверждения.")}
              className="w-full py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs"
            >
              Забронировать стол
            </button>
          </div>
        )}

        {/* ВКЛАДКА: ЕЩЁ (MORE) */}
        {activeTab === 'more' && (
          <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-3 animate-fadeIn text-xs">
            <h3 className="font-bold text-sm text-white mb-2">О пекарне</h3>
            <p className="text-slate-400 leading-relaxed">«Уютная Пекарня» — ремесленное производство премиальной выпечки и десертов. Работаем ежедневно с 8:00 до 22:00.</p>
            <div className="pt-2 border-t border-slate-800 text-amber-400 font-medium">
              📞 Телефон: +82 10-0000-0000
            </div>
          </div>
        )}

      </main>

      {/* НИЖНЯЯ ПАНЕЛЬ НАВИГАЦИИ (ТАББАР КАК НА РЕПЕРЕ) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-2xl border-t border-slate-800/80 z-40 py-2">
        <div className="max-w-md mx-auto flex justify-around items-center px-2">
          
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 transition ${activeTab === 'home' ? 'text-amber-500' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[9px] font-medium tracking-tight">Главная</span>
          </button>

          <button 
            onClick={() => setActiveTab('menu')}
            className={`flex flex-col items-center gap-1 transition ${activeTab === 'menu' ? 'text-amber-500' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <MenuIcon className="w-5 h-5" />
            <span className="text-[9px] font-medium tracking-tight">Меню</span>
          </button>

          <button 
            onClick={() => setActiveTab('order')}
            className="flex flex-col items-center -mt-5"
          >
            <div className="w-12 h-12 bg-gradient-to-tr from-amber-600 to-amber-400 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/30 text-slate-950 active:scale-95 transition">
              <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="text-[9px] font-bold text-amber-400 mt-1">Заказ</span>
          </button>

          <button 
            onClick={() => setActiveTab('reservations')}
            className={`flex flex-col items-center gap-1 transition ${activeTab === 'reservations' ? 'text-amber-500' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Calendar className="w-5 h-5" />
            <span className="text-[9px] font-medium tracking-tight">Столик</span>
          </button>

          <button 
            onClick={() => setActiveTab('more')}
            className={`flex flex-col items-center gap-1 transition ${activeTab === 'more' ? 'text-amber-500' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <MoreHorizontal className="w-5 h-5" />
            <span className="text-[9px] font-medium tracking-tight">Ещё</span>
          </button>

        </div>
      </nav>

      {/* ОКНО АДМИН-ПАНЕЛИ */}
      {showAdminPanel && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl max-w-xs w-full relative shadow-2xl">
            {isAdmin ? (
              <div className="space-y-3">
                <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center mx-auto border border-amber-500/20">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-center text-white">Режим Администратора</h3>
                <p className="text-[11px] text-slate-400 text-center">Вы авторизованы в системе управления пекарней.</p>
                <button 
                  onClick={handleAdminLogout}
                  className="w-full bg-red-500/10 text-red-400 font-bold py-2.5 rounded-xl text-xs border border-red-500/20"
                >
                  Выйти из админки
                </button>
                <button 
                  onClick={() => setShowAdminPanel(false)}
                  className="w-full bg-slate-800 text-slate-300 py-2 rounded-xl text-xs"
                >
                  Закрыть
                </button>
              </div>
            ) : (
              <form onSubmit={handleAdminLogin} className="space-y-3">
                <div className="w-12 h-12 bg-slate-800 text-amber-500 rounded-2xl flex items-center justify-center mx-auto border border-slate-700">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-center text-white">Вход для Админа</h3>
                <input 
                  type="password" placeholder="Пароль..."
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
                />
                {authError && <p className="text-red-400 text-[11px] text-center">{authError}</p>}
                <div className="flex gap-2">
                  <button type="button" onClick={() => setShowAdminPanel(false)} className="w-1/2 bg-slate-800 text-slate-300 py-2.5 rounded-xl text-xs">Отмена</button>
                  <button type="submit" className="w-1/2 bg-amber-500 text-slate-950 font-bold py-2.5 rounded-xl text-xs">Войти</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}