export default class UserDTO {
    constructor(user){
        this.id = user.id 
        this.name = user.name 
        this.surname = user.surname
        this.email = user.email 
        this.role = user.role
        this.avatarURL = user.avatarURL
    }
}