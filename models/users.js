const mongoose = require('mongoose');
const urlRegex = /^(?:https?:\/\/|www\.)[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*\.[A-Za-z]{2,}(?:[A-Za-z0-9._~:/?%#[\]@!$&'()*+,;=-]*)$/
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    validate: {
      validator: function(v) {
        return urlRegex.test(v);
      },
      message: props => `${props.value} is not a valid image link!`
    },
    required: [true, 'User image link required']
  }
});


module.exports = mongoose.model('user', userSchema);