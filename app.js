// app.js

document.addEventListener("DOMContentLoaded", () => {
  renderProjectsFeed();
  initModalListeners();
});

// ========================================================
// PERSISTENT AUDIO CONTROLLER (DEFAULT: MUTED)
// ========================================================
function isVideoMuted() {
  const saved = localStorage.getItem('portfolio_video_muted');
  return saved === null ? true : saved === 'true';
}

window.handleCardVideoEnter = function(card) {
  const video = card.querySelector('video');
  if (!video) return;

  card.classList.add('playing');
  video.muted = isVideoMuted();

  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      video.muted = true;
      video.play();
    });
  }
};

window.handleCardVideoLeave = function(card) {
  const video = card.querySelector('video');
  if (!video) return;

  card.classList.remove('playing');
  video.pause();
  video.muted = true;
};

window.toggleCardVolume = function(event, btn) {
  event.stopPropagation();
  const card = btn.closest('.viewfinder-graphic');
  const video = card.querySelector('video');
  if (!video) return;

  const iconOn = btn.querySelector('.vol-icon-on');
  const iconOff = btn.querySelector('.vol-icon-off');

  const currentlyMuted = isVideoMuted();

  if (currentlyMuted) {
    localStorage.setItem('portfolio_video_muted', 'false');
    video.muted = false;
    card.setAttribute('data-user-muted', 'false');
    if (iconOn) iconOn.style.display = 'inline-block';
    if (iconOff) iconOff.style.display = 'none';

    if (card.classList.contains('playing')) {
      video.play();
    }
  } else {
    localStorage.setItem('portfolio_video_muted', 'true');
    video.muted = true;
    card.setAttribute('data-user-muted', 'true');
    if (iconOn) iconOn.style.display = 'none';
    if (iconOff) iconOff.style.display = 'inline-block';
  }
};

window.handleViewfinderClick = function(event, projectId) {
  if (event.target.closest('.vf-volume-btn')) {
    return;
  }
  window.openProjectModal(projectId);
};

// ========================================================
// FEED RENDERING
// ========================================================
function renderProjectsFeed() {
  const container = document.getElementById("projectsFeed");
  if (!container || typeof projectsData === "undefined") return;

  let html = "";
  for (let i = 0; i < projectsData.length; i += 2) {
    const p1 = projectsData[i];
    const p2 = projectsData[i + 1];

    html += `<div class="feed-row">`;
    html += buildProjectCard(p1);
    if (p2) {
      html += buildProjectCard(p2);
    }
    html += `</div>`;
  }

  container.innerHTML = html;
}

function buildProjectCard(p) {
  const isVideo = Boolean(p.trailerVideo);
  const mutedDefault = isVideoMuted();

  const visualContent = isVideo
    ? `<video 
        src="${p.trailerVideo}" 
        loop 
        playsinline 
        poster="${p.thumbnail}" 
        style="width:100%; height:100%; object-fit:cover; display:block;">
      </video>`
    : `<img 
        src="${p.thumbnail}" 
        alt="${p.title}" 
        onerror="this.src='https://placehold.co/600x338/e5e0d5/5e646d?text=${encodeURIComponent(p.client)}'" 
      />`;

  const playButtonHtml = isVideo ? `
    <div class="vf-center-play">
      <svg width="14" height="14" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
    </div>` : '';

  const volumeControlHtml = isVideo
    ? `<button type="button" class="vf-volume-btn" title="Toggle Mute / Volume" onclick="toggleCardVolume(event, this)">
        <svg class="vol-icon-on" style="display:${mutedDefault ? 'none' : 'inline-block'};" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>
        <svg class="vol-icon-off" style="display:${mutedDefault ? 'inline-block' : 'none'};" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <line x1="23" y1="9" x2="17" y2="15"></line>
          <line x1="17" y1="9" x2="23" y2="15"></line>
        </svg>
       </button>`
    : '';

  const videoHoverEvents = isVideo
    ? `onmouseenter="handleCardVideoEnter(this)" onmouseleave="handleCardVideoLeave(this)"`
    : '';

  return `
    <article class="project-feed-card">
      <div class="viewfinder-graphic ${isVideo ? 'has-video' : ''}" 
           ${videoHoverEvents} 
           data-user-muted="${mutedDefault}" 
           onclick="handleViewfinderClick(event, '${p.id}')">
        <span class="vf-tc"><span class="vf-dot"></span> ${p.tcMaster}</span>
        <span class="vf-corner tl"></span>
        <span class="vf-corner bl"></span>
        ${visualContent}
        ${playButtonHtml}
        ${volumeControlHtml}
        <span class="vf-label">${p.labelMaster}</span>
      </div>

      <div class="feed-category-pill">${p.category}</div>
      <h3 class="feed-title">${p.title}</h3>
      <div class="feed-role-date">${p.role} · ${p.date}</div>
      <p class="feed-desc">${p.shortDesc}</p>
      <div class="feed-action-link" onclick="openProjectModal('${p.id}')">
        View Project Details & Media →
      </div>
    </article>
  `;
}

// ========================================================
// MODAL CONTROLLER
// ========================================================
window.openProjectModal = function(id) {
  if (typeof projectsData === "undefined") return;
  const p = projectsData.find(item => item.id === id);
  if (!p) return;

  const content = document.getElementById("modalDynamicContent");
  if (!content) return;

  // Build the media section conditionally
  let mediaSectionHtml = "";

  const publicationImage = p.publicationDocument?.image || p.publicationSpread;

  if (p.mediaType === "editorial-spread" && publicationImage) {
    const publicationLabel = p.publicationDocument?.label || "Full-resolution publication spread";
    const publicationCaption = p.publicationDocument?.caption;

    mediaSectionHtml = `
      <div class="modal-subhead">PUBLICATION &amp; EDITORIAL SPREAD</div>
      <div class="publication-spread-wrapper">
        <a href="${publicationImage}" target="_blank" rel="noopener noreferrer" class="spread-zoom-link" title="Click to view full readable resolution">
          <img 
            src="${publicationImage}" 
            alt="${p.title}" 
            class="publication-spread-img"
          />
          <span class="spread-overlay-badge">🔍 Open Full Readable Spread ↗</span>
        </a>
        <div class="spread-caption">
          <strong>${publicationLabel}</strong>${publicationCaption ? ` — ${publicationCaption}` : ""}
        </div>
      </div>
    `;
  } else {
    // Default video and reels layout for all other projects
    mediaSectionHtml = `
      <div class="modal-subhead">VIDEO &amp; REELS</div>
      <div style="display: grid; grid-template-columns: ${p.detailMedia && p.detailMedia.reelLink ? '2fr 1fr' : '1fr'}; gap: 1.5rem; margin-bottom: 2.5rem;">
        
        <!-- 16:9 Master Video Box -->
        <div>
          <a href="${(p.detailMedia && p.detailMedia.masterLink) || '#'}" target="_blank" rel="noopener" style="text-decoration: none; display: block;">
            <div class="viewfinder-graphic" style="aspect-ratio: 16 / 9; margin-bottom: 0.75rem;">
              <span class="vf-tc"><span class="vf-dot"></span> ${(p.detailMedia && p.detailMedia.masterTc) || p.tcMaster}</span>
              <span class="vf-corner tl"></span>
              <span class="vf-corner bl"></span>
              <img 
                src="${(p.detailMedia && p.detailMedia.masterImage) || p.thumbnail}" 
                alt="${p.title}" 
                onerror="this.src='https://placehold.co/800x450/e5e0d5/5e646d?text=Master+Video'" 
              />
              <div class="vf-center-play">
                <svg width="14" height="14" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              </div>
              <span class="vf-label">${(p.detailMedia && p.detailMedia.masterLabel) || p.labelMaster}</span>
            </div>
          </a>
          ${p.detailMedia && p.detailMedia.masterLink ? `
            <a href="${p.detailMedia.masterLink}" target="_blank" rel="noopener" class="archive-btn-row">
              <span>📺 Open in YouTube</span>
              <span class="btn-status">WATCH ↗</span>
            </a>
          ` : ''}
        </div>

        <!-- 9:16 Vertical Reel Box -->
        ${p.detailMedia && p.detailMedia.reelLink ? `
          <div>
            <a href="${p.detailMedia.reelLink}" target="_blank" rel="noopener" style="text-decoration: none; display: block;">
              <div class="viewfinder-graphic" style="aspect-ratio: 9 / 16; margin-bottom: 0.75rem;">
                <span class="vf-tc"><span class="vf-dot"></span> ${p.detailMedia.reelTc}</span>
                <span class="vf-corner tl"></span>
                <span class="vf-corner bl"></span>
                <img 
                  src="${p.detailMedia.reelImage || p.thumbnail}" 
                  alt="${p.title}" 
                  onerror="this.src='https://placehold.co/450x800/e5e0d5/5e646d?text=Instagram+Reel'" 
                />
                <div class="vf-center-play">
                  <svg width="14" height="14" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                </div>
                <span class="vf-label">${p.detailMedia.reelLabel}</span>
              </div>
            </a>
            <a href="${p.detailMedia.reelLink}" target="_blank" rel="noopener" class="archive-btn-row">
              <span>📱 Open Reel</span>
              <span class="btn-status">INSTAGRAM ↗</span>
            </a>
          </div>
        ` : ''}
      </div>
    `;
  }

  content.innerHTML = `
    <div class="modal-cat-tag">${p.category}</div>
    <h2 class="modal-title-main">${p.title}</h2>

    <div class="modal-meta-grid">
      <div>
        <span class="modal-lbl">ROLE</span>
        <div class="modal-val">${p.role}</div>
      </div>
      <div>
        <span class="modal-lbl">CLIENT / ORGANIZATION</span>
        <div class="modal-val">${p.client}</div>
      </div>
      <div>
        <span class="modal-lbl">DATE</span>
        <div class="modal-val">${p.date}</div>
      </div>
      <div>
        <span class="modal-lbl">LOCATION</span>
        <div class="modal-val">${p.location}</div>
      </div>
    </div>

    <div class="modal-subhead">EDITORIAL OVERVIEW &amp; TECHNICAL EXECUTION</div>
    <p class="modal-overview-text">${p.editorialOverview}</p>

    <div class="modal-points-grid">
      ${(p.technicalPointers || []).map(pt => `<div class="modal-point-item">${pt}</div>`).join("")}
    </div>

    ${mediaSectionHtml}

    <!-- FIELD DOCUMENTATION & STILLS -->
    ${p.stills && p.stills.length ? `
      <div class="modal-subhead">FIELD DOCUMENTATION &amp; STILLS</div>
      <div class="stills-grid-modal">
        ${p.stills.map(still => `
          <div class="still-card-modal">
            <div class="still-img-box">
              <img 
                src="${still.url}" 
                alt="${still.caption}" 
                onerror="this.src='https://placehold.co/400x400/e5e0d5/5e646d?text=Capture'" 
              />
            </div>
            <div class="still-cap-text">${still.caption}</div>
          </div>
        `).join("")}
      </div>
    ` : ''}

    <!-- ARCHIVE & FILE DELIVERY -->
    ${p.archiveLinks && p.archiveLinks.length ? `
      <div class="modal-subhead">ARCHIVE &amp; FILE DELIVERY</div>
      <div class="archive-btn-list">
        ${p.archiveLinks.map(link => `
          <a href="${link.url || '#'}" target="_blank" rel="noopener" class="archive-btn-row">
            <span>${link.title}</span>
            <span class="btn-status">${link.status}</span>
          </a>
        `).join("")}
      </div>
    ` : ''}
  `;

  const modal = document.getElementById("projectModal");
  if (modal) {
    const modalWindow = modal.querySelector(".modal-window");
    if (modalWindow) {
      modalWindow.classList.toggle(
        "publication-modal",
        p.mediaType === "editorial-spread" && Boolean(publicationImage)
      );
    }
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }
};

window.closeProjectModal = function() {
  const modal = document.getElementById("projectModal");
  if (modal) {
    modal.classList.remove("open");
    document.body.style.overflow = "auto";
  }
};

function initModalListeners() {
  const modal = document.getElementById("projectModal");
  const closeBtn = document.getElementById("closeProjectModal");

  if (closeBtn) {
    closeBtn.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      window.closeProjectModal();
    };
  }

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      window.closeProjectModal();
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      window.closeProjectModal();
    }
  });
}