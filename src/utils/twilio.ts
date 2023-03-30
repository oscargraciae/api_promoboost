import { Twilio } from "twilio";
import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } from "../config/constants";

const TwilioUtility = (message: string, phone: string) => {
  const client = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

  client.messages.create({ body: message, to: phone, from: TWILIO_PHONE_NUMBER })
    .then(message => console.log("Respuesta de twilio", message.sid))
    .catch(err => console.log("Error de twilio", err));
};

export default TwilioUtility;
