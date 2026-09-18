# Alternativa a Render: cualquier servidor con Docker (VPS, Railway, Fly.io…)
FROM node:22-slim
WORKDIR /app
COPY backend/package*.json backend/
COPY frontend/package*.json frontend/
RUN npm ci --prefix backend --omit=dev && npm ci --prefix frontend --include=dev
COPY . .
RUN npm run build --prefix frontend
ENV NODE_ENV=production PORT=8080
EXPOSE 8080
CMD ["npm", "start", "--prefix", "backend"]
