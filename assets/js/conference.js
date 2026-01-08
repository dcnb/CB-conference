/**
 * Conference Platform JavaScript
 * Handles track filtering, type filtering, and interactive features
 */

document.addEventListener('DOMContentLoaded', function() {

  // ===== TRACK AND TYPE FILTERING =====

  const trackButtons = document.querySelectorAll('[data-filter-track]');
  const typeButtons = document.querySelectorAll('[data-filter-type]');
  const sessionCards = document.querySelectorAll('.session-card');
  const resetButton = document.getElementById('reset-filters');

  let activeTrack = 'all';
  let activeType = 'all';

  // Track filter functionality
  trackButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      activeTrack = this.dataset.filterTrack;

      // Update active state
      trackButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      applyFilters();
    });
  });

  // Type filter functionality
  typeButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      activeType = this.dataset.filterType;

      // Update active state
      typeButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      applyFilters();
    });
  });

  // Apply both filters
  function applyFilters() {
    sessionCards.forEach(card => {
      const cardTrack = card.dataset.track || '';
      const cardType = card.dataset.type || '';

      const trackMatch = activeTrack === 'all' || cardTrack === activeTrack;
      const typeMatch = activeType === 'all' || cardType === activeType;

      if (trackMatch && typeMatch) {
        card.classList.remove('filtered-hidden');
      } else {
        card.classList.add('filtered-hidden');
      }
    });

    updateFilterCount();
  }

  // Reset filters
  if (resetButton) {
    resetButton.addEventListener('click', function() {
      activeTrack = 'all';
      activeType = 'all';

      // Reset all buttons
      trackButtons.forEach(b => {
        b.classList.remove('active');
        if (b.dataset.filterTrack === 'all') {
          b.classList.add('active');
        }
      });

      typeButtons.forEach(b => {
        b.classList.remove('active');
        if (b.dataset.filterType === 'all') {
          b.classList.add('active');
        }
      });

      applyFilters();
    });
  }

  // Update count of visible sessions
  function updateFilterCount() {
    const visibleCount = document.querySelectorAll('.session-card:not(.filtered-hidden)').length;
    const totalCount = sessionCards.length;

    // Optional: Display filter count (can be added to UI later)
    console.log(`Showing ${visibleCount} of ${totalCount} sessions`);
  }

  // ===== SMOOTH SCROLL TO SESSION =====

  // Handle hash links to specific sessions
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement && targetElement.classList.contains('session-card')) {
      setTimeout(() => {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetElement.style.backgroundColor = '#fffacd'; // Highlight briefly
        setTimeout(() => {
          targetElement.style.backgroundColor = '';
        }, 2000);
      }, 500);
    }
  }

  // ===== AUTO-OPEN SPEAKER MODAL FROM HASH =====

  // If URL has a speaker hash (e.g., /speakers/#speaker-smith-jane), open their modal
  if (window.location.hash && window.location.hash.startsWith('#speaker-')) {
    const speakerId = window.location.hash.substring(1); // Remove the '#'
    const modalId = 'modal-' + speakerId.replace('speaker-', '');
    const modalElement = document.getElementById(modalId);

    if (modalElement) {
      setTimeout(() => {
        // Use Bootstrap's modal API to show the modal
        const modal = new bootstrap.Modal(modalElement);
        modal.show();

        // Optional: Scroll to the speaker card too (visible behind modal)
        const speakerCard = document.getElementById(speakerId);
        if (speakerCard) {
          speakerCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 500);
    }
  }

  // ===== PRINT OPTIMIZATION =====

  // Before print: expand all collapsed sections
  window.addEventListener('beforeprint', function() {
    document.querySelectorAll('.collapse:not(.show)').forEach(collapse => {
      collapse.classList.add('show');
      collapse.dataset.wasClosed = 'true';
    });
  });

  // After print: collapse sections that were collapsed
  window.addEventListener('afterprint', function() {
    document.querySelectorAll('.collapse[data-was-closed="true"]').forEach(collapse => {
      collapse.classList.remove('show');
      delete collapse.dataset.wasClosed;
    });
  });

  // ===== CALENDAR EXPORT (iCal) =====
  // Future enhancement: Add individual session "Add to Calendar" buttons

  function generateICS(event) {
    const start = new Date(`${event.date}T${event.start_time}`);
    const end = new Date(`${event.date}T${event.end_time}`);

    const formatDate = (d) => {
      return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Conference Platform//NONSGML v1.0//EN
BEGIN:VEVENT
UID:${event.event_id}@conference
DTSTART:${formatDate(start)}
DTEND:${formatDate(end)}
SUMMARY:${event.title}
LOCATION:${event.location || ''}
DESCRIPTION:${(event.description || '').replace(/\n/g, '\\n')}
URL:${event.virtual_link || ''}
END:VEVENT
END:VCALENDAR`;
  }

  function downloadICS(content, filename) {
    const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Expose calendar functions globally for potential use
  window.conferenceTools = {
    generateICS: generateICS,
    downloadICS: downloadICS
  };

  // ===== SPEAKER SEARCH AND FILTERING =====

  const speakerSearchInput = document.getElementById('speaker-search-input');
  const speakerRoleFilter = document.getElementById('speaker-role-filter');
  const speakerCards = document.querySelectorAll('.speaker-card');
  const resetSpeakerFilters = document.getElementById('reset-speaker-filters');
  const visibleCountSpan = document.getElementById('visible-count');
  const totalCountSpan = document.getElementById('total-count');
  const noSpeakersMessage = document.getElementById('no-speakers-message');

  if (speakerSearchInput && speakerCards.length > 0) {
    // Set initial counts
    if (totalCountSpan) totalCountSpan.textContent = speakerCards.length;
    updateSpeakerCount();

    // Search input handler
    speakerSearchInput.addEventListener('input', function() {
      filterSpeakers();
    });

    // Role filter handler
    if (speakerRoleFilter) {
      speakerRoleFilter.addEventListener('change', function() {
        filterSpeakers();
      });
    }

    // Reset filters
    if (resetSpeakerFilters) {
      resetSpeakerFilters.addEventListener('click', function() {
        speakerSearchInput.value = '';
        if (speakerRoleFilter) speakerRoleFilter.value = 'all';
        filterSpeakers();
      });
    }

    // Filter speakers based on search and role
    function filterSpeakers() {
      const searchQuery = speakerSearchInput.value.toLowerCase();
      const roleFilter = speakerRoleFilter ? speakerRoleFilter.value : 'all';

      let visibleCount = 0;

      speakerCards.forEach(card => {
        const name = card.dataset.name || '';
        const affiliation = card.dataset.affiliation || '';
        const role = card.dataset.role || '';

        // Check search match
        const searchMatch = searchQuery === '' ||
                           name.includes(searchQuery) ||
                           affiliation.includes(searchQuery);

        // Check role match
        const roleMatch = roleFilter === 'all' || role === roleFilter;

        // Show/hide card
        if (searchMatch && roleMatch) {
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      updateSpeakerCount();

      // Show/hide no results message
      if (noSpeakersMessage) {
        if (visibleCount === 0) {
          noSpeakersMessage.classList.remove('d-none');
        } else {
          noSpeakersMessage.classList.add('d-none');
        }
      }
    }

    function updateSpeakerCount() {
      const visible = document.querySelectorAll('.speaker-card:not([style*="display: none"])').length;
      if (visibleCountSpan) visibleCountSpan.textContent = visible;
    }
  }

  // ===== ACCESSIBILITY ENHANCEMENTS =====

  // Add keyboard navigation for filter buttons
  const filterButtons = document.querySelectorAll('.track-filters button');
  filterButtons.forEach((btn, index) => {
    btn.addEventListener('keydown', function(e) {
      let targetIndex;

      switch(e.key) {
        case 'ArrowRight':
          targetIndex = (index + 1) % filterButtons.length;
          filterButtons[targetIndex].focus();
          e.preventDefault();
          break;
        case 'ArrowLeft':
          targetIndex = (index - 1 + filterButtons.length) % filterButtons.length;
          filterButtons[targetIndex].focus();
          e.preventDefault();
          break;
      }
    });
  });

  // ===== CALENDAR EXPORT (.ICS) =====

  // Add to calendar functionality for individual sessions
  window.addToCalendar = function(eventId, title, date, startTime, endTime, location, description) {
    const ics = generateICS(eventId, title, date, startTime, endTime, location, description);
    downloadICS(ics, eventId);
  };

  function generateICS(eventId, title, date, startTime, endTime, location, description) {
    // Parse date and time
    const startDateTime = new Date(`${date}T${startTime}:00`);
    const endDateTime = new Date(`${date}T${endTime}:00`);

    // Format for ICS (YYYYMMDDTHHmmss)
    const formatICSDate = (d) => {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const hours = String(d.getHours()).padStart(2, '0');
      const minutes = String(d.getMinutes()).padStart(2, '0');
      const seconds = String(d.getSeconds()).padStart(2, '0');
      return `${year}${month}${day}T${hours}${minutes}${seconds}`;
    };

    // Clean text for ICS format (escape commas, semicolons, newlines)
    const cleanText = (text) => {
      if (!text) return '';
      return text.replace(/,/g, '\\,')
                 .replace(/;/g, '\\;')
                 .replace(/\n/g, '\\n');
    };

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Conference Platform//CollectionBuilder//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${eventId}@conference
DTSTAMP:${formatICSDate(new Date())}
DTSTART:${formatICSDate(startDateTime)}
DTEND:${formatICSDate(endDateTime)}
SUMMARY:${cleanText(title)}
LOCATION:${cleanText(location)}
DESCRIPTION:${cleanText(description)}
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR`;

    return icsContent;
  }

  function downloadICS(content, filename) {
    const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  console.log('Conference platform JavaScript loaded successfully');
});
