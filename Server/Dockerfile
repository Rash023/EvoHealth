# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Copy environment file
COPY .env ./

# Install dependencies
RUN npm install

# Copy TypeScript configuration
COPY tsconfig.json ./

# Copy all application files
COPY . .

# Run Prisma migrations
RUN npx prisma generate
RUN npx prisma migrate deploy

# Compile TypeScript to JavaScript
RUN npm run build

# Expose application port
EXPOSE 3000

# Start the application
CMD ["node", "dist/bin.js"]
