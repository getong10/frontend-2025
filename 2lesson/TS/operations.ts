// Union (объединение)
let id: string | number;
id = "abc";
id = 123;

// Intersection (пересечение)
type Name = { name: string };
type Age = { age: number };
type Person = Name & Age;

let p: Person = { name: "Alice", age: 25 };

// Литералы
let status: "success" | "error" | "loading";
// status = "success";
// status = "fail"; // ошибка

// Псевдонимы для литералов
type UserID = string | number;
let id123: UserID = 42;

// Интерфейсы
interface User {
  id: number;
  name: string;
}
let u: User = { id: 1, name: "Bob" };

// Встроенные функции
// Partial<T> - Делает все поля необязательными
interface User {
  id: number;
  name: string;
  age: number;
}
type UserUpdate = Partial<User>;

let update: UserUpdate = { name: "Alice" }; // остальные поля не нужны

// Required<T> - Делает все поля обязательными
interface User {
  id?: number;
  name?: string;
}
type StrictUser = Required<User>;

let u: StrictUser = { id: 1, name: "Bob" }; // оба обязательны

// Readonly<T> - Запрещает изменять поля
interface User {
  id: number;
  name: string;
}
const u: Readonly<User> = { id: 1, name: "Alice" };
// u.name = "Bob"; // ошибка

// Pick<T, K> - Выбирает только указанные ключи из типа
interface User {
  id: number;
  name: string;
  age: number;
}
type UserPreview = Pick<User, "id" | "name">;

let u123: UserPreview = { id: 1, name: "Alice" };

// Omit<T, K> - Противоположность Pick — убирает указанные ключи
type UserWithoutAge = Omit<User, "age">;
let u123: UserWithoutAge = { id: 1, name: "Alice" };

// Record<K, T> - Создаёт объект, где ключи имеют один тип, а значения другой
type Role = "admin" | "user" | "guest";
type RolePermissions = Record<Role, boolean>;

let permissions: RolePermissions = {
  admin: true,
  user: false,
  guest: false
};

// Exclude<T, U> - Удаляет из типа T все типы, которые есть в U
type Status = "success" | "error" | "loading";
type NotLoading = Exclude<Status, "loading">; // "success" | "error"

// Extract<T, U> - Оставляет только те типы, которые есть и в T, и в U
type A = "a" | "b" | "c";
type B = "b" | "c" | "d";
type Common = Extract<A, B>; // "b" | "c"

// NonNullable<T> - Удаляет null и undefined из типа
type T = string | null | undefined;
type Clean = NonNullable<T>; // string

// ReturnType<T> - Извлекает тип возвращаемого значения функции
function getUser() {
  return { id: 1, name: "Alice" };
}
// typeof позволяет взять тип у значения, чтобы использовать его дальше в аннотациях и типах
type User = ReturnType<typeof getUser>; // { id: number; name: string }

// Parameters<T> - Извлекает типы аргументов функции
function sum(a: number, b: boolean): number {
  return a + b;
}
type Args = Parameters<typeof sum>; // [number, number]