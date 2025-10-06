

const express = require('express');

const morgan = require('morgan');
const favicon = require('serve-favicon');
const bodyParser =require('body-parser');

const {success, getUniqueId} = require('./helper.js');
let pokemons = require('./mock-pokemon');

const app = express();
const port = 3000;


app.use(favicon(__dirname + '/favicon-node.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json());



app.get('/', (req, res) => {
    res.send('Hello Express');
});

app.get('/api/pokemon/:id', (req, res) => {
    const id = Number(req.params.id);
    const pokemon = pokemons.find(pokemon => pokemon.id === id);
    const message = 'Un pokemon a bien ete trouve';
    console.log(pokemon);
    res.json(success(message, pokemon));
});

app.get('/api/pokemons', (req, res) => {
    const message = 'Liste pokemons a bien ete trouvee';
    // console.log(success(message, pokemons));
    res.json(success(message, pokemons));
});





app.post('/api/pokemons', (req, res) => {
    const id = getUniqueId(pokemons);
    const pokemonCreated = {...req.body, ...{id: id, created: new Date()}};
    pokemons.push(pokemonCreated);
    const message = `Le pokemon ${pokemonCreated.name} has been created`;
    res.json(success(message, pokemonCreated));
});




app.put('/api/pokemon/:id', (req, res) => {
    const id = Number(req.params.id);
    const pokemonUpdated = {...req.body, id: id};
    pokemons = pokemons.map( pokemon => { return pokemon.id === id ? pokemonUpdated : pokemon });
    const message = `Le pokemon ${pokemonUpdated.name} has been modified`;
    res.json(success(message, pokemonUpdated));
});




app.delete('/api/pokemon/:id', (req, res) => {
    const id = Number(req.params.id);
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id); 
    pokemons.filter(pokemon => pokemon.id !== id)
    const message = `Le pokemon ${pokemonDeleted.name} has been deleted`;
    res.json(success(message, pokemonDeleted));
});




app.listen(port, () => {
    console.log(`Notre app est demarre sur : http://localhost: ${port}`);
});







/************ APP.JS N-2 ************/


const express = require('express');

const morgan = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');


// const {Sequelize, DataTypes} = require('sequelize');
// const PokemonModel = require('./src/pokemons');
// let pokemons = require('./src/mock-pokemon.js');


const {success, getUniqueId} = require('./helper.js');


const app = express();
const port = 3000;



/* SEQUELIZE */

// const sequelize = new Sequelize(
//     'pokedex',//name database
//     'root',//id user
//     '',//password
//     {
//         host: 'localhost',
//         dialect: 'mariadb',
//         dialectOptions: {
//             timezone: 'Etc/GMT-2'
//         },
//         logging: false
//     }
// );

sequelize.authenticate().then(_ => console.log('La connexion a ete etablie'))
                        .catch( error => console.log(`Impossible de se connecter database: ${error}`));


// const Pokemon = PokemonModel(sequelize, DataTypes);

// sequelize.sync({force: true}).then(_ => {

//     console.log('Database pokedex sync');

//     pokemons.map( pokemon => {

//         Pokemon.create({
//             name: pokemon.name,
//             hp: pokemon.hp,
//             cp: pokemon.cp,
//             picture: pokemon.picture,
//             types: pokemon.types.join()
//         }).then( pokemon => console.log(pokemon.toJSON()) );

//     });

// });



/* EXPRESS */                        

app.use(favicon(__dirname + '/favicon-node.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json());



app.get('/', (req, res) => {
    res.send('Hello Express');
});



app.get('/api/pokemons', (req, res) => {
    const message = 'La liste pokemon a ete trouvee';
    res.json(success(message, pokemons));
});


app.get('/api/pokemon/:id', (req, res) => {
    const id = Number(req.params.id);
    const pokemon = pokemons.find( pokemon => pokemon.id === id);
    const message = 'Le pokemon a bien ete trouvee';
    res.json(success(message, pokemon));
});


app.post('/api/pokemons', (req, res) => {
    const id = getUniqueId(pokemons);
    const pokemonCreated = { ...req.body, ...{id: id, created: new Date()}};
    pokemons.push(pokemonCreated);
    const message = `Le pokemon ${pokemonCreated.name} has been created`;
    res.json(success(message, pokemonCreated));
});



app.put('/api/pokemon/:id', (req, res) => {
    const id = Number(req.params.id);
    const pokemonUpdated = {...req.body, id: id};
    pokemons = pokemons.map( pokemon => {return pokemon.id === id ? pokemonUpdated : pokemon});
    const message = `Le pokemon ${pokemonUpdated.name} has been modified`;
    res.json(success(message, pokemonUpdated));
});


app.delete('/api/pokemon/:id', (req, res) => {
    const id = Number(req.params.id);
    pokemonDeleted = pokemons.find( pokemon => pokemon.id === id );
    pokemons = pokemons.filter( pokemon => pokemon.id !== id);
    const message = `Le pokemon ${pokemonDeleted.name} has been deleted`;
    res.json(success(message, pokemonDeleted));
});





app.listen(port, () => {
    console.log(`Notre app est demarre sur : http://localhost: ${port}`);
});

