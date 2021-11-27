FROM node:latest
EXPOSE 8000
RUN mkdir -p /api
WORKDIR /api

COPY package.json /api/package.json
COPY package-lock.json /api/package-lock.json

RUN npm install
CMD npm install -g sequelize-cli && sequelize-cli db:migrate && npm start
# CMD ["npm", "install","-g", "sequelize-cli"]
# CMD ["sequelize-cli db:migrate"]
# CMD ["npm", "start" ]