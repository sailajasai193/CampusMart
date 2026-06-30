FROM node:22

RUN apt-get update && \
    apt-get install -y python3 python3-pip && \
    ln -s /usr/bin/python3 /usr/bin/python

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN pip3 install --break-system-packages -r ML_Model/requirements.txt

EXPOSE 10000

CMD ["npm", "start"]