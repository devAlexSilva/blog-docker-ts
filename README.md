# API BLOG

make a basic API to practice development with TypeScript and Docker

## Stacks

* nodeJs
* TypeScript
* Docker
* postgresql with prisma (ORM)
* express

## TO USE

* is important that you have Docker installed on your machine 
* clone the repository then in the folder run the command in your code editor
```bash
  docker-compose up
```

if you need to change something in the project then run the command after saving changes
```bash
  docker-compose build
  docker-compose up
```  

You can get the container ID using the following command  
```bash
  docker ps
```

when the containers are active, run  
```bash
  docker exec id_of_container npx prisma db push
```

now you can access API routes in your ```http://localhost:2727```
