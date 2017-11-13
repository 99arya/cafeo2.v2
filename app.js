var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var $ = require("jquery")
var ObjectId = require('mongodb').ObjectId;



    // mongoose.connect("mongodb://localhost/cafe_o2")
    mongoose.connect("mongodb://sumitarya:behaPPYhaha99!@ds255715.mlab.com:55715/o2db")
    mongoose.Promise = require('bluebird');
    app.use(express.static(__dirname + "/public"));

    app.use(bodyParser.urlencoded({extended:true}));
    app.set("view engine","ejs");
    
    //schema setup
    
    //Meal model==================

var mealSchema = new mongoose.Schema({
    mealname: String,
    mealprice: String
});

var Meal = mongoose.model("Meal", mealSchema);


  
    
    var Meal = mongoose.model("Meal", mealSchema);
    
var billSchema = new mongoose.Schema({
    ordernumber:String,
    tablenumber: String,
    waitername: String,
    meals: [
        {type: mongoose.Schema.Types.ObjectId,
            ref: "Meal"
        }
        ]
});

var Bill = mongoose.model("Bill", billSchema);
    

// Bill.create({
//     billnumber:"A012",
//     waitername: "Jhat"
// }, function(err, bill) {
//     if(err){
//         console.log(err)
//     }
    
    
//     console.log(bill)
    
// })


// Meal.create({
//             mealname:"paratha",
//             mealprice: "20"
    
// },            function(err,meal){
//                 Bill.findOne({billnumber:"A012"}, function(err, foundBill){
//                     if(err){
//                         console.log(err)
//                     } else foundBill.meals.push(meal)
//                       foundBill.save(function(err, data){
//                           if(err){
//                               console.log(err)
//                           } else {
//                               console.log(data)
//                           }
//                       })
//                 })
//             }
//             )

// Bill.findOne({billnumber:"A012"}).populate("meals").exec(function(err, bill){
//     if(err){
//         console.log(err)
//     } console.log(bill)
// })


    
    // ====================================================================================
    // Meal.create(
    //                 {   
    //                 name: "Changezi",
    //                 category:"Main course - Mughlai",
    //                 image:"https://i.ndtvimg.com/i/2016-07/chicken-korma_625x350_71467713811.jpg",
    //                 comment:"Spicy",
    //                 price:"600"
    //                 }, function(err, Meal){
    //                     if(err){
    //                         console.log(err)
    //                     } else {
    //                     console.log("meal created");
    //                     console.log(Meal)
    //                 }
    //             });
    // ==========================================================================================
                        // var meals=  [
                                    
                        //              {   name: "spring roll",
                        //                 category:"main course",
                        //                 image:"http://www.vegrecipesofindia.com/wp-content/uploads/2015/10/spring-rolls-recipe-2.jpg",
                        //                 comment:"spicy",
                        //                 price:"100"
                        //             },{   name: "spring roll",
                        //                 category:"main course",
                        //                 image:"http://www.vegrecipesofindia.com/wp-content/uploads/2015/10/spring-rolls-recipe-2.jpg",
                        //                 comment:"spicy",
                        //                 price:"100"
                        //             },{   name: "spring roll",
                        //                 category:"main course",
                        //                 image:"http://www.vegrecipesofindia.com/wp-content/uploads/2015/10/spring-rolls-recipe-2.jpg",
                        //                 comment:"spicy",
                        //                 price:"100"
                        //             }
                        //             ]
// =========================================================================================================================                                    
        app.get("/",function(req, res){
            res.render("landing");
         });
// =========================================================================================================================                                    
        app.get("/meals", function(req, res){
            
                          //Get meals from db

                          
                        Meal.find({}, function(err, allMeals){
                            if(err){
                                console.log(err);
                            } else {
                                res.render("meals",{meals:allMeals}); 
                          
                            }
                        })
        });
        
   
// =========================================================================================================================                                    
        app.post("/meals", function(req, res){
        
                var name = req.body.name;
                var category = req.body.category;
                var image = req.body.image;
                var comment = req.body.comment;
                var price = req.body.price;
      
        var newMeal = {name:name, category:category, image:image, comment:comment, price:price}
        
        // meals.push(newMeal);
        
        Meal.create(newMeal, function(err, newlyCreated){
            if(err){
                console.log(err)
            } else {
                res.redirect("/meals")
            }
        });
       });
// =========================================================================================================================                                    

   
                app.post("/", function(req, res){
        
                        var ordernumber = req.body.ordernumber;
                        var tablenumber = req.body.tablenumber;
                        var waitername = req.body.waitername;
       
      
        var newBill = new Bill({ordernumber:ordernumber, tablenumber:tablenumber, waitername: waitername})
        
        // meals.push(newMeal);
        
         Bill.create(newBill, function(err, bill){
            if(err){
                console.log(err);
            } else {
                 //redirect back to campgrounds
                 newBill.save(function(err, bill){
                    if(err){
                        console.log(err)
                    } console.log(bill);
                    res.redirect('/bills/' + bill._id)
                })
                 
                
            }
            
             
            
        });
       
    
        
        
        
      });
        
        // ======================================
        
      app.get("/bills", function(req, res) {
          var bill = req.body._id;
       
          
          Bill.find({}, function(err, allBills){
                            if(err){
                                console.log(err);
                            } else {
                                res.render("bill",{bills:allBills}); 
                         
                            }
                        })
            
      })
// =========================================================================================================================                                    

// SHOW - shows more info about one bill

    // app.get("/bills/:id", function(req, res) {
        
    //     // find campground with provided id
    //     Bill.findById(req.params.id).populate("bills").exec(function(err, foundBill){
    //         if(err){
    //             console.log(err)
    //         } else {
    //             // console.log(foundBill)
    //             // render show template with that campground
    //             // res.send(Bill)
    //             // res.render("bill", {bill: foundBill});
    //         }
    //     });
    //     req.params.id

    // });
//  ======================================================================================
// SHOW PAGE FOR SPECIFIC BILL ID, DISPLAY MEALS IS THAT BILL, DISPLAY ALL MEALS
//  ======================================================================================
   

    app.get("/bills/:id", function(req, res) {
        
        
        Bill.findById(req.params.id).populate("meals bills").exec(function(err, foundBill){
            if(err){
                console.log(err)
            } else {
                
                    Meal.find({}, function(err, allMeals){
                            if(err){
                                console.log(err);
                            } else {
                                res.render("show",{bill: foundBill, meals:allMeals}); 
                          
                            }
                        })

            }
        });
        req.params.id
        });
    
 
                //  Meal.find({}, function(err, allMeals){
                //             if(err){
                //                 console.log(err);
                //             } else {
                //                 res.render("bill",{meals:allMeals}); 
                        
                //             }
                //         })

                
                
                
                
 // =========================================================================================================================                                    
// new meal route
// =========================================================================================================================                                    


app.get("/bills/:id/meals/new", function(req, res) {
    
    Bill.findById(req.params.id, function(err, bill){
        if(err){
            console.log(err)
        }     res.render("newmeal", {bill: bill})

    })
    
})

                
// =========================================================================================
// add meal to specific bill
// =========================================================================================                
                
app.post("/bills/:id/meals", function(req, res) {
    Bill.findById(req.params.id, function(err, bill) {
        if(err){
            console.log(err)
        } 
        
        
        Meal.create(req.body.meal, function(err, meal) {
            if(err){
                console.log(err)
            }bill.meals.push(meal)
           
            bill.save()
             console.log(bill)
            res.redirect('/bills/' + bill._id);
        })
    })
})
 
  // =========================================================================================================================                                    
// create meal and push to specific bill
// =========================================================================================================================                                    


app.post("/bills/:id/meals", function(req, res) {
    Bill.findById(req.params.id, function(err, bill) {
        if(err){
            console.log(err)
        } Meal.create(req.body.meal, function(err, meal) {
            if(err){
                console.log(err)
            }bill.meals.push(meal)
           
            bill.save()
             console.log(bill)
            res.redirect('/bills/' + bill._id);
        })
    })
})
 
 
 // =========================================================================================================================                                    
 app.listen(process.env.PORT, process.env.IP, function(){
        console.log("Server started");
    });