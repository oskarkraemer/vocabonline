FROM --platform=$TARGETPLATFORM openjdk:17-jdk-alpine
MAINTAINER oskarkraemer

VOLUME /tmp
COPY out/artifacts/vocabonline_jar/vocabonline.jar vocabonline.jar
ENTRYPOINT ["java","-jar","/vocabonline.jar"]