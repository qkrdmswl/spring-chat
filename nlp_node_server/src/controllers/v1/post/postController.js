const db = require("../../../models")
const Post = db.posts;



const create = async (req, res) => {
    const post = {
        title: req.body.title,
        content: req.body.content
    }

    Post.create(post)
      .then(data => {
          res.send(data);
      })
      .catch(err => {
          res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Post."
          });
      });
};

const getPostList = (req, res) => {
    Post.findAll()
      .then(data => {
          res.send(data);
      })
      .catch(err => {
          res.status(500).send({
              message:
              err.message || "Some error occurred while retrieving Posts."
          });
      });
};


module.exports = {
    create,
    getPostList
}