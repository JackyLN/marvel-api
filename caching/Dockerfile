FROM ubuntu

RUN apt-get update
RUN apt-get install -y memcached
EXPOSE 11211
CMD ["-m", "16"]

USER daemon
ENTRYPOINT memcached