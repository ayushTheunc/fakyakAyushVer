const express = require('express');
const router = express.Router();
const { addShare } = require('../db_ops/share_ops/add_share');
const { removeShare } = require('../db_ops/share_ops/remove_share');
const { getPostsSharedWithUser, getSharesByPost } = require('../db_ops/share_ops/get_shares');
const auth = require('../middleware/auth');

// Share a post with another user
router.post('/:postId/share', auth, async (req, res) => {
    console.log('Share request received:', {
        postId: req.params.postId,
        fromUserId: req.session.userId,
        toUserId: req.body.toUserId
    });
    try {
        const postId = req.params.postId;
        const { toUserId } = req.body;
        
        const success = await addShare(postId, req.session.userId, toUserId);
        console.log('Share result:', success);
        
        if (success) {
            res.json({ success: true });
        } else {
            res.status(400).json({ error: 'Failed to share post' });
        }
    } catch (error) {
        console.error('Share error:', error);
        res.status(500).json({ error: 'Error sharing post' });
    }
});



module.exports = router;

