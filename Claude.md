# Claude Code Prompt: Academic Conference Platform

## Critical: Build ON CollectionBuilder, Not Around It

**Do not reinvent the wheel.** CollectionBuilder-CSV already provides extensive infrastructure you must leverage:

1. **Use existing `_includes/feature/` components** — CB has ready-made includes for cards, modals, images, alerts, buttons, navs, and more. Examine `_includes/feature/` before creating any new include. Extend or wrap existing includes rather than duplicating functionality.

2. **Use Bootstrap 5 classes** — CB is built on Bootstrap. Use Bootstrap's grid, cards, accordions, tabs, modals, buttons, and utilities. Do not write custom CSS for things Bootstrap already handles.

3. **Follow CB patterns** — Study how existing CB pages and includes work. Match their Liquid patterns, variable naming, and file organization. New conference features should feel native to CB.

4. **Extend `_data/theme.yml`** — CB uses theme.yml for configuration. Add conference settings there rather than creating parallel config systems.

5. **Reuse CB layouts** — The existing `page`, `about`, and other layouts may work for many conference pages. Only create new layouts when truly necessary.

**Before writing any code, run `ls _includes/feature/` and examine what's available.**

---

## Project Context

Build an academic conference platform as a "Built On" extension to CollectionBuilder-CSV (https://github.com/CollectionBuilder/collectionbuilder-csv). The platform manages all aspects of an academic conference—from call for papers through post-conference archives.

## Base Technology

- **Framework:** Jekyll static site generator
- **Template:** CollectionBuilder-CSV (use its existing architecture)
- **CSS:** Bootstrap 5 (already included in CB) + minimal custom SCSS
- **JavaScript:** Vanilla JS, minimal additions to CB's existing scripts
- **Data Format:** CSV files in `_data/` folder (CB's standard approach)

## Existing CB Features to Leverage

```
_includes/feature/
├── alert.html          # Use for announcements, deadlines
├── button.html         # Use for CTAs, registration links
├── card.html           # Adapt for speaker cards, session cards
├── image.html          # Use for speaker photos, venue images
├── modal.html          # Use for speaker bios, session details
├── nav-menu.html       # Extend for conference navigation
├── pdf.html            # Use for program PDFs
├── video.html          # Use for recorded sessions
├── timelinejs.html     # Consider for key dates display
└── ...                 # Examine all before building new
```

**Bootstrap components to use (not rebuild):**
- Tabs/Pills → Day navigation on schedule
- Accordion → Expandable session details
- Cards → Speaker grid, session listings
- Modal → Speaker bios, full abstracts
- List group → Committee listings
- Grid system → All layouts
- Utilities → Spacing, colors, display

---

## Core Data Files to Create

### 1. `_data/events.csv`
Conference schedule with columns: `event_id`, `title`, `type`, `date`, `start_time`, `end_time`, `location`, `track`, `description`, `speakers` (semicolon-separated participant_ids), `chair`, `keywords`, `virtual_link`, `recording`

### 2. `_data/participants.csv`
Speakers/organizers with columns: `participant_id`, `name`, `role`, `affiliation`, `bio`, `image`, `email`, `website`, `orcid`, `twitter`, `presentation_title`, `presentation_abstract`

### 3. `_data/metadata.csv`
Standard CollectionBuilder metadata for post-conference resources (presentations, papers, videos). Add `related_event` and `related_participant` fields to link to conference data.

## Required Pages

Create as Markdown files in `pages/` using existing CB layouts where possible:

1. **Home** (`index.md`) - Hero with dates/location, countdown, featured speakers, sponsors, registration CTA
2. **About** (`about.md`) - Use CB's about layout if suitable
3. **Schedule** (`schedule.md`) - Day tabs (Bootstrap), session cards, track filtering
4. **Speakers** (`speakers.md`) - Grid with photos, modal bios (use CB modal include)
5. **Participate** (`participate.md`) - CFP, key dates, registration info
6. **Venue** (`venue.md`) - Map, travel, hotels, accessibility
7. **Sponsors** (`sponsors.md`) - Tiered logo display
8. **Committee** (`committee.md`) - Generated from participants.csv
9. **Proceedings** (`proceedings.md`) - Links to CollectionBuilder browse/items pages
10. **Archives** (`archives.md`) - Past conference editions

## New Includes (Only What CB Lacks)

Create in `_includes/conference/` only components CB doesn't already provide:

- `session-card.html` - Schedule item (consider extending CB's card.html)
- `speaker-card.html` - Speaker grid item (consider extending CB's card.html)
- `schedule-day.html` - Day grouping wrapper using Bootstrap tabs
- `countdown.html` - JavaScript countdown timer (CB doesn't have this)

## Configuration in `_data/theme.yml`

Add conference settings to existing theme.yml:

```yaml
# Conference Settings (add to theme.yml)
conference:
  title: "Conference Name 2026"
  short_title: "CONF2026"
  dates: "June 15-17, 2026"
  location: "University of Idaho"
  city: "Moscow, Idaho"
  registration_url: "https://..."
  submission_url: "https://..."
  contact_email: "conference@example.edu"
  
  key_dates:
    - label: "Submission Deadline"
      date: "2026-02-15"
    - label: "Notification"
      date: "2026-03-15"
    - label: "Early Registration"
      date: "2026-04-30"
```

## JavaScript: Minimal Additions

Add to `assets/js/` only what's truly needed:
- Schedule track filtering (small function)
- Countdown timer (if not using existing solution)
- Add-to-calendar .ics generation

**Do not** rebuild: modals, tabs, accordions, navigation (Bootstrap handles these).

## CSS: Extend, Don't Replace

Add minimal custom styles to `_sass/_custom.scss`:
- Session type color coding
- Speaker card refinements
- Print stylesheet for schedule

**Use Bootstrap utility classes** for spacing, colors, display, flexbox, grid.

## Implementation Order

1. **Explore first:** Run `ls -la _includes/feature/` and examine existing includes
2. Review `_layouts/` to understand available layouts
3. Create CSV files with sample data
4. Build schedule page using Bootstrap tabs + new session-card include
5. Build speakers page using CB card/modal patterns
6. Create remaining content pages using existing layouts
7. Add minimal JavaScript for filtering/countdown
8. Connect proceedings to CB collection features
9. Test and refine

## Key Liquid Patterns (Match CB Style)

```liquid
{% raw %}
{%- comment -%} Follow CB's include parameter style {%- endcomment -%}
{% include feature/button.html text="Register Now" link=site.data.theme.conference.registration_url color="primary" %}

{%- comment -%} Use CB's data access patterns {%- endcomment -%}
{% assign speakers = site.data.participants | where: "role", "speaker" %}

{%- comment -%} Match CB's spacing and naming conventions {%- endcomment -%}
{%- assign defined_speakers = event.speakers | split: ";" -%}
{% endraw %}
```

## Reference

- CB Docs: https://collectionbuilder.github.io/cb-docs/
- CB Feature Includes: https://collectionbuilder.github.io/cb-docs/docs/pages/features/
- Lookout Conference (CB example): https://cdil.lib.uidaho.edu/lookoutconference/
