module.exports = function(app, dbs) {
  
  app.get('/', function(req, res){
    res.send("Theo's PoC - SalesGear/TalentGear API");
  });

  app.get('/testCollection', function(req, res){

    dbs.collections.collection('Users').find({}).toArray(function(err, docs){
      if (err) {
        console.log(err)
        res.error(err)
      } else {
        console.log("testing")
        res.json(docs)
      }
    })
  })

  app.get('/hello', function(req, res){
    res.send("Theo's PoC - SalesGear/TalentGear API");
  });

  app.get('/testCollection', function(req, res){

    dbs.collections.collection('Users').find({}).toArray(function(err, docs){
      if (err) {
        console.log(err)
        res.error(err)
      } else {
        console.log("testing")
        res.json(docs)
      }
    })
  })

  
  app.get('/students', function(req, res){
    dbs.collections.collection('students').find({}).toArray(function(err, docs){
      if (err) {
        console.log(err)
        res.error(err)
      } else {
        console.log("testing")
        res.json(docs)
      }
    })
  })

 app.get('/auth', function(req, res){
  console.log("Parsing Query String ");
  //let oprid = req.query.Oprid;
  var oprid = req.query.Oprid;
  console.log("Oprid from Request = " + oprid);

    dbs.collections.collection('Users').find({"Oprid":oprid}).project({ "_id":0, "SGAccess": 1, "TGAccess": 1}).next( function(err, docs){
      if (err) {
        console.log(err)
        res.error(err)
      } else {
        console.log("Return from Mongo /w Projection:")
        console.log(docs)

          // var userAuth = { "AccessResponse": 
          //           {
          //             "SGAcces": true,
          //             "TGAccess":false
          //           }
          //         };

          var userAuth = { "AccessResponse": 
                              docs
                          };

        console.log("UserAuth Response (manual build):")
        console.log(userAuth)

        res.json(userAuth)
      }
    })
  })

 app.get('/auth2', function(req, res){

    const doc = dbs.collections.collection('Users')
      .find({"Oprid": "VIGNIO01"})
      .project({ "SGAccess": 1, "TGAccess": 1})
      .next( function(err, doc){
         if (err) {
           console.log(err)
           res.error(err)
         } else {
             console.log("req:=>" + req.originalUrl)
             console.log("req:=>" + req.baseURL)
             console.log("req:=>" + req.app)
             console.log("req:=>" + req.hostname)
             console.log("req:=>" + req.route)
             res.json(doc)
         }
       })
  })

  return app
}