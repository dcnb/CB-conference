# Academic Conference Platform: CollectionBuilder-CSV Extension

## Project Overview

Build an academic conference platform as a "Built On" extension to CollectionBuilder-CSV. The platform manages conference information before, during, and after the event, with the CollectionBuilder collection component serving as a post-conference archive for resources like presentations, papers, and videos.

**Base Repository:** https://github.com/CollectionBuilder/collectionbuilder-csv

## Core Architecture

### Data Structure (CSV-Driven)

The platform uses three primary CSV files in `_data/`:

```
_data/
├── events.csv          # Conference schedule/sessions
├── participants.csv    # Speakers, organizers, attendees
└── metadata.csv        # Post-conference resources (standard CB)
```

### Directory Structure

```
conference-platform/
├── _data/
│   ├── events.csv
│   ├── participants.csv
│   ├── metadata.csv
│   ├── config-nav.csv
│   ├── config-metadata.csv
│   └── theme.yml
├── _includes/
│   ├── conference/
│   │   ├── schedule-day.html
│   │   ├── session-card.html
│   │   ├── speaker-card.html
│   │   ├── speaker-modal.html
│   │   └── countdown.html
│   └── [standard CB includes]
├── _layouts/
│   ├── conference-home.html
│   ├── schedule.html
│   ├── speaker.html
│   └── [standard CB layouts]
├── pages/
│   ├── index.md              # Conference home
│   ├── about.md
│   ├── schedule.md
│   ├── speakers.md
│   ├── participate.md        # Call for papers / registration
│   ├── venue.md              # Location & travel info
│   ├── sponsors.md
│   ├── committee.md          # Organizing committee
│   ├── proceedings.md        # Links to CB collection
│   └── archives.md           # Past conferences
├── objects/                  # Post-conference materials
├── assets/
│   ├── css/
│   │   └── conference.scss
│   └── js/
│       └── conference.js
└── _config.yml
```

---

## CSV Specifications

### events.csv

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| event_id | yes | Unique identifier | `keynote-1`, `panel-a1` |
| title | yes | Session/event title | "Opening Keynote" |
| type | yes | Event category | `keynote`, `panel`, `paper`, `workshop`, `break`, `social`, `poster` |
| date | yes | ISO date | `2026-06-15` |
| start_time | yes | 24hr format | `09:00` |
| end_time | yes | 24hr format | `10:30` |
| location | no | Room/venue | "Main Auditorium" |
| track | no | For parallel sessions | "Track A", "Digital Methods" |
| description | no | Session abstract | Long text description |
| speakers | no | Semicolon-separated participant_ids | `smith-jane;doe-john` |
| chair | no | Session moderator participant_id | `wilson-mary` |
| keywords | no | Semicolon-separated | `machine learning;text analysis` |
| resources | no | Links to materials | URL or objectid reference |
| virtual_link | no | Zoom/streaming URL | https://zoom.us/... |
| recording | no | Post-conference video | YouTube URL or objectid |

### participants.csv

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| participant_id | yes | Unique identifier | `smith-jane` |
| name | yes | Full display name | "Dr. Jane Smith" |
| role | yes | Conference role | `speaker`, `keynote`, `organizer`, `committee`, `chair` |
| affiliation | no | Institution | "University of Idaho" |
| bio | no | Biography text | Markdown supported |
| image | no | Photo filename or URL | `/assets/img/speakers/smith.jpg` |
| email | no | Contact email | jane@example.edu |
| website | no | Personal/institutional URL | https://janesmith.com |
| orcid | no | ORCID identifier | 0000-0002-1234-5678 |
| twitter | no | Twitter/X handle | @janesmith |
| presentation_title | no | Talk title | "New Approaches to..." |
| presentation_abstract | no | Talk abstract | Long text |

### metadata.csv (Standard CollectionBuilder)

Use the standard CB-CSV metadata format for post-conference resources:

| Field | Description |
|-------|-------------|
| objectid | Unique identifier |
| filename | File in objects/ folder |
| title | Resource title |
| creator | Author/presenter name |
| date | Presentation date |
| description | Abstract/summary |
| subject | Topics (semicolon-separated) |
| type | `Presentation`, `Paper`, `Video`, `Poster` |
| format | MIME type |
| related_event | Links to event_id |
| related_participant | Links to participant_id |

---

## Page Templates & Features

### 1. Conference Home Page (`index.md`)

**Purpose:** Landing page with key information and calls to action

**Elements:**
- Hero section with conference title, dates, location
- Countdown timer to event
- Key dates callout (submission deadline, registration, etc.)
- Featured speakers carousel
- Theme/about excerpt
- Sponsor logos
- Registration CTA button

**Layout:** `conference-home`

```yaml
---
layout: conference-home
title: Conference Name 2026
tagline: "Theme or Subtitle Here"
dates: "June 15-17, 2026"
location: "University of Idaho, Moscow, ID"
registration_url: "https://..."
hero_image: "/assets/img/hero.jpg"
---
```

### 2. Schedule Page (`schedule.md`)

**Purpose:** Full program with filtering and navigation

**Features:**
- Day-by-day tabs or accordion
- Filter by track/type
- Expandable session details
- Speaker links with photos
- Add to calendar functionality (iCal generation)
- Print-friendly version
- Time zone display

**Layout:** `schedule`

**Include:** `schedule-day.html`

```liquid
{% raw %}
{% assign day_events = site.data.events | where: "date", include.date | sort: "start_time" %}
{% for event in day_events %}
  {% include conference/session-card.html event=event %}
{% endfor %}
{% endraw %}
```

### 3. Speakers Page (`speakers.md`)

**Purpose:** Directory of all presenters and organizers

**Features:**
- Grid/list view toggle
- Filter by role (keynote, speaker, committee)
- Search/filter by name or affiliation
- Photo thumbnails with modal for full bio
- Links to associated sessions

**Layout:** `speakers`

**Include:** `speaker-card.html`

```liquid
{% raw %}
{% assign speakers = site.data.participants | where_exp: "p", "p.role == 'speaker' or p.role == 'keynote'" %}
{% for speaker in speakers %}
  {% include conference/speaker-card.html participant=speaker %}
{% endfor %}
{% endraw %}
```

### 4. Participate Page (`participate.md`)

**Purpose:** Call for papers, registration, submission info

**Sections:**
- Important dates timeline
- Submission guidelines
- Presentation formats (paper, poster, panel)
- Registration tiers and pricing
- Travel grants/funding info
- Link to submission system (if external)

### 5. Venue/Location Page (`venue.md`)

**Purpose:** Travel and logistics information

**Sections:**
- Venue details with embedded map
- Transportation (airports, parking, public transit)
- Accommodation recommendations
- Visa information (for international events)
- Accessibility information
- Local dining/attractions

### 6. Sponsors Page (`sponsors.md`)

**Purpose:** Acknowledge financial supporters

**Features:**
- Tiered display (Platinum, Gold, Silver, etc.)
- Logo grid with links
- Sponsorship prospectus download
- Contact for sponsorship inquiries

### 7. Committee Page (`committee.md`)

**Purpose:** List organizing and program committees

**Generated from:** `participants.csv` filtered by role

```liquid
{% raw %}
{% assign organizers = site.data.participants | where: "role", "organizer" %}
{% assign committee = site.data.participants | where: "role", "committee" %}
{% endraw %}
```

### 8. Proceedings Page (`proceedings.md`)

**Purpose:** Gateway to post-conference CollectionBuilder archive

**Features:**
- Links to CB browse/search
- Featured presentations
- Statistics (# of papers, videos, etc.)
- Download options

### 9. Archives Page (`archives.md`)

**Purpose:** Previous conference editions

**Structure:**
- Year-by-year listing
- Links to archived sites or proceedings
- Historical statistics
- Photo galleries from past events

---

## Key Includes

### `_includes/conference/schedule-day.html`

```html
{% raw %}
<div class="schedule-day" id="day-{{ include.date }}">
  <h3>{{ include.date | date: "%A, %B %d, %Y" }}</h3>
  
  {% assign day_events = site.data.events | where: "date", include.date | sort: "start_time" %}
  
  {% for event in day_events %}
    {% include conference/session-card.html event=event %}
  {% endfor %}
</div>
{% endraw %}
```

### `_includes/conference/session-card.html`

```html
{% raw %}
<div class="session-card session-{{ include.event.type }}" data-track="{{ include.event.track }}">
  <div class="session-time">
    <span class="start">{{ include.event.start_time }}</span>
    <span class="end">{{ include.event.end_time }}</span>
  </div>
  
  <div class="session-content">
    <h4 class="session-title">{{ include.event.title }}</h4>
    
    {% if include.event.speakers %}
      <div class="session-speakers">
        {% assign speaker_ids = include.event.speakers | split: ";" %}
        {% for sid in speaker_ids %}
          {% assign speaker = site.data.participants | where: "participant_id", sid | first %}
          {% if speaker %}
            <a href="#speaker-{{ speaker.participant_id }}" class="speaker-link">
              {% if speaker.image %}<img src="{{ speaker.image }}" alt="{{ speaker.name }}">{% endif %}
              {{ speaker.name }}
            </a>
          {% endif %}
        {% endfor %}
      </div>
    {% endif %}
    
    {% if include.event.location %}
      <div class="session-location">📍 {{ include.event.location }}</div>
    {% endif %}
    
    {% if include.event.description %}
      <div class="session-abstract collapse" id="abstract-{{ include.event.event_id }}">
        {{ include.event.description | markdownify }}
      </div>
      <button class="btn btn-sm" data-bs-toggle="collapse" data-bs-target="#abstract-{{ include.event.event_id }}">
        Details
      </button>
    {% endif %}
  </div>
</div>
{% endraw %}
```

### `_includes/conference/speaker-card.html`

```html
{% raw %}
<div class="speaker-card" id="speaker-{{ include.participant.participant_id }}">
  <div class="speaker-image">
    {% if include.participant.image %}
      <img src="{{ include.participant.image }}" alt="{{ include.participant.name }}">
    {% else %}
      <div class="speaker-placeholder">{{ include.participant.name | slice: 0 }}</div>
    {% endif %}
  </div>
  
  <div class="speaker-info">
    <h4>{{ include.participant.name }}</h4>
    {% if include.participant.affiliation %}
      <p class="affiliation">{{ include.participant.affiliation }}</p>
    {% endif %}
    
    <div class="speaker-links">
      {% if include.participant.website %}<a href="{{ include.participant.website }}">🌐</a>{% endif %}
      {% if include.participant.twitter %}<a href="https://twitter.com/{{ include.participant.twitter }}">𝕏</a>{% endif %}
      {% if include.participant.orcid %}<a href="https://orcid.org/{{ include.participant.orcid }}">ORCID</a>{% endif %}
    </div>
    
    <button class="btn btn-outline-primary btn-sm" 
            data-bs-toggle="modal" 
            data-bs-target="#modal-{{ include.participant.participant_id }}">
      Bio & Sessions
    </button>
  </div>
</div>

<!-- Modal -->
<div class="modal fade" id="modal-{{ include.participant.participant_id }}">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5>{{ include.participant.name }}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        {{ include.participant.bio | markdownify }}
        
        <h6>Sessions</h6>
        {% assign speaker_sessions = site.data.events | where_exp: "e", "e.speakers contains include.participant.participant_id" %}
        <ul>
        {% for session in speaker_sessions %}
          <li><a href="/schedule/#{{ session.event_id }}">{{ session.title }}</a></li>
        {% endfor %}
        </ul>
      </div>
    </div>
  </div>
</div>
{% endraw %}
```

### `_includes/conference/countdown.html`

```html
{% raw %}
<div id="countdown" data-target="{{ include.target_date }}">
  <div class="countdown-item"><span class="days">00</span> Days</div>
  <div class="countdown-item"><span class="hours">00</span> Hours</div>
  <div class="countdown-item"><span class="minutes">00</span> Minutes</div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const countdown = document.getElementById('countdown');
  const targetDate = new Date(countdown.dataset.target).getTime();
  
  const timer = setInterval(function() {
    const now = new Date().getTime();
    const diff = targetDate - now;
    
    if (diff < 0) {
      clearInterval(timer);
      countdown.innerHTML = "<p>Conference in progress!</p>";
      return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    countdown.querySelector('.days').textContent = days;
    countdown.querySelector('.hours').textContent = hours;
    countdown.querySelector('.minutes').textContent = minutes;
  }, 1000);
});
</script>
{% endraw %}
```

---

## _config.yml Additions

```yaml
# Conference Settings
conference:
  title: "National Interdisciplinary Lookout Conference"
  short_title: "NILC 2026"
  year: 2026
  dates: "June 15-17, 2026"
  location: "University of Idaho"
  city: "Moscow, Idaho"
  
  # Key Dates
  key_dates:
    - label: "Abstract Submission Opens"
      date: "2025-12-01"
    - label: "Submission Deadline"
      date: "2026-02-15"
    - label: "Notification of Acceptance"
      date: "2026-03-15"
    - label: "Early Registration Deadline"
      date: "2026-04-30"
    - label: "Conference Dates"
      date: "2026-06-15"
  
  # Registration
  registration:
    url: "https://..."
    open: true
    early_bird_deadline: "2026-04-30"
    prices:
      regular: "$150"
      student: "$75"
      virtual: "$50"
  
  # Submission
  submission:
    url: "https://..."
    open: false
    types:
      - "Paper (20 min)"
      - "Panel (90 min)"
      - "Poster"
      - "Workshop (half-day)"
  
  # Social Media
  social:
    twitter: "@conference"
    hashtag: "#NILC2026"
  
  # Contact
  contact_email: "conference@uidaho.edu"

# Theme colors (extends CB defaults)
conference-colors:
  primary: "#7C3626"
  secondary: "#B0907E"
  accent: "#E8E0D8"

# Default metadata CSV (for CB collection)
metadata: metadata

# Additional data files
conference-data:
  events: events
  participants: participants
```

---

## CSS Framework (`assets/css/conference.scss`)

```scss
// Conference Platform Styles
// Extends CollectionBuilder base styles

// Variables
$conf-primary: #7C3626;
$conf-secondary: #B0907E;
$conf-accent: #E8E0D8;

// Schedule Styles
.schedule-day {
  margin-bottom: 2rem;
  
  h3 {
    border-bottom: 2px solid $conf-primary;
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
  }
}

.session-card {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-left: 4px solid $conf-secondary;
  margin-bottom: 1rem;
  background: lighten($conf-accent, 5%);
  
  &.session-keynote {
    border-left-color: $conf-primary;
    background: lighten($conf-primary, 55%);
  }
  
  &.session-break {
    border-left-color: #999;
    background: #f5f5f5;
    font-style: italic;
  }
}

.session-time {
  flex: 0 0 80px;
  text-align: center;
  
  .start {
    display: block;
    font-weight: bold;
    font-size: 1.1rem;
  }
  
  .end {
    display: block;
    font-size: 0.9rem;
    color: #666;
  }
}

.session-speakers {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin: 0.5rem 0;
  
  .speaker-link {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
}

// Speaker Grid
.speakers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.speaker-card {
  text-align: center;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  
  .speaker-image {
    width: 150px;
    height: 150px;
    margin: 0 auto 1rem;
    
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
    
    .speaker-placeholder {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: $conf-secondary;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3rem;
    }
  }
  
  .affiliation {
    color: #666;
    font-size: 0.9rem;
  }
}

// Countdown
#countdown {
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
  background: $conf-primary;
  color: white;
  
  .countdown-item {
    text-align: center;
    
    span {
      display: block;
      font-size: 3rem;
      font-weight: bold;
    }
  }
}

// Key Dates Timeline
.key-dates {
  position: relative;
  padding-left: 2rem;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: $conf-secondary;
  }
  
  .date-item {
    position: relative;
    padding-bottom: 1.5rem;
    
    &::before {
      content: '';
      position: absolute;
      left: -2rem;
      top: 0.5rem;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: $conf-primary;
      border: 2px solid white;
    }
    
    .date {
      font-weight: bold;
      color: $conf-primary;
    }
  }
}

// Sponsor Tiers
.sponsors-tier {
  margin-bottom: 2rem;
  
  h4 {
    text-align: center;
    margin-bottom: 1rem;
  }
  
  &.tier-platinum .sponsor-logos img { max-height: 100px; }
  &.tier-gold .sponsor-logos img { max-height: 75px; }
  &.tier-silver .sponsor-logos img { max-height: 50px; }
}

.sponsor-logos {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  align-items: center;
  
  a {
    display: block;
  }
  
  img {
    max-width: 200px;
    filter: grayscale(20%);
    transition: filter 0.3s;
    
    &:hover {
      filter: grayscale(0%);
    }
  }
}

// Track Filter Buttons
.track-filters {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  
  .btn {
    font-size: 0.9rem;
  }
}

// Print Styles
@media print {
  .no-print,
  .track-filters,
  .btn {
    display: none !important;
  }
  
  .session-card {
    page-break-inside: avoid;
  }
}
```

---

## JavaScript Functionality (`assets/js/conference.js`)

```javascript
// Conference Platform JavaScript

document.addEventListener('DOMContentLoaded', function() {
  
  // Schedule Track Filtering
  const trackFilters = document.querySelectorAll('[data-filter-track]');
  const sessionCards = document.querySelectorAll('.session-card');
  
  trackFilters.forEach(btn => {
    btn.addEventListener('click', function() {
      const track = this.dataset.filterTrack;
      
      // Update active state
      trackFilters.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // Filter sessions
      sessionCards.forEach(card => {
        if (track === 'all' || card.dataset.track === track) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
  
  // Speaker Search
  const speakerSearch = document.getElementById('speaker-search');
  const speakerCards = document.querySelectorAll('.speaker-card');
  
  if (speakerSearch) {
    speakerSearch.addEventListener('input', function() {
      const query = this.value.toLowerCase();
      
      speakerCards.forEach(card => {
        const name = card.querySelector('h4').textContent.toLowerCase();
        const affiliation = card.querySelector('.affiliation')?.textContent.toLowerCase() || '';
        
        if (name.includes(query) || affiliation.includes(query)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }
  
  // Add to Calendar (generates .ics file)
  document.querySelectorAll('.add-to-calendar').forEach(btn => {
    btn.addEventListener('click', function() {
      const event = JSON.parse(this.dataset.event);
      const ics = generateICS(event);
      downloadICS(ics, event.title);
    });
  });
  
  function generateICS(event) {
    const start = new Date(`${event.date}T${event.start_time}`);
    const end = new Date(`${event.date}T${event.end_time}`);
    
    const formatDate = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    
    return `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${formatDate(start)}
DTEND:${formatDate(end)}
SUMMARY:${event.title}
LOCATION:${event.location || ''}
DESCRIPTION:${event.description || ''}
END:VEVENT
END:VCALENDAR`;
  }
  
  function downloadICS(content, title) {
    const blob = new Blob([content], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/\s+/g, '-')}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  }
  
  // Day Tab Navigation
  const dayTabs = document.querySelectorAll('[data-day-tab]');
  const dayPanels = document.querySelectorAll('.schedule-day');
  
  dayTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const targetDay = this.dataset.dayTab;
      
      dayTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      dayPanels.forEach(panel => {
        if (panel.id === `day-${targetDay}`) {
          panel.style.display = '';
        } else {
          panel.style.display = 'none';
        }
      });
    });
  });
  
});
```

---

## Typical Academic Conference Pages (Reference)

Based on analysis of DH2024, DHSI, Lookout Conference, and other academic conferences:

### Essential Pages

1. **Home** - Hero, dates, location, countdown, featured speakers, registration CTA
2. **About** - Mission, theme, scope, history, code of conduct
3. **Schedule/Program** - Full agenda by day, filterable by track/type
4. **Speakers/Presenters** - Directory with bios and session links
5. **Registration/Participate** - How to register, pricing, submission guidelines
6. **Venue/Location** - Maps, travel, hotels, accessibility
7. **Sponsors** - Tiered display, prospectus
8. **Contact** - Organizers, committee, FAQ

### Optional Pages

9. **Workshops** - Pre/post-conference sessions
10. **Keynotes** - Featured speaker highlights
11. **Social Events** - Receptions, tours, networking
12. **Virtual Attendance** - Streaming info, recordings
13. **Proceedings/Archives** - Post-conference resources (CB collection)
14. **Past Conferences** - Historical archives
15. **News/Blog** - Updates and announcements

### Lookout Conference Structure Reference

From https://cdil.lib.uidaho.edu/lookoutconference/:

- Home (hero, sponsors)
- About
- Themes
- Present/Attend (CFP + registration)
- Getting Here (venue + travel)
- Lookout Postcards (creative element)
- Proceedings
- Conference Board
- Archives

---

## Implementation Steps for Claude Code

### Phase 1: Core Setup

1. Clone CollectionBuilder-CSV template
2. Create `_data/events.csv` with sample schedule
3. Create `_data/participants.csv` with sample speakers
4. Update `_config.yml` with conference settings
5. Create basic layouts in `_layouts/`

### Phase 2: Schedule System

1. Build `schedule.md` page with day tabs
2. Create `_includes/conference/schedule-day.html`
3. Create `_includes/conference/session-card.html`
4. Add track filtering JavaScript
5. Add "add to calendar" functionality

### Phase 3: Speakers System

1. Build `speakers.md` page with grid layout
2. Create `_includes/conference/speaker-card.html`
3. Create modal system for full bios
4. Link speakers to sessions bidirectionally
5. Add search/filter functionality

### Phase 4: Content Pages

1. Create `participate.md` with key dates timeline
2. Create `venue.md` with map embed
3. Create `sponsors.md` with tiered display
4. Create `committee.md` generating from participants.csv
5. Create `about.md` with code of conduct

### Phase 5: Integration with CollectionBuilder

1. Configure `metadata.csv` for post-conference resources
2. Create `proceedings.md` linking to browse/search
3. Add `related_event` and `related_participant` fields
4. Style collection pages to match conference theme

### Phase 6: Polish

1. Add countdown timer to home page
2. Create print stylesheet for schedule
3. Add schema.org markup for events
4. Test responsive design
5. Add accessibility features (skip links, ARIA)

---

## Testing Checklist

- [ ] All CSV data renders correctly
- [ ] Schedule filters work across all tracks
- [ ] Speaker modals open and close properly
- [ ] Calendar downloads generate valid .ics files
- [ ] Countdown timer counts correctly
- [ ] Links between speakers and sessions work bidirectionally
- [ ] Print stylesheet hides interactive elements
- [ ] Mobile responsive at all breakpoints
- [ ] Collection integration displays post-conference materials
- [ ] Navigation includes all pages
- [ ] Forms/links point to correct external services
