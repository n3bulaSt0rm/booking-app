const fs = require('fs').promises;
const path = require('path');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];
const TOKEN_PATH = path.join(__dirname, 'token.json');
// const CREDENTIALS_PATH = path.join(__dirname, 'credential.json');

class GoogleAuthService {
    constructor() {
        this.oAuth2Client = null;
    }

    async loadToken() {
        try {
            const content = await fs.readFile(TOKEN_PATH);
            const credentials = JSON.parse(content);
            this.oAuth2Client = google.auth.fromJSON(credentials);
        } catch (err) {
            throw new Error('Token file not found. Please authenticate first.');
        }
    }

    async saveToken() {
        const content = await fs.readFile(CREDENTIALS_PATH);
        const keys = JSON.parse(content);
        const key = keys.installed || keys.web;
        const payload = JSON.stringify({
            type: 'authorized_user',
            client_id: key.client_id,
            client_secret: key.client_secret,
            refresh_token: this.oAuth2Client.credentials.refresh_token,
        });
        await fs.writeFile(TOKEN_PATH, payload);
    }

    async authenticate() {
        if (this.oAuth2Client) {
            return this.oAuth2Client;
        }

        // try {
            await this.loadToken();
            return this.oAuth2Client;
        // } catch (err) {
        //     this.oAuth2Client = await authenticate({
        //         scopes: SCOPES,
        //         keyfilePath: CREDENTIALS_PATH,
        //     });
        //
        //     if (this.oAuth2Client.credentials) {
        //         await this.saveToken();
        //     }
        //
        //     return this.oAuth2Client;
        // }
    }

    getClient() {
        if (!this.oAuth2Client) {
            throw new Error('OAuth2 client not initialized. Call authenticate() first.');
        }
        return this.oAuth2Client;
    }
}

module.exports = new GoogleAuthService();
