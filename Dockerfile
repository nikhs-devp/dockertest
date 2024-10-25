# Dockerfile
FROM node:18-alpine

WORKDIR /app

ENV PORT 8080
ENV HOST 0.0.0.0

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build TypeScript code
RUN npm run build

# Start the application
CMD ["npm", "start"]