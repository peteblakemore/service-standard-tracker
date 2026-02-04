/* global GOVUKFrontend */

const STORAGE_KEY = 'service-standard-tracker-projects';

const serviceStandards = [
  {
    id: 'ss-1',
    number: 1,
    title: 'Understand users and their needs',
    description:
      'Understand who your users are and what they need from the service. Do research with real users and use what you learn to improve the service.',
    serviceManualUrl:
      'https://www.gov.uk/service-manual/service-standard/point-1-understand-user-needs',
    subsections: [
      {
        id: 'ss-1-a',
        title: 'Research with a representative range of users',
        guidanceText:
          'Plan and carry out research with people who will use the service, including those with access needs or in assisted digital routes.',
        serviceManualDetail:
          'Use user research (and relevant secondary research) to understand what users need from the service.'
      },
      {
        id: 'ss-1-b',
        title: 'Use research findings to shape decisions',
        guidanceText:
          'Capture findings and show how they influence priorities, design choices and delivery plans.',
        serviceManualDetail:
          'Test hypotheses with quick, throwaway prototypes so decisions are grounded in evidence.'
      },
      {
        id: 'ss-1-c',
        title: 'Maintain a clear view of user needs',
        guidanceText:
          'Keep user needs visible and updated, and make sure the whole team understands them.',
        serviceManualDetail:
          'Use analytics and other available data to deepen the team’s understanding of the problem users need solved.'
      }
    ]
  },
  {
    id: 'ss-2',
    number: 2,
    title: 'Solve a whole problem for users',
    description:
      'Work across organisations to solve the whole problem for users, not just the part that is owned by one team or department.',
    serviceManualUrl:
      'https://www.gov.uk/service-manual/service-standard/point-2-solve-a-whole-problem',
    subsections: [
      {
        id: 'ss-2-a',
        title: 'Map the end-to-end journey',
        guidanceText:
          'Identify the full journey and any handoffs, including offline steps and support channels.',
        serviceManualDetail:
          'Be able to explain how your service joins up with other services into a whole end-to-end journey.'
      },
      {
        id: 'ss-2-b',
        title: 'Collaborate across boundaries',
        guidanceText:
          'Engage other teams or organisations needed to improve the end-to-end experience.',
        serviceManualDetail:
          'Work with other teams and policy colleagues to address constraints and agree how the journey will work across organisations.'
      },
      {
        id: 'ss-2-c',
        title: 'Remove unnecessary steps',
        guidanceText:
          'Challenge policy, process or technical constraints that add friction for users.',
        serviceManualDetail:
          'Minimise repeat requests for the same information and reuse existing solutions where possible.'
      }
    ]
  },
  {
    id: 'ss-3',
    number: 3,
    title: 'Provide a joined-up experience across all channels',
    description:
      'Make sure users can complete their task in a clear, consistent way, whether they use online, phone, paper or face-to-face channels.',
    serviceManualUrl:
      'https://www.gov.uk/service-manual/service-standard/point-3-join-up-across-channels',
    subsections: [
      {
        id: 'ss-3-a',
        title: 'Ensure content and data are consistent',
        guidanceText:
          'Align content, eligibility checks and outcomes across channels and touchpoints.',
        serviceManualDetail:
          'Use data and research from online and offline channels to improve each other and keep the experience aligned.'
      },
      {
        id: 'ss-3-b',
        title: 'Design with assisted digital in mind',
        guidanceText:
          'Support users who need help by providing scripts, guidance and clear escalation routes.',
        serviceManualDetail:
          'Make sure offline channels and frontline staff are supported and kept up to date, and do not make non-digital options harder to find.'
      }
    ]
  },
  {
    id: 'ss-4',
    number: 4,
    title: 'Make the service simple to use',
    description:
      'Design a service that is clear, accessible and easy for users to complete without confusion or unnecessary steps.',
    serviceManualUrl:
      'https://www.gov.uk/service-manual/service-standard/point-4-make-the-service-simple-to-use',
    subsections: [
      {
        id: 'ss-4-a',
        title: 'Use clear, plain language',
        guidanceText:
          'Write and test content so users understand what they need to do and why.',
        serviceManualDetail:
          'Follow the GOV.UK style guide and keep language clear across both online and offline parts of the service.'
      },
      {
        id: 'ss-4-b',
        title: 'Remove avoidable complexity',
        guidanceText:
          'Simplify forms and decisions; avoid asking for the same information twice.',
        serviceManualDetail:
          'Help users complete their task simply and test usability frequently with real users.'
      },
      {
        id: 'ss-4-c',
        title: 'Design for accessibility',
        guidanceText:
          'Meet WCAG requirements and test with assistive technologies.',
        serviceManualDetail:
          'Test all parts users interact with, online and offline, and design for the range of devices users actually use.'
      }
    ]
  },
  {
    id: 'ss-5',
    number: 5,
    title: 'Make sure everyone can use the service',
    description:
      'Design and build for inclusion so people with access needs can use the service.',
    serviceManualUrl:
      'https://www.gov.uk/service-manual/service-standard/point-5-make-sure-everyone-can-use-the-service',
    subsections: [
      {
        id: 'ss-5-a',
        title: 'Identify access needs',
        guidanceText:
          'Understand access needs across your user groups and prioritise them in delivery.',
        serviceManualDetail:
          'Avoid excluding any groups by designing for the full range of access needs in your audience.'
      },
      {
        id: 'ss-5-b',
        title: 'Test with users who have access needs',
        guidanceText:
          'Test regularly with users of assistive technology and include findings in the backlog.',
        serviceManualDetail:
          'Research with participants who have access needs and provide assisted digital support where needed.'
      }
    ]
  },
  {
    id: 'ss-6',
    number: 6,
    title: 'Have a multidisciplinary team',
    description:
      'Ensure the team has the skills to design, build and run a quality service.',
    serviceManualUrl:
      'https://www.gov.uk/service-manual/service-standard/point-6-have-a-multidisciplinary-team',
    subsections: [
      {
        id: 'ss-6-a',
        title: 'Cover essential disciplines',
        guidanceText:
          'Make sure you have design, content, research, tech, delivery and policy roles covered.',
        serviceManualDetail:
          'Include roles appropriate to the phase, including expertise in offline delivery and back-end systems.'
      },
      {
        id: 'ss-6-b',
        title: 'Empower the team to deliver',
        guidanceText:
          'Give the team ownership and the ability to make decisions quickly.',
        serviceManualDetail:
          'Ensure access to specialist expertise (including AI expertise if used) and sustainable supplier arrangements.'
      }
    ]
  },
  {
    id: 'ss-7',
    number: 7,
    title: 'Use agile ways of working',
    description:
      'Work in the open, iterate frequently, and manage delivery with agile practices.',
    serviceManualUrl:
      'https://www.gov.uk/service-manual/service-standard/point-7-use-agile-ways-of-working',
    subsections: [
      {
        id: 'ss-7-a',
        title: 'Work in short cycles',
        guidanceText:
          'Plan delivery in short iterations and show progress regularly.',
        serviceManualDetail:
          'Use agile ways of working that inspect, learn and adapt as you go.'
      },
      {
        id: 'ss-7-b',
        title: 'Maintain a prioritised backlog',
        guidanceText:
          'Keep a transparent backlog and make priority decisions based on evidence.',
        serviceManualDetail:
          'Use governance that keeps the right people informed, and test with senior stakeholders when proportionate.'
      }
    ]
  },
  {
    id: 'ss-8',
    number: 8,
    title: 'Iterate and improve frequently',
    description:
      'Release early, measure performance and continually improve the service.',
    serviceManualUrl:
      'https://www.gov.uk/service-manual/service-standard/point-8-iterate-and-improve-frequently',
    subsections: [
      {
        id: 'ss-8-a',
        title: 'Release and learn',
        guidanceText:
          'Ship changes regularly and learn from user feedback and performance data.',
        serviceManualDetail:
          'Iteration is not just for early stages; improve the service throughout its lifetime.'
      },
      {
        id: 'ss-8-b',
        title: 'Use feedback loops',
        guidanceText:
          'Set up regular feedback reviews and action them in delivery.',
        serviceManualDetail:
          'Make sure you have the capacity and flexibility to deliver substantial improvements during live.'
      }
    ]
  },
  {
    id: 'ss-9',
    number: 9,
    title: 'Create a secure service',
    description:
      'Protect users and their data by applying proportionate security and privacy measures.',
    serviceManualUrl:
      'https://www.gov.uk/service-manual/service-standard/point-9-create-a-secure-service',
    subsections: [
      {
        id: 'ss-9-a',
        title: 'Identify and manage risks',
        guidanceText:
          'Complete threat and privacy assessments and keep them current.',
        serviceManualDetail:
          'Maintain security risk assessments, ensure accountable leaders are aware, and plan and budget for security across the service lifecycle.'
      },
      {
        id: 'ss-9-b',
        title: 'Meet required standards',
        guidanceText:
          'Apply relevant security standards and document how you meet them.',
        serviceManualDetail:
          'Follow Secure by Design principles, manage third-party risks, test controls and handle data securely.'
      }
    ]
  },
  {
    id: 'ss-10',
    number: 10,
    title: 'Define what success looks like',
    description:
      'Set outcomes and measures that show whether the service is meeting user needs.',
    serviceManualUrl:
      'https://www.gov.uk/service-manual/service-standard/point-10-define-success-publish-performance-data',
    subsections: [
      {
        id: 'ss-10-a',
        title: 'Agree measurable outcomes',
        guidanceText:
          'Define success measures that can be tracked and understood by stakeholders.',
        serviceManualDetail:
          'Identify metrics that show whether the service is solving the problem it is meant to solve.'
      },
      {
        id: 'ss-10-b',
        title: 'Track and review performance',
        guidanceText:
          'Use analytics and operational data to understand performance over time.',
        serviceManualDetail:
          'Use performance data to decide improvements and publish mandatory KPIs where required.'
      }
    ]
  },
  {
    id: 'ss-11',
    number: 11,
    title: 'Choose the right tools and technology',
    description:
      'Select technology based on user needs and the service context, not preference.',
    serviceManualUrl:
      'https://www.gov.uk/service-manual/service-standard/point-11-choose-the-right-tools-and-technology',
    subsections: [
      {
        id: 'ss-11-a',
        title: 'Use proven, maintainable technology',
        guidanceText:
          'Prefer well-supported tools that your team can maintain over time.',
        serviceManualDetail:
          'Choose tools cost-effectively, show build vs buy decisions, and understand how the tech works (including AI).'
      },
      {
        id: 'ss-11-b',
        title: 'Avoid unnecessary complexity',
        guidanceText:
          'Keep architecture simple and document the tradeoffs you make.',
        serviceManualDetail:
          'Understand total cost of ownership, avoid lock-in with open standards, manage legacy, and consider user experience impacts.'
      }
    ]
  },
  {
    id: 'ss-12',
    number: 12,
    title: 'Make new source code open',
    description:
      'Make code open and reusable, publishing it under appropriate licences.',
    serviceManualUrl:
      'https://www.gov.uk/service-manual/service-standard/point-12-make-new-source-code-open',
    subsections: [
      {
        id: 'ss-12-a',
        title: 'Plan for open working',
        guidanceText:
          'Agree what will be open and how you will publish it.',
        serviceManualDetail:
          'Work in the open from the start and publish code in an open repository without sensitive information.'
      },
      {
        id: 'ss-12-b',
        title: 'Share and reuse',
        guidanceText:
          'Use or contribute to open source components where possible.',
        serviceManualDetail:
          'Keep ownership of new code and publish it under an open licence, explaining exceptions for sensitive areas.'
      }
    ]
  },
  {
    id: 'ss-13',
    number: 13,
    title: 'Use and contribute to open standards',
    description:
      'Follow open standards and contribute improvements where appropriate.',
    serviceManualUrl:
      'https://www.gov.uk/service-manual/service-standard/point-13-use-common-standards-components-patterns',
    subsections: [
      {
        id: 'ss-13-a',
        title: 'Adopt open standards',
        guidanceText:
          'Use open standards for data formats, APIs and interoperability.',
        serviceManualDetail:
          'Use open standards and standard government components, and use APIs to keep technology flexible.'
      },
      {
        id: 'ss-13-b',
        title: 'Share implementation detail',
        guidanceText:
          'Document how standards are implemented so others can learn from it.',
        serviceManualDetail:
          'Share new components or patterns and publish reusable data openly where appropriate.'
      }
    ]
  },
  {
    id: 'ss-14',
    number: 14,
    title: 'Operate a reliable service',
    description:
      'Ensure the service is resilient, monitored and supported so it meets user needs.',
    serviceManualUrl:
      'https://www.gov.uk/service-manual/service-standard/point-14-operate-a-reliable-service',
    subsections: [
      {
        id: 'ss-14-a',
        title: 'Support and monitor',
        guidanceText:
          'Set up monitoring, support processes and clear ownership for incidents.',
        serviceManualDetail:
          'Put monitoring and response plans in place, and monitor outcomes and ethical issues as well as technical faults.'
      },
      {
        id: 'ss-14-b',
        title: 'Plan for continuity',
        guidanceText:
          'Have a plan for resilience, maintenance and handover.',
        serviceManualDetail:
          'Maximise uptime, deploy changes with minimal downtime, test in live-like environments and address organisational constraints.'
      }
    ]
  }
];

const routes = [
  { pattern: /^\/$/, render: renderHome },
  { pattern: /^\/projects\/add\/?$/, render: renderAddProject },
  { pattern: /^\/projects\/import\/?$/, render: renderImportProject },
  { pattern: /^\/projects\/([^/]+)\/?$/, render: renderProject },
  { pattern: /^\/projects\/([^/]+)\/standards\/([^/]+)\/?$/, render: renderStandard },
  { pattern: /^\/projects\/([^/]+)\/standards\/([^/]+)\/subsections\/([^/]+)\/?$/, render: renderCommentForm },
  { pattern: /^\/projects\/([^/]+)\/standards\/([^/]+)\/subsections\/([^/]+)\/comments\/([^/]+)\/edit\/?$/, render: renderCommentEdit }
];

function init() {
  window.addEventListener('popstate', () => renderRoute(window.location.pathname));
  document.addEventListener('click', handleLinkClick);
  renderRoute(window.location.pathname);
  if (window.GOVUKFrontend && window.GOVUKFrontend.initAll) {
    window.GOVUKFrontend.initAll();
  }
}

function handleLinkClick(event) {
  const link = event.target.closest('a');
  if (!link) return;
  const url = new URL(link.href, window.location.origin);
  if (url.origin !== window.location.origin) return;
  if (link.hasAttribute('data-external')) return;
  event.preventDefault();
  navigate(url.pathname + url.search);
}

function navigate(path) {
  window.history.pushState({}, '', path);
  renderRoute(path);
  window.scrollTo(0, 0);
}

function renderRoute(path) {
  const main = document.getElementById('main-content');
  const route = routes.find((entry) => entry.pattern.test(path));
  if (!route) {
    main.innerHTML = renderNotFound();
    return;
  }
  const match = path.match(route.pattern);
  main.innerHTML = route.render(match);
  if (window.GOVUKFrontend && window.GOVUKFrontend.initAll) {
    window.GOVUKFrontend.initAll();
  }
}

function getProjects() {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch (error) {
    return [];
  }
}

function saveProjects(projects) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

function cloneStandards() {
  return serviceStandards.map((standard) => ({
    id: standard.id,
    number: standard.number,
    title: standard.title,
    description: standard.description,
    serviceManualUrl: standard.serviceManualUrl,
    subsections: standard.subsections.map((subsection) => ({
      id: subsection.id,
      title: subsection.title,
      guidanceText: subsection.guidanceText,
      serviceManualDetail: subsection.serviceManualDetail,
      comments: []
    }))
  }));
}

function createProjectFromForm(formData) {
  return {
    id: `project-${Date.now()}`,
    name: formData.get('projectName') || 'Untitled service',
    department: formData.get('department') || '',
    objectives: formData.get('objectives') || '',
    description: formData.get('description') || '',
    currentPhase: formData.get('currentPhase') || 'Discovery',
    nextAssessmentType: formData.get('nextAssessmentType') || '',
    serviceStandards: cloneStandards()
  };
}

function calculateSubsectionStatus(subsection) {
  const statuses = (subsection.comments || []).map((comment) => comment.ragStatus);
  if (statuses.includes('red')) return 'red';
  if (statuses.includes('amber')) return 'amber';
  if (statuses.includes('green')) return 'green';
  return 'pending';
}

function calculateStandardStatus(standard) {
  const statuses = standard.subsections.map((subsection) => calculateSubsectionStatus(subsection));
  if (statuses.includes('red')) return 'red';
  if (statuses.includes('amber')) return 'amber';
  if (statuses.includes('green')) return 'green';
  return 'pending';
}

function calculateProjectStatus(project) {
  const statuses = project.serviceStandards.map((standard) => calculateStandardStatus(standard));
  if (statuses.includes('red')) return 'red';
  if (statuses.includes('amber')) return 'amber';
  if (statuses.includes('green')) return 'green';
  return 'pending';
}

function ragTag(status) {
  const labels = {
    red: 'Red',
    amber: 'Amber',
    green: 'Green',
    pending: 'Pending'
  };
  const classes = {
    red: 'govuk-tag--red',
    amber: 'govuk-tag--orange',
    green: 'govuk-tag--green',
    pending: 'govuk-tag--grey'
  };
  return `<strong class="govuk-tag ${classes[status] || classes.pending}">${labels[status] || labels.pending}</strong>`;
}

function renderHome() {
  const projects = getProjects();
  const emptyState = `
    <p class="govuk-body">You have not added any projects yet.</p>
    <div class="govuk-button-group">
      <a href="/projects/add" class="govuk-button">Add a new project</a>
      <a href="/projects/import" class="govuk-button govuk-button--secondary">Upload a project</a>
    </div>
  `;

  const rows = projects
    .map((project) => {
      const status = calculateProjectStatus(project);
      return `
        <tr class="govuk-table__row">
          <th scope="row" class="govuk-table__header"><a class="govuk-link" href="/projects/${project.id}">${project.name}</a></th>
          <td class="govuk-table__cell">${project.department || ''}</td>
          <td class="govuk-table__cell">${project.currentPhase || ''}</td>
          <td class="govuk-table__cell">${ragTag(status)}</td>
        </tr>
      `;
    })
    .join('');

  const table = `
    <table class="govuk-table">
      <thead class="govuk-table__head">
        <tr class="govuk-table__row">
          <th class="govuk-table__header">Project</th>
          <th class="govuk-table__header">Department</th>
          <th class="govuk-table__header">Current phase</th>
          <th class="govuk-table__header">Overall status</th>
        </tr>
      </thead>
      <tbody class="govuk-table__body">
        ${rows}
      </tbody>
    </table>
  `;

  return `
    <h1 class="govuk-heading-l">Service Standard tracker</h1>
    <p class="govuk-body">Track one or more services against the 14 points of the GDS Service Standard. Add notes, set RAG statuses, and prepare for assessments.</p>
    ${projects.length === 0 ? emptyState : `
      ${table}
      <div class="govuk-button-group govuk-!-margin-top-4">
        <a href="/projects/add" class="govuk-button">Add a new project</a>
        <a href="/projects/import" class="govuk-button govuk-button--secondary">Upload a project</a>
      </div>
    `}
  `;
}

function renderAddProject() {
  return `
    <a href="/" class="govuk-back-link">Back</a>
    <h1 class="govuk-heading-l">Add a new project</h1>
    <form class="govuk-!-margin-top-4" data-action="add-project">
      <div class="govuk-form-group">
        <label class="govuk-label" for="projectName">Project or service name</label>
        <input class="govuk-input" id="projectName" name="projectName" type="text" />
      </div>
      <div class="govuk-form-group">
        <label class="govuk-label" for="department">Department or organisation</label>
        <input class="govuk-input" id="department" name="department" type="text" />
      </div>
      <div class="govuk-form-group">
        <label class="govuk-label" for="objectives">Project or service objectives</label>
        <textarea class="govuk-textarea" id="objectives" name="objectives" rows="4"></textarea>
      </div>
      <div class="govuk-form-group">
        <label class="govuk-label" for="description">Short description of the service</label>
        <textarea class="govuk-textarea" id="description" name="description" rows="4"></textarea>
      </div>
      <div class="govuk-form-group">
        <fieldset class="govuk-fieldset">
          <legend class="govuk-fieldset__legend govuk-fieldset__legend--m">Current phase</legend>
          <div class="govuk-radios">
            ${['Discovery', 'Alpha', 'Beta', 'Live']
              .map(
                (phase, index) => `
                <div class="govuk-radios__item">
                  <input class="govuk-radios__input" id="phase-${phase}" name="currentPhase" type="radio" value="${phase}" ${index === 0 ? 'checked' : ''} />
                  <label class="govuk-label govuk-radios__label" for="phase-${phase}">${phase}</label>
                </div>
              `
              )
              .join('')}
          </div>
        </fieldset>
      </div>
      <div class="govuk-form-group">
        <label class="govuk-label" for="nextAssessmentType">Next assessment type</label>
        <select class="govuk-select" id="nextAssessmentType" name="nextAssessmentType">
          <option value="">Select an assessment</option>
          <option value="Discovery assessment">Discovery assessment</option>
          <option value="Alpha assessment">Alpha assessment</option>
          <option value="Beta assessment">Beta assessment</option>
          <option value="Live assessment">Live assessment</option>
          <option value="Service assessment">Service assessment</option>
          <option value="Peer review">Peer review</option>
        </select>
      </div>
      <button class="govuk-button" type="submit">Add project</button>
    </form>
  `;
}

function renderImportProject() {
  return `
    <a href="/" class="govuk-back-link">Back</a>
    <h1 class="govuk-heading-l">Upload a project</h1>
    <p class="govuk-body">Upload a JSON export from this tracker to restore a project.</p>
    <form class="govuk-!-margin-top-4" data-action="import-project">
      <div class="govuk-form-group">
        <label class="govuk-label" for="projectFile">Project JSON file</label>
        <input class="govuk-file-upload" id="projectFile" name="projectFile" type="file" accept=".json" />
      </div>
      <button class="govuk-button" type="submit">Upload project</button>
    </form>
  `;
}

function renderProject(match) {
  const projectId = match[1];
  const projects = getProjects();
  const project = projects.find((item) => item.id === projectId);
  if (!project) return renderNotFound();

  const standardsList = project.serviceStandards
    .map((standard) => {
      const status = calculateStandardStatus(standard);
      return `
        <li class="govuk-task-list__item govuk-task-list__item--with-link">
          <div class="govuk-task-list__name-and-hint">
            <a class="govuk-link govuk-task-list__link" href="/projects/${project.id}/standards/${standard.id}">
              ${standard.number}. ${standard.title}
            </a>
          </div>
          <div class="govuk-task-list__status">${ragTag(status)}</div>
        </li>
      `;
    })
    .join('');

  return `
    <a href="/" class="govuk-back-link">Back</a>
    <h1 class="govuk-heading-l">${project.name}</h1>
    <div class="govuk-!-margin-bottom-4">
      <a href="#" class="govuk-button" data-action="export-project" data-project-id="${project.id}">Export project</a>
    </div>
    <dl class="govuk-summary-list">
      ${summaryRow('Department', project.department)}
      ${summaryRow('Current phase', project.currentPhase)}
      ${summaryRow('Next assessment', project.nextAssessmentType)}
      ${summaryRow('Service description', project.description)}
    </dl>
    ${project.objectives ? `<h2 class="govuk-heading-m">Objectives</h2><p class="govuk-body">${escapeHtml(project.objectives)}</p>` : ''}
    <h2 class="govuk-heading-m">Service Standard points</h2>
    <ol class="govuk-task-list">${standardsList}</ol>
  `;
}

function renderStandard(match) {
  const projectId = match[1];
  const standardId = match[2];
  const project = getProjects().find((item) => item.id === projectId);
  if (!project) return renderNotFound();
  const standard = project.serviceStandards.find((item) => item.id === standardId);
  if (!standard) return renderNotFound();

  const subsections = standard.subsections
    .map((subsection) => {
      const rag = calculateSubsectionStatus(subsection);
      const commentsMarkup = subsection.comments && subsection.comments.length
        ? `
          <h4 class="govuk-heading-s govuk-!-margin-bottom-2">Comments</h4>
          ${subsection.comments
            .map(
              (comment) => `
            <div class="ss-notes">
              <p class="govuk-body">${escapeHtml(comment.text)}</p>
              <p class="govuk-body govuk-!-margin-top-2"><strong class="govuk-!-margin-right-2">RAG:</strong>${ragTag(comment.ragStatus)}</p>
              <p class="govuk-body govuk-!-margin-top-2"><a class="govuk-link" href="/projects/${project.id}/standards/${standard.id}/subsections/${subsection.id}/comments/${comment.id}/edit">Change</a></p>
            </div>
          `
            )
            .join('')}
          <p class="govuk-body"><a class="govuk-link" href="/projects/${project.id}/standards/${standard.id}/subsections/${subsection.id}">Add another comment</a></p>
        `
        : `
          <p class="govuk-body"><a class="govuk-link" href="/projects/${project.id}/standards/${standard.id}/subsections/${subsection.id}">Add comment</a></p>
        `;

      return `
        <div class="ss-subsection">
          <div class="ss-subsection__header">
            <h3 class="govuk-heading-s">${subsection.title}</h3>
            <div class="ss-subsection__rag">${ragTag(rag)}</div>
          </div>
          <p class="govuk-body">${subsection.guidanceText}</p>
          ${subsection.serviceManualDetail
            ? `
              <details class="govuk-details" data-module="govuk-details">
                <summary class="govuk-details__summary">
                  <span class="govuk-details__summary-text">Show more from the Service Manual</span>
                </summary>
                <div class="govuk-details__text">
                  <p class="govuk-body">${subsection.serviceManualDetail}</p>
                  <p class="govuk-body"><a class="govuk-link" href="${standard.serviceManualUrl}" target="_blank" rel="noreferrer noopener">Read the full guidance in the Service Manual</a></p>
                </div>
              </details>
            `
            : ''}
          ${commentsMarkup}
        </div>
      `;
    })
    .join('');

  return `
    <a href="/projects/${project.id}" class="govuk-back-link">Back</a>
    <h1 class="govuk-heading-l">Service Standard ${standard.number}: ${standard.title}</h1>
    <p class="govuk-body">${standard.description}</p>
    <h2 class="govuk-heading-m">Overall RAG status</h2>
    <div class="govuk-!-margin-bottom-4">${ragTag(calculateStandardStatus(standard))}</div>
    <h2 class="govuk-heading-m">Subsections</h2>
    ${subsections}
  `;
}

function renderCommentForm(match) {
  const [projectId, standardId, subsectionId] = match.slice(1);
  const project = getProjects().find((item) => item.id === projectId);
  if (!project) return renderNotFound();
  const standard = project.serviceStandards.find((item) => item.id === standardId);
  if (!standard) return renderNotFound();
  const subsection = standard.subsections.find((item) => item.id === subsectionId);
  if (!subsection) return renderNotFound();

  return commentFormMarkup(project, standard, subsection, null);
}

function renderCommentEdit(match) {
  const [projectId, standardId, subsectionId, commentId] = match.slice(1);
  const project = getProjects().find((item) => item.id === projectId);
  if (!project) return renderNotFound();
  const standard = project.serviceStandards.find((item) => item.id === standardId);
  if (!standard) return renderNotFound();
  const subsection = standard.subsections.find((item) => item.id === subsectionId);
  if (!subsection) return renderNotFound();
  const comment = (subsection.comments || []).find((item) => item.id === commentId);
  if (!comment) return renderNotFound();

  return commentFormMarkup(project, standard, subsection, comment);
}

function commentFormMarkup(project, standard, subsection, comment) {
  const backLink = `/projects/${project.id}/standards/${standard.id}`;
  return `
    <a href="${backLink}" class="govuk-back-link">Back</a>
    <h1 class="govuk-heading-l">${subsection.title}</h1>
    <p class="govuk-body">${subsection.guidanceText}</p>
    <form class="govuk-!-margin-top-4" data-action="save-comment" data-project-id="${project.id}" data-standard-id="${standard.id}" data-subsection-id="${subsection.id}" ${comment ? `data-comment-id="${comment.id}"` : ''}>
      <div class="govuk-form-group">
        <label class="govuk-label" for="notes">Comment</label>
        <textarea class="govuk-textarea" id="notes" name="notes" rows="6">${comment ? escapeHtml(comment.text) : ''}</textarea>
      </div>
      <div class="govuk-form-group">
        <fieldset class="govuk-fieldset">
          <legend class="govuk-fieldset__legend govuk-fieldset__legend--m">RAG status</legend>
          <div class="govuk-radios">
            ${['red', 'amber', 'green', 'pending']
              .map((status, index) => {
                const label = status.charAt(0).toUpperCase() + status.slice(1);
                const checked = comment ? comment.ragStatus === status : index === 3;
                return `
                  <div class="govuk-radios__item">
                    <input class="govuk-radios__input" id="rag-${status}" name="ragStatus" type="radio" value="${status}" ${checked ? 'checked' : ''} />
                    <label class="govuk-label govuk-radios__label" for="rag-${status}">${label}</label>
                  </div>
                `;
              })
              .join('')}
          </div>
        </fieldset>
      </div>
      <button class="govuk-button" type="submit">${comment ? 'Save changes' : 'Add comment'}</button>
    </form>
  `;
}

function renderNotFound() {
  return `
    <h1 class="govuk-heading-l">Page not found</h1>
    <p class="govuk-body">If you typed the web address, check it is correct.</p>
    <p class="govuk-body">If you pasted the web address, check you copied the entire address.</p>
  `;
}

function summaryRow(key, value) {
  return `
    <div class="govuk-summary-list__row">
      <dt class="govuk-summary-list__key">${key}</dt>
      <dd class="govuk-summary-list__value">${escapeHtml(value || '')}</dd>
    </div>
  `;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function handleFormSubmit(event) {
  const form = event.target.closest('form');
  if (!form) return;
  event.preventDefault();

  const action = form.getAttribute('data-action');
  const formData = new FormData(form);

  if (action === 'add-project') {
    const projects = getProjects();
    const project = createProjectFromForm(formData);
    projects.push(project);
    saveProjects(projects);
    navigate(`/projects/${project.id}`);
  }

  if (action === 'import-project') {
    const file = form.querySelector('#projectFile').files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const payload = JSON.parse(reader.result);
        const projects = getProjects();
        const imported = hydrateImportedProject(payload);
        projects.push(imported);
        saveProjects(projects);
        navigate(`/projects/${imported.id}`);
      } catch (error) {
        alert('The file could not be read. Upload a valid JSON export.');
      }
    };
    reader.readAsText(file);
  }

  if (action === 'save-comment') {
    const projectId = form.getAttribute('data-project-id');
    const standardId = form.getAttribute('data-standard-id');
    const subsectionId = form.getAttribute('data-subsection-id');
    const commentId = form.getAttribute('data-comment-id');
    const commentText = formData.get('notes').trim();
    const ragStatus = formData.get('ragStatus');

    const projects = getProjects();
    const project = projects.find((item) => item.id === projectId);
    const standard = project.serviceStandards.find((item) => item.id === standardId);
    const subsection = standard.subsections.find((item) => item.id === subsectionId);
    subsection.comments = subsection.comments || [];

    if (commentId) {
      const comment = subsection.comments.find((item) => item.id === commentId);
      if (comment && commentText) {
        comment.text = commentText;
        comment.ragStatus = ragStatus;
      }
    } else if (commentText) {
      subsection.comments.push({
        id: `comment-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        text: commentText,
        ragStatus
      });
    }

    saveProjects(projects);
    navigate(`/projects/${projectId}/standards/${standardId}`);
  }
}

function handleExport(event) {
  const button = event.target.closest('[data-action="export-project"]');
  if (!button) return;
  event.preventDefault();
  const projectId = button.getAttribute('data-project-id');
  const project = getProjects().find((item) => item.id === projectId);
  if (!project) return;
  const blob = new Blob([JSON.stringify(project, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${project.name || 'project'}-${project.id}.json`.toLowerCase().replace(/\s+/g, '-');
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function hydrateImportedProject(payload) {
  const project = {
    id: `project-${Date.now()}`,
    name: payload.name || 'Imported service',
    department: payload.department || '',
    objectives: payload.objectives || '',
    description: payload.description || '',
    currentPhase: payload.currentPhase || 'Discovery',
    nextAssessmentType: payload.nextAssessmentType || '',
    serviceStandards: payload.serviceStandards || []
  };

  project.serviceStandards = serviceStandards.map((templateStandard) => {
    const existingStandard = project.serviceStandards.find((item) => item.id === templateStandard.id) || {};
    const subsections = templateStandard.subsections.map((templateSubsection) => {
      const existingSubsection = (existingStandard.subsections || []).find(
        (item) => item.id === templateSubsection.id
      );
      return {
        id: templateSubsection.id,
        title: templateSubsection.title,
        guidanceText: templateSubsection.guidanceText,
        serviceManualDetail: templateSubsection.serviceManualDetail,
        comments: existingSubsection && existingSubsection.comments ? existingSubsection.comments : []
      };
    });
    return {
      id: templateStandard.id,
      number: templateStandard.number,
      title: templateStandard.title,
      description: templateStandard.description,
      serviceManualUrl: templateStandard.serviceManualUrl,
      subsections
    };
  });

  return project;
}

function bindEvents() {
  document.addEventListener('submit', handleFormSubmit);
  document.addEventListener('click', handleExport);
}

bindEvents();
init();
