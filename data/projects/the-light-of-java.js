// data/projects/the-light-of-java.js
const projectTheLightOfJava = {
  id: "the-light-of-java",
  title: "The Light of Java: Barnabas Sarikrama (Theatrical Performance)",
  category: "CINEMATOGRAPHY & STAGE LIGHTING DIRECTION",
  role: "Director of Photography & Lighting Director",
  client: "SMA Katolik St. Louis 1 Surabaya",
  date: "Jan 2024 – Mar 2024",
  location: "Surabaya, East Java",
  shortDesc: "Cinematic teaser and trailer for a live theatrical performance, plus colour-graded cast portraits for the official posters. Stage lighting cues were designed and called in real time during the shows.",
  
  // Card on the main website uses the trailer video or poster
  thumbnail: "assets/images/the-light-of-java/perfomance-photo.jpg",
  trailerVideo: "assets/images/the-light-of-java/trailer-the-light-of-java.mp4",
  tcMaster: "TC 00:48:22:03",
  labelMaster: "OFFICIAL TRAILER · 16:9",

  editorialOverview: "Produced, shot, and edited promotional teasers from concept to final cut to build audience anticipation ahead of the live show. Directed cast photo shoots with custom color-grading for official print posters, and programmed dynamic stage lighting cues called in real time across rehearsals and live runs.",
  technicalPointers: [
    "Produced, shot, and edited cinematic teaser and trailer videos",
    "Executed cast photo shoots and color-graded portraits for posters",
    "Designed lighting sequences to match mood and pacing",
    "Directed and called real-time stage lighting cues during performances"
  ],
  detailMedia: {
    // 16:9 Master Video (Live performance YouTube stream with timecode)
    masterImage: "https://img.youtube.com/vi/r8u6iaPvyVU/maxresdefault.jpg",
    masterTc: "TC 05:23:00:00",
    masterLabel: "16:9 MASTER (LIVE PERFORMANCE)",
    masterLink: "https://www.youtube.com/live/r8u6iaPvyVU?t=19380s",

    // 9:16 Vertical Reel (Using your uploaded reel_cover.jpg)
    reelImage: "assets/images/the-light-of-java/reel_cover.jpg",
    reelTc: "TC 00:00:45:00",
    reelLabel: "9:16 REEL",
    reelLink: "https://www.instagram.com/reel/C4narMfvyQx/"
  },
  
  // Field documentation with performance photos and BTS captures
  stills: [
    { url: "assets/images/the-light-of-java/perfomance-photo.jpg", caption: "Main Stage Performance" },
    { url: "assets/images/the-light-of-java/bts-1.jpg", caption: "Behind the scenes: Camera setup" },
    { url: "assets/images/the-light-of-java/bts-2.jpg", caption: "Behind the scenes: Rehearsal call" },
    { url: "assets/images/the-light-of-java/pic-1.jpg", caption: "Performance photo: Scene 1" },
    { url: "assets/images/the-light-of-java/pic-2.jpg", caption: "Performance photo: Scene 2" },
    { url: "assets/images/the-light-of-java/pic-3.jpg", caption: "Performance photo: Cast lighting" },
    { url: "assets/images/the-light-of-java/pic-4.jpg", caption: "Stage cue & wrap" }
  ],
  archiveLinks: [
    { 
      title: "Watch Official Trailer on Instagram", 
      status: "OPEN INSTAGRAM REEL", 
      url: "https://www.instagram.com/reel/C4uchCRLTF4/" 
    },
    { 
      title: "View 123xhibition Production Profile", 
      status: "OPEN INSTAGRAM", 
      url: "https://www.instagram.com/123xhibition.co/" 
    },
    { 
      title: "Full Live Stream Broadcast (Timestamp 5:23:00)", 
      status: "OPEN YOUTUBE", 
      url: "https://www.youtube.com/live/r8u6iaPvyVU?t=19380s" 
    }
  ]
};