import * as Yup from 'yup';

import Plans from '../models/Plans';

class PlanController {
  async index(req, res) {
    const plans = Plans.findAll();

    return res.json(plans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.integer().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const plansExits = await Plans.findOne({
      where: { title: req.body.title },
    });

    if (!plansExits) {
      return res.status(401).json({ error: 'Plan alredy exists.' });
    }

    const { title, duration, price } = await Plans.create(req.body);

    return res.json({
      title,
      duration,
      price,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.integer().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const plan = await Plans.findByPk(req.params.id);

    const { title, duration, price } = await plan.update(req.body);

    return res.json({
      title,
      duration,
      price,
    });
  }

  async delete(req, res) {
    const plan = await Plans.findByPk(req.params.id);

    plan.active = false;

    await plan.save();

    return res.json(plan);
  }
}

export default new PlanController();
