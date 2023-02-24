const fs = require("fs");

export default function handler(req, res) {
  if (!req.body.phone) {
    return res.status(201).json({ text: "SMS no send no phone number" });
  }

  if (!req.body.message) {
    return res.status(401).json({ text: "SMS no send no message empty" });
  }
  const registerMessage = async (message) => {
    const messagesData = fs.readFileSync("messages.json");

    const messages = JSON.parse(messagesData);

    const newMessage = message;
    messages.push(newMessage);

    fs.writeFile("messages.json", JSON.stringify(messages), (err) => {
      if (err) {
        return err;
      }
      console.log("Le nouveau message a été ajouté au fichier messages.json");
    });
  };

  const client = require("twilio")(
    process.env.ACCOUNTSID,
    process.env.AUTHTOKEN
  );

  const formatTelephone = (numero) => {
    let chiffres = numero.replace(/\D/g, "");
    if (chiffres.length === 9) {
      chiffres = "+33" + chiffres.substr(1);
    } else if (chiffres.length === 10) {
      chiffres = "+33" + chiffres.substr(1);
    }
    const formatted = chiffres.replace(
      /^(\+\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/,
      "$1 $2 $3 $4 $5"
    );
    return formatted;
  };
  client.messages
    .create({
      body: req.body.message,
      from: "+12765971482",
      to: formatTelephone(req.body.phone),
    })
    .then((message) => {
      registerMessage(message);
      return res.status(201).json({ text: "SMS send", message });
    })
    .catch((err) => {
      console.log("err", err);
      return res.status(401).json({ text: "SMS no send err" });
    });
}
