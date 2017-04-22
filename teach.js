/**
 * Created by admin on 2017/4/22.
 */
var http = require("http");
var qs = require("querystring");
var path = require("path");
var fs = require("fs");
var url = require("url");
var MIME_TYPE = {
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    "json": "application/json",
    "pdf": "application/pdf",
    "png": "image/png",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml"
};


http.createServer(onRequest).listen(8888);
function onRequest(req,res){
    var post = "";
    var filename = "";
    if(req.url === "/"){
        filename = "public/index.html";
    }
    else{
        filename = "public"+url.parse(req.url).pathname;
    }
    req.on("data",function(chuck){
        post += chuck;
        console.log(post);
    });
    req.on("end",function(){
        post = qs.parse(post);
        var ext = path.extname(filename);
        ext = ext?ext.slice(1) : 'unknown';
        var contentType = MIME_TYPE[ext] || "text/plain";
        res.writeHead(200,{"Content-Type":contentType});
        if(qs.parse(post)){
            res.end(post);
        }
        else{
            fs.readFile(filename,function(err,data){
                if(err){
                    res.end("<h1>500</h1>服务器内部错误！");
                }
                else{
                    res.end(data);
                }
            })
        }


    })

}