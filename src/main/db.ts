import { app, ipcMain, ipcRenderer } from 'electron';
import Datastore from 'nedb-promises';

// Определение интерфейсов для каждой таблицы базы данных
interface User {
    _id: string;
    fio: string;
    username: string;
    createdAt: Date;
    updatedAt: Date;
}

interface MenuItem {
    _id: string;
    label: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}

interface Order {
    _id: string;
    user_id: string;
    sum: number;
    createdAt: Date;
    updatedAt: Date;
}

interface OrderItem {
    order_id: string;
    menu_id: string;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
}

interface Product {
    _id: string;
    label: string;
    remaining: number;
    createdAt: Date;
    updatedAt: Date;
}

// Класс Service для выполнения операций с базой данных
class Service<T> {
    datastore: Datastore<T>;

    constructor(datastore: Datastore<T>) {
        this.datastore = datastore;
    }

    async get(id: string) {
        return await this.datastore.findOne({ _id: id });
    }

    async getAll() {
        return await this.datastore.find({});
    }

    async find(query) {
        return await this.datastore.find(query);
    }

    async add(item: T) {
        return await this.datastore.insert(item);
    }

    async update(id: string, item: any) {
        return await this.datastore.updateOne({ _id: id }, item);
    }

    async remove(id: string) {
        return await this.datastore.removeOne({ _id: id }, {});
    }
}

// Функция для создания экземпляра базы данных
const dbFactory = (fileName: string) =>
    Datastore.create({
        filename: `${process.env.NODE_ENV === 'dev' ? '.' : app.getPath('userData')}/data/${fileName}`,
        timestampData: true,
        autoload: true,
    });

// Создание экземпляров сервисов для каждой таблицы базы данных
const db = {
    users: new Service<User>(dbFactory('users.db')),
    menu: new Service<MenuItem>(dbFactory('menu.db')),
    orders: new Service<Order>(dbFactory('orders.db')),
    orderItems: new Service<OrderItem>(dbFactory('order_items.db')),
    products: new Service<Product>(dbFactory('products.db')),
};

// Функция для создания обработчиков IPC для каждой таблицы
const createIPC = (tableName: string) => {
    const service = db[tableName];

    // Обработчик для получения элемента по идентификатору
    ipcMain.handle(`get-${tableName}`, async (event, id: string) => {
        try {
            const result = await service.get(id);
            return result;
        } catch (error) {
            console.error(error);
            return { error: 'Ошибка при получении данных' };
        }
    });

    // Обработчик для получения всех элементов
    ipcMain.handle(`get-all-${tableName}`, async () => {
        try {
            const result = await service.getAll();
            return result;
        } catch (error) {
            console.error(error);
            return { error: 'Ошибка при получении данных' };
        }
    });

    ipcMain.handle(`find-${tableName}`, async (event, query) => {
        try {
            const result = await service.find(query);
            return result;
        } catch (error) {
            console.error(error);
            return { error: 'Ошибка при получении данных' };
        }
    });

    // Обработчик для добавления элемента
    ipcMain.handle(`add-${tableName}`, async (event, item) => {
        try {
            const result = await service.add(item);
            return result;
        } catch (error) {
            console.error(error);
            return { error: 'Ошибка при добавлении данных' };
        }
    });

    // Обработчик для удаления элемента по идентификатору
    ipcMain.handle(`remove-${tableName}`, async (event, id: string) => {
        try {
            const result = await service.remove(id);
            return result;
        } catch (error) {
            console.error(error);
            return { error: 'Ошибка при удалении данных' };
        }
    });

    ipcMain.handle(`update-${tableName}`, async (event, id: string, item) => {
        try {
            const result = await service.update(id, item);
            return result;
        } catch (error) {
            console.error(error);
            return { error: 'Ошибка при изменении данных' };
        }
    });
};

export function init() {
    // Создание обработчиков IPC для каждой таблицы
    createIPC('users');
    createIPC('menu');
    createIPC('orders');
    createIPC('orderItems');
    createIPC('products');

}

export default db;