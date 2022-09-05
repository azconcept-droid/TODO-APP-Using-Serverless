import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { success, failure, getUserId } from '../utils';
import { createLogger } from '../../utils/logger';
import { getTodos } from '../../businesslogic/todos';

const logger = createLogger('createTodo')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    logger.info('getting TODO item', { event })

    try {
      const userId = getUserId(event)

      const items = await getTodos(userId)
      return success({ items })
    } catch (error) {
      return failure(error, error.code)
    }
  }
)

handler.use(
  cors({
    credentials: true
  })
)
