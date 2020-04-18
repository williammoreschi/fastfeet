import Mail from '../../lib/Mail';

class NewDeliveryMail {
  get key() {
    return 'NewDeliveryMail';
  }

  async handle({ data }) {
    const { deliveryman, recipient, product } = data;
    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Nova entrega',
      template: 'newDelivery',
      context: {
        deliveryman: deliveryman.name,
        recipient: recipient.name,
        product,
        recipientStreet: recipient.street,
        recipientNumber: recipient.number,
        recipientComplement: recipient.complement,
        recipientZipCode: recipient.zip_code,
        recipientCity: recipient.city,
        recipientState: recipient.state,
      },
    });
  }
}
export default new NewDeliveryMail();
