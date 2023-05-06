FROM node:14-alpine

WORKDIR ./app

COPY package.json ./

RUN yarn install

COPY . .

RUN yarn build

RUN rm -rf src

EXPOSE 3000

CMD ["node", "dist/main.js"]


