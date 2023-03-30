import { Client } from '@hubspot/api-client';

interface IContactProps {
  firstName: string
  lastName: string
  email: string
  phone: string
  name: string
}

const hubspotCreateContact = ({firstName, lastName, email, phone, name}: IContactProps) => {
  const hubspotClient = new Client({ apiKey: process.env.HUBSPOT_TOKEN });
  const properties = { firstname: firstName, lastname: lastName, email, phone, company: name, hs_content_membership_status: 'active' };
  hubspotClient.crm.contacts.basicApi.create({ properties }).then((_response: any) => {}).catch((_error: any) => {});
}

export default hubspotCreateContact;
