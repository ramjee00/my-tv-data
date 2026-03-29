const fs = require("fs");
const https = require("https");

const url = "https://raw.githubusercontent.com/Shubhamkur/Tv/refs/heads/main/tvid";

https.get(url, (res) => {
  let data = "";

  res.on("data", chunk => data += chunk);

  res.on("end", () => {
    try {
      const json = JSON.parse(data);

      // JSON save
      fs.writeFileSync("channels.json", JSON.stringify(json, null, 2));

      // M3U file बनाना
      let m3u = "#EXTM3U\n";

      json.forEach(item => {
        m3u += `#EXTINF:-1,${item.name}\n`;
        m3u += `https://wap4tv.pages.dev/?id=${item.id}\n`;
      });

      fs.writeFileSync("channels.m3u", m3u);

      console.log("✅ Updated successfully!");
    } catch (e) {
      console.log("❌ Error:", e);
    }
  });

}).on("error", (err) => {
  console.log("❌ Fetch Error:", err.message);
});
