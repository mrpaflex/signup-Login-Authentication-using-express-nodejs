const Post = require('../models/Mypost');
const User = require('../models/User');

module.exports = {
  myPostInDashboard: async (req, res) => {
    
    try {
      const userposts = await Post.find({ userId:req.user.userId });
  
      if (!userposts || userposts.length === 0) {
        console.log('You haven\'t made any posts yet');
      }
  
      res.render('/dashboard', { holdposts: userposts });

    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving posts: ' + error.message);
    }
  },


  takeMeposts: async (req, res)=>{
            res.render('posts')
            console.log('this is post route')
    },

    makePost : async (req, res)=>{
        try {
            const {author, title, body} = req.body

          await Post.create({authorName: author, title: title, body: body, likeCount: 0, comment: ' ',  userId: req.user.id });
         res.redirect('/dashboard')

        } catch (error) {
            console.log(error);
            res.redirect('/dashboard/posts')     
        }

    },

    checkmeupdate: async (req, res)=>{
        res.render('update')
    },


    updateMe: async (req, res) => {
        try {
          const userId = req.user.id;
      
          const { gender, address, dob, phone } = req.body;
      
          // Find the user by ID
          const existingUser = await User.findById(userId);
      
          if (!existingUser) {
            // Handle the case when the user is not found
            res.redirect('/dashboard/update')
           // return res.status(404).json({ error: 'User not found' });
          }
      
          // Update the user's information
          existingUser.dob = dob;
          existingUser.address = address;
          existingUser.phone = phone;
          existingUser.gender = gender;
          // Add other fields to update as needed
      
          // Save the updated user
          await existingUser.save();
      
          // Redirect to the dashboard with a success message
          res.redirect('/dashboard');
          console.log('successful');
        } catch (error) {
          // Handle other errors
          console.error(error);
         /// res.status(500).json({ error: 'Internal server error' });
         res.redirect('/dashboard/update')
        }
      }

}