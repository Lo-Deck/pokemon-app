

const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée']


module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Pokemon', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Le nom est deja pris'
      },
      validate: {
        notEmpty: { msg: 'Vous devez mettre un nom et non une chaine vide.' },
        notNull: { msg: 'La propriete est vide' },
        max: {
          args: [25],
          msg: 'Cette chaine de caracteres doit contenir max 25 caracteres'
        }
      }
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: 'Utilisez uniquement des nombres entiers.' },
        notNull: { msg: 'Points de vie propriete requise' },
        min: {
          args: [0],
          msg: 'HP doit etre superieur a 0'
        },
        max: {
          args: [999],
          msg: 'HP doit etre inferieur a 999'
        }
      }
    },
    cp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: 'Utilisez uniquement des nombres entiers.' },
        notNull: { msg: 'Points de combat propriete requise' },
        min: {
          args: [0],
          msg: 'HP doit etre superieur a 0'
        },
        max: {
          args: [99],
          msg: 'HP doit etre inferieur a 99'
        }
      }
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: { msg: 'le chemin n\'est pas une url' },
        notNull: { msg: 'Chemin URL requis' }
      }
    },
    types: {
      type: DataTypes.STRING,
      allowNull: false,
      get(){
        return this.getDataValue('types').split(',')
      },
      set(types){
        this.setDataValue('types', types.join())
      },
      validate: {
        isTypesValid(value){
          if(!value){
            throw new Error('Un pokemon doit avoir au moins un type.')
          }
          if(value.split(',').length > 3){
            throw new Error('Un pokemon ne peut avoir plus de 3 types')
          }
          value.split(',').forEach( type => {
            if(!validTypes.includes(type)){
              throw new Error(`Le pokemon doit contenir un de ces types: ${validTypes}`)
            }
          })
        }
      }
    }
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  })
}