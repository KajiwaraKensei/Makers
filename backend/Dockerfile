FROM node:12.2


RUN npm install -g yarn nodemon

USER node
ENV HOME /home/node
WORKDIR $HOME
COPY ./package.json .
COPY ./package-lock.json .
RUN yarn install

