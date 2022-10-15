# Create image based on the dockerhub Node 16 image
FROM node:16

# Base directory for the app
RUN mkdir -p /app

# Change the workdirectory
WORKDIR /app

# Copy dependencies files
COPY package*.json /app/

# Install dependencies
RUN npm install

# Copy code files
COPY . /app/

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD ["npm", "start"]