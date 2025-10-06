
const { Pokemon } = require('./sequelize');
const { Op } = require('sequelize');

const auth = require('./auth/auth')

  
module.exports = (app) => {
  app.get('/api/pokemons', auth, (req, res) => {
    // if(req.query.name){//requete avec query ?name=xxxxx
    if(req.query.name){//requete avec query ?name=xxxxx
      const name = req.query.name;

      if(name.length < 2){
        const message = 'La recherche doit avoir au moins 2 lettres';
        return res.status(400).json({ message });
      }

      return Pokemon.findAndCountAll({
        where: { 
          name: {//name est la propriete du model pokemon
            //[Op.eq]: name//name est le critere exact de la recherche
            [Op.like]: `%${name}%`
          }
        },
        order: ['name'],
        // limit: 5
        limit: Number(req.query.limit) || 5
      })
      .then( ({count, rows}) => {
        const message = `Il y'a ${count} pokemons qui corresponde a la recherche ${name}`;
        res.json({ message, data: rows });
      });


    }
    else{
      Pokemon.findAll({ order: ['name'] })
        .then(pokemons => {
          const message = 'La liste des pokémons a bien été récupérée.'
          res.json({ message, data: pokemons })
        }).catch((err) => {
          const message = 'Liste des pokemons na pas pu etre recuperer';
          res.status(500).json({message, data: err});
        });
    }

  })
}

