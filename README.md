## news-explorer-api
### https://www.news-explorer.fun/
### http://www.news-explorer.fun/
### http://news-explorer.fun/
### https://news-explorer.fun/
### ссылка на api http://api.news-explorer.fun
### backend для сервиса NewsExplorer.
#### Сервис News-explorer.fun осуществляет поиск актуальных новостей по заданному ключевому слову, пользователь вводит в поиске слово или фразу, отправляется запрос на https://newsapi.org/. Затем найденные статьи публикуются на главной странице https://www.news-explorer.fun/ (http://www.news-explorer.fun/, http://news-explorer.fun/, https://news-explorer.fun/). Пользователь может создать свою учетную запись и сохранять во вкладке "Сохраненные статьи" понравившиеся ему статьи. 
#### Вторая страница https://www.news-explorer.fun/secondary/ отображает все понравившиеся статьи пользователя.
#### Проект создан для демонстрации имеющихся у автора возможностей вебразработки. Предварительно автором был написан api https://www.api.news-explorer.fun/, на который обращается проект при авторизации и сохранении статей. 
#### Данный раздел относится к написанию бэкэнда. 
#### Отображение сайта на разных разрешениях оптимизировано.
#### При реализации проекта используются HTML5, CSS3, javascript, БЭМ. Сборка проекта осуществляется Webpack(4.41.5), плагины и версии Node:
 ####   "bcryptjs": "^2.4.3",
 ####   "body-parser": "^1.19.0",
 ####   "celebrate": "^11.0.1",
 ####   "cors": "^2.8.5",
 ####   "dotenv": "^8.2.0",
 ####   "eslint": "^6.8.0",
 ####   "eslint-config-airbnb-base": "^14.0.0",
 ####   "eslint-plugin-import": "^2.19.1",
 ####   "express": "^4.17.1",
 ####  "express-rate-limit": "^5.0.0",
 ####  "express-winston": "^4.0.2",
 ####  "helmet": "^3.21.2",
 ####  "jsonwebtoken": "^8.5.1",
 ####  "mongoose": "^4.13.20",
 ####  "validator": "^12.1.0",
 ####  "winston": "^3.2.1"
 #### Для корректной сборки сайта необходимо установить эти Node зависимости. Вся информация по установке на сайтах https://nodejs.org/ru/, https://www.npmjs.com/.
