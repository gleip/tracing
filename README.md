## Собираем трассировки из микросервисов на Node.js с помощью OpenTracing и Jaeger

### Структура проекта

```
└── packages
    ├── api            -- HTTP gateway
    ├── common         -- Базовые классы
    ├── devices        -- Микросервис устройств
    │   ├── handlers   -- Логика микросервиса
    │   └── repository -- Репозитории
    ├── interfaces     -- Базовые интерфейсы
    └── users          -- Микросервис пользователей
        ├── handlers   -- Логика микросервиса
        └── repository -- Репозитории
```

### Зависимости
Для работы проекта необходимо наличие Docker и двух запущенных контейнеров.

**NATS**
```
docker run -d --name nats -p 4222:4222 -p 6222:6222 -p 8222:8222 nats
```

**Jaeger**
```
docker run -d --name jaeger \
  -e COLLECTOR_ZIPKIN_HTTP_PORT=9411 \
  -p 5775:5775/udp \
  -p 6831:6831/udp \
  -p 6832:6832/udp \
  -p 5778:5778 \
  -p 16686:16686 \
  -p 14268:14268 \
  -p 9411:9411 \
  jaegertracing/all-in-one:1.8
```

### Запуск
Для запуска следует установить зависимости

**Общие. В корне проекта**
```
npm ci
```

**Зависимости api**
```
cd ./packages/api && npm ci
```

В корне проекта выполнить
```
npm start
```

После запуска можно зайти из браузера на [localhost](http://localhost:5000/devices/1). Должен вернуться JSON 