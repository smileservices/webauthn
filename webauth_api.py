from typing import (
    Optional,
    List
)

from webauthn import (
    generate_registration_options,
    generate_authentication_options
)

from webauthn.helpers.structs import (
    PYDANTIC_V2,
    AttestationConveyancePreference,
    AuthenticatorAttachment,
    AuthenticatorSelectionCriteria,
    PublicKeyCredentialDescriptor,
    ResidentKeyRequirement,
    RegistrationCredential,
)

from pydantic import BaseModel


class RelayingParty(BaseModel):
    rp_id: str
    rp_name: str


class User(BaseModel):
    user_name: str


class VerifyRegistrationRequest(BaseModel):
    user_name: str
    registration: RegistrationCredential


def generate_register_options(rp: RelayingParty, user: User):
    return generate_registration_options(
        **rp.__dict__,
        **user.__dict__,
        user_id=user.user_name,
        authenticator_selection=AuthenticatorSelectionCriteria(
            require_resident_key=False,
            resident_key=ResidentKeyRequirement.PREFERRED,
        ),
    )


def verify_registration(data: VerifyRegistrationRequest):
    pass



def generate_authenticate_options(rp_id: str, user_creds: Optional[List[PublicKeyCredentialDescriptor]]):
    return generate_authentication_options(
        rp_id=rp_id,
        allow_credentials=user_creds
    )


def verify_authentication():
    pass
