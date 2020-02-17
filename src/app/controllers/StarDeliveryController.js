import {
  startOfDay,
  endOfDay,
  isBefore,
  isAfter,
  setSeconds,
  setMinutes,
  setHours,
} from 'date-fns';
import { Op } from 'sequelize';
import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';

class StarDeliveryController {
  async update(req, res) {
    const { deliverymanId, deliveryId } = req.params;

    const deliveryman = await Deliveryman.findByPk(deliverymanId);
    if (deliveryman) {
      return res.status(400).json({ error: 'Delivery man not exists' });
    }

    const delivery = await Delivery.findOne({
      where: {
        id: deliveryId,
        deliveryman_id: deliveryId,
        canceled_at: null,
        start_date: null,
        end_date: null,
      },
      attributes: [
        'id',
        'product',
        'canceled_at',
        'initiated',
        'finished',
        'recipient_id',
        'deliveryman_id',
        'signature_id',
      ],
    });
    if (delivery) {
      return res
        .status(400)
        .json({ error: 'Delivery not exists or has started ' });
    }

    const date = new Date();

    const startOfBusiness = setSeconds(setMinutes(setHours(date, 8), 0), 0);
    const endOfBusiness = setSeconds(setMinutes(setHours(date, 18), 0), 0);

    if (!(isAfter(date, startOfBusiness) && isBefore(date, endOfBusiness))) {
      return res.status(400).json({
        error: 'you can only pick up your order between 8:00 and 18:00',
      });
    }

    // armazena a quantidade de encomendas que o entregador ja retirou no dia
    const { count: countDeliveriesDay } = await Delivery.findAndCountAll({
      where: {
        deliveryman_id: deliverymanId,
        canceled_at: null,
        start_date: {
          [Op.between]: [startOfDay(date), endOfDay(date)],
        },
      },
    });

    if (countDeliveriesDay >= 5) {
      return res
        .status(400)
        .json({ error: 'you already made 5 deliveries today' });
    }

    const startedDelivery = await delivery.update({
      start_date: new Date(),
    });

    return res.json(startedDelivery);
  }
}

export default new StarDeliveryController();
