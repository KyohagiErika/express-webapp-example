# express-webapp-example
### Start with npm
```
npm i
npm run build
npm start
```
### Start with npm - docker
* Build and Run with Docker:
```
npm i
npm run build
docker build -t <app-name> .
docker run -dp <port>:<port> <app-name>
```
* Or with `docker compose`:
```
npm i
npm run build
docker compose up -d
```