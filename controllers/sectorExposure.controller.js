const models = require('../models');

// Create and Save a new sectorExposure
exports.create = async (req, res) => {
  try {
    const sectorExposureBody = req.body;

    return res.status(201).json(
      await models.SectorExposure.create({
        ...sectorExposureBody,
      }),
    );
  } catch (error) {
    return res
      .status(501)
      .json({ message: error } || { message: 'Unexpected error' });
  }
};

// Retrieve all SectorExposures from the database.
exports.findAll = async (req, res) => {
  try {
    const sectorExposures = await models.SectorExposure.findAll();

    if (sectorExposures.length <= 0)
      return res.status(404).json({ message: 'SectorExposure not found' });

    return res.status(200).json(sectorExposures);
  } catch (error) {
    return res
      .status(501)
      .json({ message: error } || { message: 'Unexpected error' });
  }
};

// Get one sectorExposure
exports.findOne = async (req, res) => {
  try {
    const sectorExposure = await models.SectorExposure.findOne({
      where: { id: req.params.id },
    });

    if (!sectorExposure)
      return res.status(404).json({ message: 'SectorExposure not found' });

    return res.status(200).json(sectorExposure);
  } catch (error) {
    return res
      .status(501)
      .json({ message: error } || { message: 'Unexpected error' });
  }
};

// Update a SectorExposure identified by the id in the request
exports.update = async (req, res) => {
  try {
    const sectorExposureBody = req.body;

    await models.SectorExposure.update(
      { ...sectorExposureBody },
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

// Delete a SectorExposure with the specified id in the request
exports.delete = async (req, res) => {
  try {
    await models.SectorExposure.destroy({
      where: { id: req.params.id },
    });

    return res.status(204).end();
  } catch (error) {
    return res
      .status(501)
      .json({ message: error } || { message: 'Unexpected error' });
  }
};
