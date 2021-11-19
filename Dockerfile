
## Front End

FROM node:12.19.1 as build-frontend
RUN npm install --global typescript

WORKDIR /src
ADD frontend/package.json .
ADD frontend/package-lock.json .
ADD frontend/tsconfig.json .
RUN npm i
ADD frontend/src src
ADD frontend/public public

ENV NODE_ENV=production CI=true GENERATE_SOURCEMAP=true PUBLIC_URL=/
RUN npm run-script build

## Backend

FROM node:12.19.1 as build-backend
WORKDIR /src
ENV PATH=$PATH:/src/node_modules/.bin

ADD backend/package-lock.json .
ADD backend/package.json .

RUN npm i
ADD backend/src src
ADD backend/tsconfig.json .
RUN tsc -p . --inlineSources --inlineSourceMap --sourceMap false

## Release image

FROM node:12.19.1

ENV NODE_ENV=production PORT=80
WORKDIR /app
COPY --from=build-backend /src/package.json .
COPY --from=build-backend /src/package-lock.json .
RUN npm i

COPY --from=build-backend /src/build .
COPY --from=build-frontend /src/build public
EXPOSE 80

CMD ["node", "server"]