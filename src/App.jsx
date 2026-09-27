import React, { useState, useEffect } from 'react';
import { ShoppingBag, Plus, Minus, Trash2, Check, Lock, LogOut, ShieldCheck, ShoppingCart, Sparkles, ChefHat } from 'lucide-react';

const API_URL = "https://uyut-backend.onrender.com";

const DEMO_PRODUCTS = [
  {
    id: 1,
    title: "Фирменный круассан с миндалем",
    description: "Хрустящее слоеное тесто, нежный франжипан и лепестки миндаля.",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600",
    badge: "Хит",
    variants: [
      { id: 101, size: "1 шт.", price: 4500 },
      { id: 102, size: "Коробка (4 шт.)", price: 16000 }
    ]
  },
  {
    id: 2,
    title: "Шоколадный бриошь",
    description: "Сдобное воздушное тесто с начинкой из темного шоколада.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600",
    badge: "Новинка",
    variants: [
      { id: 201, size: "Стандарт", price: 5000 }
    ]
  },
  {
    id: 3,
    title: "Хлеб на закваске",
    description: "Ремесленный хлеб с хрустящей корочкой и мягким мякишем.",
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=600",
    variants: [
      { id: 301, size: "Буханка 500г", price: 6000 }
    ]
  }
];

export default function App() {
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
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-[#0d0f17] to-slate-950 text-slate-100 font-sans pb-28 selection:bg-amber-500 selection:text-slate-950">
      
      {/* ФОНОВЫЕ СВЕТОВЫЕ ЭФФЕКТЫ */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-96 bg-amber-500/10 blur-[120px] pointer-events-none rounded-full"></div>

      {/* МОБИЛЬНАЯ ШАПКА */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/60 px-4 py-3">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <ChefHat className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h1 className="text-base font-black tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                Уютная Пекарня
              </h1>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide">Свежая выпечка</p>
            </div>
          </div>

          <button 
            onClick={() => setShowAdminPanel(true)}
            className="flex items-center justify-center w-9 h-9 bg-slate-900/90 hover:bg-slate-800 text-slate-400 rounded-xl border border-slate-800 transition shadow-sm active:scale-95"
            title="Админ-панель"
          >
            <Lock className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </header>

      {/* ОСНОВНОЙ КОНТЕНТ (Ширина под телефон) */}
      <main className="max-w-md mx-auto px-4 pt-4 relative z-10">

        {orderSent ? (
          <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl text-center my-12 shadow-2xl">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
              <Check className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold mb-2 text-white">Заказ принят!</h2>
            <p className="text-slate-400 text-xs mb-6 leading-relaxed">Спасибо за заказ! Мы уже начали его готовить и скоро свяжемся с вами.</p>
            <button 
              onClick={() => setOrderSent(false)} 
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold rounded-xl transition shadow-lg shadow-amber-500/20 text-xs active:scale-95"
            >
              Вернуться в меню
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* КАРТОЧКА БЛЮД */}
            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Меню</h2>
                <span className="text-[11px] text-slate-400 bg-slate-900 px-2.5 py-0.5 rounded-full border border-slate-800">
                  {products.length} позиций
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {products.map((product) => (
                  <div key={product.id} className="bg-slate-900/70 backdrop-blur-md rounded-2xl border border-slate-800/80 overflow-hidden shadow-xl flex flex-col">
                    
                    {/* Картинка товара */}
                    <div className="relative h-40 bg-slate-800 overflow-hidden">
                      <img 
                        src={product.image || 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600'} 
                        alt={product.title} 
                        className="w-full h-full object-cover"
                      />
                      {product.badge && (
                        <span className="absolute top-2.5 left-2.5 bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-lg shadow-md">
                          {product.badge}
                        </span>
                      )}
                    </div>

                    {/* Описание и варианты */}
                    <div className="p-4 flex flex-col justify-between flex-grow">
                      <div>
                        <h3 className="font-bold text-sm text-white">{product.title}</h3>
                        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{product.description}</p>
                      </div>

                      <div className="mt-4 space-y-2 pt-3 border-t border-slate-800/60">
                        {product.variants?.map((variant) => (
                          <div key={variant.id} className="flex items-center justify-between bg-slate-950/40 px-3 py-2 rounded-xl border border-slate-800/40">
                            <span className="text-xs font-medium text-slate-300">{variant.size}</span>
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-black text-amber-400">{variant.price.toLocaleString()} ₩</span>
                              <button 
                                onClick={() => addToCart(product, variant)}
                                className="w-7 h-7 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg flex items-center justify-center transition shadow-md shadow-amber-500/20 active:scale-90"
                              >
                                <Plus className="w-4 h-4 stroke-[2.5]" />
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

            {/* КОРЗИНА (ЕСЛИ ЕСТЬ ТОВАРЫ) */}
            {cart.length > 0 && (
              <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-amber-500/30 p-4 shadow-2xl space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-amber-400" />
                    <h3 className="font-bold text-sm text-white">Ваш заказ</h3>
                  </div>
                  <span className="text-xs font-extrabold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                    {totalItemsCount} шт.
                  </span>
                </div>

                {/* Список позиций в корзине */}
                <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.cartItemId} className="flex items-center justify-between bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60">
                      <div className="flex-1 pr-2">
                        <div className="font-semibold text-xs text-white leading-tight">{item.title}</div>
                        <div className="text-[10px] text-slate-400">{item.size}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-slate-900 rounded-lg p-0.5 border border-slate-800">
                          <button onClick={() => updateCount(item.cartItemId, -1)} className="w-5 h-5 flex items-center justify-center hover:bg-slate-800 rounded text-slate-300">-</button>
                          <span className="text-xs font-bold px-1">{item.count}</span>
                          <button onClick={() => updateCount(item.cartItemId, 1)} className="w-5 h-5 flex items-center justify-center hover:bg-slate-800 rounded text-slate-300">+</button>
                        </div>
                        <span className="text-xs font-bold text-amber-400 w-14 text-right">
                          {(item.price * item.count).toLocaleString()} ₩
                        </span>
                        <button onClick={() => removeFromCart(item.cartItemId)} className="text-slate-500 hover:text-red-400 transition">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-800 pt-3 flex justify-between items-center">
                  <span className="text-slate-400 text-xs font-medium">Итого к оплате:</span>
                  <span className="text-base font-black text-amber-400">{totalPrice.toLocaleString()} ₩</span>
                </div>

                {/* Форма заказа */}
                <form onSubmit={handleOrder} className="space-y-2.5 pt-1">
                  <input 
                    type="text" 
                    required 
                    placeholder="Ваше имя"
                    value={formData.customer_name}
                    onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500 transition"
                  />
                  <input 
                    type="tel" 
                    required 
                    placeholder="Телефон (010-0000-0000)"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500 transition"
                  />
                  <input 
                    type="text" 
                    required 
                    placeholder="Дата и время доставки"
                    value={formData.delivery_date}
                    onChange={(e) => setFormData({...formData, delivery_date: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500 transition"
                  />

                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black py-3 rounded-xl transition shadow-lg shadow-amber-500/20 text-xs mt-1 active:scale-95"
                  >
                    Оформить заказ за {totalPrice.toLocaleString()} ₩
                  </button>
                </form>

              </div>
            )}

          </div>
        )}
      </main>

      {/* ОКНО АДМИН-ПАНЕЛИ */}
      {showAdminPanel && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl max-w-xs w-full relative shadow-2xl">
            
            {isAdmin ? (
              <div>
                <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-amber-500/20">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-center text-white mb-1">Режим Админа</h3>
                <p className="text-[11px] text-slate-400 text-center mb-5 leading-relaxed">Вы авторизованы в системе управления пекарней.</p>
                
                <div className="space-y-2.5">
                  <button 
                    onClick={handleAdminLogout}
                    className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold py-2.5 rounded-xl transition text-xs border border-red-500/20"
                  >
                    <LogOut className="w-4 h-4" />
                    Выйти из админки
                  </button>
                  <button 
                    onClick={() => setShowAdminPanel(false)}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-2.5 rounded-xl transition text-xs"
                  >
                    Закрыть
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="w-12 h-12 bg-slate-800 text-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-slate-700">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-center text-white mb-1">Вход для Админа</h3>
                <p className="text-[11px] text-slate-400 text-center mb-5">Введите пароль для доступа</p>
                
                <form onSubmit={handleAdminLogin} className="space-y-3">
                  <input 
                    type="password"
                    placeholder="Пароль..."
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500 transition"
                  />
                  {authError && <p className="text-red-400 text-[11px] text-center">{authError}</p>}
                  
                  <div className="flex gap-2 pt-1">
                    <button 
                      type="button" 
                      onClick={() => setShowAdminPanel(false)}
                      className="w-1/2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-2.5 rounded-xl transition text-xs"
                    >
                      Отмена
                    </button>
                    <button 
                      type="submit" 
                      className="w-1/2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2.5 rounded-xl transition text-xs shadow-md"
                    >
                      Войти
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}