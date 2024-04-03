FROM node:20.10.0

WORKDIR /src/app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
