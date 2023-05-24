const checkSchemeId = (req, res, next) => {
  const { scheme_id } = req.body;

  if (!scheme_id) {
    return res.status(404).json({
      message: `scheme_id ${scheme_id} id'li şema bulunamadı`,
    });
  }

  next();
};

const validateScheme = (req, res, next) => {
  const { scheme_name } = req.body;

  if (!scheme_name || typeof scheme_name !== 'string') {
    return res.status(400).json({
      message: 'Geçersiz scheme_name',
    });
  }

  next();
};

const validateStep = (req, res, next) => {
  const { instructions, step_number } = req.body;

  if (
    !instructions ||
    typeof instructions !== 'string' ||
    typeof step_number !== 'number' ||
    step_number < 1
  ) {
    return res.status(400).json({
      message: 'Hatalı step',
    });
  }

  next();
};

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
};
