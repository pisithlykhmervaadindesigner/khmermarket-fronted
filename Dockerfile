FROM node:20.19.6-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Environment variables
ENV NITRO_PORT=3000
ENV NITRO_HOST=0.0.0.0
ENV NODE_ENV=production

EXPOSE 3000

# Run as non-root user (optional)
# RUN addgroup -S app && adduser -S app -G app
# USER app

# Start the application
CMD ["node", ".output/server/index.mjs"]