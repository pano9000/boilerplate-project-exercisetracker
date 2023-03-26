const { pathParams }  = require("./validation.schemaShared.params");
const exercisePostSchema = require("./validation.schema.exercisePost");


const schema = [
  pathParams.userId,
  pathParams.exerciseId,
];

exercisePostSchema.forEach(element => {
  schema.push(element.optional({ checkFalsy: true }))
})


module.exports = schema