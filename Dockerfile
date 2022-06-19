FROM node

WORKDIR /disk-sharing

COPY package*.json /disk-sharing

RUN npm install

COPY . .

EXPOSE 3034

CMD ["node", "disksharing.js"]