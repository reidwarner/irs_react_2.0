# Step 1: Use the official Node.js image as the base image
FROM node:18-alpine

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 7: Expose the port the app will run on (default for Vite is 5173)
EXPOSE 5173

# Step 3: Copy package.json and package-lock.json (or yarn.lock) to install dependencies
COPY package*.json ./

# Step 4: Install the dependencies
RUN npm install --silent

# Step 5: Copy the rest of the application code
COPY . ./

# Step 8: Start the application (you can serve it with a simple static server)
CMD ["npm", "run", "dev"]