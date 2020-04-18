import { Op } from 'sequelize';
import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import File from '../models/File';

class DeliverymanDeliveryController {
  async index(req, res) {
    const { id: deliverymanId } = req.params;
    const { page = 1, filter = null } = req.query;

    const deliveryman = await Deliveryman.findByPk(deliverymanId);
    if (!deliveryman) {
      return res.status(400).json({ error: 'Delivery man not exists' });
    }

    /**
     * filter
     * = null -> lista as entregas que não sairam e não estão canceladas.
     * = opened -> lista as entregas em que está com ele.
     * = finished -> lista as entregas finalizadas.
     * = canceled -> lista as entregas canceladas.
     */
    const deliveries = await Delivery.findAll({
      where: !filter
        ? {
            deliveryman_id: deliverymanId,
            canceled_at: null,
            end_date: null,
            start_date: null,
          }
        : {
            deliveryman_id: deliverymanId,
            start_date:
              filter === 'opened' || filter === 'finished'
                ? {
                    [Op.ne]: null,
                  }
                : null,
            end_date:
              filter === 'finished'
                ? {
                    [Op.ne]: null,
                  }
                : null,
            canceled_at:
              filter === 'canceled'
                ? {
                    [Op.ne]: null,
                  }
                : null,
          },
      attributes: ['id', 'product', 'finished', 'initiated'],
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'email', 'name'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'name', 'city', 'zip_code'],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'path', 'url'],
        },
      ],
      limit: 20,
      offset: (page - 1) * 20,
    });
    return res.json(deliveries);
  }
}

export default new DeliverymanDeliveryController();
