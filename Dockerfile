FROM node:14-alpine

ADD package.json /tmp/package.json

RUN rm -rf dist

RUN cd /tmp && yarn install

ADD ./ /src

RUN rm -rf src/node_modules && cp -a /tmp/node_modules /src/

WORKDIR /src

RUN yarn build

CMD ["node","build/src/main.js"]