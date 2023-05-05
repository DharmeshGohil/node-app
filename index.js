const express = require("express");
const youtubedl = require("youtube-dl-exec");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello Dharmesh Its working node ");
});

app.get("/api/download", async (req, res) => {
  const videoURL = req.query.videourl;

  if (!videoURL) {
    return res.status(400).json({ error: "videourl parameter is required" });
  }

  try {
    const videoInfo = await youtubedl(videoURL, {
      dumpSingleJson: true,
      skipDownload: true,
      noWarnings: true,
      noCallHome: true,
      noCheckCertificate: true,
      youtubeSkipDashManifest: true,
    });

    res.json(videoInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
