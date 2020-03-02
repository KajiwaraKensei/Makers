
FROM node:12.2

RUN npm install -g yarn

USER node
ENV HOME /home/node
WORKDIR $HOME
COPY ./package.json .
COPY ./package-lock.json .
RUN yarn install