FROM node:16
WORKDIR /app
COPY package.json .
RUN npm install --production
COPY . .
COPY .env.deploy .env
EXPOSE 3000
CMD ["npm", "start"]