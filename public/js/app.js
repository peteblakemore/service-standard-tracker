/* global GOVUKFrontend */

const STORAGE_KEY = 'service-standard-tracker-projects';
const clearFlowState = { downloadedCount: 0, saved: false };
let lastRoutedPath = '/';

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

const artefactsByStandard = {
  1: [
    { id: 'user-research-plan', title: 'User research plan and approach', detail: 'Plan outlining target users, research questions and methods.', phases: ['Discovery', 'Alpha'] },
    { id: 'user-profiles', title: 'User profiles and needs', detail: 'Personas, empathy maps or prioritised user needs derived from research.', phases: ['Discovery', 'Alpha'] },
    { id: 'journey-maps', title: 'User journey maps / service blueprints', detail: 'End-to-end journeys showing context, pain points and non-digital steps.', phases: ['Alpha'] },
    { id: 'research-findings', title: 'Research findings and usability reports', detail: 'Summaries of interviews, usability testing and resulting insights.', phases: ['Alpha', 'Beta'] },
    { id: 'prototype-testing', title: 'Prototypes tested with users', detail: 'Evidence of early prototypes and iteration based on feedback.', phases: ['Alpha'] },
    { id: 'behaviour-data', title: 'Data analysis of user behaviour', detail: 'Analytics or existing data used to validate pain points.', phases: ['Discovery', 'Alpha'] },
    { id: 'ongoing-learning', title: 'Plans for ongoing learning', detail: 'Schedule for continuous research and feedback loops.', phases: ['Beta', 'Live'] }
  ],
  2: [
    { id: 'service-blueprint', title: 'End-to-end service map / blueprint', detail: 'Full journey across channels and touchpoints with handoffs.', phases: ['Discovery', 'Alpha'] },
    { id: 'stakeholder-map', title: 'Stakeholder and systems map', detail: 'Dependencies with other services, teams and systems.', phases: ['Alpha'] },
    { id: 'policy-process', title: 'Policy and offline process understanding', detail: 'How policy and non-digital steps affect the journey.', phases: ['Alpha'] },
    { id: 'assisted-digital', title: 'Assisted digital support plan', detail: 'Support for users who cannot complete online.', phases: ['Beta'] },
    { id: 'collaboration', title: 'Collaboration evidence', detail: 'Workshops or sessions with related teams and services.', phases: ['Alpha', 'Beta'] },
    { id: 'journey-demo', title: 'Prototype or demo of entire journey', detail: 'Narrative walkthrough covering full user journey.', phases: ['Alpha', 'Beta'] },
    { id: 'beta-outcomes', title: 'Private beta outcomes', detail: 'Evidence users complete the full journey end to end.', phases: ['Beta'] },
    { id: 'gap-roadmap', title: 'Plans to address gaps', detail: 'Roadmap for remaining gaps in solving the problem.', phases: ['Alpha', 'Beta'] }
  ],
  3: [
    { id: 'cross-channel-map', title: 'Cross-channel journey mapping', detail: 'Maps showing entry points, channel switches and handoffs.', phases: ['Discovery', 'Alpha'] },
    { id: 'consistency-guidance', title: 'Consistency guidelines', detail: 'Evidence of consistent language and branding across channels.', phases: ['Alpha', 'Beta'] },
    { id: 'common-platforms', title: 'Use of common platforms', detail: 'Shared components that enable joined-up experiences.', phases: ['Alpha', 'Beta', 'Live'] },
    { id: 'transition-testing', title: 'Channel transition testing', detail: 'Research on moving between offline and online steps.', phases: ['Beta'] },
    { id: 'entry-exit', title: 'Entry and exit point discovery', detail: 'Evidence of how users find and complete the service.', phases: ['Discovery', 'Alpha'] },
    { id: 'outreach-plan', title: 'Service discovery and outreach', detail: 'Plans for communications and support across channels.', phases: ['Live'] }
  ],
  4: [
    { id: 'usability-reports', title: 'Usability test reports', detail: 'Iterative testing showing task success improvements.', phases: ['Alpha', 'Beta'] },
    { id: 'prototypes', title: 'Interactive prototypes', detail: 'Prototype iterations demonstrating simplification.', phases: ['Alpha'] },
    { id: 'plain-english', title: 'Plain English content samples', detail: 'Before/after content improvements with evidence.', phases: ['Discovery', 'Alpha'] },
    { id: 'design-system', title: 'Use of design system patterns', detail: 'Evidence of GOV.UK patterns and components used.', phases: ['Alpha', 'Beta'] },
    { id: 'cross-device', title: 'Cross-device compatibility testing', detail: 'Evidence the service works across devices and browsers.', phases: ['Alpha', 'Beta'] },
    { id: 'error-support', title: 'Error handling and support', detail: 'Improved error messaging and help content.', phases: ['Beta'] },
    { id: 'simplicity-improvement', title: 'Continuous improvement evidence', detail: 'Data and actions showing ongoing simplification.', phases: ['Beta', 'Live'] }
  ],
  5: [
    { id: 'inclusive-research', title: 'Inclusive research outputs', detail: 'Research with users with access needs and recruitment plans.', phases: ['Discovery', 'Alpha'] },
    { id: 'inclusive-design', title: 'Accessibility considerations in design', detail: 'Inclusive design decisions and content improvements.', phases: ['Alpha'] },
    { id: 'assistive-tech', title: 'Assistive tech testing results', detail: 'In-house testing with screen readers or magnifiers.', phases: ['Alpha', 'Beta'] },
    { id: 'accessibility-audit', title: 'Accessibility audit report', detail: 'External audit findings and fixes for WCAG AA.', phases: ['Beta'] },
    { id: 'accessibility-statement', title: 'Accessibility statement', detail: 'Draft or published statement for the service.', phases: ['Beta', 'Live'] },
    { id: 'assisted-digital', title: 'Assistive digital support materials', detail: 'Support scripts, training guides and tested routes.', phases: ['Beta'] },
    { id: 'ongoing-checks', title: 'Ongoing accessibility checks', detail: 'Plan for re-audits, ongoing testing and updates.', phases: ['Beta', 'Live'] }
  ],
  6: [
    { id: 'team-composition', title: 'Team composition overview', detail: 'List of team members and disciplines for the phase.', phases: ['Alpha', 'Beta'] },
    { id: 'role-responsibilities', title: 'Role descriptions and responsibilities', detail: 'How each discipline contributes to delivery.', phases: ['Alpha', 'Beta'] },
    { id: 'collaboration-evidence', title: 'Evidence of collaborative working', detail: 'Examples of joint decision-making across roles.', phases: ['Alpha', 'Beta', 'Live'] },
    { id: 'service-owner', title: 'Service owner identification', detail: 'Named owner and engagement approach.', phases: ['Alpha', 'Beta', 'Live'] },
    { id: 'knowledge-transfer', title: 'Knowledge transfer plan', detail: 'Handover and skills transfer plan for contractors.', phases: ['Alpha', 'Beta'] },
    { id: 'scaling-plan', title: 'Scaling plan for Live', detail: 'RACI or operating model for Live support.', phases: ['Beta', 'Live'] },
    { id: 'decision-logs', title: 'Decision logs / meeting notes', detail: 'Evidence multiple disciplines input to decisions.', phases: ['Alpha', 'Beta', 'Live'] },
    { id: 'team-health', title: 'Team health materials', detail: 'Retrospectives or team health checks.', phases: ['Beta', 'Live'] }
  ],
  7: [
    { id: 'agile-tools', title: 'Agile project tools', detail: 'Backlog, WIP and iteration cadence from tools.', phases: ['Alpha', 'Beta', 'Live'] },
    { id: 'iteration-records', title: 'Iteration records (design/tech)', detail: 'Design history or change log by sprint.', phases: ['Alpha', 'Beta'] },
    { id: 'risk-log', title: 'Risk and hypothesis log', detail: 'Assumptions and how they were tested.', phases: ['Discovery', 'Alpha'] },
    { id: 'governance', title: 'Governance evidence with agility', detail: 'OKRs or outcomes-led governance evidence.', phases: ['Alpha', 'Beta', 'Live'] },
    { id: 'stakeholder-logs', title: 'Stakeholder decision logs', detail: 'Examples of rapid decisions and pivots.', phases: ['Alpha', 'Beta'] },
    { id: 'velocity', title: 'Team velocity and cadence info', detail: 'Sprints, show-and-tells, burn-downs.', phases: ['Beta'] },
    { id: 'continuous-delivery', title: 'Continuous delivery pipeline', detail: 'Automated pipeline and frequent deployments.', phases: ['Beta', 'Live'] }
  ],
  8: [
    { id: 'design-history', title: 'Change log / design history', detail: 'Record of iterative improvements and reasons.', phases: ['Alpha', 'Beta', 'Live'] },
    { id: 'analytics-feedback', title: 'Analytics and feedback loops', detail: 'Metrics and user feedback driving changes.', phases: ['Beta', 'Live'] },
    { id: 'continuous-deploy', title: 'Continuous deployment evidence', detail: 'Pipeline and release frequency.', phases: ['Beta', 'Live'] },
    { id: 'content-review', title: 'Content review process', detail: 'Plan to keep content accurate and current.', phases: ['Beta', 'Live'] },
    { id: 'improvement-backlog', title: 'Backlog of improvements', detail: 'Visible backlog for continuous improvement.', phases: ['Beta', 'Live'] },
    { id: 'iterative-examples', title: 'Examples of iterative changes', detail: 'Before/after examples supported by data.', phases: ['Beta', 'Live'] },
    { id: 'future-evolution', title: 'Plan for future evolution', detail: 'Roadmap of upcoming iterations and needs.', phases: ['Live'] }
  ],
  9: [
    { id: 'privacy-mapping', title: 'Data and privacy mapping', detail: 'Data flows and DPIA work.', phases: ['Discovery', 'Alpha'] },
    { id: 'security-engagement', title: 'Security engagement evidence', detail: 'Early input from security specialists.', phases: ['Alpha', 'Beta'] },
    { id: 'threat-model', title: 'Threat model artefacts', detail: 'Threats and mitigations identified.', phases: ['Alpha'] },
    { id: 'tech-architecture', title: 'Technical architecture and feasibility', detail: 'Security features and compliance in architecture.', phases: ['Alpha', 'Beta'] },
    { id: 'security-testing', title: 'Security test results', detail: 'Pen tests and vulnerability scans.', phases: ['Beta'] },
    { id: 'risk-register', title: 'Risk register', detail: 'Security risks with owners and status.', phases: ['Beta', 'Live'] },
    { id: 'security-policies', title: 'Security policies and compliance', detail: 'GDPR compliance and security standards.', phases: ['Beta', 'Live'] },
    { id: 'operational-security', title: 'Operational security preparedness', detail: 'Asset register and incident response plan.', phases: ['Live'] },
    { id: 'privacy-plans', title: 'Privacy and decommissioning plans', detail: 'Retention, deletion and retirement plans.', phases: ['Live'] }
  ],
  10: [
    { id: 'metrics-framework', title: 'Success metrics framework', detail: 'KPIs and definition of success.', phases: ['Discovery', 'Alpha'] },
    { id: 'baseline-data', title: 'Baseline data and analysis', detail: 'Current performance baseline.', phases: ['Discovery', 'Alpha'] },
    { id: 'measurement-plan', title: 'Performance measurement plan', detail: 'How each KPI will be captured and reviewed.', phases: ['Alpha'] },
    { id: 'analytics-implementation', title: 'Analytics implementation evidence', detail: 'Dashboards and tracked metrics.', phases: ['Beta', 'Live'] },
    { id: 'performance-reports', title: 'Performance reports and reviews', detail: 'Reports showing interpretation and action.', phases: ['Beta', 'Live'] },
    { id: 'qualitative-feedback', title: 'Qualitative feedback integration', detail: 'Themes, case studies or satisfaction insights.', phases: ['Beta', 'Live'] },
    { id: 'data-driven-improvement', title: 'Evidence of data-driven improvement', detail: 'Examples of changes driven by data.', phases: ['Beta', 'Live'] },
    { id: 'stakeholder-metrics', title: 'Stakeholder engagement with metrics', detail: 'Evidence metrics inform decisions.', phases: ['Beta', 'Live'] },
    { id: 'publishing', title: 'Publishing and transparency', detail: 'Public reporting of required metrics.', phases: ['Live'] }
  ],
  11: [
    { id: 'options-analysis', title: 'Options analysis and decision records', detail: 'Appraisal of options and rationale.', phases: ['Alpha'] },
    { id: 'architecture-diagram', title: 'Technical architecture diagram', detail: 'High-level architecture and integrations.', phases: ['Alpha', 'Beta'] },
    { id: 'stack-alignment', title: 'Alignment with standards/stacks', detail: 'Evidence solution aligns with recommended stack.', phases: ['Alpha', 'Beta'] },
    { id: 'security-accessibility', title: 'Security and accessibility in tech choices', detail: 'Non-functional requirements in selection.', phases: ['Alpha', 'Beta'] },
    { id: 'value-for-money', title: 'Value for money rationale', detail: 'Cost comparison or reuse evidence.', phases: ['Alpha', 'Beta'] },
    { id: 'tech-feasibility', title: 'Proof of technical feasibility', detail: 'Spikes or prototypes that de-risk choices.', phases: ['Alpha'] },
    { id: 'architecture-docs', title: 'Documentation of architecture and plans', detail: 'Reviewed docs and decision records.', phases: ['Alpha', 'Beta'] },
    { id: 'revisit-decisions', title: 'Plan to revisit decisions', detail: 'Roadmap or ADRs for future review.', phases: ['Beta', 'Live'] },
    { id: 'support-plan', title: 'Sustainability and support plans', detail: 'Maintenance and support arrangements.', phases: ['Live'] }
  ],
  12: [
    { id: 'public-repo', title: 'Public repository links', detail: 'Links to open source repositories.', phases: ['Beta', 'Live'] },
    { id: 'open-license', title: 'Open source licence', detail: 'Appropriate licence in the repo.', phases: ['Beta', 'Live'] },
    { id: 'no-secrets', title: 'No secrets in repo', detail: 'Evidence of secure configuration handling.', phases: ['Beta', 'Live'] },
    { id: 'contribution-docs', title: 'Contribution docs', detail: 'README or contribution guidance.', phases: ['Beta', 'Live'] },
    { id: 'published-packages', title: 'Published packages (if applicable)', detail: 'Reusable libraries published publicly.', phases: ['Live'] },
    { id: 'open-process', title: 'Open development process', detail: 'Evidence of open PRs and issue tracking.', phases: ['Live'] },
    { id: 'open-exceptions', title: 'Plan for remaining closed parts', detail: 'Plan to open any exceptions over time.', phases: ['Live'] }
  ],
  13: [
    { id: 'design-system', title: 'Use of GOV.UK design system and patterns', detail: 'Annotated examples of patterns used.', phases: ['Alpha', 'Beta', 'Live'] },
    { id: 'common-platforms', title: 'Reuse of common platforms', detail: 'Integrations with shared government components.', phases: ['Beta', 'Live'] },
    { id: 'open-standards', title: 'Open standards adherence', detail: 'Evidence of open data/API standards.', phases: ['Alpha', 'Beta', 'Live'] },
    { id: 'contributions', title: 'Contribution back to community', detail: 'PRs or shared components/patterns.', phases: ['Live'] },
    { id: 'design-history', title: 'Design history / decision logs', detail: 'Design history site or ADRs shared openly.', phases: ['Beta', 'Live'] },
    { id: 'collaboration', title: 'Collaboration with other teams', detail: 'Evidence of cross-government collaboration.', phases: ['Alpha', 'Beta', 'Live'] },
    { id: 'no-reinvention', title: 'No reinvention evidence', detail: 'Survey of existing solutions and rationale.', phases: ['Alpha', 'Beta'] },
    { id: 'open-tech', title: 'Exemplar use of open tech', detail: 'Open-source stack or components used.', phases: ['Alpha', 'Beta', 'Live'] }
  ],
  14: [
    { id: 'monitoring', title: 'Uptime and performance monitoring', detail: 'Dashboards showing uptime and errors.', phases: ['Beta', 'Live'] },
    { id: 'cicd', title: 'Continuous integration and delivery', detail: 'Pipeline enabling frequent low-risk releases.', phases: ['Beta', 'Live'] },
    { id: 'load-testing', title: 'Load testing results', detail: 'Performance testing evidence.', phases: ['Beta'] },
    { id: 'disaster-recovery', title: 'Failover and disaster recovery plans', detail: 'DR plans and tested recovery processes.', phases: ['Live'] },
    { id: 'runbooks', title: 'Runbooks and ops manuals', detail: 'Operational procedures and runbooks.', phases: ['Live'] },
    { id: 'incident-management', title: 'Incident management process', detail: 'Process and examples of incident reviews.', phases: ['Live'] },
    { id: 'on-call', title: 'On-call rota and support arrangement', detail: 'Support model and escalation paths.', phases: ['Live'] },
    { id: 'slas', title: 'Service level targets', detail: 'SLAs or SLOs and how they are tracked.', phases: ['Live'] },
    { id: 'capacity-planning', title: 'Capacity planning docs', detail: 'Scaling and capacity evidence.', phases: ['Live'] },
    { id: 'maintenance', title: 'Maintenance and patching strategy', detail: 'Approach for updates and patches.', phases: ['Live'] },
    { id: 'exemplars', title: 'Reliability exemplars', detail: 'Evidence of learning from incidents and improvements.', phases: ['Live'] }
  ]
};

const routes = [
  { pattern: /^\/$/, render: renderHome },
  { pattern: /^\/clear-data\/?$/, render: renderClearData },
  { pattern: /^\/clear-data\/download\/?$/, render: renderClearDownload },
  { pattern: /^\/clear-data\/download\/select\/?$/, render: renderClearDownloadSelect },
  { pattern: /^\/clear-data\/confirm\/?$/, render: renderClearConfirm },
  { pattern: /^\/clear-data\/complete\/?$/, render: renderClearComplete },
  { pattern: /^\/projects\/add\/?$/, render: renderAddProject },
  { pattern: /^\/projects\/import\/?$/, render: renderImportProject },
  { pattern: /^\/projects\/([^/]+)\/?$/, render: renderProject },
  { pattern: /^\/projects\/([^/]+)\/standards\/([^/]+)\/?$/, render: renderStandard },
  { pattern: /^\/projects\/([^/]+)\/standards\/([^/]+)\/subsections\/([^/]+)\/?$/, render: renderCommentForm },
  { pattern: /^\/projects\/([^/]+)\/standards\/([^/]+)\/subsections\/([^/]+)\/comments\/([^/]+)\/edit\/?$/, render: renderCommentEdit }
];

function init() {
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace(/^#/, '');
    if (hash.startsWith('standard-') || hash.startsWith('service-standard')) {
      return;
    }
    renderRoute(getCurrentPath());
  });
  renderRoute(getCurrentPath());
  if (window.GOVUKFrontend && window.GOVUKFrontend.initAll) {
    window.GOVUKFrontend.initAll();
  }
  initAccordions();
}

function getCurrentPath() {
  const hash = window.location.hash.replace(/^#/, '');
  if (!hash) return '/';
  if (hash.startsWith('standard-') || hash.startsWith('service-standard')) {
    return lastRoutedPath || '/';
  }
  return hash;
}

function navigate(path) {
  window.location.hash = path;
  window.scrollTo(0, 0);
}

function renderRoute(path) {
  const main = document.getElementById('app-content');
  const backLinkContainer = document.getElementById('app-back-link');
  lastRoutedPath = path;
  const route = routes.find((entry) => entry.pattern.test(path));
  if (!route) {
    main.innerHTML = renderNotFound();
    if (backLinkContainer) {
      backLinkContainer.innerHTML = '';
    }
    return;
  }
  const match = path.match(route.pattern);
  main.innerHTML = route.render(match);
  if (backLinkContainer) {
    backLinkContainer.innerHTML = '';
    const backLink = main.querySelector('.govuk-back-link');
    if (backLink) {
      backLinkContainer.appendChild(backLink);
    }
  }
  if (window.GOVUKFrontend && window.GOVUKFrontend.initAll) {
    window.GOVUKFrontend.initAll();
  }
  initAccordions();
}

function initAccordions() {
  if (!window.GOVUKFrontend || !window.GOVUKFrontend.Accordion) return;
  document.querySelectorAll('.govuk-accordion').forEach((accordion) => {
    if (accordion.dataset.ssAccordionInit === 'true') return;
    const instance = new window.GOVUKFrontend.Accordion(accordion);
    instance.init();
    accordion.dataset.ssAccordionInit = 'true';
  });
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

function defaultAssessmentForPhase(phase) {
  const map = {
    Discovery: 'Discovery workshop',
    Alpha: 'Alpha assessment',
    Beta: 'Beta assessment',
    Live: 'Live assessment'
  };
  return map[phase] || '';
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

function phaseTag(phase) {
  const classes = {
    Discovery: 'govuk-tag--blue',
    Alpha: 'govuk-tag--yellow',
    Beta: 'govuk-tag--orange',
    Live: 'govuk-tag--green'
  };
  const label = phase || 'Unknown';
  return `<strong class="govuk-tag ${classes[label] || 'govuk-tag--grey'}">${label}</strong>`;
}

function phaseTagList(phases) {
  return phases
    .map((phase) => `<strong class="govuk-tag govuk-tag--grey">${phase}</strong>`)
    .join(' ');
}

function renderHome() {
  const projects = getProjects();
  const emptyState = `
    <p class="govuk-body">You have not added any projects yet.</p>
    <div class="govuk-button-group">
      <a href="#/projects/add" class="govuk-button">Add a new project</a>
      <a href="#/projects/import" class="govuk-button govuk-button--secondary">Upload a project</a>
    </div>
    <p class="govuk-body govuk-!-margin-top-3">
      <a class="govuk-link" href="#/clear-data">Clear all data</a>
    </p>
  `;

  const rows = projects
    .map((project) => {
      const status = calculateProjectStatus(project);
      return `
        <tr class="govuk-table__row">
          <th scope="row" class="govuk-table__header"><a class="govuk-link" href="#/projects/${project.id}">${project.name}</a></th>
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
    <h2 class="govuk-heading-m">Projects</h2>
    <p class="govuk-body">Track one or more services against the 14 points of the GDS Service Standard. Add notes, set RAG statuses, and prepare for assessments.</p>
    ${projects.length === 0 ? emptyState : `
      ${table}
      <div class="govuk-button-group govuk-!-margin-top-4">
        <a href="#/projects/add" class="govuk-button">Add a new project</a>
        <a href="#/projects/import" class="govuk-button govuk-button--secondary">Upload a project</a>
      </div>
      <p class="govuk-body govuk-!-margin-top-3">
        <a class="govuk-link" href="#/clear-data">Clear all data</a>
      </p>
    `}
  `;
}

function renderClearData() {
  const projects = getProjects();
  const hasProjects = projects.length > 0;

  return `
    <a href="#/" class="govuk-back-link">Back</a>
    <h1 class="govuk-heading-l">Clear all data</h1>
    <p class="govuk-body">Clearing all data will permanently delete projects and any information saved in this tool.</p>
    ${hasProjects ? `
      <form class="govuk-!-margin-top-4" data-action="clear-decision">
        <div class="govuk-form-group">
          <fieldset class="govuk-fieldset" aria-describedby="clear-hint">
            <legend class="govuk-fieldset__legend govuk-fieldset__legend--m">
              Do you want to save your projects first?
            </legend>
            <div id="clear-hint" class="govuk-hint">You can download a JSON file for each project before clearing.</div>
            <div class="govuk-radios">
              <div class="govuk-radios__item">
                <input class="govuk-radios__input" id="save-yes" name="saveProjects" type="radio" value="yes">
                <label class="govuk-label govuk-radios__label" for="save-yes">Yes, save my projects first</label>
              </div>
              <div class="govuk-radios__item">
                <input class="govuk-radios__input" id="save-no" name="saveProjects" type="radio" value="no">
                <label class="govuk-label govuk-radios__label" for="save-no">No, clear everything now</label>
              </div>
            </div>
          </fieldset>
        </div>
        <button class="govuk-button" type="submit">Continue</button>
      </form>
    ` : `
      <p class="govuk-body">There are no projects to save.</p>
      <form class="govuk-!-margin-top-4" data-action="clear-decision">
        <input type="hidden" name="saveProjects" value="no">
        <button class="govuk-button govuk-button--warning" type="submit">Clear all data</button>
      </form>
    `}
  `;
}

function renderClearDownload() {
  const projects = getProjects();
  if (projects.length === 0) {
    return `
      <a href="#/clear-data" class="govuk-back-link">Back</a>
      <h1 class="govuk-heading-l">Save your projects</h1>
      <p class="govuk-body">There are no projects to save.</p>
      <a class="govuk-button govuk-button--warning" href="#/clear-data/confirm">Continue</a>
    `;
  }

  if (projects.length === 1) {
    const project = projects[0];
    return `
      <a href="#/clear-data" class="govuk-back-link">Back</a>
      <h1 class="govuk-heading-l">Save your project</h1>
      <p class="govuk-body">Download the JSON file for <strong>${escapeHtml(project.name)}</strong>.</p>
      <button class="govuk-button govuk-button--secondary" data-action="download-projects" data-project-ids="${project.id}">
        Download project JSON
      </button>
      <div class="govuk-!-margin-top-4">
        <a class="govuk-button govuk-button--warning" href="#/clear-data/confirm">Continue to clear all data</a>
        <p class="govuk-body"><a class="govuk-link" href="#/">Cancel</a></p>
      </div>
    `;
  }

  return `
    <a href="#/clear-data" class="govuk-back-link">Back</a>
    <h1 class="govuk-heading-l">Save your projects</h1>
    <p class="govuk-body">Choose how you want to download your project data before clearing.</p>
    <form class="govuk-!-margin-top-4" data-action="download-choice">
      <div class="govuk-form-group">
        <fieldset class="govuk-fieldset">
          <legend class="govuk-fieldset__legend govuk-fieldset__legend--m">Download options</legend>
          <div class="govuk-radios">
            <div class="govuk-radios__item">
              <input class="govuk-radios__input" id="download-all" name="downloadChoice" type="radio" value="all">
              <label class="govuk-label govuk-radios__label" for="download-all">Download all projects</label>
            </div>
            <div class="govuk-radios__item">
              <input class="govuk-radios__input" id="download-select" name="downloadChoice" type="radio" value="select">
              <label class="govuk-label govuk-radios__label" for="download-select">Select projects to download</label>
            </div>
          </div>
        </fieldset>
      </div>
      <button class="govuk-button" type="submit">Continue</button>
    </form>
  `;
}

function renderClearDownloadSelect() {
  const projects = getProjects();
  if (projects.length === 0) {
    return `
      <a href="#/clear-data" class="govuk-back-link">Back</a>
      <h1 class="govuk-heading-l">Select projects</h1>
      <p class="govuk-body">There are no projects to save.</p>
      <a class="govuk-button govuk-button--warning" href="#/clear-data/confirm">Continue</a>
    `;
  }

  const options = projects
    .map((project) => `
      <div class="govuk-checkboxes__item">
        <input class="govuk-checkboxes__input" id="project-${project.id}" name="projectIds" type="checkbox" value="${project.id}">
        <label class="govuk-label govuk-checkboxes__label" for="project-${project.id}">
          ${escapeHtml(project.name)}
        </label>
      </div>
    `)
    .join('');

  return `
    <a href="#/clear-data/download" class="govuk-back-link">Back</a>
    <h1 class="govuk-heading-l">Select projects to download</h1>
    <form class="govuk-!-margin-top-4" data-action="download-selected">
      <div class="govuk-form-group">
        <div class="govuk-checkboxes">
          ${options}
        </div>
      </div>
      <button class="govuk-button" type="submit">Download and continue</button>
    </form>
  `;
}

function renderClearConfirm() {
  const downloadedText = clearFlowState.downloadedCount
    ? `You downloaded ${clearFlowState.downloadedCount} project${clearFlowState.downloadedCount === 1 ? '' : 's'}.`
    : 'You have not downloaded any projects yet.';

  return `
    <a href="#/clear-data" class="govuk-back-link">Back</a>
    <h1 class="govuk-heading-l">Confirm clearing all data</h1>
    <p class="govuk-body">${downloadedText}</p>
    <form class="govuk-!-margin-top-4" data-action="confirm-clear">
      <div class="govuk-form-group">
        <fieldset class="govuk-fieldset">
          <legend class="govuk-fieldset__legend govuk-fieldset__legend--m">Do you still want to clear all data?</legend>
          <div class="govuk-radios">
            <div class="govuk-radios__item">
              <input class="govuk-radios__input" id="confirm-yes" name="confirmClear" type="radio" value="yes">
              <label class="govuk-label govuk-radios__label" for="confirm-yes">Yes, clear all data</label>
            </div>
            <div class="govuk-radios__item">
              <input class="govuk-radios__input" id="confirm-no" name="confirmClear" type="radio" value="no">
              <label class="govuk-label govuk-radios__label" for="confirm-no">No, keep my data</label>
            </div>
          </div>
        </fieldset>
      </div>
      <button class="govuk-button govuk-button--warning" type="submit">Continue</button>
    </form>
  `;
}

function renderClearComplete() {
  return `
    <h1 class="govuk-heading-l">Data cleared</h1>
    <p class="govuk-body">All project data has been removed from this tool.</p>
    <a href="#/" class="govuk-button">Back to homepage</a>
  `;
}

function renderAddProject() {
  return `
    <a href="#/" class="govuk-back-link">Back</a>
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
        <label class="govuk-label" for="description">Service description</label>
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
          <option value="Discovery workshop">Discovery workshop</option>
          <option value="Alpha assessment">Alpha assessment</option>
          <option value="Beta assessment">Beta assessment</option>
          <option value="Live assessment">Live assessment</option>
        </select>
      </div>
      <button class="govuk-button" type="submit">Add project</button>
    </form>
  `;
}

function renderImportProject() {
  return `
    <a href="#/" class="govuk-back-link">Back</a>
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
        <li class="ss-standards__item">
          <a class="govuk-link ss-standards__link" href="#/projects/${project.id}/standards/${standard.id}">
            ${standard.number}. ${standard.title}
          </a>
          <div class="ss-standards__status">${ragTag(status)}</div>
        </li>
      `;
    })
    .join('');

  const projectStatus = calculateProjectStatus(project);

  const descriptionMarkup = project.description
    ? `<h2 class="govuk-heading-m">Service description</h2><p class="govuk-body">${escapeHtml(project.description)}</p>`
    : `<h2 class="govuk-heading-m">Service description</h2><p class="govuk-body">No description has been added yet.</p>`;

  const lastUpdatedText = formatDisplayDate(project.lastUpdated);
  const lastUpdatedMarkup = lastUpdatedText
    ? `<p class="govuk-body"><span class="govuk-!-font-weight-bold">Last updated:</span> ${lastUpdatedText}</p>`
    : '';

  return `
    <a href="#/" class="govuk-back-link">Back</a>
    <div class="ss-project-header">
      <div>
        <h1 class="govuk-heading-l ss-project-title">
          <span>${project.name}</span>
        </h1>
        <p class="govuk-body"><span class="govuk-!-font-weight-bold">Current delivery status:</span> ${ragTag(projectStatus)}</p>
      </div>
      <div class="ss-project-header__action">
        <a href="#" class="govuk-button" data-action="export-project" data-project-id="${project.id}">Save project</a>
      </div>
    </div>

    ${descriptionMarkup}
    ${lastUpdatedMarkup}

    <div class="govuk-tabs govuk-!-margin-top-6" data-module="govuk-tabs">
      <h2 class="govuk-tabs__title">Service Standard details</h2>
          <ul class="govuk-tabs__list">
            <li class="govuk-tabs__list-item govuk-tabs__list-item--selected">
              <a class="govuk-tabs__tab" href="#service-standard">Service Standard compliance</a>
            </li>
          </ul>
          <div class="govuk-tabs__panel" id="service-standard">
            <div class="ss-standards-layout">
              <div class="ss-standards-sidebar">
                <div class="ss-details">
                  <div class="ss-details__item">
                    <p class="govuk-body govuk-!-font-weight-bold">Department</p>
                    <p class="govuk-body">${escapeHtml(project.department || '')}</p>
              </div>
              <div class="ss-details__item">
                <p class="govuk-body govuk-!-font-weight-bold">Phase</p>
                <p class="govuk-body">
                  ${escapeHtml(project.currentPhase || '')}
                  <a class="govuk-link" href="#" data-action="show-phase-edit" data-project-id="${project.id}">Change</a>
                </p>
                <div class="govuk-!-display-none" id="phase-edit-row-${project.id}">
                  <form data-action="update-phase" data-project-id="${project.id}">
                    <div class="govuk-form-group govuk-!-margin-bottom-2">
                      <label class="govuk-label govuk-!-font-size-16" for="currentPhase-${project.id}">Select a new phase</label>
                      <select class="govuk-select" id="currentPhase-${project.id}" name="currentPhase">
                        ${['Discovery', 'Alpha', 'Beta', 'Live']
                          .map((phase) => `<option value="${phase}" ${project.currentPhase === phase ? 'selected' : ''}>${phase}</option>`)
                          .join('')}
                      </select>
                    </div>
                    <div class="govuk-button-group">
                      <button class="govuk-button govuk-button--secondary" type="submit">Save phase</button>
                      <a class="govuk-link" href="#" data-action="cancel-phase-edit" data-project-id="${project.id}">Cancel</a>
                    </div>
                  </form>
                </div>
              </div>
              <div class="ss-details__item">
                <p class="govuk-body govuk-!-font-weight-bold">Next assessment</p>
                <p class="govuk-body">${escapeHtml(project.nextAssessmentType || '')}</p>
              </div>
            </div>
              </div>
              <div class="ss-standards-main">
                <h2 class="govuk-heading-m">Service Standard compliance</h2>
                <ol class="ss-standards">${standardsList}</ol>
              </div>
            </div>
      </div>
    </div>
  `;
}

function renderStandard(match) {
  const projectId = match[1];
  const standardId = match[2];
  const project = getProjects().find((item) => item.id === projectId);
  if (!project) return renderNotFound();
  const standard = project.serviceStandards.find((item) => item.id === standardId);
  if (!standard) return renderNotFound();

  const artefacts = artefactsByStandard[standard.number] || [];
  const artefactsMarkup = artefacts.length
    ? `
      <div class="govuk-accordion" data-module="govuk-accordion" id="artefacts-accordion">
        ${artefacts
          .map(
            (item) => `
            <div class="govuk-accordion__section">
              <div class="govuk-accordion__section-header">
                <h3 class="govuk-accordion__section-heading">
                  <button type="button" class="govuk-accordion__section-button ss-artefact__button" id="artefact-${item.id}">
                    <span class="ss-artefact__title">${item.title}</span>
                    <span class="ss-artefact__phases">${phaseTagList(item.phases)}</span>
                  </button>
                </h3>
              </div>
              <div class="govuk-accordion__section-content" aria-labelledby="artefact-${item.id}">
                <p class="govuk-body">${item.detail}</p>
              </div>
            </div>
          `
          )
          .join('')}
      </div>
    `
    : `<p class="govuk-body">No typical artefacts listed yet.</p>`;

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
              <p class="govuk-body govuk-!-margin-top-2"><a class="govuk-link" href="#/projects/${project.id}/standards/${standard.id}/subsections/${subsection.id}/comments/${comment.id}/edit">Change</a></p>
            </div>
          `
            )
            .join('')}
          <p class="govuk-body"><a class="govuk-link" href="#/projects/${project.id}/standards/${standard.id}/subsections/${subsection.id}">Add another comment</a></p>
        `
        : `
          <p class="govuk-body"><a class="govuk-link" href="#/projects/${project.id}/standards/${standard.id}/subsections/${subsection.id}">Add comment</a></p>
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
    <a href="#/projects/${project.id}" class="govuk-back-link">Back</a>
    <h1 class="govuk-heading-l">Service Standard ${standard.number}: ${standard.title}</h1>
    <p class="govuk-body">${standard.description}</p>
    <h2 class="govuk-heading-m">Overall RAG status</h2>
    <div class="govuk-!-margin-bottom-4">${ragTag(calculateStandardStatus(standard))}</div>
    <div class="govuk-tabs govuk-!-margin-top-4" data-module="govuk-tabs">
      <h2 class="govuk-tabs__title">Standard details</h2>
      <ul class="govuk-tabs__list">
        <li class="govuk-tabs__list-item govuk-tabs__list-item--selected">
          <a class="govuk-tabs__tab" href="#standard-subsections">Subsections</a>
        </li>
        <li class="govuk-tabs__list-item">
          <a class="govuk-tabs__tab" href="#standard-artefacts">Artefacts and evidence</a>
        </li>
      </ul>
      <div class="govuk-tabs__panel" id="standard-subsections">
        <h2 class="govuk-heading-m">Subsections</h2>
        ${subsections}
      </div>
      <div class="govuk-tabs__panel govuk-tabs__panel--hidden" id="standard-artefacts">
        <h2 class="govuk-heading-m">Artefacts and evidence typically demonstrated at assessment</h2>
        ${artefactsMarkup}
      </div>
    </div>
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
  const backLink = `#/projects/${project.id}/standards/${standard.id}`;
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

function formatDisplayDate(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}

function touchProject(project) {
  project.lastUpdated = new Date().toISOString();
}

function clearAllData() {
  window.localStorage.removeItem(STORAGE_KEY);
  clearFlowState.downloadedCount = 0;
  clearFlowState.saved = false;
}

function downloadProjectFile(project) {
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

function downloadProjectsByIds(ids) {
  const projects = getProjects();
  const selected = projects.filter((project) => ids.includes(project.id));
  selected.forEach((project) => downloadProjectFile(project));
  clearFlowState.downloadedCount = selected.length;
  clearFlowState.saved = selected.length > 0;
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
        touchProject(project);
      }
    } else if (commentText) {
      subsection.comments.push({
        id: `comment-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        text: commentText,
        ragStatus
      });
      touchProject(project);
    }

    saveProjects(projects);
    navigate(`/projects/${projectId}/standards/${standardId}`);
  }

  if (action === 'clear-decision') {
    const choice = formData.get('saveProjects');
    if (choice === 'yes') {
      navigate('/clear-data/download');
      return;
    }
    clearAllData();
    navigate('/clear-data/complete');
  }

  if (action === 'download-choice') {
    const choice = formData.get('downloadChoice');
    if (choice === 'all') {
      const ids = getProjects().map((project) => project.id);
      downloadProjectsByIds(ids);
      navigate('/clear-data/confirm');
      return;
    }
    if (choice === 'select') {
      navigate('/clear-data/download/select');
      return;
    }
    alert('Select how you want to download your projects.');
  }

  if (action === 'download-selected') {
    const selectedIds = formData.getAll('projectIds');
    if (!selectedIds.length) {
      alert('Select at least one project to download.');
      return;
    }
    downloadProjectsByIds(selectedIds);
    navigate('/clear-data/confirm');
  }

  if (action === 'confirm-clear') {
    const decision = formData.get('confirmClear');
    if (decision === 'yes') {
      clearAllData();
      navigate('/clear-data/complete');
      return;
    }
    navigate('/');
  }

  if (action === 'update-phase') {
    const projectId = form.getAttribute('data-project-id');
    const selectedPhase = formData.get('currentPhase');
    const projects = getProjects();
    const project = projects.find((item) => item.id === projectId);
    if (project && selectedPhase) {
      project.currentPhase = selectedPhase;
      project.nextAssessmentType = defaultAssessmentForPhase(selectedPhase) || project.nextAssessmentType;
      touchProject(project);
      saveProjects(projects);
    }
    const row = document.getElementById(`phase-edit-row-${projectId}`);
    if (row) row.classList.add('govuk-!-display-none');
    const targetPath = `/projects/${projectId}`;
    if (getCurrentPath() === targetPath) {
      renderRoute(targetPath);
      window.scrollTo(0, 0);
    } else {
      navigate(targetPath);
    }
  }
}

function handleActionClick(event) {
  const button = event.target.closest('[data-action]');
  if (!button) return;
  const action = button.getAttribute('data-action');

  if (action === 'export-project') {
    event.preventDefault();
    const projectId = button.getAttribute('data-project-id');
    const project = getProjects().find((item) => item.id === projectId);
    if (!project) return;
    downloadProjectFile(project);
  }

  if (action === 'download-projects') {
    event.preventDefault();
    const ids = (button.getAttribute('data-project-ids') || '').split(',').filter(Boolean);
    if (!ids.length) return;
    downloadProjectsByIds(ids);
  }

  if (action === 'show-phase-edit') {
    event.preventDefault();
    const projectId = button.getAttribute('data-project-id');
    const row = document.getElementById(`phase-edit-row-${projectId}`);
    if (row) {
      row.classList.remove('govuk-!-display-none');
      row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  if (action === 'cancel-phase-edit') {
    event.preventDefault();
    const projectId = button.getAttribute('data-project-id');
    const row = document.getElementById(`phase-edit-row-${projectId}`);
    if (row) row.classList.add('govuk-!-display-none');
  }
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
    lastUpdated: payload.lastUpdated || new Date().toISOString(),
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
  document.addEventListener('click', handleActionClick);
}

bindEvents();
init();
