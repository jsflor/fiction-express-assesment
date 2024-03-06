# Table of contents:

- [Project structure explanation](#project-structure-explanation)
  - [Docker](#1-docker)
  - [BlogYourStuff](#2-blogyourstuff)
- [Requirements](#requirements)
- [Run the Django application](#run-the-django-application)
- [Getting Started with the Django Blog API](#getting-started-with-the-django-blog-api)
  - [API Documentation](#api-documentation)
  - [Swagger Testing Tool](#swagger-testing-tool)
- [Pre-initialized users](#pre-initialized-users)
- [Admin panel](#admin-panel)
- [Django security measures](#django-security-measures)
  - [CSRF Tokens](#csrf-tokens)
  - [CORS Headers](#cors-headers)

# List of useful links

- Docker website: [official Docker website](https://docs.docker.com/get-docker/)
- API root: [localhost:8000](http://localhost:8000)
- API swagger: [localhost:8000/swagger/](http://localhost:8000/swagger/)
- API redoc: [localhost:8000/redoc/](http://localhost:8000/redoc/)
- Admin panel: [localhost:8000/admin/](http://localhost:8000/admin/)


# Project structure explanation


## 1. Docker

This directory houses the infrastructure files essential for setting up the containers required to run the Django web application.

- **docker-compose.yml:**
  - The central file defining and orchestrating all the containers necessary for the smooth operation of the Django application.

- **requirements.txt:**
  - A concise list of Python packages crucial to run the Django application seamlessly.

- **blogyourstuff:**
  - Inside this directory, you'll find the Dockerfile and the entrypoint.sh script for our Django container. These components facilitate pre-initialization operations, such as creating a superuser. Check out `entrypoint.sh` for more insights into Django operations.

- **.env:**
  - This file serves as the cornerstone of configuration, housing the environment variables that govern the behavior and operation of our system.
    There is also a sample env file but this is not the one in use. The main env file is in hidden mode because of the dot "." at the beggining of the filename.

## 2. BlogYourStuff

This folder encapsulates all the files pertinent to our Django web application. These files are linked to our Python container, where the application is executed.

- **Project Organization:**
  - The project is thoughtfully organized into two services: `accounts` and `blog`.

- **accounts:**
  - Within this module, you'll discover all the components required to manage user accounts effectively.

- **blog:**
  - This module encompasses all the necessary elements to power the blog section of our web application.



# Requirements

To successfully deploy and run this web application, ensure that your system meets the following prerequisites:

- **Docker Engine:**
  - Install Docker Engine on your system. You can download it from the [official Docker website](https://docs.docker.com/get-docker/).

- **Network Connection:**
  - A stable internet connection is required for fetching dependencies, updates, and interacting with external services. Ensure your system is connected to the network.

# Run the Django application

To start the application run the following command from the directory where you will find the docker-compose.yml file (See docker directory):

```bash
docker compose up -d --build
```

To stop the containers:
```bash
docker compose down
```

Usually we would be able to find the application running into [localhost:8000](http://localhost:8000) if the environment variables were kept untouched.


# Getting Started with the Django Blog API

This Django-powered application serves as the backbone for a dynamic Blog webpage through an Application Protocol Interface (API). Familiarize yourself with the various API endpoints and their functionalities outlined below:

- **User Authorization:**
  - Explore the `/auth` URLs to execute operations related to user authentication.
  - `/auth/registration` is dedicated to managing user registration operations.

- **Blog Post Management:**
  - Utilize the `/blogposts` URLs for creating, listing, editing, and deleting blog posts stored in the database.

- **Additional Endpoints:**
  - `/csrf-token`: This endpoint facilitates communication with the frontend, allowing it to navigate Django's protection measures restricting access from sources other than Django itself (e.g., a REACT app).
  - `/lorem`: Submit any text to receive randomly generated content.

**Note:** Some `/auth` and `/auth/registration` endpoints are not utilized in this assessment, including:
- `/auth/password/change/`
- `/auth/password/reset/`
- `/auth/password/reset/confirm/`
- `/auth/registration/resend-email/`
- `/auth/registration/verify-email/`

## API Documentation

For a comprehensive understanding of the API, refer to the Swagger documentation available at [localhost:8000/swagger/](http://localhost:8000/swagger/) and [localhost:8000/redoc/](http://localhost:8000/redoc/).

### Swagger Testing Tool

The Swagger documentation not only serves as a reference but also functions as a powerful testing tool. Execute queries through Swagger, and extract curl commands for seamless integration with the API. Streamline your development process and ensure a smooth user experience.


## Pre-initialized users

When the application is initiated it creates two users by default. 

Admin user:

- username: admin
- password: TheMostSecurePasswordEver

Non-admin user:

- username: user
- password: TheMostSecurePasswordEver

You can also create your own users by using the `/auth/registration` endpoint.

## Admin panel

Django Admin is a powerful and built-in feature of the Django web framework that provides a web-based interface for managing the application's data. It serves as an administration panel, allowing developers and administrators to interact with the underlying database models and perform various tasks without directly manipulating the database or writing custom views.

You can find the admin panel in [localhost:8000/admin/](http://localhost:8000/admin/).

**Note:** If you are logged in the admin panel it will also work on the swagger page but not vice-versa (swagger authorization does not work in the admin panel). I recommend to logout from the admin panel before proceeding to the swagger page to avoid authorization problems, and use each authorization method only for its own purpose.

## Django security measeures:

### CSRF Tokens:
Cross-Site Request Forgery (CSRF) tokens are a security measure employed to protect against CSRF attacks. In the context of Django API development and frontend interaction, CSRF tokens are crucial for ensuring the integrity of requests. CSRF attacks involve malicious entities tricking a user's browser into making unauthorized requests on a website where the user is authenticated. To prevent this, Django generates a unique CSRF token for each user session. When making requests that modify server-side data (e.g., POST, PUT, DELETE), this token must be included in the request headers. In the frontend, developers need to ensure that the CSRF token is included in their AJAX requests or form submissions to the Django API. Django, in turn, verifies the presence and validity of this token to ensure that the request originates from the intended user and not from a malicious source.

**IMPORTANT: This is why we have provided a `csrf` endpoint to mimic this security feature and allow the frontend to interact with the Django API. You must include this csrf token in the headers of every request made to the API endpoints.**

Useful code snippet:

```
const response = await axios.get('http://localhost:8000/csrf-token/', { withCredentials: true });
```

### CORS Headers:
Cross-Origin Resource Sharing (CORS) headers play a crucial role in enabling secure communication between a frontend and a Django API hosted on a different domain. When a frontend page makes a request to a Django API on a different domain, browsers enforce the Same-Origin Policy, which restricts such cross-origin requests by default. CORS headers, configured on the server-side (in Django API responses), dictate which origins are allowed to access the API. Developers need to set up appropriate CORS headers to explicitly define the permitted domains that can make requests to the Django API. This involves specifying allowed origins, methods, and headers. By configuring CORS headers correctly, developers ensure that their frontend application can securely interact with the Django API, allowing for seamless communication between the two components while maintaining the necessary security measures.

**IMPORTANT: To be able to communicate with the API the frontend URL must talk with the backend from `http://localhost:3001`.**

Useful code snippet:

```
const response = await axios.post('http://localhost:8000/auth/login/', requestOptions, {
  headers: {
    'accept': 'application/json',
    'Content-Type': 'application/json',
    'X-CSRFToken': csrfToken,
  },
  withCredentials: true,

});
```