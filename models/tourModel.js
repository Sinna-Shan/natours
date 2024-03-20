const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const User = require('./userModel');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name!'],
      unique: true,
      trim: true,
      maxlength: [45, 'a tour name must be less or equal than 45 characters'],
      minlength: [6, 'a tour name must be grater or equal than 6 characters'],
      // validate: [validator.isAlpha, 'Tour name must only contain alpha characters']
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'difficulty must be easy, medium or difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'a rating must be grater than 1.0'],
      max: [5, 'a rating must be less than 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price!'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // only runs on new document creation
          return val < this.price;
        },
        message: 'discount ({VALUE}) should be less than price',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'a tour must have a summary'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'a tour must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
    startLocation: {
      // Geo JSON for geo specific data
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    // guides: Array, // for embedding
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

//setting properties when getting data (not save in DB)
tourSchema.virtual('durationWeeks').get(function () {
  return (this.duration / 7).toFixed(2);
});

// virtual populate
tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id',
});

// Document Middleware
// before and after a function (pre/post)
// runs before .save() and .create()
// this key word points to the currently executing document
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.post('save', function (doc, next) {
//   next();
// });

// // Embedding guides in to tour document
// tourSchema.pre('save',async function(next){
//   const guidesPromises = this.guides.map(async id => await User.findById(id));
//   this.guides = await Promise.all(guidesPromises);
//   next();
// })

//Query middleware
// this key word points to the currently executing query
tourSchema.pre(/^find/, function (next) {
  // regex for all queries start with find
  this.find({ secretTour: { $ne: true } });
  next();
});

tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt',
  });
  next();
});

//AGGREGATION MIDDLEWARE
tourSchema.pre('aggregate', function (next) {});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
