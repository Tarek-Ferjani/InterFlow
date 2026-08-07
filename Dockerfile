# Dockerfile pour le déploiement full-stack InterFlow
FROM node:20-alpine AS builder

WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json ./
RUN npm ci

# Copie du code source
COPY . .

# Compilation de l'application (Vite + esbuild backend -> dist/server.cjs)
RUN npm run build

# Étape de production
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copie des artifacts compilés et du package.json
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Installation des dépendances de prod uniquement
RUN npm ci --only=production

EXPOSE 3000

CMD ["node", "dist/server.cjs"]
