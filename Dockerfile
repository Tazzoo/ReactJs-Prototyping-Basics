FROM node:8.9-alpine
LABEL maintainer="Tacio de Souza Campos"

# Setting Environment Variable to Production
ENV NODE_ENV production

# Create app directory and go to that
WORKDIR /usr/src/app

# Install app dependencies
COPY ["package.json", "package-lock.json*", "./"]

# Run npm commands
RUN npm i --production

# Copy app source code
COPY . .

# Initial command
CMD npm start