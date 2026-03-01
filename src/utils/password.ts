import bcrypt from 'bcryptjs';

/**
*Hash password
*@param password
*@return
*/

export const hashPassword = async(password: string): Promise<string> => {
    const saltRounds = parseInt(process.env.BCRYPT_ROUNDS || '12');
    return await bcrypt.hash(password, saltRounds);
};

/**
 * compare the password
 * @param plainPassword
 * @param hashedPassword
 * @returns
 */

export const comparePassword = async(pliainPassword: string, hashedPassword: string): Promise<boolean> =>{
    return await bcrypt.compare(pliainPassword,hashedPassword);
};

/**
 * test how strong password
 * @param password - check the password
 * @returns - check how strong
 */

export const validatePasswordStrength = (password: string):{
    
}
