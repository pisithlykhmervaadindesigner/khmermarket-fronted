# Build stage
FROM --platform=linux/amd64 node:20.19.6-alpine AS build
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN yarn build

# Production stage
FROM --platform=linux/amd64 node:20.19.6-alpine
WORKDIR /app

# Install production dependencies
COPY --from=build /app/package.json /app/yarn.lock ./
RUN yarn install --production --frozen-lockfile

# Copy built files from build stage
COPY --from=build /app/.output ./.output
COPY --from=build /app/public ./public

# Expose the port the app runs on
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=3000
ENV NUXT_TELEMETRY_DISABLED=1

# Command to run the application
CMD ["node", ".output/server/index.mjs"]