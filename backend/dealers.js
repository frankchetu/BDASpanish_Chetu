const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const CONNECTION_URL = 'mongodb://root:RRpbkAYBEJA2@35.202.6.114:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false';
const DATABASE_NAME = "BDASpanish";
const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	//port: 587,
	//secure: false,
	//requireTLS: true,
    service: 'Gmail',
    auth: {
        user: 'amitchetu9@gmail.com',
        pass: 'Chetu@123',
    },
});


const app = express();
var database, collection;


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/insertDealerInformation", (request, response) => {
	var dealername = request.body.data.dealername;
	var contactname = request.body.data.contactname;
	var contactnumber = request.body.data.contactnumber;
	var emailaddress = request.body.data.emailaddress;
	var address = request.body.data.address;
	var city = request.body.data.city;
	var state = request.body.data.state;
	var zipcode = request.body.data.zipcode;
	var inventoryprovider = request.body.data.inventoryprovider;
	
	const mailOptions = {
		from: 'BDASpanish@gmail.com',
		to: emailaddress,
		subject: 'BDASpanish!',
		text: `Hola ${dealername},\n\nGracias por contactar con nosotras.\n\n nombre de contacto del distribuidor: ${contactname}.\n\n número de contacto del distribuidor: ${contactnumber}.\n\n dirección de correo electrónico: ${emailaddress}.\n\n dirección: ${address}.\n\n ciudad: ${city}.\n\n estado: ${state}.\n\n código postal: ${zipcode}.\n\n Proveedor de inventario: ${inventoryprovider}.`,
	};
	const mailOptions1 = {
		from: 'BDASpanish@gmail.com',
		to: 'amitchetu9@gmail.com',
		subject: 'BDASpanish!',
		text: `Hola ${dealername},\n\n Gracias por contactar con nosotras.`,
	};
	
    collection.insertOne(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
		transport.sendMail(mailOptions1, (error, info) => {
			if (error) {
				console.log(error);
			}
			console.log(`Message sent a`);
		});
		transport.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.log(error);
			}
			console.log(`Message sent b`);
		});
		return response.send(result.result);
    });
});

app.listen(5500, () => {
    MongoClient.connect(CONNECTION_URL, { useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("dealers_information");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});