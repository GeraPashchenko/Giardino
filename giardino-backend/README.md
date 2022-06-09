## To connect pgAdmin4 to database firstly:
- Go to http://localhost:8080
- Sign in with default credentials
- Click "Add New Server" and enter: 
```json
{
  host: "postgres-db";
  port: 5432;
  dbName: "giardino";
  user: <db-user-from-env>;
  password: <db-password-from-env>;
}
```

## Migrations
Firstly fill in the DataSource object at `src/database/database.config.ts` with data from the `.env`.

Crate migration:
```
npm run migration:create --name=<migration-name>
```
Run migration:
```
npm run migration:
```
Revert migration:
```
npm run migration:revert
```