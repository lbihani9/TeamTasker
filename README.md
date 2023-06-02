# TeamTasker
TeamTasker is a web-based application that aims to streamline task management and collaboration within teams.

# Setting up neo4j instance:
```
docker pull neo4j
docker run --name neo4j_db --publish=7474:7474 --publish=7687:7687 --volume=./neo4j:/neo4j/data -itd neo4j
```
**Note**: 
1. for development purposes, disable authentication by passing --env=NEO4J_AUTH=none to docker run.
2. Docker hub link: https://hub.docker.com/_/neo4j
