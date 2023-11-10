const mongoose = require(`mongoose`)

const { Schema, model } = mongoose

const PostSchema = new Schema(
  {
    name: String,
    price: Number,
    content: String,
    image: String,
    added: Boolean,
  },
  {
    timestamps: true,
  }
)

const PostModel = model(`Post`, PostSchema)

module.exports = PostModel
