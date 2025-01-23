FROM node
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install  --legacy-peer-deps
COPY . .
RUN npm run build
EXPOSE 3001
CMD [ "npm", "run","preview" ]