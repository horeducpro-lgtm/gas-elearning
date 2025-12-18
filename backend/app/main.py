from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Bienvenue sur GAS Backend 🚀"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

from app.api import auth

app.include_router(auth.router)
