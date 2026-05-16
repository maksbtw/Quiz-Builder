## Getting Started

### Envs

Add evironmental variables shown below before start

**backend/.env**

```dotenv
DATABASE_URL="file:./dev.db"
```
  
**frontend/.env.local**

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### Backend

Run this commands from root directory

```bash
  cd backend
  npm install
  npx prisma migrate dev --name init
  npm run dev
```
You'll see:
```
Server runs on http://localhost:4000
```

### Frontend

Run this commands from root directory

```bash
  cd frontend
  npm install
  npm run dev
```
You'll see:
```
App runs on http://localhost:3000
```
