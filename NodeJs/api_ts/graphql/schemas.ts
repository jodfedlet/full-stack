const { buildSchema } = require('graphql')
import newsTypes from "./types/newsTypes"

const schema = buildSchema(
    newsTypes,
)

export default schema;
