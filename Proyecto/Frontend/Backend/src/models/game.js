const { DataTypes } = require('sequelize')

const database = require('../db')

module.exports = (database) =>{
    database.define("Game",{
        id:{
            type:DataTypes.STRING,
            primaryKey:true,
        },
        name:{
                type:DataTypes.STRING,
                unique:true
            },
        description:{
                    type:DataTypes.TEXT,
                },
        image:{
                type:DataTypes.STRING,
                },
        devices:{
                    type:DataTypes.ARRAY(DataTypes.STRING)
                    },
        release:{
                    type:DataTypes.STRING,
                },
        ratings:{
            type:DataTypes.STRING,
        },
        
    },
    
    )
}
