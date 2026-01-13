from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

ITUNES_SEARCH_URL = "https://itunes.apple.com/search"

def normalize(s: str) -> str:
    return s.replace(" ", "").replace("　", "").lower()

def fetch_itunes_songs(artist: str, keyword: str, limit: int = 200):
    """iTunes APIを叩いて、必要な項目だけに整形して返す"""
    term = f"{artist} {keyword}".strip()
    # strip():前後の空白を削除、文字列の途中のスペースは消さない

    params = {
        "term": term,
        "media": "music",
        "entity": "song",
        "limit": limit,
        "country": "jp",
        "lang": "ja_jp",
    }

    res = requests.get(ITUNES_SEARCH_URL, params=params, timeout=15)
    res.raise_for_status() # エラー(400/500系)なら例外をなげるという便利メソッド
    raw = res.json()

    target_artist = normalize(artist)

    filtered_results = []
    for item in raw.get("results", []):
        if normalize(item.get("artistName", "")) == target_artist:
            filtered_results.append({
                "trackId": item.get("trackId"),
                "trackName": item.get("trackName"),
                "artistName": item.get("artistName"),
                "collectionName": item.get("collectionName"),
                "artworkUrl100": item.get("artworkUrl100"),
                "previewUrl": item.get("previewUrl"),
                "trackViewUrl": item.get("trackViewUrl"),
                "releaseDate": item.get("releaseDate")
            })
    
    return params, raw, filtered_results

@app.get("/api/health")
def health():
    return jsonify(status="ok")

# ---POST版:JSONで受け取る /api/itunes/search
@app.post("/api/itunes/search")
def itunes_search_post():
    payload = request.get_json(silent=True) or {}
    artist = (payload.get("artist") or "").strip()
    keyword = (payload.get("keyword") or "").strip()

    if not artist:
        return jsonify(error="artist is required"), 400
    
    try:
        params, raw, filtered_results = fetch_itunes_songs(artist, keyword)
        return jsonify(query=params, resultCount=len(filtered_results), results=filtered_results)
    except requests.RequestException as e:
        return jsonify(error="itunes_api_failed", detail=str(e)), 502
    

if __name__ == "__main__":
    app.run(debug=True, port=5000)