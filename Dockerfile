FROM --platform=$TARGETPLATFORM amazoncorretto:17
MAINTAINER oskarkraemer

VOLUME /tmp
COPY out/artifacts/vocabonline_jar/vocabonline.jar vocabonline.jar
ENTRYPOINT ["java","-jar","/vocabonline.jar"]