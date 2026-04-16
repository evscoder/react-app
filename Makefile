APP_DIR := app
DOCKER_COMPOSE := docker compose
SERVICE := app

.DEFAULT_GOAL := help

.PHONY: help install dev build preview test lint clean \
	docker-config docker-build docker-up docker-up-prod docker-down docker-restart \
	docker-logs docker-shell docker-install docker-reinstall docker-clean

help:
	@printf "Available commands:\n"
	@printf "  make install        Install app dependencies\n"
	@printf "  make dev            Run Vite locally\n"
	@printf "  make build          Build app locally\n"
	@printf "  make preview        Preview local production build\n"
	@printf "  make test           Run tests locally\n"
	@printf "  make lint           Run lint locally\n"
	@printf "  make clean          Remove local build artifacts\n"
	@printf "  make docker-config  Validate docker compose config\n"
	@printf "  make docker-build   Build docker image\n"
	@printf "  make docker-up      Start docker dev container\n"
	@printf "  make docker-up-prod Start docker production preview\n"
	@printf "  make docker-down    Stop docker containers\n"
	@printf "  make docker-restart Restart docker container\n"
	@printf "  make docker-logs    Follow docker logs\n"
	@printf "  make docker-shell   Open shell in docker container\n"
	@printf "  make docker-install Install dependencies in docker volume\n"
	@printf "  make docker-reinstall Recreate docker dependencies volume\n"
	@printf "  make docker-clean   Stop containers and remove volumes\n"

install:
	cd $(APP_DIR) && npm install

dev:
	cd $(APP_DIR) && npm run dev -- --host 0.0.0.0 --port $${VITE_PORT:-4200}

build:
	cd $(APP_DIR) && npm run build

preview:
	cd $(APP_DIR) && npm run preview -- --host 0.0.0.0 --port $${VITE_PORT:-4200}

test:
	cd $(APP_DIR) && npm run test

lint:
	cd $(APP_DIR) && npm run lint

clean:
	rm -rf $(APP_DIR)/dist $(APP_DIR)/coverage

docker-config:
	$(DOCKER_COMPOSE) config

docker-build:
	$(DOCKER_COMPOSE) build

docker-up:
	$(DOCKER_COMPOSE) up

docker-up-prod:
	NODE_ENV=production $(DOCKER_COMPOSE) up --build

docker-down:
	$(DOCKER_COMPOSE) down

docker-restart:
	$(DOCKER_COMPOSE) restart $(SERVICE)

docker-logs:
	$(DOCKER_COMPOSE) logs -f $(SERVICE)

docker-shell:
	$(DOCKER_COMPOSE) exec $(SERVICE) sh

docker-install:
	$(DOCKER_COMPOSE) run --rm $(SERVICE) npm install

docker-reinstall:
	$(DOCKER_COMPOSE) down -v --remove-orphans
	$(DOCKER_COMPOSE) run --rm $(SERVICE) npm install

docker-clean:
	$(DOCKER_COMPOSE) down -v --remove-orphans
