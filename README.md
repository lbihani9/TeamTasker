![TeamTasker-4](https://github.com/lbihani9/TeamTasker/assets/49104508/345fbf2c-cf44-46db-892f-a59cc8e282d8)
# TeamTasker
TeamTasker is a web-based application that aims to streamline task management and collaboration within teams.

# Modules
- [ ]  **User Management:**
    - [X]  Allow team members to register.
    - [X]  Create profiles, and manage their accounts.
    - [ ]  Different user roles, such as administrators and regular team members, can be defined.
- [X]  **Task Creation and Assignment:**
    - [X]  Enable team members to create tasks, set due dates, assign tasks to individuals or teams, and define task priorities.
- [X]  **Task Tracking and Progress Monitoring:**
    - [X]  Provide a dashboard where team members can view their assigned tasks, track progress, and update task status (e.g., in progress, completed, blocked).
- [ ]  **Security and Access Control:**
    - [X]  Implement secure authentication mechanisms.
    - [ ]  Implement role-based access control to ensure data confidentiality and prevent unauthorized access to sensitive information.
- [ ]  **Collaborative Features:**
    - [X]  Allow team members to comment on tasks,
    - [ ]  Exchange messages, and share files related to specific tasks. This promotes effective communication and collaboration within the team.
- [ ]  **Notifications and Reminders:** Send automated notifications and reminders to team members regarding upcoming deadlines, task assignments, and any updates or changes made to tasks.
- [ ]  **Integration and Compatibility:** Integrate with popular productivity tools and platforms such as Google Calendar, Slack, or Microsoft Teams to enhance productivity and enable seamless collaboration.

# Setting up locally
 - clone the repository:
   ```
   git clone https://github.com/lbihani9/TeamTasker.git
   ```
 - Ensure that docker is installed in your system. Follow the docker documentation based on your system OS type. https://docs.docker.com/engine/install/
 - Create a docker network:
    ```
    docker network create -d bridge tt_net
    ``` 
 - Create a database instance:
    ```
    docker run --name tt_db -e MYSQL_ROOT_PASSWORD=<your_password> -d -p 3306:3306 --network=tt_net mysql:8 mysqld --default-authentication-plugin=mysql_native_password 
    ```
 - Log in to docker db container and create `TeamTasker` database:
    ```
    docker exec -it tt_db mysql -u root -p
    ```
    - Type your password when asked and then run `create database TeamTasker;`
 - Create a redis instance:
   ```
   docker run --name tt_redis --network=tt_net -d redis
   docker exec -it tt_redis redis-cli
   CONFIG SET requirepass "<your_password">
   ```
 - Ensure that you're in the same directory as the Dockerfile and run the following commands:
   ```
    cd /api
    yarn install
    cd ../frontend
    yarn install
    cd ..
   ```
 - Create a `.env` file and copy the contents from `.env.dev` and update the env variables.
   - To find the IP of the redis container:
   ```
    docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' tt_redis
   ```
   - To find the IP of the db container:
   ```
    docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' tt_db
   ```
 - Start the servers:
   ```
    cd /api
    yarn run server
    cd /frontend
    yarn run start
   ```
