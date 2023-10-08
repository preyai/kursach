import tkinter as tk
import sqlite3

# Создаем подключение к базе данных SQLite
conn = sqlite3.connect('restaurant.db')
cursor = conn.cursor()

# Создаем таблицы в базе данных
cursor.execute('''
    CREATE TABLE IF NOT EXISTS menu (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        price REAL,
        description TEXT,
        type TEXT
    )
''')

cursor.execute('''
    CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        table_number TEXT,
        item_id INTEGER,
        quantity INTEGER,
        FOREIGN KEY (item_id) REFERENCES menu (id)
    )
''')

cursor.execute('''
    CREATE TABLE IF NOT EXISTS tables (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        number TEXT,
        status TEXT
    )
''')

# GUI приложения с использованием Tkinter
class RestaurantApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Столовая РОСНОУ")
        
        # Меню
        self.menu_frame = tk.Frame(root)
        self.menu_frame.pack(pady=10)
        
        self.label_menu = tk.Label(self.menu_frame, text="Меню:")
        self.label_menu.pack()
        
        self.listbox_menu = tk.Listbox(self.menu_frame, width=50)
        self.listbox_menu.pack()
        
        self.populate_menu()
        
        self.add_to_order_button = tk.Button(self.menu_frame, text="Добавить в заказ", command=self.add_to_order)
        self.add_to_order_button.pack()
        
        # Заказ
        self.order_frame = tk.Frame(root)
        self.order_frame.pack(pady=10)
        
        self.label_order = tk.Label(self.order_frame, text="Заказ:")
        self.label_order.pack()
        
        self.listbox_order = tk.Listbox(self.order_frame, width=50)
        self.listbox_order.pack()
        
        self.place_order_button = tk.Button(self.order_frame, text="Оформить заказ", command=self.place_order)
        self.place_order_button.pack()
        
    def populate_menu(self):
        # Очищаем список меню
        self.listbox_menu.delete(0, tk.END)
        
        # Получаем данные о меню из базы данных
        cursor.execute('SELECT name, price FROM menu')
        menu_items = cursor.fetchall()
        
        for item in menu_items:
            name, price = item
            self.listbox_menu.insert(tk.END, f"{name} - {price} руб")
            
    def add_to_order(self):
        # Получаем выбранный элемент из меню
        selected_index = self.listbox_menu.curselection()
        if not selected_index:
            return
        selected_item = self.listbox_menu.get(selected_index)
        selected_item_name = selected_item.split(" - ")[0]
        
        # Добавляем выбранный элемент в заказ
        cursor.execute('SELECT id FROM menu WHERE name=?', (selected_item_name,))
        item_id = cursor.fetchone()[0]
        
        quantity = 1  # Количество может быть изменено пользователем
        
        self.listbox_order.insert(tk.END, f"{selected_item_name} - {quantity}")
        
        # Сохраняем информацию о заказе в базе данных
        cursor.execute('INSERT INTO orders (table_number, item_id, quantity) VALUES (?, ?, ?)', ('1', item_id, quantity))
        conn.commit()
        
    def place_order(self):
        # В этой функции можно реализовать оформление заказа и генерацию чека
        pass

if __name__ == "__main__":
    root = tk.Tk()
    app = RestaurantApp(root)
    root.mainloop()
