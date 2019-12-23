FROM node:12.14-alpine

ENV WORKDIR=/home/node/app
WORKDIR ${WORKDIR}

# create directory app and permission
RUN mkdir -p ${WORKDIR}
RUN chown -R node:node ${WORKDIR}

# udpate system
RUN apk update --no-cache

# install global yarn dependencies
RUN yarn global add pm2
RUN yarn global add typescript
RUN yarn global add nodemon

# copy package.json and yarn.lock
COPY package.json .
COPY yarn.lock .

# install yarn dependencies
RUN yarn install

# copy all project files to working directory
COPY . .
COPY --chown=node:node . .
RUN chown -R node:1000 ${WORKDIR}

# set user
USER node

# export application port
EXPOSE ${PORT}

# start application
CMD ["yarn", "dev"]
