class AuthResponseDTO {
    constructor({ accessToken, refreshToken }) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}

module.exports = AuthResponseDTO;
