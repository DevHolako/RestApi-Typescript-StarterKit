# Use the Node.js 14 Alpine image as the base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and yarn.lock files
COPY package.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Install TypeScript globally
RUN yarn global add typescript

# Run the TypeScript checks
RUN yarn checks

# Build the application
RUN yarn build


# Delete the src forlder

RUN rm -rf src


# Expose a port if needed
EXPOSE 3000

# Start the application
CMD ["node", "dist/main.js"]
