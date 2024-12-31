FROM node:18
RUN mkdir -p /var/app
WORKDIR /var/app
COPY . .
COPY .env /var/app/.env
RUN npm install
RUN npm run build
EXPOSE 6000
CMD ["node", "dist/main.js"]