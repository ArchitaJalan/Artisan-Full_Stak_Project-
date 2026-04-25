CREATE DATABASE artisan;
USE artisan;
CREATE TABLE user(userId INT AUTO_INCREMENT PRIMARY KEY ,
Username VARCHAR(20) UNIQUE,
Password VARCHAR(20),
Role VARCHAR(20),
Address VARCHAR(50),
MobileNo CHAR(10)
);

CREATE TABLE Product(
ProdId INT PRIMARY KEY AUTO_INCREMENT,
ProdName VARCHAR(20),
Price DOUBLE,
Description VARCHAR(100),
ProdImage VARCHAR(500),
ArtistName VARCHAR(20),
Stock INT,
Type VARCHAR(20),
Status VARCHAR(10)
);
ALTER TABLE Product MODIFY ProdName VARCHAR(100);
ALTER TABLE Product MODIFY Description VARCHAR(500);

ALTER TABLE Product 
ALTER Status SET DEFAULT 'NOT-SOLD';

CREATE TABLE Orders(
userId INT,
OrderId INT PRIMARY KEY,
Price DOUBLE,
ProdId INT,
DateTime TIMESTAMP,
Address VARCHAR(50),
FOREIGN KEY (userId) REFERENCES user(userId)
);
ALTER TABLE Orders ADD COLUMN MobileNo CHAR(10);
ALTER TABLE Orders MODIFY OrderId INT AUTO_INCREMENT;
SELECT *FROM Orders;


CREATE TABLE Favorites(
userId INT,
ProdId INT,
ProdImage VARCHAR(500),
createdAt TIMESTAMP,
FOREIGN KEY (userId) REFERENCES user(userId),
FOREIGN KEY (ProdId) REFERENCES Product(ProdId)
);

CREATE TABLE AddToCart(
userId INT,
ProdId INT,
ProdImage VARCHAR(500),
Price DOUBLE
);

INSERT INTO user VALUES(1,"Payal","payal","customer","bubnal",1234567890);
INSERT INTO user (Username, Password, Role, Address, MobileNo)
VALUES ('Shubham', 'shubh', 'artist', 'Karachi', '9876543213');

INSERT INTO user (Username, Password, Role, Address, MobileNo)
VALUES ('Archita', '123', 'admin', 'Ichalkaranji', '9876543217');

INSERT INTO user (Username, Password, Role, Address, MobileNo)
VALUES ('Shraddha', 'shr', 'admin', 'Karachi', '9876543218');

INSERT INTO user (Username, Password, Role, Address, MobileNo)
VALUES("Mahaveer","maha","customer","ichalkaranji",1234567890);

INSERT INTO user(Username, Password, Role, Address, MobileNo)
 VALUES("Rutuja","113","artist","kabnoor",1234567809);
 select * from user;
 
 INSERT INTO Product(ProdName, Price, Description,ProdImage, ArtistName ,Stock, Type)
 VALUES("Tranquility Art Print",35000,"Product Details A Moment Of Tranquility art print by Lucie Bilodeau.   Our art prints are produced on acid-free papers using archival inks to guarantee that they last a lifetime without fading or loss of color. All art prints include a 1 white border around the image to allow for future framing and matting, if desired.","https://render.fineartamerica.com/images/rendered/default/print/6/8/break/images-medium-5/a-moment-of-tranquility-lucie-bilodeau.jpg"," Lucie Bilodeau",5,"Painting");

INSERT INTO Product(ProdName, Price, Description,ProdImage, ArtistName ,Stock, Type)
 VALUES("Sitting Man",35000,"Product Details A Moment Of Tranquility art print by Lucie Bilodeau.   Our art prints are produced on acid-free papers using archival inks to guarantee that they last a lifetime without fading or loss of color. All art prints include a 1 white border around the image to allow for future framing and matting, if desired.","https://www.sharonsable.com/images/7/6282/charming-garden-art-sculpture-design-you-ll-love-it-garden-art-...-2694.jpg"," Lucie Bilodeau",5,"Sculpture");
 
 INSERT INTO Product(ProdName, Price, Description,ProdImage, ArtistName ,Stock, Type)
 VALUES("Tranquility Art Print",10000,"8x10 Digital Print of Original sketch. Lion originally sketched with a mix of ink, pencil, and, charcoal.

Printed with ultra pigment archival ink on ultra-premium matte paper.

Each print is hand-signed after printing.
The print will not include a watermark.

Please be aware that colors may vary on actual print depending on your computer screen.

Frame not included in purchase, for display only.","https://i.etsystatic.com/12215864/r/il/21c595/1957808095/il_1588xN.1957808095_ar7k.jpg"," Lucie Bilodeau",5,"Sketch");
 
 
 
 
 
