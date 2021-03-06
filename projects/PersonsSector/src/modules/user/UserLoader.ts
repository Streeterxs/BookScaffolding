import dataloader from 'dataloader';

import { User } from './UserModel';

const userLoader = new dataloader((keys: string[]) => User.find({_id: {$in: keys}}));

export const loadUser = async (userId: string) => {
    const userFinded = await userLoader.load(userId);
    return userFinded;
};

export const loadManyUser = async (usersId: string[]) => {

    const userFinded = await userLoader.loadMany(usersId);
    return userFinded;
}