import React, { useState, useEffect, useMemo } from 'react';
import { ShoppingBag, Plus, Minus, Star, TrendingUp, Globe } from 'lucide-react';

const API_URL = "https://uyut-backend.onrender.com";

const translations = {
  ru: {
    title: "Уют Кафе",
    all: "Все",
    hit: "Хит",
    new: "Новинка",
    premium: "Премиум",
    sortBy: "Сортировка:",
    sortOrders: "По заказам",
    sortRating: "По рейтингу",
    sortPriceAsc: "Сначала дешевые",
    sortPriceDesc: "Сначала дорогие",
    orders: "заказов",
    addToCart: "Добавить",
    total: "Итого:",
    checkout: "Оформить заказ",
    empty: "Товары не найдены",
    namePlaceholder: "Ваше имя",
    phonePlaceholder: "Телефон",
    datePlaceholder: "Дата доставки",
    sendOrder: "Подтвердить заказ",
    success: "Заказ успешно оформлен!"
  },
  en: {
    title: "Uyut Cafe",
    all: "All",
    hit: "Hit",
    new: "New",
    premium: "Premium",
    sortBy: "Sort by:",
    sortOrders: "Popularity",
    sortRating: "Rating",
    sortPriceAsc: "Price: Low to High",
    sortPriceDesc: "Price: High to Low",
    orders: "orders",
    addToCart: "Add",
    total: "Total:",
    checkout: "Checkout",
    empty: "No products found",
    namePlaceholder: "Your Name",
    phonePlaceholder: "Phone",
    datePlaceholder: "Delivery Date",
    sendOrder: "Confirm Order",
    success: "Order successfully placed!"
  }
};

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentLang, setCurrentLang] = useState('ru');
  const [sortBy, setSortBy] = useState('orders');
  const [loading, setLoading] = useState(true);
  
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderSent, setOrderSent] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    delivery_date: ''
  });

  const t = translations[currentLang];

  useEffect(() => {
    fetch(`${API_URL}/menu`)
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.items || [];
        const enrichedData = list.map((item, index) => ({
          ...item,
          rating: item.rating || (4.5 + (index % 5) * 0.1).toFixed(1),
          ordersCount: item.ordersCount || (10 + index * 15),
          badge: item.badge || (index === 0 ? 'hit' : index === 1 ? 'new' : index === 2 ? 'premium' : 'none')
        }));
        setProducts(enrichedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка загрузки меню:", err);
        setLoading(false);
      });
  }, []);

  const renderBadge = (badgeKey) => {
    if (!badgeKey || badgeKey === 'none') return null;
    const labels = { hit: t.hit, new: t.new, premium: t.premium };
    const colors = {
      hit: 'bg-amber-500 text-neutral-950',
      new: 'bg-emerald-500 text-neutral-950',
      premium: 'bg-purple-500 text-white'
    };
    return (
      <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-bold shadow ${colors[badgeKey] || 'bg-neutral-700 text-white'}`}>
        {labels[badgeKey] || badgeKey}
      </span>
    );
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    result.sort((a, b) => {
      if (sortBy === 'orders') return (b.ordersCount || 0) - (a.ordersCount || 0);
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'price_asc') {
        const minA = a.variants?.[0]?.price || a.price || 0;
        const minB = b.variants?.[0]?.price || b.price || 0;
        return minA - minB;
      }
      if (sortBy === 'price_desc') {
        const maxA = a.variants?.[0]?.price || a.price || 0;
        const maxB = b.variants?.[0]?.price || b.price || 0;
        return maxB - maxA;
      }
      return 0;
    });

    return result;
  }, [products, activeCategory, sortBy]);

  const addToCart = (product, variant) => {
    const cartItemId = `${product.id}-${variant?.id || 'default'}`;
    const price = variant?.price || product.price || 0;
    const size = variant?.size || '';
    const existing = cart.find((item) => item.cartItemId === cartItemId);

    if (existing) {
      setCart(cart.map((item) => item.cartItemId === cartItemId ? { ...item, count: item.count + 1 } : item));
    } else {
      setCart([...cart, {
        cartItemId,
        product_id: product.id,
        title: product.title,
        size,
        price,
        count: 1
      }]);
    }
  };

  const updateCount = (cartItemId, delta) => {
    setCart(cart.map((item) => {
      if (item.cartItemId === cartItemId) {
        const newCount = item.count + delta;
        return newCount > 0 ? { ...item, count: newCount } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.count, 0);

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const payload = {
      customer_name: formData.customer_name,
      phone: formData.phone,
      delivery_date: formData.delivery_date,
      items: cart.map((item) => ({
        product_id: item.product_id,
        quantity: item.count,
        price: item.price
      })),
      total_price: totalPrice
    };

    fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then((res) => {
        if (res.ok) {
          setOrderSent(true);
          setCart([]);
        }
      })
      .catch((err) => console.error("Ошибка оформления заказа:", err));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans pb-32">
      <header className="p-4 bg-neutral-900/80 backdrop-blur-md border-b border-neutral-800 sticky top-0 z-20 flex items-center justify-between max-w-xl mx-auto">
        <h1 className="text-xl font-bold text-amber-500 flex items-center gap-2">
          🥐 {t.title}
        </h1>
        <button
          onClick={() => setCurrentLang(currentLang === 'ru' ? 'en' : 'ru')}
          className="flex items-center gap-1 px-3 py-1 bg-neutral-800 border border-neutral-700 rounded-full text-xs hover:bg-neutral-700 transition cursor-pointer"
        >
          <Globe className="w-3.5 h-3.5 text-amber-500" />
          {currentLang.toUpperCase()}
        </button>
      </header>

      <main className="p-4 max-w-xl mx-auto space-y-4">
        <div className="bg-neutral-900 p-3 rounded-xl border border-neutral-800 flex items-center justify-between gap-2 text-sm">
          <div className="flex items-center gap-1 text-neutral-400 text-xs">
            <TrendingUp className="w-4 h-4 text-amber-500" />
            <span>{t.sortBy}</span>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-neutral-800 text-neutral-200 border border-neutral-700 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-amber-500"
          >
            <option value="orders">{t.sortOrders}</option>
            <option value="rating">{t.sortRating}</option>
            <option value="price_asc">{t.sortPriceAsc}</option>
            <option value="price_desc">{t.sortPriceDesc}</option>
          </select>
        </div>

        {filteredAndSortedProducts.length === 0 ? (
          <p className="text-center text-neutral-500 py-12">{t.empty}</p>
        ) : (
          <div className="grid gap-4">
            {filteredAndSortedProducts.map((product) => {
              const variants = product.variants && product.variants.length > 0 
                ? product.variants 
                : [{ id: 'default', size: '', price: product.price || 0 }];

              return (
                <div key={product.id} className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800 flex gap-4 relative overflow-hidden shadow-lg">
                  {renderBadge(product.badge)}
                  
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-28 h-28 object-cover rounded-xl flex-shrink-0 bg-neutral-800"
                    />
                  ) : (
                    <div className="w-28 h-28 bg-neutral-800 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">🥐</div>
                  )}
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-base text-neutral-100">{product.title}</h3>
                      <p className="text-xs text-neutral-400 line-clamp-2 mt-0.5">{product.description}</p>
                      
                      <div className="flex items-center gap-3 mt-2 text-xs text-neutral-400">
                        <span className="flex items-center gap-1 text-amber-400">
                          <Star className="w-3.5 h-3.5 fill-amber-400" /> {product.rating}
                        </span>
                        <span>•</span>
                        <span>{product.ordersCount} {t.orders}</span>
                      </div>
                    </div>

                    <div className="mt-3 space-y-2 border-t border-neutral-800/80 pt-2">
                      {variants.map((variant) => (
                        <div key={variant.id} className="flex items-center justify-between text-sm">
                          <span className="text-neutral-300 text-xs font-medium">
                            {variant.size ? `${variant.size} — ` : ''}<strong className="text-amber-500">{variant.price} ₽</strong>
                          </span>
                          <button
                            onClick={() => addToCart(product, variant)}
                            className="px-3 py-1 bg-amber-500 text-neutral-950 font-bold rounded-lg text-xs hover:bg-amber-400 transition flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" /> {t.addToCart}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-neutral-900/95 backdrop-blur-md border-t border-neutral-800 p-4 max-w-xl mx-auto z-30 shadow-2xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-neutral-400">{t.total}</span>
            <span className="text-xl font-black text-amber-500">{totalPrice} ₽</span>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="w-full bg-amber-500 text-neutral-950 font-extrabold py-3.5 rounded-xl hover:bg-amber-400 transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            {t.checkout} ({cart.reduce((a, b) => a + b.count, 0)})
          </button>
        </div>
      )}

      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-neutral-900 w-full max-w-lg rounded-t-3xl sm:rounded-2xl p-6 border border-neutral-800 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
              <h3 className="text-lg font-bold text-amber-500">{t.checkout}</h3>
              <button onClick={() => setIsCheckoutOpen(false)} className="text-neutral-400 hover:text-white text-lg font-bold cursor-pointer">✕</button>
            </div>

            {orderSent ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto text-xl font-bold">✓</div>
                <p className="text-lg font-semibold text-emerald-400">{t.success}</p>
                <button
                  onClick={() => { setOrderSent(false); setIsCheckoutOpen(false); }}
                  className="mt-4 px-6 py-2 bg-neutral-800 rounded-xl text-sm font-bold hover:bg-neutral-700 transition cursor-pointer"
                >
                  OK
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitOrder} className="space-y-4">
                <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                  {cart.map((item) => (
                    <div key={item.cartItemId} className="flex items-center justify-between text-xs bg-neutral-800/50 p-2 rounded-lg">
                      <div>
                        <p className="font-semibold">{item.title} {item.size ? `(${item.size})` : ''}</p>
                        <p className="text-amber-500">{item.price} ₽ × {item.count}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button type="button" onClick={() => updateCount(item.cartItemId, -1)} className="p-1 bg-neutral-700 rounded hover:bg-neutral-600 cursor-pointer"><Minus className="w-3 h-3" /></button>
                        <span>{item.count}</span>
                        <button type="button" onClick={() => updateCount(item.cartItemId, 1)} className="p-1 bg-neutral-700 rounded hover:bg-neutral-600 cursor-pointer"><Plus className="w-3 h-3" /></button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-2">
                  <input
                    type="text"
                    placeholder={t.namePlaceholder}
                    required
                    value={formData.customer_name}
                    onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500"
                  />
                  <input
                    type="tel"
                    placeholder={t.phonePlaceholder}
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500"
                  />
                  <input
                    type="text"
                    placeholder={t.datePlaceholder}
                    value={formData.delivery_date}
                    onChange={(e) => setFormData({ ...formData, delivery_date: e.target.value })}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-neutral-800 font-bold">
                  <span>{t.total}</span>
                  <span className="text-amber-500 text-lg">{totalPrice} ₽</span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 text-neutral-950 font-extrabold py-3 rounded-xl hover:bg-amber-400 transition cursor-pointer"
                >
                  {t.sendOrder}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}