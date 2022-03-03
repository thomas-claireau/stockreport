const models = require('../models');

// Create and Save a new sector
exports.create = async (req, res) => {
  try {
    const sectorBody = req.body;

    return res.status(201).json(
      await models.Sector.create({
        ...sectorBody,
      }),
    );
  } catch (error) {
    return res
      .status(501)
      .json({ message: error } || { message: 'Unexpected error' });
  }
};

// Retrieve all Sectors from the database.
exports.findAll = async (req, res) => {
  try {
    const sectors = await models.Sector.findAll();

    if (sectors.length <= 0)
      return res.status(404).json({ message: 'Sector not found' });

    return res.status(200).json(sectors);
  } catch (error) {
    return res
      .status(501)
      .json({ message: error } || { message: 'Unexpected error' });
  }
};

// Get one sector
exports.findOne = async (req, res) => {
  try {
    const sector = await models.Sector.findOne({
      where: { id: req.params.id },
    });

    if (!sector) return res.status(404).json({ message: 'Sector not found' });

    return res.status(200).json(sector);
  } catch (error) {
    return res
      .status(501)
      .json({ message: error } || { message: 'Unexpected error' });
  }
};

// Update a Sector identified by the id in the request
exports.update = async (req, res) => {
  try {
    const sectorBody = req.body;

    await models.Sector.update(
      { ...sectorBody },
      { where: { id: req.params.id } },
    );

    return res.status(200).json({
      message: 'Modifications was updated',
    });
  } catch (error) {
    return res
      .status(501)
      .json({ message: error } || { message: 'Unexpected error' });
  }
};

// Delete a Sector with the specified id in the request
exports.delete = async (req, res) => {
  try {
    await models.Sector.destroy({
      where: { id: req.params.id },
    });

    return res.status(204).end();
  } catch (error) {
    return res
      .status(501)
      .json({ message: error } || { message: 'Unexpected error' });
  }
};
