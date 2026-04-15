# Uses Node.js environment , No need to install Node manually (Base image of node)
FROM node:20

# Inside container, everything happens in /app
WORKDIR /app

# Copies dependencies file
COPY package*.json ./

# Installs dependencies
RUN npm install

# Copies full code
COPY . .

# Docker backend runs on port 3000
EXPOSE 3000

# commands to Starts server
CMD ["node", "server.js"]