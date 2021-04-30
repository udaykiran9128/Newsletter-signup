const express=require("express");
const request=require("request");
const app=express();
const bodyParser=require("body-parser");
const https=require("https");


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){res.sendFile(__dirname+"/index.html");});
app.post("/",function(req,res){
  var fname=req.body.fn;
  var lname=req.body.ln;
  var email=req.body.em;
  // console.log(fname,lname,email);
  var data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:fname,
          LNAME:lname
        }
      }
    ]
  };
  const jsondata=JSON.stringify(data);
  const url="https://us1.api.mailchimp.com/3.0/lists/95d0644758";

  const options={
    method:"POST",
    auth:"uday:a45f3d17d61d85d031a25b5c1b0e45c4-us1",
  }
  const request1=https.request(url,options,function(response){
    response.on("data",function(data){
      if(response.statusCode===200){res.sendFile(__dirname+"/success.html");}
      else{res.sendFile(__dirname+"/failure.html");}
      console.log(JSON.parse(data));
    });
  });
  request1.write(jsondata);
  request1.end();

});

app.post("/failure",function(req,res){
  res.redirect("/");
});


app.listen(process.env.PORT||3000,function(req,res){console.log("Server running on port 3000");});
// a45f3d17d61d85d031a25b5c1b0e45c4-us1
// 95d0644758
