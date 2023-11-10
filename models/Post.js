const mongoose = require(`mongoose`)

const { Schema, model } = mongoose

const PostSchema = new Schema(
  {
    product: String,
    price: Number,
    content: String,
    cover: String,
    marker: Boolean,
  },
  {
    timestamps: true,
  }
)

const PostModel = model(`Post`, PostSchema)

module.exports = PostModel
