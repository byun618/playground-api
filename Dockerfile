FROM node:lts

WORKDIR /playground-api

ARG GITHUB_PAT

# timezone
ENV TZ=Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY . .

RUN yarn set version berry \
  && yarn \
  && yarn build

EXPOSE 3100

ENTRYPOINT ["yarn","start"]
