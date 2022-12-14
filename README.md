### ТЗ:

🎯 Цель приложения:
Дать пользователю возможность конвертировать из одной валюты в другую.

📝 Описание:

1. Приложение должно состоять из:
   a. поле для ввода суммы в валюте, из которой конвертирует пользователь (базовой)
   b. выбор базовой и целевой валюты (в которую конвертирует пользователь)
   c. поле результата
2. По умолчанию у пользователя должна определяться базовая валюта, соответствующая локали браузера.
3. Конвертация должна происходить сразу после ввода суммы в базовой валюте, на лету.

#### Стек:

-   **TypeScript**
-   **NextJS**
-   **Jest**
-   **Redux/Toolkit**
-   **SCSS**

#### Функционал приложения

-   Доступна конвертация валют, курсы которых представлены ЦБ
-   Пользователь может выбрать 4 валюты для отображения валютного курса страны в которой он находится
-   Выбранные 4 валюты доступны для переключения между ними в конверторе
-   Реализовано сохранение выбранных валют посредством cookie-файлов
-   Локация пользователя определяется автоматически (работает только при размещение на удаленном сервере)
-   Реализован поиск по странам, для смены локации, если пользователь зашел через VPN
-   Реализован поиск по валютам для смены выбранных валют
-   Приложение доступно на всех экранах

##### Рабочее приложение можно посмотреть по ссылке на _Vercel_

#### Инструкция по запуску:

1. Клонируем репозиторий
2. `npm install`
3. `npm run dev`
