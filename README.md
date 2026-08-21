# Recipe Book

SPA-каталог рецептов в виде книги: вход, поиск, листание разворотов и карточка блюда.

Данные и авторизация — [DummyJSON](https://dummyjson.com/).

**Live:** [https://task5-midnightsuun.vercel.app](https://task5-b1uw1l7e8-yana-5742.vercel.app/sign-in)

## Функциональность

- вход по username/password (DummyJSON Auth)
- защищённые маршруты: без токена редирект на `/sign-in`
- список рецептов в виде книги (титульный разворот, по 4 карточки на разворот)
- поиск по названию, пагинация через query-параметры `page` и `q`
- страница рецепта: ингредиенты, шаги, рейтинг
- обновление access-токена при 401
- состояния загрузки, ошибок и пустого поиска
- страница 404
- адаптивная вёрстка (desktop и mobile)

## Стек

- React 19
- React Router
- Redux Toolkit + RTK Query
- Webpack, Babel
- CSS Modules (без UI-библиотек)

## Зависимости


| Пакет                                           | Зачем                   |
| ----------------------------------------------- | ----------------------- |
| `react`, `react-dom`                            | UI                      |
| `react-router`                                  | маршруты                |
| `@reduxjs/toolkit`, `react-redux`               | store, RTK Query        |
| `react-hook-form`, `@hookform/resolvers`, `zod` | форма входа и валидация |
| `classnames`                                    | классы                  |


Сборка: `webpack`, `webpack-cli`, `webpack-dev-server`, `babel-loader`, `@babel/*`, `css-loader`, `style-loader`, `html-webpack-plugin`, `@svgr/webpack`. Форматирование: `prettier`.

Полный список версий — в `package.json`.

## Запуск

Нужны Node.js 18+ и npm.

```bash
git clone https://github.com/midnightSuun/task5.git
cd task5
npm install
npm start
```

Приложение откроется на [http://localhost:3000](http://localhost:3000).

Продакшен-сборка:

```bash
npm run build
```

Артефакты — в `dist/`. Для SPA на Vercel есть `vercel.json` (rewrite всех путей на `index.html`).

## Тестовый аккаунт

Любой пользователь из [dummyjson.com/users](https://dummyjson.com/users), например:

- username: `emilys`
- password: `emilyspass`

## Деплой

- репозиторий: [https://github.com/midnightSuun/task5](https://github.com/midnightSuun/task5)
- live: [https://task5-midnightsuun.vercel.a](https://task5-b1uw1l7e8-yana-5742.vercel.app/sign-in)

## Как устроено

- `store.js` — `configureStore`: `auth` slice и `api` reducer + middleware RTK Query.
- `api.js` / `auth-api.js` / `recipes-api.js` — один `createApi`, эндпоинты через `injectEndpoints`. Кэш RTK Query ключуется по имени эндпоинта и аргументам (`limit`, `skip`, `q`, id).
- `base-query.js` — `fetchBaseQuery` + refresh access-токена при 401, общий `refreshPromise` чтобы параллельные запросы не дергали refresh несколько раз.
- `routes.js` — `PublicRoute` (логин) и `ProtectedRoute` (книга и карточка рецепта).

