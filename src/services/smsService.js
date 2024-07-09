import twilio from 'twilio';

const accountSID = 'AC3174d73662793814b5576d74fe31b828';
const authToken = '118922b2b8f14ca7f191ddf57ce27ca1';
const client = twilio(accountSID, authToken);

export const sendSMS = async (recipient, mess) => {
    try {
        const message = await client.messages.create({
            body: mess,
            from: '+19544162609',
            to: recipient
        });

        console.log('Mensaje enviado:', message.sid);
    } catch (error) {
        console.log('Error al enviar el mensaje SMS:', error);
        throw new Error('Error al enviar el mensaje SMS');
    }
}