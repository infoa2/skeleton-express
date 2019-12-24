FROM node:12.14-alpine

# set environment
ENV USER=node 
ENV WORKDIR=/home/node/app

# set workdir application
WORKDIR ${WORKDIR}

# create directory app and permission
RUN mkdir -p ${WORKDIR}
RUN chown -R ${USER}:${USER} ${WORKDIR}

# update system and install dependencies
RUN apk add --update alpine-sdk python

# install global yarn dependencies
RUN yarn global add pm2 typescript nodemon

# copy package.json
COPY package.json .
COPY yarn.lock .

# install node dependencies
RUN yarn install --silent --pure-lockfile && yarn cache clean

# copy all project files to working directory
COPY . .
COPY --chown=${USER}:${USER} . .
RUN chown -R ${USER}:1000 ${WORKDIR}

# set user
USER ${USER}

# expose application port
EXPOSE ${PORT}

# start application
CMD ["yarn", "start"]
