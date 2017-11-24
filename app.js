  //=========================================================================================================================                                    
 //  DESIGNED AND DEVELOPED BY "SUMIT ARYA" : "<ARYASUMIT145@GMAIL.COM>" "WWW.CANATECH.IN" "WWW.SUMITARYA.TK"
//=========================================================================================================================                                    


var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var $ = require("jquery")
var ObjectId = require('mongodb').ObjectId;
var  path = require('path');
var port = process.env.PORT || 3000;


  //=========================================================================================================================                                    
 //  CONNECT AND USE THE REQUIRED  web application framework for Node.js
//=========================================================================================================================                                    


    // mongoose.connect("mongodb://localhost/cafe_o2")
    mongoose.connect("mongodb://sumitarya:behaPPYhaha99!@ds255715.mlab.com:55715/o2db")
    mongoose.Promise = require('bluebird');
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.static(__dirname + "/views"));
    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({extended:true}));
    app.set("view engine","ejs");


  //=========================================================================================================================                                    
 //  MEAL MODEL AND SCHEMA
//=========================================================================================================================                                    


var mealSchema = new mongoose.Schema({
    mealname: String,
    mealprice: String
    });

var Meal = mongoose.model("Meal", mealSchema);




  //=========================================================================================================================                                    
 //  BILL MODEL AND SCHEMA
//=========================================================================================================================                                    

    
var billSchema = new mongoose.Schema({
    bn:Number,
    tablenumber: { type: String, required: true },
    waitername: { type: String, required: true },
    created: {type: Date, default: Date.now},
    meals: [
        {type: mongoose.Schema.Types.ObjectId,
            ref: "Meal"
        }
        ]
    });

var Bill = mongoose.model("Bill", billSchema);
    

  //=========================================================================================================================                                    
 //  ROOT ROUTE - GET - NEW BILL FORM
//=========================================================================================================================                                    

 
app.get("/",function(req, res){
    
    Bill.count(function(err, count){
        if(err){
            console.log(err)
        }
        console.log("Total matches: "+count);
        res.render("landing")
            ;});
         });



  //=========================================================================================================================                                    
 //  MEALS ROUTE - GET - DISPLAY ALL MEALS
//=========================================================================================================================                                    

 app.get("/meals", function(req, res){
            
                       
        Meal.find({}, function(err, allMeals){
            if(err){
                console.log(err);
            } else {
                res.render("meals",{meals:allMeals}); 
          
            }
        })
    });
        
   
  //=========================================================================================================================                                    
 //  MEALS ROUTE - POST - DISPLAY ALL MEALS
//=========================================================================================================================                                    
       
app.post("/meals", function(req, res){

        var name = req.body.name;
        var category = req.body.category;
        var image = req.body.image;
        var comment = req.body.comment;
        var price = req.body.price;

var newMeal = {name:name, category:category, image:image, comment:comment, price:price}



    Meal.create(newMeal, function(err, newlyCreated){
        if(err){
                console.log(err)
            } else {
                    res.redirect("/meals")
        }
    });
    });

  //=========================================================================================================================                                    
 //  ROOT ROUTE - POST - CREATE A NEW BILL WITH AUTO GENEREATED BILL NUMBER
//=========================================================================================================================                                    

   
app.post("/", function(req, res){
        
        
        Bill.count(function(err, count){
            if(err){
                console.log(err)
            }
            console.log("Total matches: "+count);
                        var bn = count+1;
                        var tablenumber = req.body.tablenumber;
                        var waitername = req.body.waitername;
       
        console.log("New Match : " +bn)
        var newBill = new Bill({bn:bn, tablenumber:tablenumber, waitername: waitername})
        
        
        
        Bill.create(newBill, function(err, bill){
            if(err){
                console.log(err);
            } else {
                 //redirect back
                 newBill.save(function(err, bill){
                    if(err){
                        console.log(err)
                    } console.log(bill);
                    res.redirect('/bills/' + bill._id)
                })
                 
                
            }
            
             
            
        });});
                });
    
        
        
  //=========================================================================================================================                                    
 //  BILLS ROUTE - GET - DISPLAY ALL BILLS
//=========================================================================================================================                                    

        
app.get("/bills", function(req, res) {
          
        Bill.find({}, function(err, allBills){
                    if(err){
                        console.log(err);
                    } else {
                        res.render("bill",{bills:allBills}); 
                 
                    }
                })
    
      })


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
    
 
 // =========================================================================================================================                                    
//  GET A FORM TO ADD A NEW MEAL
// =========================================================================================================================                                    


app.get("/bills/:id/meals/new", function(req, res) {
    
    Bill.findById(req.params.id, function(err, bill){
        if(err){
            console.log(err)
        }     res.render("newmeal", {bill: bill})

    })
    
})

                
// =========================================================================================
// POST A NEW MEAL
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
 app.listen(port, process.env.IP, function(){
        console.log("Sumit's Server started! App is running on PORT : " + process.env.PORT);
    });
    
    
    
    
    
    
    
    
  //=========================================================================================================================                                    
 //  DESIGNED AND DEVELOPED BY "SUMIT ARYA" : "<ARYASUMIT145@GMAIL.COM>" "WWW.CANATECH.IN" "WWW.SUMITARYA.TK"
//=========================================================================================================================                                    
