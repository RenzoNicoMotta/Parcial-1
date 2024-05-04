import express from 'express';
import bodyParser from 'body-parser';
import pokemonRoutes from './routes/pokemon.js';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Autenticación simulada con token en la query (token=xyz)
app.use((req, res, next) => {
  const token = req.query.token;
  if (token !== 'xyz') {
    return res.status(401).send('Unauthorized');
  }
  next();
});

app.get('/', (req, res) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>API Pokémon</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                padding: 20px;
            }
            footer {
                margin-top: 50px;
                text-align: center;
                font-style: italic;
                color: #888;
            }
            a {
                text-decoration: none;
                color: blue;
                margin-right: 10px;
            }
        </style>
    </head>
    <body>
        <h1>API Pokémon</h1>
        <p>La API Pokémon permite acceder a diferentes endpoints mediante URL para interactuar con datos de Pokémon.</p>
        <p>Recorda que al final de cada url tienes que usar el token de esta manera: ?token=xyz </p>
        <p>Algunos ejemplos de endpoints disponibles incluyen:</p>
        <ul>
            <li><a href="/pokemon?token=xyz">Ver todos los Pokémon</a></li>
            <li><a href="/pokemon/1?token=xyz">Ver pokemon con id 1 (cambiar el 1 en url para ver otros)</a></li>
            <li><a href="/pokemon/type/water?token=xyz">Ver pokemon de tipo agua (cambiar el tipo en url para ver otros)</a></li>
        </ul>
        <h1> Todas las url / Postman </h1>
        <ul>
        <li> Token = xyz </li>
        <li> Ver todos los pokemons GET http://localhost:3000/pokemon?token=xyz </li>
        <li> Ver pokemon x id GET http://localhost:3000/pokemon/:id?token=xyz </li>
        <li> Ver pokemon x tipo GET http://localhost:3000/pokemon/type/:type?token=xyz </li>
        <li> Ver pokemon x gen GET http://localhost:3000/pokemon/generation/:gen?token=xyz </li>
        <li> Ver pokemon ordenados x gen GET http://localhost:3000/pokemon/order/ordered-by-generation?token=xyz </li>
        <li> Bucas pokemon x nombre GET http://localhost:3000/pokemon/search/:name?token=xyz </li>
        <li> Agregar Pokemon  POST http://localhost:3000/pokemon?token=xyz </li>
        <li> Actualizar Pokemon PUT http://localhost:3000/pokemon/:id?token=xyz </li>
        <li> Eliminar Pokemon DELETE http://localhost:3000/pokemon/:id?token=xyz </li>
        </ul>
        <footer>
            <p>Desarrollado por: Renzo Nicolas Motta</p>
            <p>Materia: Aplicaciones Híbridas</p>
            <p>Profesor: MARCOS GALBAN, Camila Belen</p>
            <p>Comisión: DWN4AV</p>
            <p>Año: 2024</p>
        </footer>
    </body>
    </html>
  `;

  res.send(htmlContent);
});

app.use('/pokemon', pokemonRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
