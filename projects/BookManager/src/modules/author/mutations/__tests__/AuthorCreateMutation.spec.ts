import { databaseTestModule } from '../../../../tests/database';

import { mutationsRequestBaseModule } from '../../../../tests/mutations';
import { testsLogger } from '../../../../tests/testsLogger';

const log = testsLogger.extend('authorMutations');

describe('AuthorCreateMutation', () => {

    const {
        connect,
        closeDatabase,
        clearDatabase
    } = databaseTestModule();

    const { createAuthor } = mutationsRequestBaseModule();

    beforeAll(() => connect());

    afterEach(() => clearDatabase());

    afterAll(() => closeDatabase());

    it('should create new author', async () => {

        const response = await createAuthor('New Author');

        log('response body: ', response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.AuthorCreate).toBeTruthy();
    });
});
