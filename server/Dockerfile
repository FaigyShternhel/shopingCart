FROM node:14
WORKDIR /index
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 4000
CMD npm run start
