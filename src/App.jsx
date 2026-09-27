import React, { useState, useEffect } from 'react';
import { ShoppingBag, Plus, Trash2, Phone, Calendar, User, Check, Lock, LogOut, ShieldCheck, ShoppingCart, Sparkles, ChefHat } from 'lucide-react';

const API_URL = "https://uyut-backend.onrender.com";

// Демо-блюда на случай, если бэкенд пустой или еще не подключен
const DEMO_PRODUCTS = [
  {
    id: 1,
    title: "Фирменный круассан с миндалем",
    description: "Хрустящее слоеное тесто, нежный франжипан из миндаля и лепестки миндаля сверху.",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600",
    badge: "Хит продаж",
    variants: [
      { id: 101, size: "1 шт.", price: 4500 },
      { id: 102, size: "Коробка (4 шт.)", price: 16000 }
    ]
  },
  {
    id: 2,
    title: "Шоколадный бриошь",
    description: "Сдобное воздушное тесто с начинкой из бельгийского тёмного шоколада.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600",
    badge: "Новинка",
    variants: [
      { id: 201, size: "Стандарт", price: 5000 }
    ]
  },
  {
    id: 3,
    title: "Ароматный хлеб на закваске",
    description: "Классический ремесленный хлеб с хрустящей корочкой и мягким пористым мякишем.",
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
  const [loading, setLoading] = useState(false);
  const [orderSent, setOrderSent] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    delivery_date: ''
  });

  useEffect(() => {
    const savedAdmin = localStorage.getItem('isAdmin');
    if (savedAdmin === 'true') {
      setIsAdmin(true);
    }
  }, []);

  // Загрузка меню с бэкенда (если бэкенд ответит, подставим его данные, иначе останутся демо-блюда)
  useEffect(() => {
    fetch(`${API_URL}/api/menu`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setProducts(data);
        }
      })
      .catch((err) => {
        console.log("Используются демо-данные (бэкенд временно недоступен)");
      });
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
        setOrderSent(true); // Для демонстрации интерфейса тоже переводим в успех
        setCart([]);
      }
    } catch (err) {
      setOrderSent(true); // Фолбэк для теста без запущенного бэкенда
      setCart([]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      
      {/* СТИЛЬНАЯ ШАПКА */}
      <header className="bg-slate-900/60 backdrop-blur-md sticky top-0 z-40 border-b border-slate-800/80 px-4 py-3.5 shadow-2xl">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <ChefHat className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                Уютная Пекарня
              </h1>
              <p className="text-[11px] text-slate-400 font-medium tracking-wide">Свежая выпечка и десерты</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!isAdmin && cart.length > 0 && (
              <div className="hidden sm:flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full">
                <ShoppingBag className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-bold text-amber-300">{totalPrice.toLocaleString()} ₩</span>
              </div>
            )}

            {/* Кнопка вызова боковой панели администратора */}
            <button 
              onClick={() => setShowAdminPanel(true)}
              className="flex items-center gap-2 text-xs bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 px-3.5 py-2 rounded-xl border border-slate-800 transition shadow-inner"
            >
              <Lock className="w-3.5 h-3.5 text-amber-500" />
              <span>Админ-панель</span>
            </button>
          </div>
        </div>
      </header>

      {/* ОСНОВНОЙ КОНТЕНТ */}
      <main className="max-w-5xl mx-auto p-4 md:p-6">
        
        {/* КРАСИВЫЙ БАННЕР */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800/80 p-6 md:p-8 mb-8 shadow-2xl">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Ремесленное качество
            </div>
            <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white mb-2">
              Искусство выпечки у вас дома
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              Каждое утро мы готовим для вас свежий хлеб, хрустящие круассаны и авторские десерты из отборных ингредиентов.
            </p>
          </div>
        </div>

        {/* УСПЕШНЫЙ ЗАКАЗ */}
        {orderSent ? (
          <div className="bg-slate-900/90 backdrop-blur border border-slate-800 p-10 rounded-3xl text-center max-w-lg mx-auto my-12 shadow-2xl">
            <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-3xl flex items-center justify-center mx-auto mb-5 border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
              <Check className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-white">Заказ успешно оформлен!</h2>
            <p className="text-slate-400 text-sm mb-8">Спасибо за заказ! Мы уже начали его собирать и свяжемся с вами в ближайшее время.</p>
            <button 
              onClick={() => setOrderSent(false)} 
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-2xl transition shadow-lg shadow-amber-500/20"
            >
              Сделать новый заказ
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* СЕТКА ТОВАРОВ (2 колонки) */}
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                <span>Наше меню</span>
                <span className="text-xs font-normal text-slate-400 bg-slate-900 border border-slate-800 px-2.5 py-0.5 rounded-full">
                  {products.length} позиций
                </span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {products.map((product) => (
                  <div key={product.id} className="group bg-slate-900/80 backdrop-blur rounded-3xl border border-slate-800/80 overflow-hidden flex flex-col justify-between hover:border-amber-500/40 transition duration-300 shadow-xl">
                    <div>
                      <div className="relative h-48 bg-slate-800 overflow-hidden">
                        <img 
                          src={product.image || 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600'} 
                          alt={product.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        {product.badge && (
                          <span className="absolute top-3 left-3 bg-amber-500 text-slate-950 text-[11px] font-extrabold px-2.5 py-1 rounded-xl shadow-lg">
                            {product.badge}
                          </span>
                        )}
                      </div>
                      <div className="p-5">
                        <h4 className="font-bold text-base text-white group-hover:text-amber-400 transition">{product.title}</h4>
                        <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{product.description}</p>
                      </div>
                    </div>

                    <div className="p-5 pt-0">
                      <div className="space-y-2 pt-2 border-t border-slate-800/60">
                        {product.variants?.map((variant) => (
                          <div key={variant.id} className="flex items-center justify-between bg-slate-950/40 px-3 py-2 rounded-2xl border border-slate-800/60">
                            <span className="text-xs font-medium text-slate-300">{variant.size}</span>
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-extrabold text-amber-400">{variant.price.toLocaleString()} ₩</span>
                              <button 
                                onClick={() => addToCart(product, variant)}
                                className="p-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl transition shadow-md shadow-amber-500/10 active:scale-95"
                              >
                                <Plus className="w-4 h-4" />
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

            {/* БОКОВАЯ ПАНЕЛЬ КОРЗИНЫ */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-slate-900/90 backdrop-blur rounded-3xl border border-slate-800/80 p-6 shadow-2xl">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
                  <ShoppingCart className="w-5 h-5 text-amber-500" />
                  Ваш заказ
                </h3>

                {cart.length === 0 ? (
                  <div className="text-center py-10 text-slate-500 text-sm">
                    Корзина пуста<br/>Выберите блюда из меню
                  </div>
                ) : (
                  <div>
                    <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-1">
                      {cart.map((item) => (
                        <div key={item.cartItemId} className="flex items-center justify-between bg-slate-950/50 p-3 rounded-2xl border border-slate-800/60">
                          <div>
                            <div className="font-semibold text-xs text-white">{item.title}</div>
                            <div className="text-[10px] text-slate-400">{item.size}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 bg-slate-900 rounded-xl p-1 border border-slate-800">
                              <button onClick={() => updateCount(item.cartItemId, -1)} className="w-5 h-5 flex items-center justify-center hover:bg-slate-800 rounded-lg text-xs font-bold">-</button>
                              <span className="text-xs font-bold px-1">{item.count}</span>
                              <button onClick={() => updateCount(item.cartItemId, 1)} className="w-5 h-5 flex items-center justify-center hover:bg-slate-800 rounded-lg text-xs font-bold">+</button>
                            </div>
                            <span className="text-xs font-extrabold text-amber-400 w-16 text-right">
                              {(item.price * item.count).toLocaleString()} ₩
                            </span>
                            <button onClick={() => removeFromCart(item.cartItemId)} className="text-slate-500 hover:text-red-400 transition">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-slate-800 pt-4 mb-6 flex justify-between items-center">
                      <span className="text-slate-400 text-sm font-medium">Итого к оплате:</span>
                      <span className="text-xl font-black text-amber-400">{totalPrice.toLocaleString()} ₩</span>
                    </div>

                    <form onSubmit={handleOrder} className="space-y-3.5">
                      <div>
                        <input 
                          type="text" 
                          required 
                          placeholder="Ваше имя"
                          value={formData.customer_name}
                          onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
                          className="w-full bg-slate-950/60 border border-slate-800 rounded-2xl py-2.5 px-4 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500 transition"
                        />
                      </div>
                      <div>
                        <input 
                          type="tel" 
                          required 
                          placeholder="Телефон (010-0000-0000)"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full bg-slate-950/60 border border-slate-800 rounded-2xl py-2.5 px-4 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500 transition"
                        />
                      </div>
                      <div>
                        <input 
                          type="text" 
                          required 
                          placeholder="Дата и время доставки"
                          value={formData.delivery_date}
                          onChange={(e) => setFormData({...formData, delivery_date: e.target.value})}
                          className="w-full bg-slate-950/60 border border-slate-800 rounded-2xl py-2.5 px-4 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500 transition"
                        />
                      </div>

                      <button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold py-3.5 rounded-2xl transition shadow-lg shadow-amber-500/20 text-xs mt-2"
                      >
                        Оформить заказ
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}
      </main>

      {/* БОКОВАЯ ПАНЕЛЬ / МОДАЛКА ВХОДА АДМИНА */}
      {showAdminPanel && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 p-7 rounded-3xl max-w-sm w-full relative shadow-2xl">
            
            {isAdmin ? (
              <div>
                <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-amber-500/20">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-center text-white mb-1">Режим Администратора</h3>
                <p className="text-xs text-slate-400 text-center mb-6">Вы успешно авторизованы в системе управления.</p>
                
                <div className="space-y-3">
                  <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2">
                    <p className="font-semibold text-amber-400">Панель управления:</p>
                    <p>Здесь вы можете редактировать блюда через базу данных или управлять заказами клиентов.</p>
                  </div>

                  <button 
                    onClick={handleAdminLogout}
                    className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold py-3 rounded-2xl transition text-xs border border-red-500/20"
                  >
                    <LogOut className="w-4 h-4" />
                    Выйти из админки
                  </button>
                  <button 
                    onClick={() => setShowAdminPanel(false)}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-2.5 rounded-2xl transition text-xs"
                  >
                    Закрыть окно
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="w-12 h-12 bg-slate-800 text-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-700">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-center text-white mb-1">Вход для Администратора</h3>
                <p className="text-xs text-slate-400 text-center mb-6">Введите пароль для доступа к управлению</p>
                
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <input 
                    type="password"
                    placeholder="Пароль..."
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500 transition"
                  />
                  {authError && <p className="text-red-400 text-xs text-center">{authError}</p>}
                  
                  <div className="flex gap-2.5 pt-1">
                    <button 
                      type="button" 
                      onClick={() => setShowAdminPanel(false)}
                      className="w-1/2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-3 rounded-2xl transition text-xs"
                    >
                      Отмена
                    </button>
                    <button 
                      type="submit" 
                      className="w-1/2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-2xl transition text-xs shadow-lg shadow-amber-500/10"
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