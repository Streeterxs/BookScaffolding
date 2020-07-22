import Koa from 'koa';
import Router from 'koa-router';
import logger from 'koa-logger';
import cors from 'kcors';
import graphqlHttp from 'koa-graphql';

import { GraphQLError } from 'graphql';
import Schema from './schema';

const router = new Router();
const app = new Koa();

app.use(logger());
app.use(cors());

const graphqlSettings = async (req: any) => {

    return {
        graphql: true,
        schema: Schema,
        formatError: (error: GraphQLError) => {
            return {
                message: error.message,
                locations: error.locations,
                stack: error.stack
            }
        }
    }
}

const graphqlHttpServer = graphqlHttp(graphqlSettings);

router.all('/graphql', graphqlHttpServer);

app.use(router.routes()).use(router.allowedMethods());

export default app;
