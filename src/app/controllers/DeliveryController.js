import * as Yup from 'yup';
import Delivery from '../models/Delivery';
import File from '../models/File';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';

import Mail from '../../lib/Mail';

class DeliveryController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const deliveryies = await Delivery.findAll({
      attributes: ['id', 'product', 'start_date', 'end_date'],
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'name'],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['path', 'url'],
        },
      ],
      offset: (page - 1) * 20,
      order: ['start_date'],
    });
    return res.json(deliveryies);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.validate(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { recipient_id, deliveryman_id } = req.body;

    const recipient = await Recipient.findByPk(recipient_id);
    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not exists' });
    }

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);
    if (!deliveryman) {
      return res.status(400).json({ error: 'Delivery man not exists' });
    }

    const { id, product } = await Delivery.create(req.body);

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Nova entrega',
      template: 'newDelivery',
      context: {
        deliveryman: deliveryman.name,
        recipient: recipient.name,
        product,
        recipientAddress: `${recipient.street}, ${recipient.number}`,
        recipientComplement: `${recipient.complement}`,
        recipientZipCode: `${recipient.zip_code}`,
        recipientCityState: `${recipient.city} - ${recipient.state}`,
      },
    });

    return res.json({ id, product, recipient_id, deliveryman_id });
  }

  async update(req, res) {
    const delivery = await Delivery.findByPk(req.params.id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exist' });
    }

    const schema = Yup.object().shape({
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
      product: Yup.string(),
    });

    if (!(await schema.validate(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    if (req.body.recipient_id) {
      const recipient = await Recipient.findByPk(req.body.recipient_id);
      if (!recipient) {
        return res.status(400).json({ error: 'Recipient not exists' });
      }
    }

    if (req.body.deliveryman_id) {
      const deliveryman = await Deliveryman.findByPk(req.body.deliveryman_id);
      if (!deliveryman) {
        return res.status(400).json({ error: 'Delivery man not exists' });
      }
    }

    const { id, product, deliveryman_id, recipient_id } = await delivery.update(
      req.body
    );
    return res.json({ id, product, deliveryman_id, recipient_id });
  }

  async delete(req, res) {
    const delivery = await Delivery.findByPk(req.params.id);
    if (!delivery) {
      return res.status(400).json({ error: 'Delivery man not exists' });
    }
    await delivery.destroy();
    return res.json({ deleted: true });
  }
}
export default new DeliveryController();
