# Dockerfile
FROM node:18-slim

RUN apt-get update && apt-get install -y graphicsmagick imagemagick ghostscript

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build TypeScript code
RUN npm run build

EXPOSE 8080

# Start the application
CMD ["npm", "start"]
