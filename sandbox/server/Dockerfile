# Base image: chhota Linux (alpine) + Node 20 pehle se installed
FROM node:20-alpine

# Container ke andar kaam ka folder
WORKDIR /app

# PEHLE sirf package files copy karo (layer caching ke liye)
COPY package*.json ./

# Dependencies install (ye layer cache ho jayegi agar package.json same hai)
RUN npm install

# Ab baaki saara code copy
COPY . .

# Documentation: ye app 3000 port pe sunti hai
EXPOSE 3000

# Container start hote hi ye command chalega
CMD ["npm", "run", "dev"]