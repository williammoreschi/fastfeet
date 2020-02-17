import { Op } from 'sequelize';
import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';
import File from '../models/File';

class EndDeliveryController {
  async update(req, res) {
    const { deliveryId, deliverymanId } = req.params;

    const deliveryman = await Deliveryman.findByPk(deliverymanId);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Delivery man not exists' });
    }

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
        .json({ error: 'Delivery not exists or has finished' });
    }

    const { filename: path, originalname: name } = req.file;

    const newFile = await File.create({
      path,
      name,
    });

    const finishedDelivery = await delivery.update({
      signature_id: newFile.id,
      end_date: new Date(),
    });

    return res.json(finishedDelivery);
  }
}

export default new EndDeliveryController();
