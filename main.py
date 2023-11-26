from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates

app = FastAPI()
templates = Jinja2Templates(directory="frontend/html")


@app.get("/")
async def root(request: Request):
    return templates.TemplateResponse(
        "main.html",
        context={"request": request}
    )


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}
