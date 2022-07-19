const mongoose = require('mongoose')
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const Person = require('../models/Person')
const TakenItem = require('../models/TakenItem')

mongoose.connect(process.env.ME_CONFIG_MONGODB_URL)
    .then(() =>{console.log('Connection to MongoDB is established')})
    .catch(err => {
            console.error('App starting error:', err.message);
            process.exit(1);
    });



module.exports = {
    getPerson: async (nickname) => Person.findOne({nickname}),
    getOwnDisks: async (person_id) => {
        const result = await TakenItem.aggregate([
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
        if(!result) return null
        return result.map(elem=> {
            return {
                id: elem.disk[0]._id,
                name: elem.disk[0].name
            }
        })
    },
    getFreeDisks: async (person_id) => {
        const result = await TakenItem.aggregate([
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
        if(!result) return null
        return result.map(elem=> {
            return {
                id: elem.disk[0]._id,
                name: elem.disk[0].name
            }
        })
    },
    getDisksTakenByPerson: async (person_id) => {
        const result = await TakenItem.aggregate([
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
        if(!result) return null
        return result.map(elem=> {
            return {
                id: elem.disk[0]._id,
                name: elem.disk[0].name
            }
        })
    },
    getDisksTakenFromPerson: async (person_id) => {
        const result = await TakenItem.aggregate([
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
        if(!result) return null
        return result.map(elem => {
           return {
                diskId: elem.disk[0]._id,
                diskName: elem.disk[0].name,
                personNickname: elem.person[0].nickname
           }
        })
    },
    getTakenItem: async (diskId) => {
        const result = await TakenItem.findOne({diskId: mongoose.Types.ObjectId(diskId)})
        if(!result) return null
        return {ownerid: result.ownerId.toString(), holderid: result.holderId.toString()}
    },
    giveDisk: async (diskId) => {
       try {
           const res = await TakenItem.updateOne({diskId: mongoose.Types.ObjectId(diskId)},
               [
                     {"$set": {"holderId": "$ownerId"}}
                  ])
           return res.acknowledged
       } catch (e) {
           console.log(e.message)
       }
    },
    takeDisk: async (person_id, diskId) => {
        const res = await TakenItem.updateOne({diskId:  mongoose.Types.ObjectId(diskId)}, {holderId: person_id})
        return res.acknowledged
    }
}

