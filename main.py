from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates

from webauth_api import (
    generate_register_options,
    generate_authenticate_options,
    verify_registration,
    RelayingParty,
    User,
    VerifyRegistrationRequest
)

app = FastAPI()
templates = Jinja2Templates(directory="frontend/html")

RP = RelayingParty(rp_id="localhost", rp_name="Local Host")


@app.get("/")
async def root(request: Request):
    return templates.TemplateResponse(
        "main.html",
        context={"request": request}
    )


@app.post("/generate-register-options")
async def gen_reg_opt(user: User):
    # check if it's already registered or not
    # save options to verify
    options = generate_register_options(rp=RP, user=user)
    return options

@app.post("/verify-register")
async def ver_reg(data: VerifyRegistrationRequest):
    # retrieve the options previously saved
    saved_options = {}
    verify_registration(data, saved_options)


@app.post("/register-key")
async def reg_key(key):
    # verify registration key
    # save it for the user
    return


@app.post("/generate-authentication-options")
async def gen_auth_opt(user: User):
    # get the user's registered keys
    return generate_authenticate_options(rp_id=RP.rp_id, )