import httpx

async def fetch_wiki_summary(query: str):
    url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{query}"

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url)

        return response.json()

    except httpx.HTTPStatusError as e:
        return {"status": False, "message": f"HTTP error {e.response.status_code}: {e.response.text}"}

    except httpx.RequestError as e:
        return {"status": False, "message": f"Request error: {str(e)}"}

    except Exception as e:
        return {"status": False, "message": f"Unexpected error: {str(e)}"}

async def fetch_random_wiki_summary():
    url = "https://en.wikipedia.org/api/rest_v1/page/random/summary"

    try:
        async with httpx.AsyncClient(follow_redirects=True) as client:
            response = await client.get(url)
            data = response.json()

        return {
            "status": True,
            "data": {
                "title": data.get("title", "No title available"),
                "description": data.get("extract", "No description available"),
                "thumbnail": data.get("originalimage", {}).get("source", None),
                "contentLink": data.get("content_urls", {}).get("desktop", {}).get("page", None)
            }
        }

    except httpx.HTTPStatusError as e:
        return {"status": False, "message": f"HTTP error {e.response.status_code}: {e.response.text}"}

    except httpx.RequestError as e:
        return {"status": False, "message": f"Request error: {str(e)}"}

    except Exception as e:
        return {"status": False, "message": f"Unexpected error: {str(e)}"}