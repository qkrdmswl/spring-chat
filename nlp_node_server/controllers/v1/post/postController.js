const db = require("../../../models")
const Post = db.posts;



const create = async (req, res) => {
    const info = {
        title: req.body.title,
        content: req.body.content
    }

    const post = await Post.create(info).catch((err) => console.log(err));
    res.status(200).send(post);
};

// const getPostList = (req, res) => {
//     Post.findAll()
//       .then(data => {
//           res.send(data);
//       })
//       .catch(err => {
//           res.status(500).send({
//               message:
//               err.message || "Some error occurred while retrieving Posts."
//           });
//       });
// };


module.exports = {
    create
    // getPostList
}