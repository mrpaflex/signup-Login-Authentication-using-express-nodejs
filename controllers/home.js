const Post = require('../models/Mypost');
const User = require('../models/User');

module.exports = {
    getIndex: (request, response)=> {
        // response.sendFile(__dirname + 'index.html')
        response.render('index.ejs')

        
    },

    checkuser: async (req, res)=>{
        try {
            const userposts = await Post.find({ userId:req.user.id });
        
            if (!userposts || userposts.length === 0) {
              console.log('You haven\'t made any posts yet');
            }
        
            res.render('dashboard', { holdposts: userposts });
      
          } catch (error) {
            console.error(error);
            res.status(500).send('Error retrieving posts: ' + error.message);
          }
        },
        // res.render('dashboard')
    }
//}