const { Op, Model } = require("sequelize");

const applyPagination = (query, page , limit ) => {
  const offset = (page - 1) * limit;
  return {
    ...query,
    offset,
    limit: parseInt(limit),
  };
};

const applySearch = (query, searchTerm, searchableFields = []) => {
  if (searchTerm && searchableFields.length) {
    query.where = {
      ...query.where,
      [Op.or]: searchableFields.map((field) => ({
        [field]: { [Op.like]: `%${searchTerm}%` },
      })),
    };
  }
  return query
};

const applyFilters = (query ,filters ={})=>{
    Object.keys(filters).forEach((key)=>{
        query.where ={
            ...query.where,
            [key]: filters[key],
        }
    })
    return query;
}

module.exports = { applyPagination , applySearch , applyFilters};
