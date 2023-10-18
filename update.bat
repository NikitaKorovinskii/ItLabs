docker stop test-container
docker rm test-container
docker stop newVersion
docker rm newVersion
docker rmi nikita:version2
docker tag nikita nikita:version2
docker build --tag nikita:latest .
docker run -dp 3000:1234 -e PORT=1234 --name test-container nikita
docker run -dp 3001:1234 -e PORT=1234 --name newVersion nikita:version2