import { SENDGRID_TOKEN } from "../config/constants";

interface SendGridUtilityProps {
  to: { name?: string, email: string },
  subject: string,
  templateId: string
  templateData?: any
}

const SendGridUtility = ({ to, subject, templateId, templateData }: SendGridUtilityProps) => {
  const sgMail = require('@sendgrid/mail')
  sgMail.setApiKey(SENDGRID_TOKEN)


  const msg = {
    to: to.email,
    from: 'EVAA - Sistema de Encuestas <hola@evaa.mx>',
    subject,
    templateId,
    personalizations: [
      {
        to: {
          name: to?.name,
          email: to.email,
        },
        dynamic_template_data: templateData,
      },
    ],
  }

  sgMail
    .send(msg)
    .then((response: any) => {
      console.log(response[0].statusCode)
      console.log(response[0].headers)
    })
    .catch((error: any) => {
      console.error(error)
    })
};

export default SendGridUtility;
