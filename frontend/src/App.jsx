import { useState } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { RenderDataList } from "./components/RenderDataList";

function App() {
  const [artist, setArtist] = useState("");
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const onSearch = async (e) => {
    e.preventDefault();
    setError("");
    setData("");

    if (artist.trim() === "") {
      setError("アーティストは必須入力です。");
      return;
    }
    setError("");

    setLoading(true);

    try {
      const res = await fetch("/api/itunes/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          artist: artist.trim(),
          keyword: keyword.trim(),
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json?.error || "検索に失敗しました。");
        return;
      }
      setData(json);
      setArtist("");
      setKeyword("");
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-xl mt-8 mx-auto space-y-2 flex flex-col justify-center">
        <h1>iTunes Search</h1>
        <form onSubmit={onSearch} className="flex flex-col gap-2 mb-8">
          <div>
            <TextField
              id="artist"
              label="アーティスト名を入力"
              variant="outlined"
              size="small"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
            />
          </div>
          <div>
            <TextField
              id="keyword"
              label="キーワードを入力"
              variant="outlined"
              size="small"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <div>
            <Button variant="contained" type="submit">
              {loading ? "検索中" : "検索"}
            </Button>
          </div>
        </form>

        {error && <p className="text-red-500">{error}</p>}

        {loading && "Loading..."}
        {data && (
          <>
            <p>検索結果：{data.resultCount}件</p>
            <RenderDataList data={data} />
          </>
        )}
      </div>
    </>
  );
}

export default App;
