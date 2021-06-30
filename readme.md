Задание

Необходимо разработать Vue-приложение для отображения таблицы с данными. Дополнительным плюсом будет: финальная сборка приложения должна запускаться из Docker контейнера (хотя бы с минимальной конфигурацией).

Функционал

Сортировка по столбцам: по нажатию на название столбца строки таблицы сортируются по возрастанию, при повторном клике — по убыванию. Направление сортировки указывается графическим элементом или текстовым сообщением.

Клиентская пагинация: данные необходимо отображать постранично, максимум 50 элементов на страницу. Необходимо предоставить пользовательскую навигацию для перехода по страницам.

Фильтрация: компонент должен предоставлять текстовое поле, в которое пользователь может ввести текст, и строки таблицы, данные которых не содержат подстроку, введённую пользователем, скрываются. Повторная фильтрация осуществляется по нажатию на кнопку "Найти".

По клику на строку таблицы значения полей выводятся в дополнительном блоке под таблицей.

Данные в таблицу загружаются с сервера. Способ загрузки с сервера на ваш выбор.

Над таблицей должна присутствовать кнопка добавить, по нажатии на которую выпадает форма добавления ряда. Для каждого поля необходимо реализовать валидацию (id — число, firstName, lastName — буквы, email — формат email, phone — маска телефона).
После заполнения всех полей должна активироваться кнопка Добавить в таблицу, которая вставляет заполненный ряд в начало таблицы.

+------+------------+-----------------+-----------------+---------------+
| id   | firstName  | lastName        | email           | phone         |
+------+------------+-----------------+-----------------+---------------+
|input | input      | input           | input           | input         |
+------+------------+-----------------+-----------------+---------------+

Для демонстрации работы компонента необходимо сделать простую HTML страницу. Пользователю предлагается выбрать набор данных: маленький или большой. При выборе набора данных он загружается с сервера и по данным строится таблица.

Сервер возвращает JSON-массив данных. Пример данных:



[
{
id: 101,
firstName: 'Sue',
lastName: 'Corson',
email: 'DWhalley@in.gov',
phone: '(612)211-6296',
address: {
streetAddress: '9792 Mattis Ct',
city: 'Waukesha',
state: 'WI',
zip: '22178'
},
description: 'et lacus magna dolor...',
}
]

Маленький объем данных доступен по ссылке:

http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}

Большой объем данных доступен по ссылке:

http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}

Замечания

Особое внимание следует уделить скорости работы. Зависание интерфейса при выполнении операций загрузки данных, фильтрации, сортировки недопустимо.

Во время загрузки данных стоит показать какой-либо индикатор

Использование сторонних библиотек будет плюсом только в случае, если это оправданно и вы сможете объяснить причину выбора.

Помните про обработку ошибок!

Верстка может быть самая простая. Визуализацию и украшение делайте на ваш вкус. Мы не против использования Bootstrap или похожего UI фреймворк, но только для UI представления (нельзя использовать JS код для решения задачи, но можно использовать для оформительских эффектов (анимации и тому подобное))!
Схема визуального представления данных

+------+------------+-----------------+-----------------+---------------+
| id ▲ | firstName ▼| lastName      ▼ | email          ▼| phone        ▼|
+------+------------+-----------------+-----------------+---------------+
| 101  | Sue        | Corson          | DWhalley@in.gov | (612)211-6296 |
+------+------------+-----------------+-----------------+---------------+
| 102  | Lor        | Ipsumd          | dwhalley@in.gov | (612)211-6296 |
+------+------------+-----------------+-----------------+---------------+
| 103  | Ips        | Umdolo          | dwhalley@in.gov | (612)211-6296 |
+------+------------+-----------------+-----------------+---------------+

Если выделен пользователем с id = 101, то под таблицей выводим следующую информацию:

Выбран пользователь <b>Sue Corson</b>

Описание:

<textarea>
et lacus magna dolor...
</textarea>

Адрес проживания: <b>9792 Mattis Ct</b>

Город: <b>Waukesha</b>

Провинция/штат: <b>WI</b>

Индекс: <b>22178</b>