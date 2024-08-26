FROM node:21 as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Étape d'exécution
FROM node:21
WORKDIR /Users/djigasalane/Documents/Personnel/sen_resto_plateform/backend/docker
COPY --from=build dist ./dist
COPY --from=build node_modules ./node_modules
COPY --from=build package.json ./package.json
EXPOSE 3000
CMD ["node", "dist/src/main"]
