# Stage 1: Build
FROM node:22-slim AS builder

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Copy package management files
COPY package*.json ./

# Install all dependencies (including devDependencies for the build)
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the frontend (Vite)
RUN npm run build

# Stage 2: Runtime
FROM node:22-slim

WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Copy built assets and necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.ts ./server.ts
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/metadata.json ./metadata.json

# Expose port (must match server.ts)
EXPOSE 3000

# Start the server using the compiled frontend
CMD ["npm", "start"]
