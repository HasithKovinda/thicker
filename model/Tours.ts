import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Tour must have a name"],
      minLength: [10, "Tour name must have at least 10 charters"],
      maxLength: [50, "Tour name must not exceed 50 charters"],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, "Tour must have a duration"],
    },
    maxGroupSize: {
      type: Number,
      required: [true, "Tour must have a maxGroupSize"],
    },
    difficulty: {
      type: String,
      required: [true, "Tour must have a difficulty"],
      enum: {
        values: ["easy", "medium", "difficult"],
        message: "Difficulty either easy or medium or difficult",
      },
    },

    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Tour rating average above 1"],
      max: [5, "Tour rating average below 1"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Please Provide a price for the tour"],
    },
    priceDiscount: {
      type: Number,
    },
    summary: {
      type: String,
      required: [true, "Tour must have a summary"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Tour must have a description"],
    },
    imageCover: {
      type: String,
      required: [true, "Tour must have a cover image"],
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
      //GeoJSON format for geolocation data
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: "Point",
          enum: ["Point"],
        },
        coordinates: [Number],
        address: String,
        description: String,
      },
    ],
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export default mongoose.models.Tour || mongoose.model("Tour", tourSchema);
