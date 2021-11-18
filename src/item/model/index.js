import { Schema, model } from 'mongoose'

const CounterSchema = new Schema({
  _id: {
     type: String,
     required: true
  },
  seq: {
     type: Number,
     default: 0
  }
});
const counter = model('counter', CounterSchema);

const itemSchema = new Schema({
  itemId: {
    type: Number
  },
  title: {
    type: String,
    required: true
  },
  description: {
      type: String,
      required: true
  },
  price: {
      type: Number,
      required: true
  },
  category: {
      type: String,
      required: true
  },
  isPurchased: {
     type: Boolean,
     default: false
  }
}, { timestamps: true })

itemSchema.pre('save', function(next) {
  const doc = this;
  counter.findByIdAndUpdate({
        _id: 'entityId'
     }, {
        $inc: {
           seq: 1
        }
     }, {
        new: true,
        upsert: true
     }).then(function(count) {
        doc.itemId = count.seq;
        next();
     })
     .catch(function(error) {
        console.error("counter error-> : " + error);
        throw error;
     });
});

const ItemModel = model('Item', itemSchema)

export default ItemModel
