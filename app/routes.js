const govukPrototypeKit = require("govuk-prototype-kit");
const router = govukPrototypeKit.requests.setupRouter();
const multer = require("multer");
const serviceStandardsTemplate = require("./data/service-standards");
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 },
});

function cloneStandards() {
  return JSON.parse(JSON.stringify(serviceStandardsTemplate)).map((standard) => {
    return {
      id: standard.id,
      number: standard.number,
      title: standard.title,
      description: standard.description,
      serviceManualUrl: standard.serviceManualUrl,
      overallRagStatus: "pending",
      subsections: standard.subsections.map((subsection) => ({
        id: subsection.id,
        title: subsection.title,
        guidanceText: subsection.guidanceText,
        serviceManualDetail: subsection.serviceManualDetail,
        notes: "",
        ragStatus: "pending",
        comments: [],
      })),
    };
  });
}

function hydrateStandards(existingStandards = []) {
  return serviceStandardsTemplate.map((templateStandard) => {
    const existingStandard = existingStandards.find(
      (standard) => standard.id === templateStandard.id
    );

    const mergedSubsections = templateStandard.subsections.map((templateSubsection) => {
      const existingSubsection =
        existingStandard &&
        existingStandard.subsections &&
        existingStandard.subsections.find(
          (subsection) => subsection.id === templateSubsection.id
        );

      return {
        id: templateSubsection.id,
        title: templateSubsection.title,
        guidanceText: templateSubsection.guidanceText,
        serviceManualDetail: templateSubsection.serviceManualDetail,
        notes: existingSubsection ? existingSubsection.notes : "",
        ragStatus: existingSubsection ? existingSubsection.ragStatus : "pending",
        comments: existingSubsection && existingSubsection.comments ? existingSubsection.comments : [],
      };
    });

    return {
      id: templateStandard.id,
      number: templateStandard.number,
      title: templateStandard.title,
      description: templateStandard.description,
      serviceManualUrl: templateStandard.serviceManualUrl,
      overallRagStatus: existingStandard ? existingStandard.overallRagStatus : "pending",
      subsections: mergedSubsections,
    };
  });
}

function ensureProjectSchema(project) {
  project.serviceStandards = hydrateStandards(project.serviceStandards);
  project.serviceStandards.forEach((standard) => {
    standard.subsections.forEach((subsection) => {
      if (subsection.notes && (!subsection.comments || subsection.comments.length === 0)) {
        subsection.comments = [
          {
            id: `comment-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            text: subsection.notes,
            ragStatus: subsection.ragStatus || "pending",
          },
        ];
        subsection.notes = "";
      }
    });
  });
  return project;
}

function createImportedProject(rawProject) {
  const imported = {
    id: `project-${Date.now()}`,
    name: rawProject.name || "Imported service",
    department: rawProject.department || "",
    objectives: rawProject.objectives || "",
    description: rawProject.description || "",
    currentPhase: rawProject.currentPhase || "Discovery",
    nextAssessmentType: rawProject.nextAssessmentType || "",
    serviceStandards: rawProject.serviceStandards || [],
  };

  return ensureProjectSchema(imported);
}

function getProjects(req) {
  if (!req.session.data.projects) {
    req.session.data.projects = [];
  }
  req.session.data.projects = req.session.data.projects.map(ensureProjectSchema);
  return req.session.data.projects;
}

function ragLabel(status) {
  const labels = {
    red: "Red",
    amber: "Amber",
    green: "Green",
    pending: "Pending",
  };

  return labels[status] || "Pending";
}

function ragClass(status) {
  const classes = {
    red: "govuk-tag--red",
    amber: "govuk-tag--orange",
    green: "govuk-tag--green",
    pending: "govuk-tag--grey",
  };

  return classes[status] || "govuk-tag--grey";
}

function calculateSubsectionStatus(subsection) {
  const statuses = (subsection.comments || []).map((comment) => comment.ragStatus);
  if (statuses.includes("red")) return "red";
  if (statuses.includes("amber")) return "amber";
  if (statuses.includes("green")) return "green";
  return "pending";
}

function calculateStandardStatus(standard) {
  const statuses = standard.subsections.map((subsection) =>
    calculateSubsectionStatus(subsection)
  );
  if (statuses.includes("red")) return "red";
  if (statuses.includes("amber")) return "amber";
  if (statuses.includes("green")) return "green";
  return "pending";
}

function calculateProjectStatus(project) {
  const statuses = project.serviceStandards.map((standard) =>
    calculateStandardStatus(standard)
  );
  if (statuses.includes("red")) return "red";
  if (statuses.includes("amber")) return "amber";
  if (statuses.includes("green")) return "green";
  return "pending";
}

function findProject(req, projectId) {
  const projects = getProjects(req);
  return projects.find((project) => project.id === projectId);
}

function findStandard(project, standardId) {
  return project.serviceStandards.find((standard) => standard.id === standardId);
}

function findSubsection(standard, subsectionId) {
  return standard.subsections.find((subsection) => subsection.id === subsectionId);
}

function findComment(subsection, commentId) {
  return subsection.comments.find((comment) => comment.id === commentId);
}

router.use((req, res, next) => {
  res.locals.projects = getProjects(req);
  res.locals.calculateProjectStatus = calculateProjectStatus;
  res.locals.calculateStandardStatus = calculateStandardStatus;
  res.locals.calculateSubsectionStatus = calculateSubsectionStatus;
  res.locals.ragLabel = ragLabel;
  res.locals.ragClass = ragClass;
  next();
});

router.get("/", (req, res) => {
  const projects = getProjects(req);
  const projectRows = projects.map((project) => {
    const status = calculateProjectStatus(project);

    return [
      { html: '<a class="govuk-link" href="/projects/' + project.id + '">' + project.name + '</a>' },
      { text: project.department || "" },
      { text: project.currentPhase || "" },
      { html: '<span class="govuk-tag ' + ragClass(status) + '">' + ragLabel(status) + '</span>' },
    ];
  });

  res.render("index", {
    projectRows,
  });
});

  router.get("/projects/add", (req, res) => {
    res.render("projects/add");
  });

  router.get("/projects/import", (req, res) => {
    res.render("projects/import");
  });

  router.post("/projects/add", (req, res) => {
    const projects = getProjects(req);
  const projectId = `project-${Date.now()}`;

  const project = {
    id: projectId,
    name: req.body.projectName || "Untitled service",
    department: req.body.department || "",
    objectives: req.body.objectives || "",
    description: req.body.description || "",
    currentPhase: req.body.currentPhase || "Discovery",
    nextAssessmentType: req.body.nextAssessmentType || "",
    serviceStandards: cloneStandards(),
  };

  projects.push(project);

    res.redirect("/");
  });

  router.post("/projects/import", upload.single("projectFile"), (req, res) => {
    if (!req.file) {
      return res.render("projects/import", {
        errorMessage: "Select a JSON file to upload.",
      });
    }

    try {
      const payload = JSON.parse(req.file.buffer.toString("utf8"));
      const projects = getProjects(req);
      const importedProject = createImportedProject(payload);
      projects.push(importedProject);
      return res.redirect(`/projects/${importedProject.id}`);
    } catch (error) {
      return res.render("projects/import", {
        errorMessage: "The file could not be read. Upload a valid JSON export.",
      });
    }
  });

  router.get("/projects/:projectId", (req, res) => {
    const project = findProject(req, req.params.projectId);

  if (!project) {
    return res.status(404).render("not-found");
  }

    return res.render("projects/show", {
      project,
    });
  });

  router.get("/projects/:projectId/export", (req, res) => {
    const project = findProject(req, req.params.projectId);

    if (!project) {
      return res.status(404).render("not-found");
    }

    const filename = `${project.name || "project"}-${project.id}.json`
      .toLowerCase()
      .replace(/\\s+/g, "-")
      .replace(/[^a-z0-9\\-_.]/g, "");

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Content-Disposition", `attachment; filename=\"${filename}\"`);
    return res.send(JSON.stringify(project, null, 2));
  });

router.get("/projects/:projectId/standards/:standardId", (req, res) => {
  const project = findProject(req, req.params.projectId);

  if (!project) {
    return res.status(404).render("not-found");
  }

  const standard = findStandard(project, req.params.standardId);

  if (!standard) {
    return res.status(404).render("not-found");
  }

  return res.render("standards/show", {
    project,
    standard,
  });
});

  router.get(
    "/projects/:projectId/standards/:standardId/subsections/:subsectionId",
    (req, res) => {
    const project = findProject(req, req.params.projectId);

    if (!project) {
      return res.status(404).render("not-found");
    }

    const standard = findStandard(project, req.params.standardId);

    if (!standard) {
      return res.status(404).render("not-found");
    }

    const subsection = findSubsection(standard, req.params.subsectionId);

    if (!subsection) {
      return res.status(404).render("not-found");
    }

      return res.render("standards/edit-subsection", {
        project,
        standard,
        subsection,
        formAction: `/projects/${project.id}/standards/${standard.id}/subsections/${subsection.id}`,
        submitText: "Add comment",
      });
    }
  );

  router.get(
    "/projects/:projectId/standards/:standardId/subsections/:subsectionId/comments/:commentId/edit",
    (req, res) => {
      const project = findProject(req, req.params.projectId);

      if (!project) {
        return res.status(404).render("not-found");
      }

      const standard = findStandard(project, req.params.standardId);

      if (!standard) {
        return res.status(404).render("not-found");
      }

      const subsection = findSubsection(standard, req.params.subsectionId);

      if (!subsection) {
        return res.status(404).render("not-found");
      }

      const comment = findComment(subsection, req.params.commentId);

      if (!comment) {
        return res.status(404).render("not-found");
      }

      return res.render("standards/edit-subsection", {
        project,
        standard,
        subsection,
        comment,
        formAction: `/projects/${project.id}/standards/${standard.id}/subsections/${subsection.id}/comments/${comment.id}/edit`,
        submitText: "Save changes",
      });
    }
  );

  router.post(
    "/projects/:projectId/standards/:standardId/subsections/:subsectionId",
    (req, res) => {
    const project = findProject(req, req.params.projectId);

    if (!project) {
      return res.status(404).render("not-found");
    }

    const standard = findStandard(project, req.params.standardId);

    if (!standard) {
      return res.status(404).render("not-found");
    }

    const subsection = findSubsection(standard, req.params.subsectionId);

      if (!subsection) {
        return res.status(404).render("not-found");
      }

      if (!subsection.comments) {
        subsection.comments = [];
      }

      const commentText = req.body.notes || "";
      const ragStatus = req.body.ragStatus || "pending";

      if (commentText.trim()) {
        subsection.comments.push({
          id: `comment-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          text: commentText.trim(),
          ragStatus,
        });
      }

      return res.redirect(`/projects/${project.id}/standards/${standard.id}`);
    }
  );

  router.post(
    "/projects/:projectId/standards/:standardId/subsections/:subsectionId/comments/:commentId/edit",
    (req, res) => {
      const project = findProject(req, req.params.projectId);

      if (!project) {
        return res.status(404).render("not-found");
      }

      const standard = findStandard(project, req.params.standardId);

      if (!standard) {
        return res.status(404).render("not-found");
      }

      const subsection = findSubsection(standard, req.params.subsectionId);

      if (!subsection) {
        return res.status(404).render("not-found");
      }

      const comment = findComment(subsection, req.params.commentId);

      if (!comment) {
        return res.status(404).render("not-found");
      }

      const updatedText = req.body.notes || "";
      const updatedRag = req.body.ragStatus || "pending";

      if (updatedText.trim()) {
        comment.text = updatedText.trim();
      }
      comment.ragStatus = updatedRag;

      return res.redirect(`/projects/${project.id}/standards/${standard.id}`);
    }
  );

module.exports = router;
