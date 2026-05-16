## Getting Started

### Backend
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
```bash
  cd frontend
  npm install
  npm run dev
```
You'll see:
```
App runs on http://localhost:3000
```
  

### Envs

**backend/.env**

```dotenv
DATABASE_URL="file:./dev.db"
```
  
**frontend/.env.local**

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:4000
```