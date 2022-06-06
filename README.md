# Домашнее задание № 4

## Создание интрнет-магазина

## ToDo list -

сделать страницу пользователя по приватному роутингу
динамическая подргузка данных при скролле

Используя React, React-Router и предоставленное API, необходимо написать интернет-магазин.
Данное приложение должно состоять из трёх страниц (сделать навигационное меню по сайту (доступно на всех страницах)):
Главная. По загрузке приложения пользователь оказывается на этой странице где сразу перед ним открывается список доступных товаров. Каждый товар должен иметь картинку, имя, цену и кнопку «добавить в корзину». Имя – это ссылка на страницу с подробным описанием товара. Если товар больше недоступен – копка «Добавить в корзину» должна замениться на текст «Нету в наличии». По клику на «Добавить корзину» - одна единица товара добавляется в корзину. В интерфейсе приложения, на всех страницах должно быть доступное поле «В корзине Х товаров на сумму Y», где Х это текущее количество добавленных товаров в корзину, а Y это общая цена добавленного товара в корзину. Саму страницу корзины в этом ДЗ мы реализовывать не будем.
Страница подробного описания товара (её не должно быть в меню, на нее можно перейти только кликнув на имя из списка товаров) – должна показывать помимо картинки, имя, цены и кнопки добавить в корзину, так же поле с полным описанием товара, количество товара в наличии. Возле кнопки добавить в корзину должно быть поле выбора количеста товара которое хотим добавить в корзину. Ссылка данной страницы должена содержать в себе id товара.
Страница О Магазине – краткая информация о магазине.
Если пользователь пытается ввести в адресную строку ссылку на несуществующую страницу – его должно автоматически перекидывать на страницу с сообщением ошибки «Что-то пошло не так. Данной страницы не существует».
В нашем приложении так же должна быть кнопка «Авторизация». По нажатию на которую должно появиться модальное окно с полями для логина и пароля, а так же кнопкой «Войти» и «Отмена» и крестиком в правом верхнем углу окна по нажатию на который модальное окно закрывается (аналогичное действие происходит при клике на кнопку «Отмена»).

Если введен недействительный логин и/или пароль, то после нажатия кнопки «Войти» необходимо вывести сообщение об ошибке (под блоком с полями логин и пароль).
Если пользователь ввел корректные данные, то модальное окно закрывается и мы автоматически переходим на страницу Home. Текст кнопки «Войти» меняется на «Выход». По нажатию на неё пользователя разлогинивает.
Для разлогиненных пользователей мы должны скрывать блок корзина, а так же вместо кнопки «Купить» возле каждого товара из списка на главной странице и на странице подробной информации о товаре, мы должны выводить сообщение «Чтобы добавить товар в корзину залогинтесь».

    Дополнительное задание (на дополнительные баллы). Обрабатываемые ошибки с сервера вывести пользователю на UI. Рекомендуется это делать с помощью всплывающего окна справа внизу окна браузера. Окно должно само пропадать через 15 секунд или по клику на иконку «Закрыть».

Приложение должно иметь презентабельный вид. Для стилизации используем CSS модули. Для написания приложения используем только библиотеки React и React-Router, все остальные библиотеки использовать запрещено. SVG иконки можно взять с бесплатного ресурса https://freeicons.io/ и разместить у себя в проекте в папке icons.

Используем любое подходящее API.
Кому сложно самому найти, можно попробовать магазин пива сделать:
https://punkapi.com/documentation/v2
Юзеров запрашивать можно отсюда для проверки(там нету поля пароля, можете заюзать любое другое поле из ответа как пароль).:
https://jsonplaceholder.typicode.com/users