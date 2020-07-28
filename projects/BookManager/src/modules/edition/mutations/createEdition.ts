import { GraphQLString, GraphQLNonNull, GraphQLFloat } from 'graphql';
import { mutationWithClientMutationId, toGlobalId, fromGlobalId } from 'graphql-relay';

import Edition from '../EditionModel';
import { loadEdition } from '../EditionLoader';
import { EditionConnection } from '../EditionType';

const EditionCreation = mutationWithClientMutationId({
    name: 'EditionCreation',
    description: 'Edition Creation',
    inputFields: {
        edition: {
            type: new GraphQLNonNull(GraphQLFloat)
        },
        publishing: {
            type: new GraphQLNonNull(GraphQLString)
        },
        year: {
            type: new GraphQLNonNull(GraphQLFloat)
        },
        pages: {
            type: new GraphQLNonNull(GraphQLFloat)
        },
        language: {
            type: new GraphQLNonNull(GraphQLString)
        },
        book: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    outputFields: {
        Edition: {
            type: EditionConnection.edgeType,
            resolve: (EditionId: string) => {

                if (!EditionId) {

                    return null;
                };

                return {
                    cursor: toGlobalId('Edition', EditionId),
                    node: loadEdition(EditionId)
                }
            }
        }
    },
    mutateAndGetPayload: async ({
        edition,
        publishing,
        year,
        pages,
        language,
        book
    }) => {
        try {

            const bookIdOjb = fromGlobalId(book)

            const editionCreated = new Edition({
                edition,
                publishing,
                year,
                pages,
                language,
                book: bookIdOjb.id
            });
            await editionCreated.save();

            return editionCreated.id;
        } catch (err) {

            console.log(err);
        }
    }
});

export default EditionCreation;
