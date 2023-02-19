const http = require("http");
const fs = require("fs");

// cors middleware
function setCorsHeaders(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  console.log(req.headers);
  next();
}

// this function handles my request after cors middleware
function myapi(req, res) {
  if (req.url === "/upload") {
    let imageData = "";
    req.on("data", (chunck) => {
      imageData += chunck;
    });

    req.on("end", () => {
      const fileName = Math.random() + "my-image.png";
      const filePath = "./uploads/" + fileName;

      fs.writeFile(filePath, imageData, "base64", function (err) {
        if (err) {
          console.log(err);
          res.statusCode = 500;
          res.end("Error saving image");
        } else {
          res.statusCode = 200;
          res.end("Image saved");
        }
      });
    });
  }
}

http
  .createServer((req, res) => {
    setCorsHeaders(req, res, () => {
      myapi(req, res);
    });
  })
  .listen(8000, () => {
    console.log("Server runnning on port 8000");
  });
