export const RenderDataList = ({ data }) => {
  return (
    <ul className="flex flex-col gap-4 p-4">
      {data.results.map((r) => {
        return (
          <li
            key={r.trackId || `${r.trackName}-${r.previewUrl}`}
            className="flex gap-4 p-2 bg-gray-300 rounded-lg"
          >
            {r.artworkUrl100 ? (
              <img src={r.artworkUrl100} alt="artwork" className="w-24 h-24" />
            ) : (
              <div className="w-24 h-24 border-2 bg-gray-500">No Image</div>
            )}
            <div className="flex-1">
              <div>アーティスト：{r.artistName}</div>
              <div>曲名：{r.trackName || "曲名なし"}</div>
              {r.previewUrl && <audio controls src={r.previewUrl} />}
            </div>
          </li>
        );
      })}
    </ul>
  );
};
