import { NextApiRequest, NextApiResponse } from 'next'
import {
  list_items_api_get_Config,
  List_Item_api_get,
} from '../../../model/api-models/list_items/List_items_api_get'
import { HttpStatusCode } from '../../../utils/typedFetch/HttpStatusCode'

import { logMiddleware } from '../../../utils/middleware/logMiddleware'
import { LIST_ITEMS_STUB_DATA } from '../../../model/api-models/list_items/stubs/LIST_ITEMS_STUB_DATA'
import _ from 'lodash'

// THIS IS JUST A SIMULATION
// Go check for https://github.com/nextjs-opinionated/nextjs-opinionated-hasura for a real implementation
export default logMiddleware(async function API(req: NextApiRequest, res: NextApiResponse) {
  // check method
  if (req.method !== list_items_api_get_Config.method.toUpperCase()) {
    res.setHeader('Allow', [list_items_api_get_Config.method.toUpperCase()])
    res.status(HttpStatusCode.METHOD_NOT_ALLOWED_405).end(`Method ${req.method} Not Allowed`)
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(HttpStatusCode.METHOD_NOT_ALLOWED_405).end(`Method ${req.method} Not Allowed`)
  }

  const inputData = req.query as List_Item_api_get['input']

  // THIS IS JUST A SIMULATION
  // Go check for https://github.com/nextjs-opinionated/nextjs-opinionated-hasura for a real implementation
  const limit = _.toNumber(inputData.limit)
  const current_page = _.toNumber(inputData.current_page)
  const offset = current_page * limit - limit

  const listItems: List_Item_api_get['output']['list_items'] = []
  /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
  for (let x = offset; x < offset + limit; x++) {
    if (LIST_ITEMS_STUB_DATA.data.list_items[x]) {
      listItems.push(LIST_ITEMS_STUB_DATA.data.list_items[x])
    }
  }

  // process
  const data: List_Item_api_get['output'] = {
    list_items: listItems,
    list_items_aggregate: LIST_ITEMS_STUB_DATA.data.list_items_aggregate,
  }

  // output data
  res.status(HttpStatusCode.OK_200).json(data)
})
