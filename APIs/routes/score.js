const router = require('express').Router();
const Score = require('../resources/score');
const verifyToken = require('../utils/verifyToken');

router.post('/hackernews/api/upvote/:postid', /*verifyToken,*/ (req, res) => {
    Score.findOne({ articleId: req.params.postid }).then(function (data) {
        if (data) { // article already exists
            let score = data.score;
            score++;
            Score.findOneAndUpdate({ articleId: req.params.postid }, { $set: { score: score } }, { new: true })
                .then(function (response) {
                    res.send({
                        success: true,
                        status: 200,
                        score: response.score
                    });
                }).catch(err => res.status(500).send(err));
        }
        else { // if doesn't, create one 
            Score.create({ articleId: req.params.postid, score: 1 }).then(function (data) {
                res.send({
                    success: true,
                    status: 200,
                    score: data.score
                });
            }).catch(err => res.status(500).send(err));
        }
    }).catch(err => res.status(500).send(err));
});

router.get('/hackernews/api/score/:postid', /*verifyToken,*/ (req, res) => {
    Score.findOne({ articleId: req.params.postid }).then(function (data) {
        if (data) res.send({
            success: true,
            status: 'OK',
            score: data.score
        });
        else res.send({ // not upvoted/mintained yet
            success: true,
            status: 'OK',
            score: 0
        });
    }).catch(err => res.status(500).send(err));
});

module.exports = router;