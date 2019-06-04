FROM nginx:alpine

ARG PRODUCT_NAME=my-product-name
ARG SERVICE_NAME=my-service-name
ARG VERSION=${VERSION:-1.0.0}
ARG MAINTAINER=${MAINTAINER:-rbruno}

LABEL maintainer="$MAINTAINER" \
        org.opencontainers.image.authors="$MAINTAINER" \
        org.opencontainers.image.source="http://git.sigis.com.ve/$PRODUCT_NAME/$SERVICE_NAME" \
        org.opencontainers.image.version="$VERSION" \
        org.opencontainers.image.vendor="SIGIS Soluciones Integrales GIS, C.A." \
        org.opencontainers.image.title="$PRODUCT_NAME-$SERVICE_NAME" \
        org.opencontainers.image.description="Docker for $PRODUCT_NAME $SERVICE_NAME"


COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html

COPY dist/ .
