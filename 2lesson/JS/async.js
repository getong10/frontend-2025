// 2.1 Асинхронное программирование (подробно)

// Проблемы синхронного кода
// Синхронный код блокирует выполнение
console.log("Начало");

// Имитация долгой операции (НЕ ДЕЛАЙТЕ ТАК!)
function longRunningOperation() {
    const start = Date.now();
    while (Date.now() - start < 3000) {
        // Блокируем выполнение на 3 секунды
    }
    return "Операция завершена";
}

console.log("Выполняется долгая операция...");
const result = longRunningOperation(); // Блокирует все на 3 секунды
console.log(result);
console.log("Конец");

// Весь код выше выполнится последовательно, блокируя интерфейс


// Колбэки (Callbacks)
// Простой колбэк
function fetchData(callback) {
    setTimeout(() => {
        const data = { id: 1, name: "Данные" };
        callback(data);
    }, 1000);
}

fetchData(function(data) {
    console.log("Получили данные:", data);
});

// Обработка ошибок в колбэках
function fetchDataWithError(callback) {
    setTimeout(() => {
        const success = Math.random() > 0.5;
        
        if (success) {
            callback(null, { id: 1, name: "Успешные данные" });
        } else {
            callback(new Error("Не удалось получить данные"), null);
        }
    }, 1000);
}

fetchDataWithError(function(error, data) {
    if (error) {
        console.error("Ошибка:", error.message);
    } else {
        console.log("Данные:", data);
    }
});

// Callback Hell - проблема вложенных колбэков
function getUser(id, callback) {
    setTimeout(() => callback(null, { id, name: `Пользователь ${id}` }), 100);
}

function getUserPosts(userId, callback) {
    setTimeout(() => callback(null, [
        { id: 1, title: "Пост 1" },
        { id: 2, title: "Пост 2" }
    ]), 100);
}

function getPostComments(postId, callback) {
    setTimeout(() => callback(null, [
        { id: 1, text: "Комментарий 1" },
        { id: 2, text: "Комментарий 2" }
    ]), 100);
}

// Кошмар вложенных колбэков
getUser(1, (err, user) => {
    if (err) throw err;
    
    getUserPosts(user.id, (err, posts) => {
        if (err) throw err;
        
        getPostComments(posts[0].id, (err, comments) => {
            if (err) throw err;
            
            console.log("Пользователь:", user.name);
            console.log("Первый пост:", posts[0].title);
            console.log("Комментарии:", comments);
            
            // И так может продолжаться еще глубже...
        });
    });
});


// Промисы (Promises) - подробно
// Создание промиса
const promise = new Promise((resolve, reject) => {
    // Асинхронная операция
    setTimeout(() => {
        const success = Math.random() > 0.5;
        
        if (success) {
            resolve("Операция успешна!"); // Промис выполнен
        } else {
            reject(new Error("Произошла ошибка!")); // Промис отклонен
        }
    }, 1000);
});

// Использование промиса
promise
    .then(result => {
        console.log("Успех:", result);
        return "Результат обработан"; // Возвращаемое значение переходит в следующий then
    })
    .then(processedResult => {
        console.log("Обработанный результат:", processedResult);
    })
    .catch(error => {
        console.error("Ошибка:", error.message);
    })
    .finally(() => {
        console.log("Промис завершен (успешно или с ошибкой)");
    });

// Цепочка промисов
function fetchUser(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id, name: `Пользователь ${id}`, age: 25 });
        }, 500);
    });
}

// pending
// fulfilled
// rejected

function fetchUserPosts(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, title: "Первый пост", userId },
                { id: 2, title: "Второй пост", userId }
            ]);
        }, 300);
    });
}

function fetchPostComments(postId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, text: "Отличный пост!", postId },
                { id: 2, text: "Спасибо за информацию", postId }
            ]);
        }, 200);
    });
}

// Красивая цепочка вместо callback hell
fetchUser(1)
    .then(user => {
        console.log("Пользователь:", user);
        return fetchUserPosts(user.id);
    })
    .then(posts => {
        console.log("Посты:", posts);
        return fetchPostComments(posts[0].id);
    })
    .then(comments => {
        console.log("Комментарии:", comments);
    })
    .catch(error => {
        console.error("Ошибка в цепочке:", error);
    });

// Promise.resolve() и Promise.reject()
const resolvedPromise = Promise.resolve("Мгновенно выполненный промис");
const rejectedPromise = Promise.reject(new Error("Мгновенно отклоненный промис"));

// Promise.all() - ожидание всех промисов
const promise1 = new Promise(resolve => setTimeout(() => resolve("Первый"), 1000));
const promise2 = new Promise(resolve => setTimeout(() => resolve("Второй"), 2000));
const promise3 = new Promise(resolve => setTimeout(() => resolve("Третий"), 500));

Promise.all([promise1, promise2, promise3])
    .then(results => {
        console.log("Все промисы выполнены:", results);
        // ["Первый", "Второй", "Третий"] - через 2 секунды (максимальное время)
    })
    .catch(error => {
        console.error("Один из промисов отклонен:", error);
    });

// Promise.allSettled() - ожидание всех промисов (включая отклоненные)
const mixedPromises = [
    Promise.resolve("Успех"),
    Promise.reject(new Error("Ошибка")),
    Promise.resolve("Еще успех")
];

Promise.allSettled(mixedPromises)
    .then(results => {
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                console.log(`Промис ${index}: выполнен со значением`, result.value);
            } else {
                console.log(`Промис ${index}: отклонен с ошибкой`, result.reason.message);
            }
        });
    });

// Promise.race() - возвращает первый выполненный/отклоненный промис
const fastPromise = new Promise(resolve => setTimeout(() => resolve("Быстрый"), 500));
const slowPromise = new Promise(resolve => setTimeout(() => resolve("Медленный"), 2000));

Promise.race([fastPromise, slowPromise])
    .then(result => {
        console.log("Первый выполненный:", result); // "Быстрый"
    });

// Promise.any() - возвращает первый успешно выполненный промис
const promises = [
    Promise.reject(new Error("Первая ошибка")),
    new Promise(resolve => setTimeout(() => resolve("Успех"), 1000)),
    Promise.reject(new Error("Вторая ошибка"))
];

Promise.any(promises)
    .then(result => {
        console.log("Первый успешный:", result); // "Успех"
    })
    .catch(error => {
        console.log("Все промисы отклонены:", error); // AggregateError
    });


// Async/Await (подробно)
// Функция с async всегда возвращает промис
async function simpleAsyncFunction() {
    return "Привет!"; // автоматически обернется в Promise.resolve("Привет!")
}

simpleAsyncFunction().then(console.log); // "Привет!"

// Функция может явно вернуть промис
async function explicitPromiseFunction() {
    return Promise.resolve("Явный промис");
}

// await может использоваться только внутри async функций
async function fetchUserData() {
    try {
        // await приостанавливает выполнение функции до выполнения промиса
        const user = await fetchUser(1);
        console.log("Пользователь получен:", user);
        
        const posts = await fetchUserPosts(user.id);
        console.log("Посты получены:", posts);
        
        const comments = await fetchPostComments(posts[0].id);
        console.log("Комментарии получены:", comments);
        
        return { user, posts, comments };
    } catch (error) {
        console.error("Ошибка при получении данных:", error);
        throw error; // повторно выбрасываем ошибку
    }
}

// Вызов async функции
fetchUserData()
    .then(data => console.log("Все данные:", data))
    .catch(error => console.error("Финальная ошибка:", error));

// Параллельное выполнение с async/await
async function fetchMultipleUsers() {
    try {
        // Последовательное выполнение (медленно)
        console.time("Последовательно");
        const user1 = await fetchUser(1);
        const user2 = await fetchUser(2);
        const user3 = await fetchUser(3);
        console.timeEnd("Последовательно");
        
        // Параллельное выполнение (быстро)
        console.time("Параллельно");
        const [parallelUser1, parallelUser2, parallelUser3] = await Promise.all([
            fetchUser(1),
            fetchUser(2),
            fetchUser(3)
        ]);
        console.timeEnd("Параллельно");
        
        return {
            sequential: [user1, user2, user3],
            parallel: [parallelUser1, parallelUser2, parallelUser3]
        };
    } catch (error) {
        console.error("Ошибка при получении пользователей:", error);
    }
}

// Обработка ошибок в async/await
async function errorHandlingExample() {
    try {
        const result = await riskyOperation();
        console.log("Успех:", result);
    } catch (error) {
        if (error instanceof NetworkError) {
            console.error("Сетевая ошибка:", error.message);
        } else if (error instanceof ValidationError) {
            console.error("Ошибка валидации:", error.message);
        } else {
            console.error("Неизвестная ошибка:", error);
        }
    } finally {
        console.log("Очистка ресурсов");
    }
}

class NetworkError extends Error {
    constructor(message) {
        super(message);
        this.name = "NetworkError";
    }
}

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

// Цикл с async/await
async function processItems(items) {
    // Последовательная обработка
    for (const item of items) {
        const result = await processItem(item);
        console.log(`Обработан ${item}:`, result);
    }
    
    // Параллельная обработка
    const results = await Promise.all(
        items.map(item => processItem(item))
    );
    
    return results;
}

function processItem(item) {
    return new Promise(resolve => {
        setTimeout(() => resolve(`Результат для ${item}`), Math.random() * 1000);
    });
}

// Использование async/await с классами
class DataService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
    
    async fetchData(endpoint) {
        try {
            const response = await fetch(`${this.baseUrl}/${endpoint}`);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Ошибка при запросе ${endpoint}:`, error);
            throw error;
        }
    }
    
    async saveData(endpoint, data) {
        try {
            const response = await fetch(`${this.baseUrl}/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error(`Не удалось сохранить данные: ${response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error("Ошибка при сохранении:", error);
            throw error;
        }
    }
}

// Использование сервиса
const api = new DataService('https://api.example.com');

async function handleUserData() {
    try {
        const user = await api.fetchData('users/1');
        console.log("Пользователь:", user);
        
        const updatedUser = {
            ...user,
            lastLogin: new Date().toISOString()
        };
        
        const saved = await api.saveData('users/1', updatedUser);
        console.log("Сохранено:", saved);
    } catch (error) {
        console.error("Не удалось обработать данные пользователя:", error);
    }
}


//Fetch API

// Простой GET запрос
fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => {
        console.log("Статус:", response.status);
        console.log("Заголовки:", response.headers);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return response.json(); // парсинг JSON
    })
    .then(data => console.log(data))
    .catch(error => console.error('Ошибка:', error));

// POST запрос с данными
async function createPost(postData) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer your-token-here'
            },
            body: JSON.stringify(postData)
        });
        
        if (!response.ok) {
            throw new Error(`Не удалось создать пост: ${response.status}`);
        }
        
        const createdPost = await response.json();
        return createdPost;
    } catch (error) {
        console.error('Ошибка при создании поста:', error);
        throw error;
    }
}

// Загрузка файла
async function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', 'Описание файла');
    
    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData // НЕ устанавливаем Content-Type для FormData
        });
        
        if (!response.ok) {
            throw new Error(`Ошибка загрузки: ${response.status}`);
        }
        
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Ошибка при загрузке файла:', error);
        throw error;
    }
}


// Отмена запросов с AbortController
async function cancelableRequest() {
    const controller = new AbortController();
    const signal = controller.signal;
    
    // Отменяем запрос через 5 секунд
    setTimeout(() => controller.abort(), 5000);
    
    try {
        const response = await fetch('https://api.example.com/slow-endpoint', {
            signal: signal
        });
        
        const data = await response.json();
        return data;
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('Запрос отменен');
        } else {
            console.error('Ошибка запроса:', error);
        }
        throw error;
    }
}


// Универсальный HTTP клиент
class HttpClient {
    constructor(baseURL, defaultHeaders = {}) {
        this.baseURL = baseURL;
        this.defaultHeaders = defaultHeaders;
    }
    
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            ...options,
            headers: {
                ...this.defaultHeaders,
                ...options.headers
            }
        };
        
        try {
            const response = await fetch(url, config);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            }
            
            return await response.text();
        } catch (error) {
            console.error(`Ошибка запроса к ${url}:`, error);
            throw error;
        }
    }
    
    get(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: 'GET' });
    }
    
    post(endpoint, data, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            body: JSON.stringify(data)
        });
    }
    
    put(endpoint, data, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            body: JSON.stringify(data)
        });
    }
    
    delete(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: 'DELETE' });
    }
}

// Использование HTTP клиента
const api = new HttpClient('https://jsonplaceholder.typicode.com', {
    'Authorization': 'Bearer your-token'
});

async function managePost() {
    try {
        // Получить пост
        const post = await api.get('/posts/1');
        console.log('Получен пост:', post);
        
        // Создать новый пост
        const newPost = await api.post('/posts', {
            title: 'Новый пост',
            body: 'Содержимое',
            userId: 1
        });
        console.log('Создан пост:', newPost);
        
        // Обновить пост
        const updatedPost = await api.put(`/posts/${newPost.id}`, {
            ...newPost,
            title: 'Обновленный заголовок'
        });
        console.log('Обновлен пост:', updatedPost);
        
        // Удалить пост
        await api.delete(`/posts/${newPost.id}`);
        console.log('Пост удален');
    } catch (error) {
        console.error('Ошибка управления постом:', error);
    }
}