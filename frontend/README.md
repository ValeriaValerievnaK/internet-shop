Области хранения данных:

-база данных на json-server
-BFF
-redux store

Сущности приложения:

-пользователи: БД (список пользователей), BFF (сессия текущего),
стор (отображение в браузере)
-роль пользователя: БД (список ролей), BFF (сессия пользователя с ролью),
стор (использование на клиенте)
-товар: БД (список товаров), стор (отображение в браузере)
-отзыв: БД (список отзывов), стор (отображение в браузере)
-корзина: БД (список товаров в корзине), стор (отображение в браузере)

Таблицы БД:

-пользователи - users: id / login / password /role_id / cart: product_id / count
-роли - roles: id / name
-товары - product: id / title / image_url / class / price / count / comments: id / author_id / author_login / content
-корзина - cart: user_id / product_id / sum_product_in_cart

Схема состояния на BFF:

-сессия текущего пользователя: login / password / role

Схема для редакс стора (на клиенте):

-user : id / login / cart: product_id / count
-products: массив product: id / title / imageUrl / class / price / commentsCount
-product: id / title / imageUrl / class / price / count / comments: массив comment: id /
author / content / publishedAt
