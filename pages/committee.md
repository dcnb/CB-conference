---
layout: page
title: Organizing Committee
subtitle: Meet the team behind NILC 2026
permalink: /committee/
---

## Conference Organizers

The National Interdisciplinary Lookout Conference is organized by faculty and staff from the University of Idaho and partners from across the region.

### Co-Directors

{% assign organizers = site.data.participants | where: "role", "organizer" | sort: "name" %}
{% if organizers.size > 0 %}
<div class="row">
  {% for person in organizers %}
  <div class="col-md-6 mb-4">
    <div class="committee-member d-flex gap-3">
      {% if person.image %}
      <div class="committee-photo">
        <img src="{{ person.image }}" alt="{{ person.name }}" class="rounded-circle" style="width: 80px; height: 80px; object-fit: cover;">
      </div>
      {% endif %}
      <div class="committee-info">
        <h4 class="h5 mb-1">{{ person.name }}</h4>
        {% if person.affiliation %}
        <p class="text-muted mb-2">{{ person.affiliation }}</p>
        {% endif %}
        {% if person.bio %}
        <p class="small">{{ person.bio | truncatewords: 30 }}</p>
        {% endif %}
        <div class="committee-links">
          {% if person.email %}
          <a href="mailto:{{ person.email }}" class="btn btn-sm btn-outline-secondary">
            <i class="bi bi-envelope"></i> Email
          </a>
          {% endif %}
          {% if person.website %}
          <a href="{{ person.website }}" target="_blank" class="btn btn-sm btn-outline-secondary">
            <i class="bi bi-globe"></i> Website
          </a>
          {% endif %}
        </div>
      </div>
    </div>
  </div>
  {% endfor %}
</div>
{% else %}
<p class="text-muted">Organizer information will be posted soon.</p>
{% endif %}

---

## Program Committee

{% assign committee = site.data.participants | where: "role", "committee" | sort: "name" %}
{% if committee.size > 0 %}
<div class="row">
  {% for person in committee %}
  <div class="col-md-6 mb-3">
    <div class="d-flex gap-3 align-items-start">
      {% if person.image %}
      <img src="{{ person.image }}" alt="{{ person.name }}" class="rounded-circle" style="width: 60px; height: 60px; object-fit: cover;">
      {% endif %}
      <div>
        <h5 class="h6 mb-0">{{ person.name }}</h5>
        {% if person.affiliation %}
        <p class="text-muted small mb-1">{{ person.affiliation }}</p>
        {% endif %}
        {% if person.email %}
        <a href="mailto:{{ person.email }}" class="small"><i class="bi bi-envelope"></i> {{ person.email }}</a>
        {% endif %}
      </div>
    </div>
  </div>
  {% endfor %}
</div>
{% else %}
<p class="text-muted">Program committee members will be announced soon.</p>
{% endif %}

---

## Session Chairs

{% assign chairs = site.data.participants | where: "role", "chair" | sort: "name" %}
{% if chairs.size > 0 %}
<div class="row">
  {% for person in chairs %}
  <div class="col-md-4 mb-2">
    <strong>{{ person.name }}</strong>
    {% if person.affiliation %}
    <br><span class="text-muted small">{{ person.affiliation }}</span>
    {% endif %}
  </div>
  {% endfor %}
</div>
{% else %}
<p class="text-muted">Session chairs will be announced closer to the conference.</p>
{% endif %}

---

## Advisory Board

The conference benefits from guidance from the following advisory board members:

- **Forest Fire Lookout Association** - National preservation organization
- **Idaho State Historical Society** - Cultural heritage expertise
- **USDA Forest Service, Northern Region** - Federal land management perspective
- **University of Idaho Libraries** - Digital scholarship and archives

---

## Get Involved

Interested in volunteering or serving on a future program committee? Contact us at [{{ site.conference.contact_email }}](mailto:{{ site.conference.contact_email }})

---

## Acknowledgments

Special thanks to:
- **Center for Digital Inquiry and Learning (CDIL)** - Technical infrastructure and digital scholarship support
- **University of Idaho College of Art & Architecture** - Venue and logistical support
- **College of Natural Resources** - Co-sponsorship and planning assistance
- All volunteers and student assistants who make this conference possible
