const mongoose = require('mongoose');


const HotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characaters']
    },
    address:{
        type: String,
        required: [true, 'Please add an address']
    },
    tel:{
        type: String
    }
},
{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

// Cascade delete appointments when a hospital is deleted
HotelSchema.pre('deleteOne',  { document: true, query: false }, async function(next) {
    console.log(`Appointments being removed from hotel ${this._id}`);
    await this.model('Appointment').deleteMany({ hospital: this._id });
    next();
});

// Reverse populate with virtuals
HospitalSchema.virtual('appointments', {
    ref: 'Appointment',
    localField: '_id',
    foreignField: 'hotel',
    justOne: false
});

module.exports = mongoose.model('Hotel', HotelSchema);