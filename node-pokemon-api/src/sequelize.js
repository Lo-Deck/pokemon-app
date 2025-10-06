

/* L’API Rest et la Base de données : Créer un modèle Sequelize */
const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('./pokemons')
const pokemons = require('./mock-pokemon')

const UserModel = require('./user') 

const bcrypt = require('bcrypt')



let sequelize;

if(process.env.NODE_ENV === 'production'){
    // 1. UTILISER DATABASE_URL fournie par Render (Postgres)
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres', // IMPORTANT : Adapter le dialecte
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            },
            timezone: 'Etc/GMT-2',
        },
        logging: true //false
    });
}
else{
  sequelize = new Sequelize('pokedex', 'root', '', {
      host: 'localhost',
      dialect: 'mariadb', // dialecte local
      dialectOptions: {
          timezone: 'Etc/GMT-2',
      },
      logging: false
  });
}





  
// const sequelize = new Sequelize('pokedex', 'root', '', {
//   host: 'localhost',
//   dialect: 'mariadb',
//   dialectOptions: {
//     timezone: 'Etc/GMT-2',
//   },
//   logging: false
// });




const Pokemon = PokemonModel(sequelize, DataTypes)

const User = UserModel(sequelize, DataTypes)
  
const initDb = () => {
  return sequelize.sync().then(_ => {
    pokemons.map(pokemon => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types
      }).then(pokemon => console.log(pokemon.toJSON()))
    })

    bcrypt.hash('pikachu', 10)
      .then( hash => User.create({ username: 'pikachu', password: hash }) )
      .then( user => console.log(user.toJSON()) );

    console.log('La base de donnée a bien été initialisée !')
  })
}
  
module.exports = {
  initDb, Pokemon, User
}