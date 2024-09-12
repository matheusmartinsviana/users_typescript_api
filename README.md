# Users API using Typescript
credits to <a href='https://github.com/felipemotarocha'>@dicasparadev</a>

## architecture
1. Endpoints
2. Controllers
3. Repositories (Repository pattern)
4. Database (use the repository interface)

## Tecnologies used
- Mongodb
- Express
- Typescript
- Node.js

## Entities
```bash
User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
```

## Routes
```bash
GET /users/ To get all users
```
```bash
POST /users/ To add an user (need body with user fields)
```
```bash
PATCH /users/:id To update (firstName, LastName or password) from an user
```
```bash
DELETE /users/:id To delete an user
```
