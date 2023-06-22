import { User } from '../models';
import { UserInput, OptionalUserInput } from '../models/users';

export const createUser = async (payload: UserInput): Promise<User> => {
	const user: User = await User.create(payload);
	return user;
};

export const findUser = async (
	query: { email: string } | { id: string }
): Promise<User | null> => {
	const user: User | null = await User.findOne({
		where: query,
		attributes: { exclude: ['password', 'updatedAt'] }
	});
	return user;
};

export const userExists = async (email: string): Promise<boolean> => {
	const user: User | null = await User.findOne({ where: { email } });
	if (!user) {
		return false;
	}
	return true;
};

export const updateUser = async (
	payload: OptionalUserInput,
	query: { email: string } | { id: string }
): Promise<void> => {
	await User.update(payload, { where: query });
};

export const deleteUser = async (
	query: { email: string } | { id: string }
): Promise<void> => {
	await User.destroy({ where: query });
};
