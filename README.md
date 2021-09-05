# SaratovSecurity

## ПСБ-Профайлер

1. Описание приложения

   ПСБ-Профайлер - веб-приложение, позволяющее распознавать документы по установленным признакам и классифицировать их в Клиентском досье.

2. Инструкция по запуску и сборке проекта
   Этот проект сгенерирован с помощью [Angular CLI](https://github.com/angular/angular-cli) версия 12.2.0.

   * Сервер разработки 
   
   Запустите `ng serve` для сервера разработки. Перейдите по адресу http: // localhost: 4200 /. Приложение автоматически перезагрузится, если вы измените какой-либо из исходных файлов.
   
   * Построение кода
   
   Запустите `ng generate component имя-компонента`, чтобы сгенерировать новый компонент. Вы также можете использовать директиву ng generate | pipe | service | class | guard | interface | enum | module.
   
   * Сборка
   
   Запустите `ng build`, чтобы собрать проект. Артефакты сборки будут храниться в каталоге dist /.
   
   * Запуск unit-тестов
   
   Запустите `ng test`, чтобы выполнить модульные тесты через [Karma](https://karma-runner.github.io).
   
   * Запуск end-to-end тестов
   
    Запустите `ng e2e`, чтобы выполнить сквозные тесты через платформу по вашему выбору. Чтобы использовать эту команду, вам нужно сначала добавить пакет, реализующий возможности сквозного тестирования.
   
   * Дальнейшая помощь
   
   Чтобы получить дополнительную помощь по Angular CLI, используйте `ng help` или посетите страницу [Angular CLI Overview and Command Reference](https://angular.io/cli).

3. Руководство пользователя

    1.Авторизуйтесь на сайте под своим логином и паролем. Данные авторизации можно получить у администратора сайта.
    
    2.Перейдите в личный кабинет.

    3.При наличии необработанных документов нажмите на кнопку "обработать".

    4.Вы можете следить за прогрессом обработки: когда обработка закончится - вы увидите результат и аналитику.

    5.Документы могут иметь 4 статуса-состояния: красный крестик - документы, требующие программной обработки, желтый вопросительный знак - документы, требующие ручной проверки, зеленая галочка - обработанные документы, иконка загрузки - документы, находящиеся в процессе обработки.

4. Минимальные системные требования

  * ОС: windows 10+
  * Процессор: 2.0Ghz+
  * ОЗУ: 4 Gb+
  * Видеокарта: Shader model 3.0 capable card
  * DirectX: version 11+
  * Место на диске: 400 МБ
