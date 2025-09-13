// 1.5 Работа с объектами

// Создание объектов
// 1. Литерал объекта
const person1 = {
  name: "Иван",
  age: 30,
  city: "Москва"
};

// 2. Конструктор Object
const person2 = new Object();
person2.name = "Петр";
person2.age = 25;

// 3. Object.create()
const personPrototype = {
  greet() {
      return `Привет, я ${this.name}!`;
  }
};

const person3 = Object.create(personPrototype);
person3.name = "Анна";
person3.age = 28;

// 4. Конструктор функции
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function() {
  return `Привет, я ${this.name}!`;
};

const person4 = new Person("Мария", 32);

// 5. ES6 классы
class PersonClass {
  constructor(name, age) {
      this.name = name;
      this.age = age;
  }
  
  greet() {
      return `Привет, я ${this.name}!`;
  }
}

const person5 = new PersonClass("Олег", 27);

// Точечная нотация
console.log(user.name); // "Иван"
console.log(user.address.city); // "Москва"

// Квадратные скобки
console.log(user["age"]); // 30
console.log(user["full name"]); // "Иван Петров" - нельзя через точку

// Динамический доступ
const prop = "name";
console.log(user[prop]); // "Иван"

// Вычисляемые свойства
const dynamicKey = "dynamic";
const dynamicObject = {
  [dynamicKey]: "значение",
  [`${dynamicKey}2`]: "значение2"
};

console.log(dynamicObject.dynamic); // "значение"
console.log(dynamicObject.dynamic2); // "значение2"


// Методы объектов
const user = {
  name: "Иван",
  age: 30,
  skills: ["JavaScript", "Python", "SQL"]
};

// Object.keys() - массив ключей
console.log(Object.keys(user)); // ["name", "age", "skills"]

// Object.freeze() - заморозка объекта
const frozenUser = Object.freeze({...user});
frozenUser.name = "Петр"; // ничего не произойдет
console.log(frozenUser.name); // "Иван"

// Object.seal() - запечатывание (можно изменять, но не добавлять/удалять)
const sealedUser = Object.seal({...user});
sealedUser.name = "Петр"; // сработает
sealedUser.newProp = "test"; // не сработает


// Деструктуризация объектов
const user = {
  name: "Иван",
  age: 30,
  city: "Москва",
  skills: ["JS", "Python"],
  address: {
      street: "Тверская",
      building: 10
  }
};

// Базовая деструктуризация
const { name, age } = user;
console.log(name, age); // "Иван" 30

// Переименование переменных
const { name: userName, age: userAge } = user;
console.log(userName, userAge); // "Иван" 30

// Значения по умолчанию
const { name: fullName, phone = "не указан" } = user;
console.log(fullName, phone); // "Иван" "не указан"

// Вложенная деструктуризация
const { address: { street, building } } = user;
console.log(street, building); // "Тверская" 10

// Rest оператор в деструктуризации
const { name: personName, ...otherProps } = user;
console.log(personName); // "Иван"
console.log(otherProps); // { age: 30, city: "Москва", skills: [...], address: {...} }

// Деструктуризация в параметрах функции
function greetUser({ name, age = 18, city = "неизвестно" }) {
  return `Привет, ${name}! Тебе ${age} лет, живешь в ${city}.`;
}

console.log(greetUser(user)); // "Привет, Иван! Тебе 30 лет, живешь в Москве."

// Копирование объектов
const original = {
  name: "Иван",
  age: 30,
  skills: ["JS", "Python"],
  address: {
      city: "Москва"
  }
};

// Поверхностное копирование (shallow copy)
const shallowCopy1 = {...original}; // spread оператор
const shallowCopy2 = Object.assign({}, original);

shallowCopy1.name = "Петр"; // не влияет на original
shallowCopy1.skills.push("PHP"); // влияет на original! (общая ссылка)

console.log(original.skills); // ["JS", "Python", "PHP"]

// Глубокое копирование (deep copy)
const deepCopy1 = JSON.parse(JSON.stringify(original)); // простой способ
// Ограничения: не работает с функциями, undefined, Symbol, Date, RegExp
