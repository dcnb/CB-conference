---
layout: page
title: Conference Proceedings & Archives
permalink: /archives/
---

## 2026 Conference Materials

The {{ site.conference.year }} conference proceedings include presentations, papers, posters, and session recordings from our three-day event. All materials are freely available for browsing, searching, and download.

### Browse the Collection

<div class="row mb-4">
  <div class="col-md-4 mb-3">
    {% include feature/button.html text="Browse All Materials" link="/browse.html" color="primary" size="lg" centered=true %}
  </div>
  <div class="col-md-4 mb-3">
    {% include feature/button.html text="Search Collection" link="/search/" color="info" size="lg" centered=true %}
  </div>
  <div class="col-md-4 mb-3">
    {% include feature/button.html text="View Timeline" link="/timeline.html" color="success" size="lg" centered=true %}
  </div>
</div>

### Collection Overview

{% assign items = site.data[site.metadata] %}
{% assign presentations = items | where_exp: "item", "item.type contains 'Presentation'" %}
{% assign papers = items | where_exp: "item", "item.type contains 'Paper'" %}
{% assign videos = items | where_exp: "item", "item.type contains 'Video'" %}
{% assign posters = items | where_exp: "item", "item.type contains 'Poster'" %}

<div class="row text-center mb-5">
  <div class="col-md-3 mb-3">
    <div class="card">
      <div class="card-body">
        <h3 class="display-4 text-primary">{{ items.size }}</h3>
        <p class="card-text">Total Items</p>
      </div>
    </div>
  </div>
  <div class="col-md-3 mb-3">
    <div class="card">
      <div class="card-body">
        <h3 class="display-4 text-info">{{ presentations.size }}</h3>
        <p class="card-text">Presentations</p>
      </div>
    </div>
  </div>
  <div class="col-md-3 mb-3">
    <div class="card">
      <div class="card-body">
        <h3 class="display-4 text-success">{{ papers.size }}</h3>
        <p class="card-text">Papers</p>
      </div>
    </div>
  </div>
  <div class="col-md-3 mb-3">
    <div class="card">
      <div class="card-body">
        <h3 class="display-4 text-warning">{{ videos.size }}</h3>
        <p class="card-text">Videos</p>
      </div>
    </div>
  </div>
</div>

### Featured Presentations

{% assign featured = items | where_exp: "item", "item.type contains 'Keynote' or item.subject contains 'keynote'" | limit: 4 %}
{% if featured.size > 0 %}
<div class="row">
  {% for item in featured %}
  <div class="col-md-6 mb-4">
    {% include feature/card.html objectid=item.objectid title=item.title text=item.description header=item.creator width="100" %}
  </div>
  {% endfor %}
</div>
{% endif %}

---

## Explore by Topic

Use the browse page filters to explore materials by:
- **Subject** - Browse by research topics and themes
- **Creator** - Find all materials by a specific presenter
- **Format** - Filter by presentation type, paper, video, etc.
- **Date** - View materials by conference day

{% include feature/button.html text="Start Browsing" link="/browse.html" color="primary" centered=true %}

---

## Past Conferences

### Previous Editions

Information about past conference editions will be added here. Each year's proceedings will remain accessible as a permanent archive.

- **2025** - Coming soon
- **2024** - Coming soon
- **2023** - Coming soon

---

## Download & Citation

All conference materials are made available under the terms specified in each item's rights statement. When citing materials from this collection, please include:

- Author/Presenter name
- Presentation/Paper title
- Conference name and year
- URL or DOI (if available)

For bulk downloads or data access, visit the [Data page](/data.html).
