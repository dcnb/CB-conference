---
layout: docs
title: Conference Platform Documentation
permalink: /docs.html
---

## Overview {#overview}

The Conference Platform is a static website framework built on [CollectionBuilder-CSV](https://collectionbuilder.github.io/cb-docs/) for managing academic conferences from call for papers through post-conference archives. It provides everything needed to run a professional conference website without databases, servers, or complex infrastructure.

### What It Does

- **Pre-Conference**: Call for papers, registration, speaker announcements, countdown timer
- **During Conference**: Live schedule with filters, session details, virtual links, calendar export
- **Post-Conference**: Browse/search archive of presentations, papers, and recordings using CollectionBuilder's collection features

### How It Works

The platform uses three main components:

1. **CSV Data Files** - Store all conference information (schedule, speakers, presentations) in simple spreadsheet files
2. **Jekyll Static Site Generator** - Builds HTML pages from templates and data
3. **CollectionBuilder Features** - Powers the post-conference archive with browse, search, and visualization tools

All data is version-controlled in Git, making collaboration easy and providing a complete history of changes.

---

## Quick Start {#quick-start}

Get your conference site running in 5 steps:

1. **Clone or fork this repository**
2. **Edit `_config.yml`** - Update conference name, dates, location
3. **Add your data** - Fill in `events.csv` and `participants.csv` with your schedule and speakers
4. **Test locally** - Run `bundle exec jekyll serve` to preview
5. **Deploy** - Push to GitHub Pages or your hosting provider

That's it! Your conference website is live.

---

## Data Management {#data}

### CSV Files Overview {#csv-overview}

The platform uses three CSV files stored in the `_data/` directory:

| File | Purpose | Used For |
|------|---------|----------|
| `events.csv` | Conference schedule | Sessions, keynotes, breaks, social events |
| `participants.csv` | People | Speakers, organizers, committee members |
| `conference-metadata.csv` | Proceedings | Post-conference presentations, papers, videos |

**Important**: CSV files must use UTF-8 encoding and commas as delimiters. Values containing commas must be quoted.

### Events CSV {#events-csv}

The `events.csv` file defines your conference schedule.

#### Required Fields

| Field | Description | Example |
|-------|-------------|---------|
| `event_id` | Unique identifier (no spaces) | `keynote-1`, `panel-a1` |
| `title` | Session name | `Opening Keynote: The Future of DH` |
| `type` | Event category | `keynote`, `panel`, `paper`, `workshop`, `break` |
| `date` | ISO format date | `2026-06-15` |
| `start_time` | 24-hour time | `09:00` |
| `end_time` | 24-hour time | `10:30` |

#### Optional Fields

| Field | Description | Example |
|-------|-------------|---------|
| `location` | Room or venue | `Main Auditorium`, `Room 203` |
| `track` | For parallel sessions | `Digital Methods`, `Track A` |
| `description` | Session abstract | Long text, can use Markdown |
| `speakers` | Semicolon-separated IDs | `smith-jane;doe-john` |
| `chair` | Session moderator ID | `wilson-mary` |
| `keywords` | Semicolon-separated | `machine learning;text analysis` |
| `virtual_link` | Zoom/streaming URL | `https://zoom.us/j/...` |
| `recording` | YouTube/video URL | `https://youtu.be/...` |

#### Example Row

```csv
event_id,title,type,date,start_time,end_time,location,track,description,speakers,chair,keywords
keynote-1,Opening Keynote,keynote,2026-06-15,09:00,10:00,Main Hall,,Welcome address,speaker-smith,,,
panel-a1,Digital Methods Panel,panel,2026-06-15,10:30,12:00,Room 201,Digital Methods,Discussion of emerging tools,"speaker-jones;speaker-lee",speaker-garcia,"digital tools;methodology"
```

#### Tips

- **event_id** must be unique and URL-safe (letters, numbers, hyphens only)
- **type** determines color-coding on schedule page
- Separate multiple **speakers** with semicolons (`;`)
- Quote values that contain commas: `"Moscow, Idaho"`
- **description** supports Markdown formatting

### Participants CSV {#participants-csv}

The `participants.csv` file stores information about speakers, organizers, and committee members.

#### Required Fields

| Field | Description | Example |
|-------|-------------|---------|
| `participant_id` | Unique identifier | `smith-jane` |
| `name` | Full display name | `Dr. Jane Smith` |
| `role` | Conference role | `speaker`, `keynote`, `organizer`, `committee` |

#### Optional Fields

| Field | Description | Example |
|-------|-------------|---------|
| `affiliation` | Institution | `University of Idaho` |
| `bio` | Biography (Markdown) | Full bio text |
| `image` | Photo path or URL | `/assets/img/speakers/smith.jpg` |
| `email` | Contact email | `jane@example.edu` |
| `website` | Personal URL | `https://janesmith.com` |
| `orcid` | ORCID identifier | `0000-0002-1234-5678` |
| `twitter` | Twitter/X handle | `@janesmith` |
| `presentation_title` | Talk title | `New Approaches to...` |
| `presentation_abstract` | Talk abstract | Long text |

#### Example Row

```csv
participant_id,name,role,affiliation,bio,image,email,website,twitter,presentation_title
speaker-smith,Dr. Jane Smith,keynote,"University of Idaho","Jane Smith is a professor of...",/assets/img/smith.jpg,jane@uidaho.edu,https://janesmith.com,@janesmith,Opening Keynote
```

#### Roles Explained

- **keynote** - Featured/invited speakers (highlighted on home page)
- **speaker** - Regular presenters
- **organizer** - Conference organizers (shown on committee page)
- **committee** - Program committee members
- **chair** - Session chairs/moderators

### Conference Metadata CSV {#conference-metadata}

The `conference-metadata.csv` file is used for post-conference proceedings and archives. It follows the standard CollectionBuilder metadata format with two additional fields:

#### Conference-Specific Fields

| Field | Description | Example |
|-------|-------------|---------|
| `related_event` | Links to event_id | `keynote-1` |
| `related_participant` | Links to participant_id(s) | `speaker-smith` or `speaker-a;speaker-b` |

See the [CollectionBuilder metadata documentation](https://collectionbuilder.github.io/cb-docs/docs/metadata/) for standard fields like `objectid`, `title`, `creator`, `date`, `description`, `subject`, `type`, `format`, etc.

#### Example Row

```csv
objectid,title,creator,date,description,subject,type,format,related_event,related_participant
conf2026_keynote1,Opening Keynote Recording,Dr. Jane Smith,2026-06-15,Video recording of opening keynote,keynote;digital humanities,Presentation;Video,video/mp4,keynote-1,speaker-smith
```

#### Linking to Sessions and Speakers

When you add `related_event` and `related_participant` values, item pages automatically display:
- A link back to the session on the schedule
- Links to speaker profiles
- Session date, time, and location

---

## Conference Workflow {#workflow}

### Pre-Conference Phase {#pre-conference}

**Timeline**: 6-12 months before conference

1. **Setup Website**
   - Configure `_config.yml` with conference details
   - Customize colors in `_data/theme.yml`
   - Update home page content in `pages/index.md`

2. **Announce Call for Papers**
   - Update `pages/participate.md` with CFP details
   - Set `submission.open: true` in `_config.yml`
   - List submission deadlines in `key_dates`

3. **Build Schedule**
   - Create sessions in `events.csv`
   - Add speakers to `participants.csv`
   - Link speakers to sessions using `speakers` field
   - Test schedule page filters and calendar export

4. **Registration Opens**
   - Set `registration.open: true` in `_config.yml`
   - Update pricing in `registration.prices`
   - Add registration link to participate page

5. **Finalize Details**
   - Add venue information to `pages/venue.md`
   - List sponsors on `pages/sponsors.md`
   - Update committee page (auto-populated from participants.csv)

### During Conference Phase {#during-conference}

**What attendees see:**
- Live schedule with day-by-day navigation
- Session details, locations, times
- Speaker profiles with photos and bios
- Virtual meeting links (if hybrid/online)
- "Add to Calendar" buttons for each session
- Printable schedule

**What you manage:**
- Update `events.csv` for schedule changes
- Add `virtual_link` for online sessions
- Update `recording` links as sessions are recorded
- Push changes to update live site (GitHub Pages rebuilds automatically)

### Post-Conference Phase {#post-conference}

**Transition to proceedings mode:**

1. **Collect Materials**
   - Gather presentation slides, papers, videos
   - Add files to `objects/` directory
   - Create metadata entries in `conference-metadata.csv`

2. **Link to Conference**
   - Use `related_event` to link items to sessions
   - Use `related_participant` to link to speakers
   - Item pages will show conference context automatically

3. **Update Metadata Config**
   - Change `metadata: conference-metadata` in `_config.yml`
   - Restart Jekyll server to load new collection

4. **Enable Browse/Search**
   - Proceedings now searchable via `/browse.html`
   - Filter by type, date, subject
   - Timeline view shows conference days
   - Archives page at `/archives/` provides overview

---

## Customizing Your Conference {#customization}

### Configuration File {#config}

The `_config.yml` file contains conference-wide settings.

#### Conference Section

```yaml
conference:
  title: "Your Conference Name 2026"
  short_title: "CONF2026"
  year: 2026
  dates: "June 15-17, 2026"
  location: "University of Idaho"
  city: "Moscow, Idaho"

  key_dates:
    - label: "Submission Deadline"
      date: "2026-02-15"
    - label: "Notification"
      date: "2026-03-15"
    - label: "Early Registration"
      date: "2026-04-30"
    - label: "Conference Dates"
      date: "2026-06-15"

  registration:
    url: "https://eventbrite.com/..."
    open: true
    prices:
      regular: "$150"
      student: "$75"
      virtual: "$50"

  submission:
    url: "https://easychair.org/..."
    open: false

  social:
    twitter: "@yourconference"
    hashtag: "#CONF2026"

  contact_email: "conference@example.edu"
```

#### What Each Setting Does

- **title** - Displays on home page hero, navigation, Schema.org markup
- **dates** - Shown on home page and schedule
- **key_dates** - Powers countdown timer and timeline component
- **registration.open** - Shows/hides registration CTA buttons
- **submission.open** - Shows/hides CFP call-to-action

### Theme Colors {#colors}

Update `_data/theme.yml` to customize colors:

```yaml
conference-primary-color: "#7C3626"
conference-secondary-color: "#B0907E"
conference-accent-color: "#E8E0D8"
```

These colors are used for:
- Session type badges and borders
- Countdown timer backgrounds
- Buttons and CTAs
- Timeline markers

### Navigation {#navigation-config}

Edit `_data/config-nav.csv` to customize menu structure:

```csv
display_name,stub,dropdown_parent
Home,/,
Schedule,/schedule/,
Speakers,/speakers/,
Participate,/participate/,
About & Info,,
About,/about.html,About & Info
Committee,/committee/,About & Info
```

- Leave `stub` blank to create dropdown parent
- Use `dropdown_parent` to group items under dropdowns

### Home Page {#home-page}

The home page (`pages/index.md`) uses the `conference-home` layout which includes:

- Hero image with title and tagline
- Conference info (when/where)
- Countdown timer
- About content (from markdown)
- Featured keynote speakers (top 3)
- Key dates timeline
- Registration CTAs

Customize by editing `pages/index.md`:

```yaml
---
layout: conference-home
title: Home
permalink: /
hero_image: /assets/img/your-hero.jpg
hero_text: "Your Conference Tagline"
---

## About the Conference

Your conference description here...
```

---

## Page Templates {#pages}

### Schedule Page Features {#schedule-features}

The schedule page (`/schedule/`) provides:

**Day Navigation**
- Bootstrap tabs for multi-day conferences
- Click tabs to switch between days
- All days print on single page

**Filtering**
- Filter by track (e.g., "Digital Methods", "Track A")
- Filter by type (keynote, panel, paper, workshop)
- Filters work together (AND logic)
- Keyboard navigation with arrow keys

**Session Cards**
- Time, title, location, speakers
- Track badges
- Expandable abstracts with keywords
- Virtual meeting links (if provided)
- Recording links (post-conference)
- Speaker photos with links to profiles

**Calendar Export**
- "Add to Calendar" button on each session
- Downloads .ics file for Google Calendar, Outlook, Apple Calendar
- Includes title, time, location, description

**Print Styles**
- Click "Print Schedule" button or use browser print
- Hides navigation, filters, and buttons
- Expands all abstracts automatically
- Compact layout optimized for paper
- Page breaks between days

### Speakers Directory {#speakers-page}

The speakers page (`/speakers/`) displays:

**Speaker Grid**
- Circular profile photos (or placeholder with initials)
- Name, affiliation, contact icons
- Filterable by role (keynote, speaker, organizer, etc.)
- Real-time search by name or affiliation

**Modal Bio Popups**
- Click any speaker to open full biography
- Lists all sessions they're presenting or chairing
- Contact links (website, email, Twitter, ORCID)
- Links to schedule sessions

**Bidirectional Linking**
- Speaker modals → Schedule sessions
- Schedule session cards → Speaker profiles
- Uses URL hash fragments for deep linking

### Other Pages {#other-pages}

- **Participate** (`/participate/`) - CFP, registration, pricing
- **Venue** (`/venue/`) - Maps, travel, hotels, accessibility
- **Committee** (`/committee/`) - Auto-generated from participants.csv
- **Sponsors** (`/sponsors/`) - Tiered sponsor display
- **Archives** (`/archives/`) - Proceedings gateway page

All use standard `page` layout and are fully customizable markdown files.

---

## Advanced Features {#advanced}

### Collection Integration {#collection}

Post-conference, the platform uses CollectionBuilder to create a browsable, searchable archive.

**How It Works:**

1. Set `metadata: conference-metadata` in `_config.yml`
2. Add presentation files to `objects/` directory
3. Create metadata entries linking to sessions/speakers
4. Browse/search pages automatically work

**Key Features:**
- Full-text search across all presentations
- Faceted browsing by subject, type, date
- Timeline view of conference
- Map visualization (if lat/long provided)
- Download raw data as CSV

See [CollectionBuilder documentation](https://collectionbuilder.github.io/cb-docs/docs/objects/) for managing digital objects.

### Calendar Export (.ics) {#calendar-export}

Each session has an "Add to Calendar" button that generates an iCalendar file.

**What's Included:**
- Session title
- Date and time
- Location
- Description/abstract

**Compatible With:**
- Google Calendar
- Microsoft Outlook
- Apple Calendar
- Any standards-compliant calendar app

**Implementation:** Uses JavaScript to generate RFC 5545-compliant .ics files client-side (no server required).

### Schema.org Markup {#schema-org}

The home page includes JSON-LD structured data for search engines.

**Benefits:**
- Better search results in Google
- Rich snippets with event details
- Conference dates appear in search
- Location and organizer information indexed

**Included Data:**
- Main conference event with dates, location
- Sub-events for up to 20 sessions
- Pricing information from registration settings
- Organizer details

Based on [Schema.org Event](https://schema.org/Event) standard.

### Print Stylesheets {#print-styles}

Optimized print layouts for schedule and speaker pages.

**Schedule Print Features:**
- Hides navigation, filters, buttons
- Expands all session abstracts
- Compact typography (9pt base)
- Page breaks between days
- Session cards fit more per page

**How to Use:**
- Click "Print Schedule" button on schedule page
- Or use browser's Print command (Cmd/Ctrl+P)
- Save as PDF or print to paper

---

## Troubleshooting {#troubleshooting}

### CSV Formatting Errors {#csv-errors}

**Problem:** Jekyll build fails with CSV parsing error

**Solutions:**
- Ensure file is saved as UTF-8 encoding
- Check for unclosed quotes around values
- Verify commas inside values are quoted: `"Moscow, Idaho"`
- Look for smart quotes (`"` instead of `"`)
- Use a CSV validator like [CSV Lint](https://csvlint.io/)

**Example of Proper Quoting:**
```csv
title,location,description
"Panel Discussion","Moscow, Idaho","A session about data, methods, and tools"
```

### Missing Data on Pages {#missing-data}

**Problem:** Speakers or sessions don't appear on pages

**Check:**
1. CSV file is in `_data/` directory
2. File name matches exactly (case-sensitive)
3. No extra spaces in field names (header row)
4. participant_id and event_id match exactly when linking
5. Jekyll server was restarted after CSV changes

**Tip:** Use Find/Replace to ensure IDs match perfectly between files.

### Links Between Sessions and Speakers Don't Work {#link-errors}

**Problem:** Clicking speaker on schedule doesn't go to profile

**Solutions:**
- Verify participant_id in `participants.csv` matches exactly
- Check `speakers` field uses semicolons (`;`) not commas
- Ensure no extra spaces: `speaker-one;speaker-two` not `speaker-one; speaker-two`
- Verify speaker profile exists in participants.csv

### Calendar Export Not Working {#calendar-errors}

**Problem:** "Add to Calendar" button doesn't download file

**Check:**
- JavaScript is enabled in browser
- Check browser console for errors
- Verify event has required fields: title, date, start_time, end_time
- Test with different browser

### Print Layout Issues {#print-errors}

**Problem:** Print preview looks wrong

**Solutions:**
- Use Chrome or Firefox for best print support
- Check that CSS is loading (view source)
- Ensure `_sass/_conference.scss` compiled successfully
- Verify `@media print` styles aren't overridden

### Jekyll Build Errors {#build-errors}

**Problem:** `bundle exec jekyll serve` fails

**Common Causes:**
- Ruby version incompatibility - check `Gemfile`
- Missing dependencies - run `bundle install`
- Liquid template syntax errors - check includes
- Invalid YAML in front matter - check page headers

**Debug Steps:**
1. Read error message carefully (line numbers help!)
2. Check recent changes to templates
3. Validate YAML at [YAML Lint](http://www.yamllint.com/)
4. Test with `--trace` flag: `bundle exec jekyll serve --trace`

---

## External Resources {#external-resources}

### CollectionBuilder Documentation

**Primary reference for core features:**

- [CB-CSV Documentation](https://collectionbuilder.github.io/cb-docs/) - Main docs
- [Metadata Guide](https://collectionbuilder.github.io/cb-docs/docs/metadata/) - CSV field specifications
- [Theme Options](https://collectionbuilder.github.io/cb-docs/docs/customization/) - Visual customization
- [GitHub Pages Deployment](https://collectionbuilder.github.io/cb-docs/docs/deploy/gh-pages/) - Publishing guide

### Jekyll Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/) - Static site generator
- [Liquid Template Language](https://shopify.github.io/liquid/) - Template syntax
- [Jekyll Includes](https://jekyllrb.com/docs/includes/) - Reusable components

### Bootstrap 5

- [Bootstrap Documentation](https://getbootstrap.com/docs/5.0/) - CSS framework
- [Bootstrap Components](https://getbootstrap.com/docs/5.0/components/) - UI elements
- [Bootstrap Icons](https://icons.getbootstrap.com/) - Icon library

### CSV Tools

- [CSV Lint](https://csvlint.io/) - Validate CSV formatting
- [CSV to Markdown Table](https://www.tablesgenerator.com/markdown_tables) - Create documentation tables

### Standards & Specifications

- [Schema.org Event](https://schema.org/Event) - Structured data markup
- [iCalendar (RFC 5545)](https://tools.ietf.org/html/rfc5545) - Calendar format specification
- [WCAG Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) - Web accessibility

### GitHub

- [GitHub Pages](https://pages.github.com/) - Free hosting
- [GitHub Actions](https://docs.github.com/en/actions) - Automated deployment
- [Markdown Guide](https://www.markdownguide.org/) - Markdown syntax

---

## CSV Templates {#csv-templates}

Download template files:

- [events.csv template]({{ '/assets/templates/TEMPLATE-events.csv' | relative_url }})
- [participants.csv template]({{ '/assets/templates/TEMPLATE-participants.csv' | relative_url }})
- [conference-metadata.csv template]({{ '/assets/templates/TEMPLATE-conference-metadata.csv' | relative_url }})

Each template includes:
- Proper header row with all available fields
- 2-3 example rows showing correct formatting
- Comments explaining field requirements

---

## Getting Help {#help}

**Questions or issues?**

1. Check this documentation
2. Review [CollectionBuilder docs](https://collectionbuilder.github.io/cb-docs/)
3. Search [CollectionBuilder discussions](https://github.com/CollectionBuilder/collectionbuilder-csv/discussions)
4. Open an issue on GitHub

**Contributing:**

This platform is open source! Contributions, bug reports, and feature requests are welcome on GitHub.
