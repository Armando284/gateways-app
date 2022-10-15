# Create image based on dockerhub Node 14 image
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

# Export Angular port
EXPOSE 4200

# Serve the app
CMD ["npm", "start"]
