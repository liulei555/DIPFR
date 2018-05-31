FROM nginx:latest
VOLUME /tmp
ADD ./dist  /sailing
ADD ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 8000
EXPOSE 8001

