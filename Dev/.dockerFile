# Base image for client build
FROM node:18-alpine AS client-build

# Set working directory for client
WORKDIR /app/cloud-doc-mgmt-client

# Copy client package files
COPY ./cloud-doc-mgmt-client/package*.json ./

# Install client dependencies
RUN npm install

# Copy the rest of the client application code
COPY ./cloud-doc-mgmt-client/ ./

# Build the client application
RUN npm run build


# Base image for server build
FROM node:18-alpine AS server-build

# Set working directory for server
WORKDIR /app/cloud-doc-mgmt-server

# Copy server package files
COPY ./cloud-doc-mgmt-server/package*.json ./

# Install server dependencies
RUN npm install

# Copy the rest of the server application code
COPY ./cloud-doc-mgmt-server/ ./

# Copy the built client files into the server's public directory
COPY --from=client-build /app/cloud-doc-mgmt-client/build /app/cloud-doc-mgmt-server/public

# Set environment variables for ports
ENV CLIENT_PORT=3000
ENV SERVER_PORT=9000

# Expose both ports
EXPOSE $CLIENT_PORT
EXPOSE $SERVER_PORT

# Install concurrently to run both client and server
RUN npm install -g concurrently

# Start both client and server
CMD ["concurrently", "npm run dev:server", "npm run dev:client"]
