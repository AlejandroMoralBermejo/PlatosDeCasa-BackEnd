# 📖 Platos de Casa -- Backend

## 📌 ¿De qué va el proyecto?

**Platos de Casa** es una aplicación web pensada para guardar, organizar
y compartir recetas de cocina.
Este repositorio corresponde al **backend**, desarrollado con
**NestJS**, encargado de gestionar:
- CRUD de recetas (crear, leer, actualizar, eliminar).
- Registro e inicio de sesión de usuarios.
- Autenticación mediante **JWT**.
- Conexión con base de datos **PostgreSQL**.

------------------------------------------------------------------------

## 🛠️ ¿Qué herramientas se han utilizado?

-   **Framework Backend:** [NestJS](https://nestjs.com/)
-   **Base de datos:** PostgreSQL + [TypeORM](https://typeorm.io/)
-   **Autenticación:** JWT (JSON Web Token)
-   **Gestión de entornos:** dotenv
-   **Lenguaje:** TypeScript

------------------------------------------------------------------------

## ⚙️ ¿Cómo lo inicio?

### 1️⃣ Clonar el repositorio

``` bash
git clone https://github.com/AlejandroMoralBermejo/platos-de-casa-backend.git
cd platos-de-casa-backend
```

### 2️⃣ Instalar dependencias

``` bash
npm install
```

### 3️⃣ Configurar variables de entorno

Crear un archivo **.env** en la raíz con contenido similar a este:

``` env
# Servidor
PORT=3000

# Base de datos
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=platosdecasa

# JWT
JWT_SECRET=supersecret
JWT_EXPIRATION=3600s
```

⚠️ **Importante:** el archivo `.env` **no debe subirse a GitHub**.

### 4️⃣ Levantar el servidor en desarrollo

``` bash
npm run start:dev
```

El backend se ejecutará en:\
👉 `http://localhost:3000`

------------------------------------------------------------------------

## ⚠️ ¿Qué cosas debo tener en cuenta?

-   El archivo **`.env`** nunca debe subirse a GitHub.
-   La carpeta **`node_modules/`** está en `.gitignore` y no se
    versiona.
-   La carpeta **`dist/`** (código compilado) también se ignora en Git.
-   Los commits deben seguir la convención establecida en el proyecto
    (`feat:`, `fix:`, `chore:`, etc.).
-   Las ramas deben organizarse según la estrategia:
    -   `main` → producción.
    -   `features` → staging antes de producción.
    -   `dev_<nombre>` → ramas personales de desarrollo.

------------------------------------------------------------------------

## 👤 ¿Quién lo ha desarrollado?

Este backend está siendo desarrollado como proyecto personal por:
- **\[Alejandro Moral Bermejo\]**

------------------------------------------------------------------------

## 📬 ¿Cómo contacto?

Si quieres contactar conmigo:
- 📧 Linkedin: **https://www.linkedin.com/in/alejandro-moral-bermejo**
- 🐙 GitHub: [@AlejandroMoralBermejo](https://github.com/tuUsuario)