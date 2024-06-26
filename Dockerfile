
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["node", "Javascript/end_point.js"]
EXPOSE 3000