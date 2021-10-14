# URL-Shortener
URL shortening is a micro-service based web service, which provides short aliases for redirection of long URLs.

# Technologies Used
- **Python(Flask)** for backend application<br/>
- **ReactJS** for client application<br/>
- **MySQL** as a database<br/>
- **Docker** as a containerized platform

# Prerequisites
Install the following two, skip if you already have <br/>
**git <br/>
docker-compose**

# Run
```
git clone https://github.com/arojit/url-shortener.git
cd url-shortener
docker-compose up
```
**http://localhost:3000** paste this into the browser and happy using &#128540;

# Test
**Client App**
```
cd client-app
npm install
npm run test
```
**Backend App**
```
cd backend-app
python -m unittest
```
