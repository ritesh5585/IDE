FROM node:20-alpine

WORKDIR /app

# Pehle package files copy karein aur dependencies install karein
COPY package*.json ./
RUN npm install

# Ab baaki ka pura code (src folder) copy karein
COPY . .

# Server ko port 3000 par expose karein
EXPOSE 3000

# Server start karein
CMD ["npm", "run", "dev"]