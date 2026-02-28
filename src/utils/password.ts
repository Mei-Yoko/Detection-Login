import bcrypt from 'bcryptjs';

/**
*Hash password
*@param password
*@return
*/

export const hashPassword = async(password: string): Promise<string> => {
    const saltRounds = parseInt(process.env.BCRYPT_ROUNDS || '12');
    return await bcrypt.hash(password, saltRounds);
}

