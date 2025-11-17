const mongoose = require(`mongoose`);

const CommentSchema = mongoose.Schema({
  categoriesName: {
    type: String,
    required: true,
  },
  subCategories: [
    {
      type: String,
      required: true,
    },
  ],
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
