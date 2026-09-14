# Dabbat Backend

Spring Boot 3 + MySQL backend for the Dabbat e-commerce frontend. Matches the
`api.ts` client in the React app (`baseURL: http://localhost:8080/api`, Bearer
token from `localStorage["dabbat-token"]`).

## Stack
- Java 17, Spring Boot 3.3.4
- Spring Web, Spring Data JPA, Spring Security
- MySQL
- JWT auth (jjwt 0.12)
- Lombok

## 1. Create the database
MySQL just needs to be running — the app auto-creates the `dabbat_db` schema
(`createDatabaseIfNotExist=true` in the JDBC URL). You only need a user with
access:

```sql
CREATE USER IF NOT EXISTS 'root'@'localhost' IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost';
```

Or edit `src/main/resources/application.properties` to point at your own
MySQL user/password/host.

## 2. Configure (optional)
Defaults live in `application.properties`. Override with env vars if you
don't want to edit the file:

| Env var | Default | Purpose |
|---|---|---|
| `JWT_SECRET` | dev key baked in | HMAC signing key — **set a real one in production** |
| `JWT_EXPIRATION_MS` | `86400000` (24h) | Token lifetime |
| `CORS_ORIGINS` | `http://localhost:5173,http://localhost:3000` | Allowed frontend origins |

Datasource URL/username/password are in `application.properties` directly —
change them there for your local MySQL setup.

## 3. Run
```bash
mvn spring-boot:run
```
The app starts on `http://localhost:8080`, all routes under `/api`.

On first run, `DataSeeder` inserts:
- The 5 products from the frontend's `mockData.ts` (same slugs/prices/etc.)
- An admin user: `admin@dabbat.in` / `admin123`

## API

### Auth (public)
| Method | Path | Body | Returns |
|---|---|---|---|
| POST | `/api/auth/register` | `{name, email, password}` | `{token, id, name, email, role}` |
| POST | `/api/auth/login` | `{email, password}` | `{token, id, name, email, role}` |

### Products
| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/api/products` | public | Optional `?category=` and `?search=` |
| GET | `/api/products/{slug}` | public | Single product |
| POST | `/api/products` | ADMIN | Create |
| PUT | `/api/products/{id}` | ADMIN | Update |
| DELETE | `/api/products/{id}` | ADMIN | Delete |

Product body:
```json
{
  "name": "Oxford Shirt",
  "slug": "oxford-shirt",
  "price": 1799,
  "category": "Shirts",
  "sizes": ["S", "M", "L", "XL"],
  "colors": ["Black", "Stone", "Navy"],
  "images": ["/images/product-black.svg"],
  "description": "...",
  "inStock": true
}
```

### Orders (checkout — replaces the client-only CartContext at purchase time)
| Method | Path | Auth | Notes |
|---|---|---|---|
| POST | `/api/orders` | logged-in user | Create an order from cart items |
| GET | `/api/orders/me` | logged-in user | Your order history |
| GET | `/api/orders/{id}` | owner or ADMIN | One order |
| GET | `/api/orders` | ADMIN | All orders |

Order request body:
```json
{
  "items": [
    { "productId": 1, "size": "M", "color": "Black", "quantity": 2 }
  ],
  "shippingAddress": "123 MG Road, Kochi, Kerala"
}
```

## Auth header
Every request needing auth uses:
```
Authorization: Bearer <token>
```
This is exactly what the frontend's axios interceptor already sends.

## Wiring up the frontend
The React app already targets this API shape. Two things to hook up that
currently use `mockData.ts` / local-only cart:
1. Replace `mockProducts` in `Shop.tsx` / `ProductDetail.tsx` with a fetch to
   `GET /api/products` (via the existing `api` axios instance).
2. On checkout, POST the `CartContext` items to `/api/orders` after login,
   store the returned token from `/api/auth/login` (or `/register`) into
   `localStorage.setItem("dabbat-token", token)`.

## Notes / things to harden before production
- Change `app.jwt.secret` and the datasource password via env vars.
- `ddl-auto=update` is convenient for dev; switch to migrations (Flyway/
  Liquibase) for production.
- Add pagination to `GET /api/products` if the catalog grows.
- Add a proper checkout/payment step before marking orders `CONFIRMED`.
