FROM node:18-alpine
WORKDIR /app

# Install npm and create necessary directories
RUN npm install -g npm@9 && \
    mkdir -p config

# Copy package files and install dependencies
COPY package*.json .
COPY packages ./packages
COPY extensions ./extensions
COPY translations ./translations

# Install dependencies and build the application
RUN npm install
RUN npm run build

# Create .env file with database configuration
RUN echo "DB_HOST=database" > .env && \
    echo "DB_PORT=5432" >> .env && \
    echo "DB_USER=postgres" >> .env && \
    echo "DB_PASSWORD=postgres" >> .env && \
    echo "DB_NAME=postgres" >> .env && \
    echo "DB_SSLMODE=disable" >> .env

EXPOSE 3000
CMD ["npm", "run", "start"]
