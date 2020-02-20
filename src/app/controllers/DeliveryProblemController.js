import { Op } from 'sequelize';
import * as Yup from 'yup';
import Recipient from '../models/Recipient';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import DeliveryProblem from '../models/DeliveryProblem';
import CanceledDeliveryMail from '../jobs/CanceledDeliveryMail';
import Queue from '../../lib/Queue';

class DeliveryProblemController {
  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const { deliverymanId } = req.params;
    const { delivery_id: deliveryId } = req.body;

    const delivery = await Delivery.findOne({
      where: {
        id: deliveryId,
        deliveryman_id: deliverymanId,
        canceled_at: null,
        start_date: {
          [Op.ne]: null,
        },
        end_date: null,
      },
    });

    if (!delivery) {
      return res
        .status(400)
        .json({ error: 'Delivery not exists or finished or has canceled' });
    }

    const deliveryProblem = await DeliveryProblem.create(req.body);

    return res.status(201).json(deliveryProblem);
  }

  async index(req, res) {
    const { page = 1 } = req.query;
    const deliveries = await DeliveryProblem.findAll({
      attributes: ['id', 'description', 'created_at'],
      include: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: ['id', 'product'],
          include: [
            {
              model: Deliveryman,
              as: 'deliveryman',
              attributes: ['id', 'name'],
            },
            {
              model: Recipient,
              as: 'recipient',
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(deliveries);
  }

  async show(req, res) {
    const { deliveryId } = req.params;
    const { page = 1 } = req.query;

    const deliveries = await DeliveryProblem.findAll({
      attributes: ['id', 'description', 'created_at'],
      where: {
        delivery_id: deliveryId,
      },
      include: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: ['id', 'product'],
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
          ],
        },
      ],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(deliveries);
  }

  async delete(req, res) {
    const { deliveryProblemId } = req.params;

    const problemDelivery = await DeliveryProblem.findByPk(deliveryProblemId, {
      attributes: ['id', 'description'],
      include: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: ['id', 'product'],
          include: [
            {
              model: Deliveryman,
              as: 'deliveryman',
              attributes: ['name', 'email'],
            },
            {
              model: Recipient,
              as: 'recipient',
              attributes: ['name'],
            },
          ],
        },
      ],
    });
    if (!problemDelivery) {
      return res
        .status(400)
        .json({ error: 'This delivery problem does not exist' });
    }

    const canceledDelivery = await Delivery.update(
      {
        canceled_at: new Date(),
      },
      {
        where: { id: problemDelivery.delivery.id },
      }
    );

    // Envia o email ao entregador
    await Queue.add(CanceledDeliveryMail.key, problemDelivery);

    return res.json({ canceled: !!canceledDelivery });
  }
}

export default new DeliveryProblemController();
