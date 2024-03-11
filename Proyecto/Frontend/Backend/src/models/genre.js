const { DataTypes } = require('sequelize')

const database = require('../db')

module.exports = (database) =>{
    database.define("Genre",{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
            
        genre:{
                type:DataTypes.STRING,
                unique:true
            },
        
    },
    
    )
}