FROM node:20-alpine

ARG APP_PORT=4200
ENV APP_PORT=${APP_PORT}

WORKDIR /app

# Копируем зависимости из новой директории приложения
COPY app/package*.json ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Копируем приложение
COPY app/ ./

# Копируем и делаем исполняемым скрипт запуска
COPY ./docker/run.sh /bin/run.sh
RUN chmod +x /bin/run.sh

# Открываем порт
EXPOSE $APP_PORT

# Запускаем
CMD ["sh", "/bin/run.sh"]
