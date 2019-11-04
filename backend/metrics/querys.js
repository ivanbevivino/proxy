exports.getQuery = (id) => {
  var query = ''
  switch (id) {
    case 1:
      query = `{"query": { "bool": { "must": [], "must_not": [], "should": [] } }, "from": 0, "size": 0, "sort": [], "aggs": { "group_by_path": { "terms": { "field": "path.keyword", "size": 100000 }, "aggs": { "users": { "value_count": { "field": "_id" } } } } } }`
      break;
    case 2:
      query = `{ "query": { "bool": { "must": [], "must_not": [], "should": [] } }, "from": 0, "size": 0, "sort": [], "aggs": { "group_by_status": { "terms": { "field": "status.keyword", "size": 100000 }, "aggs": { "users": { "value_count": { "field": "_id" } } } } } }`
      break;
    default:
      break;
  }

return query

}