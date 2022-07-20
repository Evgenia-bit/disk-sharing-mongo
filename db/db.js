const path = require("path")
const mongoose = require('mongoose')

const Person = require('../models/Person')
const TakenItem = require('../models/TakenItem')

require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

mongoose.connect(process.env.ME_CONFIG_MONGODB_URL)
    .then(() =>{console.log('Connection to MongoDB is established')})
    .catch(err => {
            console.error('App starting error:', err.message)
            process.exit(1)
    })


module.exports = {
    getPerson: async (nickname) => {
        return await Person.findOne({nickname})
    },
    getOwnDisks: async (person_id) => {
        const takenItems = await TakenItem.aggregate([
            {
                '$match': {
                    'ownerId': mongoose.Types.ObjectId(person_id)
                }
            }, {
                '$lookup': {
                    'from': 'disks',
                    'localField': 'diskId',
                    'foreignField': '_id',
                    'as': 'disk'
                }
            }
        ])
        if(!takenItems) return null
        return takenItems.map(takenItem=> {
            return {
                id: takenItem.disk[0]._id,
                name: takenItem.disk[0].name
            }
        })
    },
    getFreeDisks: async (person_id) => {
        const takenItems = await TakenItem.aggregate([
            {
                '$match': {
                    '$expr': {
                        '$eq': [
                            '$ownerId', '$holderId'
                        ]
                    },
                    'ownerId': {
                        '$ne': mongoose.Types.ObjectId(person_id)
                    }
                }
            }, {
                '$lookup': {
                    'from': 'disks',
                    'localField': 'diskId',
                    'foreignField': '_id',
                    'as': 'disk'
                }
            }
        ])
        if(!takenItems) return null
        return takenItems.map(takenItem=> {
            return {
                id: takenItem.disk[0]._id,
                name: takenItem.disk[0].name
            }
        })
    },
    getDisksTakenByPerson: async (person_id) => {
        const takenItems = await TakenItem.aggregate([
                {
                    '$match': {
                        'ownerId': {
                            '$ne': mongoose.Types.ObjectId(person_id)
                        },
                        'holderId': mongoose.Types.ObjectId(person_id)
                    }
                }, {
                '$lookup': {
                    'from': 'disks',
                    'localField': 'diskId',
                    'foreignField': '_id',
                    'as': 'disk'
                }
            }])
        if(!takenItems) return null
        return takenItems.map(takenItem=> {
            return {
                id: takenItem.disk[0]._id,
                name: takenItem.disk[0].name
            }
        })
    },
    getDisksTakenFromPerson: async (person_id) => {
        const takenItems = await TakenItem.aggregate([
            {
                '$match': {
                    'ownerId': mongoose.Types.ObjectId(person_id),
                    'holderId': {
                        $ne: mongoose.Types.ObjectId(person_id)
                    }
                }
            }, {
                '$lookup': {
                    'from': 'disks',
                    'localField': 'diskId',
                    'foreignField': '_id',
                    'as': 'disk'
                }
            }, {
                '$lookup': {
                    'from': 'people',
                    'localField': 'holderId',
                    'foreignField': '_id',
                    'as': 'person'
                }
            }
        ])
        if(!takenItems) return null
        return takenItems.map(takenItem => {
           return {
                diskId: takenItem.disk[0]._id,
                diskName: takenItem.disk[0].name,
                personNickname: takenItem.person[0].nickname
           }
        })
    },
    getTakenItem: async (diskId) => {
        const takenItem = await TakenItem.findOne({diskId: mongoose.Types.ObjectId(diskId)})
        if(!takenItem) return null
        return {
            ownerid: takenItem.ownerId.toString(),
            holderid: takenItem.holderId.toString()
        }
    },
    giveDisk: async (diskId) => {
        const resultsOfUpdatingTakenElement = await TakenItem.updateOne({diskId: mongoose.Types.ObjectId(diskId)},
            [
                   {"$set": {"holderId": "$ownerId"}}
               ])
        return resultsOfUpdatingTakenElement.acknowledged
    },
    takeDisk: async (person_id, diskId) => {
        const resultsOfUpdatingTakenElement = await TakenItem.updateOne({diskId:  mongoose.Types.ObjectId(diskId)}, {holderId: person_id})
        return resultsOfUpdatingTakenElement.acknowledged
    }
}

