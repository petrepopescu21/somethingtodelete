const soap = require('soap')
const crypto = require('crypto')

const test = () => {
	const wsdlUrl = 'https://external.externaltest.payex.com/pxorder/pxorder.asmx?WSDL';
	const encryptionKey = "2293987S5328N828432z";

	const sendData = {
		"accountNumber": 83155043,
		"purchaseOperation": "AUTHORIZATION",
		"price": 12500,
		"priceArgList": "",
		"currency": "NOK",
		"vat": 0,
		"orderID": "3f57d12e-61ca-44e0-a5f5-a55c02d6aa93",
		"productNumber": "Greier",
		"description": "abc",
		"clientIPAddress": "::ffff:10.3.0.68",
		"clientIdentifier": "",
		"additionalValues": "",
		"externalID": "",
		"returnUrl": "http://meny-feature.cloudlab.no/WSCheckoutPage/Verify?memberId=1551618&mwOrderId=3f57d12e-61ca-44e0-a5f5-a55c02d6aa93&cancelled=false",
		"view": "CREDITCARD",
		"agreementRef": "cdb4106c5dbd47c291abcf938db0109b",
		"cancelUrl": "http://meny-feature.cloudlab.no/kassen?memberId=1551618&mwOrderId=3f57d12e-61ca-44e0-a5f5-a55c02d6aa93&cancelled=true",
		"clientLanguage": "nb-NO"
	};

	const encryptString = Object.keys(sendData).map(key => sendData[key]).join('') + encryptionKey;
	const hash = crypto.createHash('md5').update(encryptString).digest('hex');
	sendData['hash'] = hash;

	return new Promise((resolve, reject) => {
		soap.createClient(wsdlUrl, (err, soapClient) => {
			if (err) {
				console.error(err);
				return reject(err);
			}
			soapClient.Initialize8(sendData, (err, res) => {
				if (err) {
					console.error(err);
					return reject(err);
				}
				console.log(res);
				return resolve(res);
			});
		});
	});
};

module.exports = {
	test,
};