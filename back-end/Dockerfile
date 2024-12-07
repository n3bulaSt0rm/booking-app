# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy application source
COPY . .

# Expose backend port
EXPOSE 8080

# Start application
CMD ["npm", "start"] 