FROM node:8.9-alpine
LABEL maintainer="Tacio de Souza"
# ENV PORT 8888

# Setting Environment Variable to Production
# ENV NODE_ENV production

# Create app directory and go to that
WORKDIR /usr/src/app

# Install app dependencies
COPY ["package.json", "package-lock.json*", "./"]

# Run npm commands
RUN npm i -g --unsafe-perm nodemon && npm i --production

# Copy app source code
COPY . .

# Expose port and start application
# EXPOSE 8888

# Initial command
# CMD npm start
CMD npm run dev