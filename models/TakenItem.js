const mongoose = require('mongoose')

const takenItemScheme = mongoose.Schema({
    ownerId: { type:  mongoose.Schema.Types.ObjectId, ref: 'Person' },
    holderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' },
    diskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Disk' },
});

const TakenItem = mongoose.model("TakenItem", takenItemScheme);

module.exports = TakenItem