const { pool } = require('../../config/db');

/* 
* - UPDATES A POST'S CONTENT
* - ONLY THE OWNER OF THE POST CAN UPDATE IT
*/
async function updatePost(postId, userId, newContent) {
    try {
        // First check if user owns the post
        const [post] = await pool.query(
            'SELECT PostID FROM Posts WHERE PostID = ? AND UserID = ?',
            [postId, userId]
        );

        if (post.length === 0) {
            return false;
        }

        const [result] = await pool.query(
            'UPDATE Posts SET Content = ? WHERE PostID = ?',
            [newContent, postId]
        );

        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error updating post:', error);
        throw error;
    }
}

module.exports = { updatePost };