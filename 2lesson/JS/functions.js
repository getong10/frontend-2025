// 1.4 Функции в JavaScript

// Способы объявления функций

// 1. Function Declaration (объявление функции)
// Поднимается (hoisted) - можно вызывать до объявления
console.log(sayHello("Мир")); // "Привет, Мир!" - работает!

function sayHello(name) {
    return `Привет, ${name}!`;
}

// Условное объявление (не рекомендуется)
if (true) {
    function conditionalFunc() {
        return "условная функция";
    }
}

// Функции-объявления создаются в начале выполнения области видимости
console.log(typeof hoistedFunction); // "function"

function hoistedFunction() {
    return "поднятая функция";
}


// 2. Function Expression (функциональное выражение)
// Не поднимается - можно вызывать только после объявления
// console.log(sayGoodbye("Мир")); // Ошибка! Cannot access before initialization

const sayGoodbye = function(name) {
    return `До свидания, ${name}!`;
};

console.log(sayGoodbye("Мир")); // "До свидания, Мир!"

// Именованное функциональное выражение
const factorial = function fact(n) {
    if (n <= 1) return 1;
    return n * fact(n - 1); // можно вызывать по имени fact внутри функции
};

console.log(factorial(5)); // 120
// console.log(fact(5)); // Ошибка! fact недоступна снаружи

// Анонимное функциональное выражение
const anonymous = function() {
    return "анонимная функция";
};


// 3. Arrow Functions (стрелочные функции)
// Краткий синтаксис
const add = (a, b) => a + b;
const square = x => x * x; // можно опустить скобки для одного параметра
const greet = () => "Привет!"; // скобки обязательны без параметров

// Длинный синтаксис
const complexFunction = (a, b) => {
    const result = a * b;
    console.log(`Результат: ${result}`);
    return result;
};

// Возврат объекта (нужны скобки)
const createPerson = (name, age) => ({
    name: name,
    age: age,
    greet() {
        return `Привет, я ${this.name}!`;
    }
});

// Стрелочные функции не имеют собственного this
function RegularFunction() {
    this.name = "Обычная";
    
    this.regularMethod = function() {
        console.log(this.name); // "Обычная"
    };
    
    this.arrowMethod = () => {
        console.log(this.name); // "Обычная" (берется из внешнего контекста)
    };
    
    setTimeout(function() {
        console.log(this.name); // undefined (this = window/global)
    }, 100);
    
    setTimeout(() => {
        console.log(this.name); // "Обычная" (this из внешнего контекста)
    }, 100);
}

const obj = new RegularFunction();


// Контекст выполнения и this

// this в различных контекстах:
// 1. Глобальный контекст
console.log(this); // Window (в браузере) или global (в Node.js)

function globalFunction() {
    console.log(this); // Window в нестрогом режиме, undefined в строгом
}

"use strict";
function strictFunction() {
    console.log(this); // undefined
}

// 2. Методы объекта
const person = {
    name: "Иван",
    age: 30,
    
    greet() {
        console.log(this.name); // "Иван" - this указывает на объект person
        
        function innerFunction() {
            console.log(this.name); // undefined - this не наследуется
        }
        innerFunction();
        
        const innerArrow = () => {
            console.log(this.name); // "Иван" - наследует this от greet
        };
        innerArrow();
    },
    
    greetArrow: () => {
        console.log(this.name); // undefined - стрелочные функции не имеют своего this
    }
};

person.greet();

// 3. Потеря контекста
const greetFunction = person.greet;
greetFunction(); // this будет undefined или Window

// Решения проблемы потери контекста
const boundGreet = person.greet.bind(person);
boundGreet(); // this = person

// Или
const greetWithCall = person.greet;
greetWithCall.call(person); // this = person

// 4. Конструкторы
function Person(name, age) {
    this.name = name;
    this.age = age;
    
    this.greet = function() {
        return `Привет, я ${this.name}!`;
    };
}

const ivan = new Person("Иван", 30);
console.log(ivan.greet()); // "Привет, я Иван!"

// 5. call, apply, bind
function introduce(greeting, punctuation) {
    return `${greeting}, я ${this.name}${punctuation}`;
}

const user = { name: "Анна" };

// call - передает аргументы по отдельности
console.log(introduce.call(user, "Привет", "!")); // "Привет, я Анна!"

// apply - передает аргументы массивом
console.log(introduce.apply(user, ["Здравствуйте", "."])); // "Здравствуйте, я Анна."

// bind - создает новую функцию с привязанным контекстом
const boundIntroduce = introduce.bind(user);
console.log(boundIntroduce("Добро пожаловать", "~")); // "Добро пожаловать, я Анна~"

// Частичное применение с bind
const greetAnna = introduce.bind(user, "Привет");
console.log(greetAnna("!!!")); // "Привет, я Анна!!!"


// Замыкания (Closures)
// Базовый пример замыкания
function outerFunction(x) {
    // Внешняя переменная
    
    function innerFunction(y) {
        // Внутренняя функция имеет доступ к x
        return x + y;
    }
    
    return innerFunction;
}

const addFive = outerFunction(5); // замыкание создано
console.log(addFive(3)); // 8 - переменная x (5) "запомнилась"

// Практический пример: счетчик
function createCounter() {
    let count = 0; // приватная переменная
    
    return {
        increment() {
            count++;
            return count;
        },
        decrement() {
            count--;
            return count;
        },
        getCount() {
            return count;
        }
    };
}

const counter1 = createCounter();
const counter2 = createCounter(); // независимый счетчик

console.log(counter1.increment()); // 1
console.log(counter1.increment()); // 2
console.log(counter2.increment()); // 1 - независимый от counter1

// Невозможно получить прямой доступ к count
console.log(counter1.count); // undefined
