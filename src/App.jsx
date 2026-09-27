import React, { useState } from 'react';
import { supabase } from './supabaseClient';

export default function App() {
  const [dishes, setDishes] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [newDish, setNewDish] = useState({
    name: '',
    category: 'Восточная кухня',
    price: '',
    description: '',
    image: ''
  });

  // Загрузка файла напрямую в Supabase Storage
  const handleFileUpload = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      setUploading(true);

      // Генерируем уникальное имя файла
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `menu/${fileName}`;

      // 1. Отправляем файл с диска в бакет 'dishes'
      const { error: uploadError } = await supabase.storage
        .from('dishes')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Получаем публичную постоянную ссылку
      const { data } = supabase.storage
        .from('dishes')
        .getPublicUrl(filePath);

      setNewDish(prev => ({ ...prev, image: data.publicUrl }));
    } catch (error) {
      alert('Ошибка при загрузке фото: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  // Сохранение нового блюда
  const handleAddDish = (e) => {
    e.preventDefault();
    if (!newDish.name || !newDish.price) return;

    setDishes([...dishes, { ...newDish, id: Date.now(), price: Number(newDish.price) }]);
    
    // Сброс формы
    setNewDish({ name: '', category: 'Восточная кухня', price: '', description: '', image: '' });
  };

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
        <h2>Кафе «Уют» 🍲</h2>
        <button 
          onClick={() => setIsAdmin(!isAdmin)}
          style={{ padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', background: isAdmin ? '#e74c3c' : '#3498db', color: '#fff', border: 'none' }}
        >
          {isAdmin ? 'Выйти из Админки' : 'Панель администратора'}
        </button>
      </header>

      {isAdmin && (
        <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '12px', marginBottom: '30px', border: '1px solid #ddd' }}>
          <h3>➕ Добавить новое блюдо</h3>
          <form onSubmit={handleAddDish} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input 
              type="text" 
              placeholder="Название блюда" 
              value={newDish.name}
              onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
              required
            />
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <select 
                value={newDish.category}
                onChange={(e) => setNewDish({ ...newDish, category: e.target.value })}
                style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', flex: 1 }}
              >
                <option value="Восточная кухня">Восточная кухня</option>
                <option value="Русская кухня">Русская кухня</option>
                <option value="Напитки">Напитки</option>
                <option value="Десерты">Десерты</option>
              </select>

              <input 
                type="number" 
                placeholder="Цена (₩)" 
                value={newDish.price}
                onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
                style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', flex: 1 }}
                required
              />
            </div>

            <textarea 
              placeholder="Описание блюда" 
              value={newDish.description}
              onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', minHeight: '60px' }}
            />

            {/* Выбор файла с компьютера */}
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Выберите фото с компьютера:
              </label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileUpload}
                disabled={uploading}
              />
              {uploading && <p style={{ fontSize: '12px', color: '#3498db' }}>Загружаем фото в облако Supabase...</p>}
            </div>

            {/* Превью после загрузки */}
            {newDish.image && (
              <div style={{ marginTop: '5px' }}>
                <img src={newDish.image} alt="Превью" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
              </div>
            )}

            <button 
              type="submit" 
              disabled={uploading}
              style={{ padding: '12px', background: uploading ? '#ccc' : '#2ecc71', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Сохранить блюдо
            </button>
          </form>
        </div>
      )}

      <h3>Меню</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
        {dishes.map((dish) => (
          <div key={dish.id} style={{ border: '1px solid #eee', borderRadius: '12px', padding: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              {dish.image ? (
                <img src={dish.image} alt={dish.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }} />
              ) : (
                <div style={{ width: '100%', height: '150px', background: '#eee', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', marginBottom: '10px' }}>
                  Без фото
                </div>
              )}
              <h4 style={{ margin: '0 0 5px 0' }}>{dish.name}</h4>
              <p style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#888' }}>{dish.category}</p>
              <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#555' }}>{dish.description}</p>
              <strong style={{ fontSize: '16px', color: '#2c3e50' }}>{dish.price.toLocaleString()} ₩</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}