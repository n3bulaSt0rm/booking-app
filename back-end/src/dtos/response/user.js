class UserResponseDTO {
    constructor(user) {
        this.id = user._id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.picture = user.picture;
    }
}

module.exports = UserResponseDTO;
