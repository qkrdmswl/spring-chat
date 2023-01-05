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

const getPostList = async (req, res) => {
    const posts = await Post.findAll({}).catch((err) => console.log(err));
    res.status(200).send(posts);
};

const getPostDetail = async (req, res) => {
    const id = req.params.id;
    const post = await Post.findOne({ where: { id: id } }).catch((err) =>
        console.log(err)
    );
    res.status(200).send(post);
};

const update = async (req, res) => {
    const id = req.params.id;
    const post = await Post.update(req.body, { where: {id: id} }).catch((err) =>
        console.log(err)
    );
    res.status(200).send(post);
};

const deletePost = async (req, res) => {
    const id = req.params.id;
    await Post.destroy({ where: {id: id} }).catch((err) =>
        console.log(err)
    );
    res.status(200).send("Post is deleted");
}


module.exports = {
    create,
    getPostList,
    getPostDetail,
    update,
    deletePost
}