import Mail from '../../lib/Mail';

class CanceledDeliveryMail {
  get key() {
    return 'CanceledDeliveryMail';
  }

  async handle({ data }) {
    const { delivery, description } = data;
    const { deliveryman, recipient } = delivery;
    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Entrega Cancelada',
      template: 'canceledDelivery',
      context: {
        deliveryman: deliveryman.name,
        description,
        recipient: recipient.name,
        delivery: `#${delivery.id} - ${delivery.product}`,
      },
    });
  }
}

export default new CanceledDeliveryMail();
