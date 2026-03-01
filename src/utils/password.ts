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
    isValid: boolean;
    errors: string[];
    strength: 'weak' | 'medium' | 'high'; 
} => {
    const errors: string[] = [];
    let score = 0;

    //check length
    if (password.length < 8){
        errors.push('Password must be at least 8 characters long');
    }else{
        score += 1;
    }
    //check capital letter
    if(!/[a-z]/.test(password)){
        errors.push('Password must contain at least one lowercase letter');
    }else{
        score += 1;
    }
}