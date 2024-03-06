FROM python:3.10-bullseye

# Install mysql client
RUN apt-get update
RUN apt-get -y install gcc pkg-config default-libmysqlclient-dev

# The context is specified in the docker-compose file
COPY ./requirements.txt /tmp/requirements.txt
RUN pip3 install -r /tmp/requirements.txt

# Entrypoint bash script
COPY ./blogyourstuff/entrypoint.sh /tmp/entrypoint.sh

CMD ["/bin/bash", "/tmp/entrypoint.sh"]
