
const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');

const sequelize = require('./src/sequelize');

const app = express();
const port = 3000;


/* SEQUELIZE */


/* EXPRESS */                        

app.use(favicon(__dirname + '/favicon-node.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json());



sequelize.initDb();

require('./src/findAllPokemons')(app);
require('./src/findPokemonByPk')(app);
require('./src/route/createPokemon')(app);
require('./src/route/updatePokemon')(app);
require('./src/route/deletePokemon')(app);
require('./src/route/logging')(app);





app.use((req, res) => {
    const message = 'Impossible de trouver la resource demandee';
    res.status(404).json({message});
})

app.listen(port, () => {
    console.log(`Notre app est demarre sur : http://localhost: ${port}`);
});
 