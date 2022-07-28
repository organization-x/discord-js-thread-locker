FROM node:18-alpine

RUN apk add --no-cache git

RUN mkdir /bot

RUN git clone https://github.com/organization-x/discord-js-thread-locker /bot

RUN cd /bot && yarn install

ENTRYPOINT [ "node", "/bot/index.js" ]
