---
layout: page
title: Participate
subtitle: Join us at NILC 2026
permalink: /participate/
---

## Call for Papers & Presentations

The National Interdisciplinary Lookout Conference welcomes submissions from scholars, practitioners, and community members across disciplines. We invite proposals for papers, panels, workshops, and posters that explore the history, preservation, and future of fire lookout structures.

### Submission Types

**Individual Papers** (20 minutes + 10 min Q&A)
- Original research presentations
- Case studies and project reports
- Theoretical and methodological contributions

**Panel Discussions** (90 minutes)
- 3-4 speakers exploring a common theme
- Include a designated chair/moderator
- Allow time for audience discussion

**Workshops** (Half-day or full-day)
- Hands-on skill-building sessions
- Technology demonstrations
- Collaborative working sessions

**Poster Presentations**
- Visual displays with informal discussion
- Ideal for projects in progress
- Networking opportunities

### Important Dates

{% include conference/key-dates-timeline.html %}

### Submission Guidelines

Proposals should include:
- Title and abstract (250-500 words)
- Author name(s), affiliation(s), and contact information
- Session type (paper, panel, workshop, poster)
- Preferred track (if applicable)
- A/V requirements and accessibility needs

**Tracks:**
- Digital Methods: Photogrammetry, GIS, 3D modeling, digital documentation
- Community: Oral histories, community engagement, public memory
- Architecture: Built heritage, preservation, design history
- Humanities: Literature, art, cultural representation

{% if site.conference.submission.open %}
### Submit Your Proposal

<div class="alert alert-success">
  <i class="bi bi-check-circle-fill"></i> <strong>Submissions are now open!</strong>
</div>

<a href="{{ site.conference.submission.url }}" class="btn btn-primary btn-lg">
  <i class="bi bi-file-earmark-text"></i> Submit a Proposal
</a>

**Deadline:** {{ site.conference.key_dates[1].date | date: "%B %-d, %Y" }}
{% else %}
<div class="alert alert-info">
  <i class="bi bi-info-circle-fill"></i> The call for papers will open on {{ site.conference.key_dates[0].date | date: "%B %-d, %Y" }}.
</div>
{% endif %}

---

## Registration

{% if site.conference.registration.open %}
### Register Now

<div class="alert alert-success">
  <i class="bi bi-check-circle-fill"></i> <strong>Registration is open!</strong>
</div>

#### Registration Rates

<div class="row">
  <div class="col-md-4">
    <div class="card mb-3">
      <div class="card-body text-center">
        <h5 class="card-title">Regular</h5>
        <p class="display-6">{{ site.conference.registration.prices.regular }}</p>
        <p class="text-muted">Full conference access</p>
      </div>
    </div>
  </div>
  <div class="col-md-4">
    <div class="card mb-3">
      <div class="card-body text-center">
        <h5 class="card-title">Student</h5>
        <p class="display-6">{{ site.conference.registration.prices.student }}</p>
        <p class="text-muted">Valid student ID required</p>
      </div>
    </div>
  </div>
  <div class="col-md-4">
    <div class="card mb-3">
      <div class="card-body text-center">
        <h5 class="card-title">Virtual</h5>
        <p class="display-6">{{ site.conference.registration.prices.virtual }}</p>
        <p class="text-muted">Online access only</p>
      </div>
    </div>
  </div>
</div>

**Early Bird Discount:** Register by {{ site.conference.registration.early_bird_deadline | date: "%B %-d, %Y" }} for 20% off!

<a href="{{ site.conference.registration.url }}" class="btn btn-success btn-lg">
  <i class="bi bi-ticket-perforated"></i> Register Now
</a>

### Registration Includes

- Access to all sessions, panels, and keynotes
- Conference materials and program
- Coffee breaks and reception
- Certificate of attendance
- Virtual participants receive streaming access to all sessions

{% else %}
<div class="alert alert-warning">
  <i class="bi bi-clock-fill"></i> Registration will open soon. Check back for updates!
</div>
{% endif %}

---

## Travel Grants

Limited travel grants are available for students and early-career scholars. Grant recipients receive:
- Conference registration waiver
- Up to $500 for travel expenses
- Student networking reception invitation

**Application deadline:** {{ site.conference.key_dates[1].date | date: "%B %-d, %Y" }}

---

## Questions?

Contact the conference organizers at [{{ site.conference.contact_email }}](mailto:{{ site.conference.contact_email }})

Follow us on Twitter/X: [{{ site.conference.social.twitter }}](https://twitter.com/{{ site.conference.social.twitter | remove: '@' }}) | Use hashtag {{ site.conference.social.hashtag }}
