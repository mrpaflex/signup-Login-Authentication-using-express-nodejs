
module.exports = {
    getIndex: (request, response)=> {
        // response.sendFile(__dirname + 'index.html')
        response.render('index.ejs')

        
    },

    checkuser: (req, res)=>{
        res.render('dashboard')
    }
    
    //for now we do not need this
    // gohome: (request, response)=> {
    //     // response.sendFile(__dirname + 'index.html')
    //     response.render('in')
    // }
}