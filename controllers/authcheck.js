const passport = require('passport');
//const validator = require('validator');
const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
    getlogin: (request, response)=> {
        if(request.user){
            return response.redirect('/dashboard')
        
        }
        // response.sendFile(__dirname + 'index.html')
        response.render('login.ejs')
    },

    getsignup: (request, response)=> {
        if(request.user){
            return response.redirect('/dashboard')
           
        }
        // response.sendFile(__dirname + 'index.html')
        response.render('signup.ejs')
    },

    checkSignupUser: async (request, response, next)=> {
      const {full_Name, email, username, password, comfirmPassword } = request.body;
      let errors = [];

        if(!full_Name || !email || !username || !password || !comfirmPassword){
            errors.push({msg: 'all field are required'})
            request.flash('errors', errors)
            next()
       }
        if (password !== comfirmPassword) {
            errors.push({msg: 'password do not matched'})
            request.flash('password do not matched')
            console.log(errors)
            next()
           
       }

         if (password.length < 6) {
             errors.push({msg: 'password must be atleast six character'})
             console.log(errors)
             next()
             
        }

          if (errors.length >0 ) {
           response.render('signup', {
               //this below will allow the input field to be there even after page refresh
                full_Name,
                email,
                username
                 
         })
        }else{
            //check for existing user
        ///email = validator.normalizeEmail(email, {gmail_remove_dots: false });
            const userExist = await User.findOne({
                email: email,
                username: username
            })

            if (userExist) {
                errors.push({msg: 'user with same detail already exist'})
               
                response.render('signup', {
                    full_Name,
                    email,
                    username
                })
            }else{
                //procced tohash password
                const newUser = await new User({
                    full_Name,
                    username,
                    email,
                    password
                })
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(newUser.password, salt)

        newUser.password = hashPassword;

        //save to database
        newUser.save()

        response.redirect('/login')
        request.flash('success')
            }   
         }
    },

    loginCheck: (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.redirect('/login');
            }
            req.login(user, (err) => {
                if (err) {
                    return next(err);
                }
                req.flash('msg', 'success')
                return res.redirect('/dashboard');
                
            });
        })(req, res, next);
    }
    

 }

