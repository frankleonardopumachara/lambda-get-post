# StarWars Weather API

Este proyecto es una **API Serverless** escrita en **TypeScript** que utiliza datos de personajes de Star Wars y cálculos de IMC. La API está desplegada en AWS utilizando **AWS Lambda** y **DynamoDB** con el uso de **Serverless Framework**. Proporciona autenticación, documentación y rate-limiting para mayor seguridad y control.

---

## 📦 **Dependencias del Proyecto**
- **@aws-sdk/client-dynamodb** y **@aws-sdk/lib-dynamodb**: Librerías para interactuar con DynamoDB.
- **axios**: Cliente HTTP para consumir la API de Star Wars.
- **serverless**: Framework para gestionar funciones AWS Lambda y recursos de AWS.
- **uuid**: Generación de identificadores únicos.

### **Dependencias de desarrollo**
- **jest** y **ts-jest**: Para la ejecución de pruebas unitarias.
- **typescript**: Soporte para TypeScript.
- **webpack** y **serverless-webpack**: Herramientas para empaquetar el código antes del despliegue.
- **@types/**: Tipos para TypeScript.

---

## 📦 **Instalación de dependencias**

Ejecuta el siguiente comando para instalar todas las dependencias del proyecto:

```bash
npm install
```

## 🧪 **Ejecución de pruebas**

Ejecuta el siguiente comando para instalar todas las dependencias del proyecto:

```bash
npm run test
```

## 🚀 **Despliegue en AWS**

El proyecto utiliza Serverless Framework para desplegar las funciones Lambda y los recursos necesarios.

```bash
npm run deploy
```
