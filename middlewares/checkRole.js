const ApiError = require("../utils/apiError");

const checkRoleSuperadmin = (superadmin) => {
  return async (req, res, next) => {
    if (superadmin !== req.user.role) return next(new ApiError(`You don't have access, your role is not ${superadmin}`, 401));
    next();
  };
};

const checkRoleAdmin = (superadmin, admin) => {
  return async (req, res, next) => {
    if (superadmin === req.user.role || admin === req.user.role) {
      next();
    } else {
      return next(new ApiError(`You don't have access, your role is not ${superadmin} or ${admin}`, 401));
    }
  };
};

module.exports = { checkRoleSuperadmin, checkRoleAdmin };
