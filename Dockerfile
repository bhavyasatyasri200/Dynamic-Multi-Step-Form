# Use Node.js as the base image
FROM node:20-alpine as build

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use a lightweight server for the production build
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Copy custom nginx config to handle client-side routing
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
