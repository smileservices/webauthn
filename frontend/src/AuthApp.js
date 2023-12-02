import React, {useState} from "react";
import ReactDOM from "react-dom";
import {startRegistration, startAuthentication} from "@simplewebauthn/browser";
import {client} from '@passwordless-id/webauthn';
import {POST} from "./reusables/requests";

const base64Encode = (str) => btoa(String.fromCharCode.apply(null, new TextEncoder().encode(str))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const challenge = "randomChallenge";
const mockGenerateRegistrationOptions = () => {
    return {
        rp: {
            name: "Example Corp",
            id: "localhost"
        },
        user: {
            id: base64Encode("Vladutz"), // Base64URLString
            name: "user@example.com",
            displayName: "Example User"
        },
        challenge: base64Encode("789010"), // Base64URLString
        pubKeyCredParams: [
            {alg: -7, type: "public-key"},
            {alg: -257, type: "public-key"}
        ],
        timeout: 60000,
        excludeCredentials: [], // Array of PublicKeyCredentialDescriptorJSON
        authenticatorSelection: {
            authenticatorAttachment: "platform",
            requireResidentKey: false,
            userVerification: "preferred"
        },
        attestation: "direct",
        extensions: {} // AuthenticationExtensionsClientInputs
    };
};

const mockPublicKeyCredentialRequestOptions = () => {
    // Encoding a mock challenge to Base64URL

    return {
        challenge: base64Encode("123456"),
        timeout: 60000,
        rpId: "localhost",
        allowCredentials: [
            {
                type: "public-key",
                id: base64Encode("-WABKBJJ1gcp5w7xLsgd6W9nq8PJpqAsLE0zXMueQBk"),
                transports: ["internal"]
            }
        ],
        userVerification: "preferred",
        extensions: {}
    };
};

const mockWebAuthnRegisterParams = {
    publicKey: {
        // Randomly generated challenge, encoded in base64URL
        challenge: Uint8Array.from(window.atob("randomBase64EncodedChallenge456"), c => c.charCodeAt(0)),

        // Relying Party (RP) information
        rp: {
            name: "Example Corp",
            id: "localhost" // Should be the domain from which the request is made
        },

        // User information
        user: {
            id: Uint8Array.from("userID", c => c.charCodeAt(0)), // User's unique ID
            name: "username",
            displayName: "User Display Name"
        },

        // Public key credential parameters
        pubKeyCredParams: [
            {alg: -7, type: "public-key"},
            {alg: -257, type: "public-key"}
        ],

        timeout: 60000, // Timeout for the request in milliseconds

        // Optional
        excludeCredentials: [], // List of credentials already registered by the user
        authenticatorSelection: {
            authenticatorAttachment: "platform",
            requireResidentKey: false,
            userVerification: "preferred"
        },

        attestation: "direct" // Attestation conveyance preference
    }
};

const mockWebAuthnAuthenticateParams = {
    publicKey: {
        challenge: Uint8Array.from(window.atob("randomBase64EncodedChallenge123"), c => c.charCodeAt(0)),
        rpId: "localhost",
        allowCredentials: [
            {
                id: Uint8Array.from("8H5eFNiRQqN1U4Fom9kJ_YMJqFrsAATRymBYoMfe0q0", c => c.charCodeAt(0)),
                type: "public-key",
                transports: ["internal"]
            }
        ],
        timeout: 60000,
        userVerification: "preferred"
    }
};


async function register(state) {
    const options = await fetch("/generate-register-options", {
            method: "POST",
            body: JSON.stringify({user_name: state.user_name}),
            headers: {"Content-Type": "application/json"},
        }).then(res => res.json());
    const result = await startRegistration(options);
    const verify_reg = await fetch("/verify-register", {
        method: "POST",
        body: JSON.stringify({username: state.user_name, response: result})
    }).then(res => res.json());
    console.log("Verified response:", verify_reg);
}

async function authenticate(state) {
    const options = mockPublicKeyCredentialRequestOptions();
    startAuthentication(options).then(result => console.log(result));
}

function AuthApp() {
    const [state, setState] = useState({});
    return <div className="app">
        <h3>Use FIDO2:WebAuthn</h3>
        <input type="text" name="user" value={state.user_name}
               onChange={e => setState({...state, user_name: e.target.value})}
        />
        <button onClick={e=>register(state)}>Register</button>
        <button onClick={e=>authenticate(state)}>Authenticate</button>
    </div>
}

ReactDOM.render(<AuthApp/>, document.getElementById("app"))