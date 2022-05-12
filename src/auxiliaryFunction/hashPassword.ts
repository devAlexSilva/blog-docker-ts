import bcrypt from 'bcrypt'

export const hash = {
    password: async (password: string) => {
        return await bcrypt.hash(password, 8)
    }
}