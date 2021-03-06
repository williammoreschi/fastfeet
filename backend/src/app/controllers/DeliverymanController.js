import * as Yup from 'yup';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const deliverymen = await Deliveryman.findAll({
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['path', 'url'],
        },
      ],
      offset: (page - 1) * 20,
      order: ['name'],
    });
    return res.json(deliverymen);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.validate(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deliverymanExists = await Deliveryman.findOne({
      where: { email: req.body.email },
    });

    if (deliverymanExists) {
      return res
        .status(400)
        .json({ error: 'Already exists a delivery man with this email' });
    }

    const { id, name, email, avatar_id } = await Deliveryman.create(req.body);

    if (avatar_id) {
      const deliveryman = await Deliveryman.findOne({
        where: { id },
        attributes: ['id', 'name', 'email'],
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['path', 'url'],
          },
        ],
      });
      return res.json(deliveryman);
    }

    return res.status(201).json({ id, name, email, avatar_id });
  }

  async show(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['url', 'name', 'path'],
        },
      ],
    });

    if (!deliveryman) {
      return res.status(400).json({ error: 'Delivery man not exists' });
    }
    return res.json(deliveryman);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.validate(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deliverymanExists = await Deliveryman.findByPk(req.params.id);

    if (!deliverymanExists) {
      return res.status(400).json({ error: 'Delivery man not exists' });
    }

    if (req.body.email && deliverymanExists.email !== req.body.email) {
      const deliverymanEmailExists = await Deliveryman.findOne({
        where: { email: req.body.email },
      });
      if (deliverymanEmailExists) {
        return res
          .status(400)
          .json({ error: 'Already exists a delivery man with this email' });
      }
    }

    const { id, name, email, avatar_id } = await deliverymanExists.update(
      req.body
    );

    if (avatar_id) {
      const deliveryman = await Deliveryman.findOne({
        where: { id },
        attributes: ['id', 'name', 'email'],
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['path', 'url'],
          },
        ],
      });
      return res.json(deliveryman);
    }

    return res.json({ id, name, email, avatar_id });
  }

  async delete(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);
    if (!deliveryman) {
      return res.status(400).json({ error: 'Delivery man not exists' });
    }
    await deliveryman.destroy();
    return res.json({ deleted: true });
  }
}
export default new DeliverymanController();
