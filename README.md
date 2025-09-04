[![codecov](https://codecov.io/github/Grimowsky/react-node-ts-monorepo/graph/badge.svg?token=fXoBYkKcbT)](https://codecov.io/github/Grimowsky/react-node-ts-monorepo)

# React & NestJS Typescript monorepo boilerplate

## Tech Stack:

#### Frontend:

- ReactJS

#### Backend:

- NestJS

---

### Environment Variables

To run this project, you will need to add the following environment variables to your .env file
note: postgresql on localhost has `POSTGRES_HOST_AUTH_METHOD=trust` flag, so no password locally is needed.

`DATABASE_URL=postgresql://postgres:@localhost:5432/postgres?schema=public&connect_timeout=3000`


### Workspaces

Preconfigured workspaces:
- server
- client

See package.json in root for the refference

### Run Locally

Clone the project

```bash
  git clone https://github.com/Grimowsky/react-node-ts-monorepo
```

Go to the project directory

```bash
  cd react-node-ts-monorepo
```

Install dependencies

```bash
  npm install
```

### Start the frontend and backend server & seed database:

Recommended way of starting locally is to use Docker Compose:

#### project root directory

```bash
    docker compose up
```

#### Alternatively - with logs and force-rebuilding:

```bash
BUILDKIT_PROGRESS=plain docker compose up --build --force-recreate --renew-anon-volumes --remove-orphans
```

Please see ```package.json``` for other scripts and other ways of running locally
