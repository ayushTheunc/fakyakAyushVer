const { pool } = require('../../config/db');

/* 
* - ADDS A POST TO THE DATABASE
* - CREATES CORRESPONDING METRICS
* - USES TRANSACTION TO ENSURE BOTH OPERATIONS SUCCEED
*/
async function addPost(userId, content) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        
        // Create post
        const [result] = await connection.query(
            'INSERT INTO Posts (UserID, Content) VALUES (?, ?)',
            [userId, content]
        );
        
        // Create metrics
        await connection.query(
            'INSERT INTO PostMetrics (PostID, LikeCount, ShareCount) VALUES (?, 0, 0)',
            [result.insertId]
        );
        
        await connection.commit();
        return result.insertId;
    } catch (error) {
        await connection.rollback();
        console.error('Error adding post:', error);
        throw error;
    } finally {
        connection.release();
    }
}

module.exports = { addPost };