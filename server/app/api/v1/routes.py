from fastapi import APIRouter
from app.services.wiki_service import fetch_wiki_summary, fetch_random_wiki_summary

router = APIRouter()

@router.get("/ping")
def ping():
    return { "message": "Server is running" }

@router.get("/search/{query}")
async def search_wiki(query: str):
    return await fetch_wiki_summary(query)

@router.get("/random")
async def random_wiki():
    return await fetch_random_wiki_summary()