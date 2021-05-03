const slugify = require("slugify");

const index = "dev_CODINGLAB";

module.exports = {
  lifecycles: {
    beforeCreate: async (data) => {
      if (data.name) {
        data.slug = slugify(data.name, {lower: true});
      }
    },
    afterCreate(result, data) {
      strapi.services.algolia.saveObject(result, index);
    },
    beforeUpdate: async (params, data) => {
      if (data.name) {
        data.slug = slugify(data.name, {lower: true});
      }
    },
    afterUpdate(result, params, data) {
      strapi.services.algolia.saveObject(result, index);
    },
    afterDelete(result, params) {
      strapi.services.algolia.deleteObject(result.id, index);
    },
  },
};
