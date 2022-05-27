export const regex = {

    name: (name: string) => {
        const regex = /^(?=.*[a-zA-Z0-9])[\s'a-zA-Z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]{1,30}$/
        return regex.test(name)
    },

    title: (title: string) => {
        const regex = /^(?=.*[a-zA-Z0-9])[\s'a-zA-Z0-9@!#$%^&*()/\\áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ.,]{1,300}$/
        return regex.test(title)
    },

    password: (password: string) => {
        const regex = /^(?=.*[@!#$%^&*()/\\])[@!#$%^&*()/\\a-zA-Z0-9]{6,20}$/
        return regex.test(password)
    }

}