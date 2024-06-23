FROM  node:alpine

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

# Bundle app source
COPY . .

ARG PORT
ENV PORT=$PORT

EXPOSE 3000

CMD [ "npm", "start" ]
