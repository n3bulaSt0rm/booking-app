const admin = require("firebase-admin");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");


admin.initializeApp({
    credential: admin.credential.cert({
        type: "service_account",
        project_id: "first-project-eb47b",
        private_key_i: "a412345678901234567890212345678901234567",
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCN730s7a0DVeS0\nsP1sw1SncECooyqvaXoyyrskOb3J1imaTfh0CbGfH0ZriVMlvRsMudQeHlyaSxYZ\nhTzcC+ZCYtOMWVVRTs8oFiiUh0vjhxIY8fDU66ibolgsvDjzHlxXlgiKWZTTC2wF\nist6BdRZifmVHRrAzb193dTW91gXU624EpEAdN1UGFEEuN/tp7rHSDDHhKCFg66i\nR0IZpmq5+/Z2cz7pdSZL6n8PAgc28SUQUhMgLh2RgGG0LWvc1uMX+cjMaz4tlh5I\n/tDk3HVEdVIoTGKx/NTUlbcTFlfpGLtZsaWo8WM1jCHIsbEVqvZXsYf+mmcLnchW\n3Sw7ZxKZAgMBAAECggEAEZhxZ6r1SlcRGbdhS2Txryoy0dUcew9z5y0LwyNnXEiw\n8qCc3uG+w8+wPq+Q/7owSsUUv0EbUMNjM3m5gDv3aR5wRFNkyMYg10Lb+AHHziaV\n/0KrDPJD/jtDfBQ/aSBH6VG/sEsHsJwXYZ6BuBhV6V2585rekK1QwvRHqPiT0pxN\nRRDqLfyFrCQMyxEyBmS9N2ehypB0gQOVK9GN5e1DuMR9ba4BjyoYzQGfdgfJ/I29\n6btHcOuLCKcPsyK+LHv5ahJr2u7vDRc3thcfsa6Qq1yU87OwwYnQpGdtCEzKphO6\n2EUVx1bgs6ysOCeLtRGJDr4CFuAJ8hYtfCRpfeWGKQKBgQDCVvdEVQvZJqaHZALK\nE3ElmyD116DNGabfDGeVhyafAxSTr6Woo2g0wNBCcavrScaLZ7/cQTEXS0i/2cs1\nfPvIaqiAG//E3JyA9fl2cwp7OhyQYpgJS055Sl65bJL0Hh/dant7uYyPrDT5/wdQ\nP8tUSROp8GSSg8WrZsv5Yd+1bQKBgQC6+Aw24j8SbjSdHeI2MbkPhRQE2DfsRIUh\nJrdl4Yk2Y6ob9A2PTfxu/ucdCYBEuHmgn3l9VghCV1sFr2P7oiG4cbzsUr+S1p1c\nT2sSvBycqfdx/yhmiI08OmoeAPOQ0wLLgFTWP3h8rbTeUA+/xTaMYq6q1xyUtDSz\nq3VM7hKSXQKBgQCTuLdL4bmX3qFG2Oal5BFlnH15YeaBALavZSZ3qrvYsua5PBKY\nFV3oe4fSecVMnE+nN73HFmbSZg9uhYbJqa9ZsHlUp/PLGEZ+YHq3ZsrY0FtWBRu8\nNNn5qGZIXBd4KE3gaEhky63kp+m8/fX5MgTElKe1zV0lYbSnjQQPFC6QIQKBgHBf\nNxAhiODt5ads15HU7rIaPL7wqSPSxuT23RFZrVtIKWxlkWTI7WhUwdkc5b/n1Aoq\n7xzagVpGIInZMVGCz5uImJC85zE81hUuEl+POe8a5ILaZZDCj4hcX30q+zjW6f4f\nYl3mhecBjAx1uBF9WVykzvAVG7NwX6CA855KFFVtAoGAN8AkUR6qdrAlk5Cy8ld1\nDhlDPUQiXFHkHAfVd+gf/UhSs6PupTuLP6ibReyGgHpFZm5dZNA04K+bXUTS+Woz\nbX5YX5GlT6hpoKXZDOCxnxiZwobrSMOB3FlpTOKxOsQE9o5ceNDGH5EA4yEzxSoP\nZ6dZpHtPIzqwIisamBpRs9I=\n-----END PRIVATE KEY-----\n",
        client_email: "firebase-adminsdk-5iaaa@first-project-eb47b.iam.gserviceaccount.com",
        client_id: "123456789091234567890",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-5iaaa%40first-project-eb47b.iam.gserviceaccount.com",
        universe_domain: "googleapis.com"
    }),
});


class FirebaseService {
    async verifyGoogleToken(idToken) {
        try {
            const decodedToken = jwt.decode(idToken);
            const fullName = decodedToken.name || "";
            const nameParts = fullName.split(" ");
            const firstName = nameParts.shift() || "";
            const lastName = nameParts.join(" ") || "";

            return {
                firstName: firstName,
                lastName: lastName,
                email: decodedToken.email,
                picture: decodedToken.picture,
            };
        } catch (error) {
            throw new Error("Invalid Google token");
        }
    }
}

module.exports = new FirebaseService();