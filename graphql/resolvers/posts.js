const { Types } = require('mongoose');
const Post = require('../../models/Post.js');

module.exports = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find();
                console.log(posts);
                return posts;
            } catch (err) {
                throw new Error(err);
            }
        },
        async getPost(_, { postId }) {
            try {
                const post = await Post.findById(postId);
                if (post) return post;
                throw new Error('Post not found');
            } catch (err) {
                throw new Error(err);
            }
        },
    },
    Mutation: {},
};
