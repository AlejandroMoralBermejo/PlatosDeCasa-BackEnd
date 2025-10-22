# Imagen base
FROM node:20-alpine

# Instalar dependencias necesarias
RUN apk add --no-cache python3 make g++ libc6-compat

# Directorio de trabajo
WORKDIR /app

# Copiar solo los archivos de dependencias
COPY package*.json ./

# Instalar dependencias (incluye devDependencies)
RUN npm install

# Copiar todo el código fuente
COPY . .

# Exponer el puerto
EXPOSE 3000

# Comando de arranque en modo desarrollo (Nest con hot-reload)
CMD ["npm", "run", "start:dev"]
