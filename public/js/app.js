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
    { id: 'user-research-plan', title: 'User Research Plan & Approach', detail: 'A documented research plan outlining target users, research questions, and methods (usually prepared in Discovery/Alpha). For example, assessment panels expect to see a separate research plan artefact summarising the user research approach aligned to the roadmap.' },
    { id: 'user-profiles', title: 'User Profiles and Needs', detail: 'Outputs from Discovery such as user personas, empathy maps or a prioritised list of user needs derived from research. These show the team’s deep understanding of different user groups and their goals (key in Alpha).' },
    { id: 'journey-maps', title: 'User Journey Maps / Service Blueprints', detail: 'Diagrams mapping the end-to-end journey, including context and pain points outside the digital service. These artefacts (often created in Alpha) illustrate the user’s entire problem space, not just the online transaction.' },
    { id: 'research-findings', title: 'Research Findings and Usability Reports', detail: 'Summaries of what the team learned from user interviews, contextual inquiries, and usability testing sessions. In Alpha and Beta, teams typically present user research reports or slide decks highlighting insights and how they influenced design iterations.' },
    { id: 'prototypes', title: 'Prototypes Tested with Users', detail: 'Evidence that quick, throwaway prototypes were used to test assumptions with users early and often. This can include screenshots or links to prototypes and a log of iterative changes made in response to user feedback (common in Alpha).' },
    { id: 'behaviour-data', title: 'Data Analysis of User Behaviour', detail: 'Any analytics or supporting data that the team used to understand user needs (e.g. call centre queries, existing service logs). Even in Discovery, teams might present analysis of current data to validate user pain points.' },
    { id: 'ongoing-learning', title: 'Plans for Ongoing Learning', detail: 'By Beta/Live, the team should show a plan for continuous user research and feedback loops. This could be a schedule of regular user testing, surveys, or analytics reviews to ensure the service keeps meeting users’ needs.' }
  ],
  2: [
    { id: 'service-map', title: 'End-to-End Service Map / Blueprint', detail: 'A service blueprint or journey map covering every step a user takes to achieve their goal, across all channels and touchpoints. This artefact (usually from Discovery/Alpha) demonstrates understanding of where the service fits in the broader journey and any gaps or offline steps. It often highlights pain points and handoffs that the team needs to address.' },
    { id: 'stakeholder-map', title: 'Stakeholder and Systems Map', detail: 'Documentation showing related services, policy teams, and systems involved in the user’s problem. For example, a diagram or table of “service touchpoints” and evidence the team has talked to those external teams (expected by Alpha). This proves the team has considered integrations and dependencies needed to solve the whole problem.' },
    { id: 'policy-process', title: 'Policy and Offline Process Understanding', detail: 'Artefacts capturing how policy or existing processes influence the service. Teams might provide a brief of policy constraints and a mapped process flow including non-digital steps (often discovered in Alpha). This shows they won’t inadvertently solve only part of the problem.' },
    { id: 'assisted-digital', title: 'Assisted Digital Support Plan', detail: 'A plan or description of how users who can’t complete the service online will be helped (common by Beta). This could include support models (e.g. helpline scripts, face-to-face assistance processes) ensuring no user is left behind. The team should have designed and even tested these supporting channels by public Beta.' },
    { id: 'collaboration', title: 'Collaboration Evidence', detail: 'Notes or outputs from workshops and design sessions with other teams/programmes addressing similar user needs. For instance, the team might share that they have spoken with teams delivering related services to avoid duplication and ensure a joined-up end-to-end journey.' },
    { id: 'journey-demo', title: 'Prototype/Demo of Entire Journey', detail: 'In assessments, teams often walk through an end-to-end journey of the service. They may present a demo or narrative that shows a user going from start to finish (including any steps beyond the digital product), demonstrating the service solves the user’s whole problem.' },
    { id: 'beta-outcomes', title: 'Private Beta Outcomes (Beta stage)', detail: 'By Beta, analytics or research from a private beta should indicate users can complete the full journey successfully. Teams might show completion rates or funnel data as evidence that users get through the end-to-end process unaided, proving the service (with its surrounding support) truly resolves the user’s need.' },
    { id: 'gap-roadmap', title: 'Plans to Address Gaps', detail: 'If any parts of the problem aren’t yet solved (common in Alpha/Beta), the team should present a roadmap addressing those gaps. For example, the GOV.UK Forms beta assessment noted plans for additional features (submission types, “save and return”) to cover more of the user’s needs – showing awareness of what’s needed to solve the whole problem.' }
  ],
  3: [
    { id: 'cross-channel-map', title: 'Cross-Channel Journey Mapping', detail: 'Visual maps of how the service works across channels (online, phone, paper, in-person). These artefacts illustrate entry points, channel switches, and return loops. Teams typically present service flow diagrams or service blueprints updated as the design evolves, to demonstrate a seamless experience.' },
    { id: 'consistency-guidance', title: 'Consistency Guidelines', detail: 'Evidence that the service delivers a consistent look, feel, and tone across channels. For example, the team might show that confirmation emails use the same language and branding as the web service, or that call centre scripts align with on-screen content (often considered in Alpha/Beta). Consistent design and content ensure users don’t feel disoriented moving between channels.' },
    { id: 'common-platforms', title: 'Use of Common Platforms', detail: 'If applicable, the team should show they’ve used common government components that support cross-channel use. For instance, using a single sign-on (e.g. DfE Sign-in) for both internal and external users to provide a unified login experience. Such reuse of common components also signals a joined-up approach with other services.' },
    { id: 'transition-testing', title: 'Channel Transition Testing', detail: 'In Beta, teams often have evidence that they tested journeys where users go offline and come back. This could be usability test findings on, say, how a user receives a letter or email and then resumes online, ensuring those transitions are smooth. Any gaps or high drop-off points identified via research or analytics should be highlighted with plans to fix them.' },
    { id: 'entry-exit', title: 'Discovery of Entry and Exit Points', detail: 'Artefacts showing how users find the service and what happens before/after. For example, a content page on GOV.UK that directs users into the service (the starting point), or a flow diagram depicting how the service hands off to other agencies at the end. Teams should demonstrate they’ve planned for these to create a coherent journey.' },
    { id: 'outreach', title: 'Service Discovery and Outreach', detail: 'By Live, the team might present an onboarding or communications plan for users and stakeholders. This could include guidance for support staff in other channels, integration with existing helplines, or proactive outreach to drive digital take-up – all ensuring the service does not operate in isolation. Performance data like drop-out rates between steps might be shown to verify the joined-up design is working.' }
  ],
  4: [
    { id: 'usability', title: 'Usability Test Reports', detail: 'Documentation of iterative usability testing is key. Teams usually provide reports or videos from usability sessions (Alpha and Beta) showing how they identified and fixed pain points to simplify the service. They should highlight task success rates and first-time completion improvements over time as evidence the service is easy to use.' },
    { id: 'prototypes', title: 'Interactive Prototypes', detail: 'Clickable prototypes or screens at various design stages often serve as artefacts. These illustrate a clean, uncluttered interface and straightforward user journey. The team might demonstrate how prototypes evolved to remove “dead ends” or unnecessary steps based on user feedback (common in Alpha).' },
    { id: 'plain-english', title: 'Plain English Content Samples', detail: 'Examples of content redesigned in plain language and tested for comprehension. For instance, teams bring excerpts of form questions or guidance text before and after content design changes, along with readability scores or user feedback confirming clarity. Simplified content is often a direct outcome of user research in Discovery/Alpha.' },
    { id: 'design-system', title: 'Use of Design System Patterns', detail: 'Evidence that the service uses established GOV.UK design patterns and components to ensure familiarity and simplicity. The team might cite specific components (e.g. address lookup, date input) from the GOV.UK Design System they implemented rather than creating new ones, thus making the service more intuitive for users. If any custom component was needed, they should show it was tested and follows accessibility guidelines.' },
    { id: 'cross-device', title: 'Cross-Device Compatibility Testing', detail: 'Results from testing the service on various browsers and devices (Alpha/Beta). For example, teams often maintain a checklist of supported browsers and present evidence the service works responsively and “on every browser or device users access it on”. This demonstrates a simple, consistent experience regardless of technology.' },
    { id: 'error-support', title: 'Error Handling and Support', detail: 'Artefacts related to how the service guides users when things go wrong. The team might show a “report a problem” link or help content embedded in the service and describe the support process for users who struggle. They may also provide examples of refined error messages or contextual help added to make completion easier (these are usually refined in Beta after observing user errors).' },
    { id: 'continuous-improvement', title: 'Continuous Improvement Evidence', detail: 'By Beta/Live, the team should present how they monitor and continually improve simplicity. This could include an analytics dashboard tracking drop-offs or frequently accessed help content, plus an action log of journey or content changes made in response. Panels often look for evidence of continuous improvement to the user journey or content based on data and feedback.' }
  ],
  5: [
    { id: 'inclusive-research', title: 'Inclusive Research Outputs', detail: 'Evidence that the team included users with a range of access needs in research from the start (Discovery/Alpha). For example, summaries of interviews or testing with users who have disabilities, are older, have low digital skills, etc., demonstrating the team understands their needs. Recruitment plans for users with access needs are also expected (often documented in Alpha).' },
    { id: 'inclusive-design', title: 'Accessibility Considerations in Design', detail: 'Artefacts showing how inclusive design principles were applied. Teams might present a list of design adjustments (like using sufficient color contrast, form labels, etc.) or outcomes from using tools like an inclusivity checker early on. They may also highlight content changes made for clarity or translation plans for non-native speakers.' },
    { id: 'assistive-tech', title: 'Assistive Tech Testing Results', detail: 'Even before formal audits, teams often do in-house testing with assistive technologies (screen readers, screen magnifiers, voice input). They might provide a brief report of these early findings (Alpha/Beta) to prove they iterated the service to accommodate assistive tech users.' },
    { id: 'audit', title: 'Accessibility Audit Report', detail: 'A professional accessibility audit report (usually by Beta) is a critical artefact. GDS requires teams to get an external audit and fix any issues before public beta. Teams will present the audit findings and a list of fixes implemented, showing WCAG 2.1/2.2 AA compliance.' },
    { id: 'statement', title: 'Accessibility Statement', detail: 'By the time a service enters public Beta, it must have a published accessibility statement explaining the service’s accessibility level. The team should have this document ready (even if draft in private beta) and provide it as evidence.' },
    { id: 'assisted-digital', title: 'Assistive Digital Support Materials', detail: 'Documentation of how users who cannot use the digital service will be supported (often prepared by Beta). This may include call centre scripts, help desk training guides, or arrangements with assisted digital partners. Showing that these routes have been tested (e.g. a trial run of the phone support process) is also valuable.' },
    { id: 'ongoing-checks', title: 'Ongoing Accessibility Checks', detail: 'For Live services, teams should present how they will continuously ensure accessibility – e.g. scheduling regular re-audits, monitoring for new issues, and keeping the accessibility statement up to date. Continual testing with users with access needs (with evidence of those sessions) is expected throughout Beta and Live. Panels look for a culture of not treating accessibility as one-off, but as an ongoing commitment.' }
  ],
  6: [
    { id: 'team-composition', title: 'Team Composition Overview', detail: 'A list or chart of the team members and roles is a common artefact at Alpha assessments. It should show a diverse mix of skills – typically product manager, delivery manager, user researcher, service designer/UX, content designer, tech lead/developers, QA, and others as needed. Assessors will verify that “the right team roles are in place to deliver the service” for the current phase.' },
    { id: 'role-responsibilities', title: 'Role Descriptions & Responsibilities', detail: 'Sometimes teams bring brief role descriptions or explain how each discipline contributes to delivery. For example, noting that a performance analyst or accessibility specialist is involved by Beta if those skills are needed. This gives confidence that all aspects (user research, design, tech, ops, etc.) are covered by capable people.' },
    { id: 'collaboration', title: 'Evidence of Collaborative Working', detail: 'Artefacts that illustrate how the team works together can bolster this standard. This might include a screenshot of an agile board where stories are tagged by discipline, or excerpts from show-and-tell slides demonstrating contributions from multiple disciplines. The key is to show decisions are made collectively rather than silos.' },
    { id: 'service-owner', title: 'Service Owner Identification', detail: 'If applicable, the team should name the service owner (usually a senior manager accountable for the service) and explain how that person is engaged. While not a “document” per se, it’s evidence of governance and leadership within the team.' },
    { id: 'knowledge-transfer', title: 'Knowledge Transfer Plan', detail: 'For teams including contractors or external suppliers, a documented plan for sharing knowledge and transitioning to permanent staff is expected (in Alpha/Beta). The team might present a handover checklist, paired working arrangements, or mentorship plans to ensure no skill gaps when contractors roll off. Not having such a plan is a red flag.' },
    { id: 'scaling-plan', title: 'Scaling Plan for Live', detail: 'By Beta, teams often prepare for how they will support and operate the service at scale. An artefact here could be an organisation chart or RACI for the Live phase, showing on-call engineers, support roles, etc. Assessors look for a clear plan of “who does what” once live.' },
    { id: 'decision-logs', title: 'Decision Logs / Meeting Notes', detail: 'If relevant, the team can show evidence that all roles input into decisions. For instance, meeting minutes or design review notes indicating developers, designers, and researchers collectively evaluated options.' },
    { id: 'team-health', title: 'Team Health Materials', detail: 'Occasionally, teams share results of retrospectives or team health checks to illustrate continuous improvement in ways of working (this is optional but can underscore effective multidisciplinary culture).' }
  ],
  7: [
    { id: 'agile-tools', title: 'Agile Project Tools', detail: 'A snapshot or demonstration of the team’s agile tool (e.g. Jira, Trello, Azure DevOps board) is a common artefact to prove agile working. It should show a prioritised backlog of user stories or tasks, work-in-progress, and recent iterations.' },
    { id: 'iteration-records', title: 'Iteration Records (Design/Tech)', detail: 'Teams often maintain a design history or change log to document what was built, tested, and changed sprint by sprint. Presenting a design history blog or log entries is effective evidence that changes to the service are based on user research feedback and testing and that the team is continuously iterating.' },
    { id: 'risk-log', title: 'Risk and Hypothesis Log', detail: 'In agile, tackling the riskiest assumptions first is key. The team might show a log of assumptions/hypotheses identified in Discovery and how they were tested in Alpha.' },
    { id: 'governance', title: 'Governance Evidence with Agility', detail: 'Agile teams still meet governance needs, so evidence here could be lightweight governance documents or OKRs. Panels appreciate seeing evidence that governance is being managed with measurable goals in an outcomes-driven way.' },
    { id: 'stakeholder-logs', title: 'Stakeholder Decision Logs', detail: 'Examples where senior stakeholders gave rapid feedback or approval in sprint cycles. Meeting notes or emails showing a sponsor agreed to a pivot can serve as evidence.' },
    { id: 'velocity', title: 'Team Velocity and Cadence Info', detail: 'Sprint cadence, show-and-tells, burn-down charts or velocity metrics showing realistic planning and improvement.' },
    { id: 'continuous-delivery', title: 'Continuous Delivery Pipeline', detail: 'Evidence that the team can deploy frequently, such as an automated build/deploy pipeline and multiple deployments per week.' }
  ],
  8: [
    { id: 'design-history', title: 'Change Log / Design History', detail: 'A detailed change log or public design history listing features changed over time and why. Panels often look for such consolidated evidence that the service has evolved frequently between phases.' },
    { id: 'analytics-feedback', title: 'Analytics and Feedback Loops', detail: 'Examples of how real user data and feedback drive improvements. This might include analytics dashboards and case studies where metrics informed a change.' },
    { id: 'continuous-deploy', title: 'Continuous Deployment Evidence', detail: 'A CI/CD pipeline setup demonstrating rapid releases, with evidence of frequent deployments and automation.' },
    { id: 'content-review', title: 'Content Review Process', detail: 'Schedule or process for regular content audits and updates to keep guidance up-to-date.' },
    { id: 'improvement-backlog', title: 'Backlog of Improvements', detail: 'A backlog specifically earmarked for improvements, ensuring ongoing enhancements are planned.' },
    { id: 'iterative-examples', title: 'Examples of Iterative Changes', detail: 'Concrete before-and-after examples supported by data showing frequent iteration.' },
    { id: 'future-evolution', title: 'Plan for Future Evolution', detail: 'Roadmap of upcoming iterations responding to emerging needs or tech changes.' }
  ],
  9: [
    { id: 'privacy-mapping', title: 'Data & Privacy Mapping', detail: 'Early-phase artefacts include data flow diagrams and a list of personal data the service will handle. Teams often show they have identified the minimum personal data required from users and mapped out where it flows, to demonstrate privacy by design. A Data Protection Impact Assessment (DPIA) is typically started in Discovery/Alpha and presented as evidence that privacy risks are understood and being addressed.' },
    { id: 'security-engagement', title: 'Security Engagement Evidence', detail: 'Panels expect to see that the team has involved security experts early. This could be an email or report from the department’s Information Security team providing initial guidance, confirming the team engaged with a security advisor and has a plan for security assurance.' },
    { id: 'threat-model', title: 'Threat Model / “Evil User” Artefacts', detail: 'Some teams create threat models or “anti-personas” for malicious actors. Presenting a summary of identified threats and mitigations (Alpha) shows proactive thinking about security.' },
    { id: 'tech-architecture', title: 'Technical Architecture & Feasibility', detail: 'A technical architecture document or diagram highlighting security features (encryption, authentication, access control) is a key artefact by Alpha/Beta. The team should prove the proposed solution is technically feasible and meets required security standards.' },
    { id: 'security-testing', title: 'Security Test Results', detail: 'By Beta, the team must present results of security testing, including penetration test reports and vulnerability scans or OWASP Top 10 reviews.' },
    { id: 'risk-register', title: 'Risk Register', detail: 'A security risk register listing identified risks, their severities, and mitigation status, with clear owners.' },
    { id: 'security-policies', title: 'Security Policies & Compliance', detail: 'Documentation on compliance with security and privacy regulations (GDPR plan, records of processing, cookie policy) and departmental security standards.' },
    { id: 'operational-security', title: 'Operational Security Preparedness', detail: 'Artefacts like an asset register and an incident response plan indicating readiness to handle incidents.' },
    { id: 'privacy-plans', title: 'Privacy and Decommissioning Plans', detail: 'Plans for data retention, deletion, and safe decommissioning or archiving.' }
  ],
  10: [
    { id: 'metrics-framework', title: 'Success Metrics Framework', detail: 'An explicit definition of success, often a metrics framework document listing KPIs and why they were chosen.' },
    { id: 'baseline-data', title: 'Baseline Data and Analysis', detail: 'Baseline performance data from existing services or processes to benchmark improvement.' },
    { id: 'measurement-plan', title: 'Performance Measurement Plan', detail: 'How data will be collected for each KPI, including analytics setup and research methods.' },
    { id: 'analytics-implementation', title: 'Analytics Implementation Evidence', detail: 'Live analytics dashboards or reports showing required metrics being tracked.' },
    { id: 'performance-reports', title: 'Performance Reports and Reviews', detail: 'Sample reports demonstrating how data is interpreted and acted upon.' },
    { id: 'qualitative-feedback', title: 'Qualitative Feedback Integration', detail: 'Summary of feedback themes or case studies illustrating outcomes.' },
    { id: 'data-driven-improvement', title: 'Evidence of Data-Driven Improvement', detail: 'Examples where data revealed an issue and the team responded with changes.' },
    { id: 'stakeholder-metrics', title: 'Stakeholder Engagement with Metrics', detail: 'Evidence metrics are shared with stakeholders and inform decisions.' },
    { id: 'publishing', title: 'Publishing and Transparency', detail: 'Plan or evidence of publishing performance data on an appropriate platform.' }
  ],
  11: [
    { id: 'options-analysis', title: 'Options Analysis & Decision Records', detail: 'Options appraisal or ADRs showing considered approaches and rationale.' },
    { id: 'architecture-diagram', title: 'Technical Architecture Diagram', detail: 'High-level architecture showing components, APIs and integrations.' },
    { id: 'stack-alignment', title: 'Alignment with Standards/Stacks', detail: 'Evidence the solution aligns with departmental or GOV.UK recommended stacks.' },
    { id: 'security-accessibility', title: 'Security and Accessibility in Tech Choices', detail: 'Evidence non-functional requirements guided tool selection.' },
    { id: 'value-for-money', title: 'Value for Money Rationale', detail: 'Cost comparisons or reuse of existing services and licences.' },
    { id: 'tech-feasibility', title: 'Proof of Technical Feasibility', detail: 'Spikes or prototypes confirming the approach works.' },
    { id: 'architecture-docs', title: 'Documentation of Architecture & Plans', detail: 'Reviewed architecture documents and decision records.' },
    { id: 'revisit-decisions', title: 'Plan to Revisit Decisions', detail: 'Roadmap or ADRs that commit to re-evaluating choices.' },
    { id: 'support-plan', title: 'Sustainability & Support Plans', detail: 'Support model and approach to updates and patches.' }
  ],
  12: [
    { id: 'public-repo', title: 'Public Repository Links', detail: 'Link to the public source code repository (usually on GitHub), showing compliance with “open by default”.' },
    { id: 'open-license', title: 'Open Source License', detail: 'An explicit OSS license (MIT, Apache 2.0, etc.) included in the repo.' },
    { id: 'no-secrets', title: 'No Secrets in Repo', detail: 'Evidence of good practice for handling secrets (environment variables, secrets management).' },
    { id: 'contribution-docs', title: 'Contribution Docs', detail: 'README or contribution guide showing the code is approachable.' },
    { id: 'published-packages', title: 'Published Packages (if applicable)', detail: 'Reusable libraries published to npm, PyPI, etc.' },
    { id: 'open-process', title: 'Open Development Process', detail: 'Evidence of open PRs, issues and community engagement.' },
    { id: 'open-exceptions', title: 'Plan for Remaining Closed Parts', detail: 'Plan or timeline to open any exceptions.' }
  ],
  13: [
    { id: 'design-system', title: 'Use of GOV.UK Design System and Patterns', detail: 'Annotated screenshots showing reuse of GOV.UK patterns and components.' },
    { id: 'common-platforms', title: 'Reuse of Common Platforms', detail: 'Integration with shared government components like Notify, Pay, Sign-in.' },
    { id: 'open-standards', title: 'Open Standards Adherence', detail: 'Evidence of open API/data standards and accessible formats.' },
    { id: 'contributions', title: 'Contribution Back to Community', detail: 'PRs or published components/patterns shared for reuse.' },
    { id: 'design-history', title: 'Design History / Decision Logs', detail: 'Design history site or ADRs published openly.' },
    { id: 'collaboration', title: 'Collaboration with Other Teams', detail: 'Evidence of cross-government collaboration and shared learning.' },
    { id: 'no-reinvention', title: 'No Reinvention Evidence', detail: 'Survey of existing solutions and rationale for choices.' },
    { id: 'open-tech', title: 'Exemplar Use of Open Tech', detail: 'Evidence the stack is built on open-source technologies.' },
    { id: 'open-standards-challenge', title: 'Open Standards Challenge Solutions', detail: 'Evidence of compliance with domain-specific open standards.' }
  ],
  14: [
    { id: 'monitoring', title: 'Uptime and Performance Monitoring', detail: 'Live monitoring dashboards showing uptime, response times and error rates.' },
    { id: 'cicd', title: 'Continuous Integration/Delivery Pipeline', detail: 'Pipeline configuration showing frequent, low-risk releases.' },
    { id: 'load-testing', title: 'Load Testing Results', detail: 'Performance testing evidence, including response times under load.' },
    { id: 'disaster-recovery', title: 'Failover and Disaster Recovery Plans', detail: 'DR plans, backup/restore procedures and test results.' },
    { id: 'runbooks', title: 'Runbooks and Ops Manuals', detail: 'Operational manuals for handling incidents and deployments.' },
    { id: 'incident-management', title: 'Incident Management Process', detail: 'Defined process for detection, response, recovery and review.' },
    { id: 'on-call', title: 'On-Call Rota and Support Arrangement', detail: 'Support model and escalation paths for the service.' },
    { id: 'slas', title: 'Service Level Agreements (SLAs)', detail: 'Defined SLAs or SLOs and how they are tracked.' },
    { id: 'capacity-planning', title: 'Capacity Planning Docs', detail: 'Scaling plans and evidence of capacity testing.' },
    { id: 'maintenance', title: 'Maintenance and Patching Strategy', detail: 'Policy for updates, patches and maintenance windows.' },
    { id: 'exemplars', title: 'Exemplars', detail: 'Evidence of learning from incident reviews and reliability improvements.' }
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
  initTabs();
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
  initTabs();
}

function initTabs() {
  document.querySelectorAll('.govuk-tabs').forEach((tabs) => {
    if (tabs.dataset.ssTabsInit === 'true') return;
    const tabLinks = tabs.querySelectorAll('.govuk-tabs__tab');
    const panels = tabs.querySelectorAll('.govuk-tabs__panel');
    tabLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = link.getAttribute('href')?.replace('#', '');
        if (!targetId) return;
        tabs.querySelectorAll('.govuk-tabs__list-item').forEach((item) => {
          item.classList.remove('govuk-tabs__list-item--selected');
        });
        link.closest('.govuk-tabs__list-item')?.classList.add('govuk-tabs__list-item--selected');
        panels.forEach((panel) => panel.classList.add('govuk-tabs__panel--hidden'));
        const targetPanel = tabs.querySelector(`#${targetId}`);
        if (targetPanel) {
          targetPanel.classList.remove('govuk-tabs__panel--hidden');
        }
      });
    });
    tabs.dataset.ssTabsInit = 'true';
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

function extractPhases(text) {
  const phases = [];
  const source = (text || '').toLowerCase();
  if (source.includes('discovery')) phases.push('Discovery');
  if (source.includes('alpha')) phases.push('Alpha');
  if (source.includes('beta')) phases.push('Beta');
  if (source.includes('live')) phases.push('Live');
  return phases;
}

function phaseTagsFromText(text) {
  const phases = extractPhases(text);
  const safePhases = phases.length ? phases : ['Alpha', 'Beta', 'Live'];
  const classes = {
    Discovery: 'govuk-tag--blue',
    Alpha: 'govuk-tag--yellow',
    Beta: 'govuk-tag--orange',
    Live: 'govuk-tag--green'
  };
  return safePhases
    .map((phase) => `<strong class="govuk-tag ${classes[phase] || 'govuk-tag--grey'}">${phase}</strong>`)
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
  const artefactsMarkup = `
    <div class="ss-artefacts">
      ${artefacts
        .map(
          (item) => `
          <div class="ss-artefacts__item">
            <div class="ss-artefacts__heading">
              <h3 class="govuk-heading-s ss-artefacts__title">${item.title}</h3>
              <div class="ss-artefacts__phases">${phaseTagsFromText(item.detail)}</div>
            </div>
            <p class="govuk-body ss-artefacts__detail">${item.detail}</p>
          </div>
        `
        )
        .join('')}
    </div>
  `;

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
        <h2 class="govuk-heading-m">Artefacts and evidence</h2>
        <p class="govuk-body">Below are examples of artefacts or evidence a multidisciplinary team commonly presents at Alpha, Beta, or Live service assessments. Each standard’s section lists relevant artefacts, noting when certain items are especially expected (for example, required by Beta or commonly produced in Alpha).</p>
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
