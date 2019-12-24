FROM node:12.14

# set workdir application
ENV WORKDIR=/home/node/app
WORKDIR ${WORKDIR}

# create directory app and permission
RUN mkdir -p ${WORKDIR}
RUN chown -R node:node ${WORKDIR}

# update system and install dependencies
RUN apt-get update -y && \
    apt-get upgrade -y && \
    apt-get autoremove

# install global yarn dependencies
RUN yarn global add pm2
RUN yarn global add typescript
RUN yarn global add nodemon

# copy package.json
COPY package.json .

# install node dependencies
RUN yarn install --force

# copy all project files to working directory
COPY . .
COPY --chown=node:node . .
RUN chown -R node:1000 ${WORKDIR}

# set user
USER node

# expose application port
EXPOSE ${PORT}

# start dev application
CMD ["yarn", "dev"]
