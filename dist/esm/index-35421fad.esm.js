import { useEntity } from '@backstage/plugin-catalog-react';
import { Paper, Card, CardContent, Typography, Grid, Avatar, IconButton, Chip, Accordion, AccordionSummary, AccordionDetails, Modal, Box, InputLabel, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { useAsync } from 'react-use';
import { k as keptnApiRef, u as useProjectKey, K as KEPTN_PROJECT_KEY_ANNOTATION, a as useServiceKey, b as KEPTN_SERVICE_KEY_ANNOTATION } from './index-3f54264a.esm.js';
import { InfoCard, Progress, MissingAnnotationEmptyState, EmptyState } from '@backstage/core-components';
import SyncIcon from '@material-ui/icons/Sync';
import { useApi } from '@backstage/core-plugin-api';
import InfoIcon from '@material-ui/icons/Info';
import ArrowUpwardTwoTone from '@material-ui/icons/ArrowUpwardTwoTone';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckBox from '@material-ui/icons/CheckBox';
import Search from '@material-ui/icons/Search';
import NewReleases from '@material-ui/icons/NewReleases';
import ArrowDownwardSharp from '@material-ui/icons/ArrowDownwardSharp';

const useStyles$7 = makeStyles((theme) => ({
  badgeError: {
    backgroundColor: theme.palette.error.main
  },
  badgeSuccess: {
    backgroundColor: theme.palette.success.main
  },
  badgeUnknown: {
    backgroundColor: theme.palette.grey[500]
  },
  label: {
    color: theme.palette.text.secondary,
    fontSize: "10px",
    textTransform: "uppercase",
    marginTop: theme.spacing(1),
    fontWeight: "bold"
  },
  serviceName: {
    fontSize: "1.2rem",
    textTransform: "uppercase"
  }
}));
const StageCard = ({ stage }) => {
  const classes = useStyles$7();
  const badgeColor = (service) => {
    if (Object.keys(service.lastEventTypes).length === 0) {
      return classes.badgeUnknown;
    }
    const s = service.latestSequence.stages[0];
    if (!s.latestFailedEvent) {
      return classes.badgeSuccess;
    }
    if (s.latestFailedEvent.id === s.latestEvent.id) {
      return classes.badgeError;
    }
    return classes.badgeError;
  };
  const badgeLabel = (service) => {
    if (Object.keys(service.lastEventTypes).length === 0) {
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Typography, {
        className: classes.serviceName
      }, service.serviceName), /* @__PURE__ */ React.createElement(Typography, null, "-"));
    }
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Typography, {
      className: classes.serviceName
    }, service.serviceName), /* @__PURE__ */ React.createElement(Typography, {
      className: classes.label
    }, "Last Sequence Name"), /* @__PURE__ */ React.createElement(Typography, null, service.latestSequence.name), /* @__PURE__ */ React.createElement(Typography, {
      className: classes.label
    }, "Deployed Image"), /* @__PURE__ */ React.createElement(Typography, null, service.deployedImage));
  };
  return /* @__PURE__ */ React.createElement(Paper, {
    elevation: 1
  }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardContent, null, /* @__PURE__ */ React.createElement(Typography, {
    variant: "h5",
    component: "div",
    style: { marginBottom: 10, textTransform: "uppercase" }
  }, stage.stageName), stage.services.map((service, key) => /* @__PURE__ */ React.createElement(Grid, {
    container: true,
    wrap: "nowrap",
    spacing: 2,
    key
  }, /* @__PURE__ */ React.createElement(Grid, {
    item: true
  }, /* @__PURE__ */ React.createElement(Avatar, {
    classes: { root: badgeColor(service) }
  }, /* @__PURE__ */ React.createElement(InfoIcon, null))), /* @__PURE__ */ React.createElement(Grid, {
    item: true,
    xs: true
  }, badgeLabel(service)))))));
};

const useStyles$6 = makeStyles((theme) => ({
  disabled: {
    backgroundColor: theme.palette.background.default,
    boxSizing: "border-box",
    width: "100%",
    paddingTop: "10px"
  },
  syncButton: {
    marginTop: "10px",
    marginRight: "10px"
  }
}));
const ProjectCard = ({
  variant = "gridItem"
}) => {
  const { entity } = useEntity();
  const classes = useStyles$6();
  const keptnApi = useApi(keptnApiRef);
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(false);
  const projectTitle = useProjectKey(entity);
  const loadData = async () => {
    setLoading(true);
    await keptnApi.getProject(projectTitle).then((res) => {
      setLoading(false);
      setValue(res);
    });
  };
  useAsync(loadData, [keptnApi, projectTitle]);
  return /* @__PURE__ */ React.createElement(InfoCard, {
    title: `Keptn: ${projectTitle}`,
    action: !loading && /* @__PURE__ */ React.createElement(IconButton, {
      "aria-label": "settings",
      onClick: loadData,
      className: classes.syncButton
    }, /* @__PURE__ */ React.createElement(SyncIcon, null)),
    variant,
    className: loading ? classes.disabled : void 0
  }, /* @__PURE__ */ React.createElement(CardContent, null, loading && /* @__PURE__ */ React.createElement(Progress, null), !loading && !projectTitle && /* @__PURE__ */ React.createElement(MissingAnnotationEmptyState, {
    annotation: KEPTN_PROJECT_KEY_ANNOTATION
  }), !loading && projectTitle && !value && /* @__PURE__ */ React.createElement(EmptyState, {
    missing: "info",
    title: "No information to display",
    description: `There is no Keptn project with key '${projectTitle}'.`
  }), !loading && value && /* @__PURE__ */ React.createElement(Grid, {
    item: true,
    container: true,
    direction: "row",
    alignItems: "flex-start",
    spacing: 2
  }, value.stages.map((stage, key) => /* @__PURE__ */ React.createElement(Grid, {
    item: true,
    md: 4,
    xs: 4,
    key
  }, /* @__PURE__ */ React.createElement(StageCard, {
    stage
  }))))));
};

const KeptnLogo = () => {
  return /* @__PURE__ */ React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 607.1 594.1",
    style: {
      enableBackground: "new 0 0 607.1 594.1"
    },
    xmlSpace: "preserve"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M283 4.7c12.9-6.2 28-6.2 40.9 0 46.4 22.4 159.1 76.7 205.4 99 12.9 6.2 22.3 18 25.5 32 11.4 50.2 39.3 172.3 50.7 222.5 3.2 14-.2 28.6-9.1 39.8-32.1 40.3-110.1 138.2-142.2 178.4a47.18 47.18 0 0 1-36.9 17.8h-228c-14.3 0-27.9-6.5-36.9-17.8C120.5 536.2 42.5 438.3 10.5 398c-8.9-11.2-12.3-25.9-9.1-39.8C12.8 308 40.7 185.9 52.1 135.7c3.2-14 12.6-25.8 25.5-32C124 81.3 236.7 27 283 4.7z",
    style: {
      fillRule: "evenodd",
      clipRule: "evenodd",
      fill: "#fff"
    }
  }), /* @__PURE__ */ React.createElement("path", {
    d: "m584.4 265.1 21.5 94.1c3 13.3-.1 27.2-8.6 37.9-31.9 40-111.7 140.1-143.6 180.1-8.5 10.7-21.4 16.9-35 16.9h-96.6l262.3-329zm-13.3-58.4L262.2 594.1h-53.4l350.5-439.5 11.8 52.1zM498.3 88.9l32.2 15.5c2.1 1 4.1 2.2 6 3.5L158.1 582.3c-1.7-1.6-3.3-3.3-4.8-5.1L131 549.3 498.3 88.9zM454.9 68 101.1 511.7l-26.7-33.5L416.3 49.4 454.9 68zM155 191.7c11.8-14.8 33.5-17.3 48.3-5.4 14.8 11.8 17.3 33.5 5.4 48.3-11.8 14.8-33.5 17.3-48.3 5.4-14.8-11.8-17.2-33.4-5.4-48.3zm7.8 100.4L44.4 440.6 9.8 397.2c-8.5-10.7-11.7-24.6-8.6-37.9C12.5 309.4 41 184.6 52.4 134.7c3-13.3 11.9-24.5 24.2-30.4C122.7 82.2 238 26.6 284.1 4.4c12.3-5.9 26.6-5.9 38.9 0l50 24.1L254.6 177c-5.1-10.3-12.5-19.7-22.1-27.4-35.1-28-86.2-22.2-114.2 12.9s-22.2 86.2 12.9 114.2c9.6 7.6 20.4 12.8 31.6 15.4z",
    style: {
      fillRule: "evenodd",
      clipRule: "evenodd",
      fill: "#016bba"
    }
  }));
};

const useStyles$5 = makeStyles(() => ({
  serviceName: {
    fontSize: "1.2rem",
    textTransform: "uppercase"
  },
  artifact: {
    marginBottom: "10px"
  },
  image: {
    marginLeft: "10px"
  }
}));
const Service = ({ service }) => {
  const classes = useStyles$5();
  return /* @__PURE__ */ React.createElement(Grid, {
    container: true,
    wrap: "nowrap",
    spacing: 2
  }, /* @__PURE__ */ React.createElement(Grid, {
    item: true
  }, /* @__PURE__ */ React.createElement(Avatar, {
    src: KeptnLogo
  })), /* @__PURE__ */ React.createElement(Grid, {
    item: true,
    xs: true
  }, /* @__PURE__ */ React.createElement(Typography, {
    className: classes.serviceName
  }, service.name), service.deploymentInformation.map((d, key) => /* @__PURE__ */ React.createElement(React.Fragment, {
    key
  }, /* @__PURE__ */ React.createElement(Typography, {
    className: classes.artifact
  }, "Last processed artifact:", /* @__PURE__ */ React.createElement("b", {
    className: classes.image
  }, d.image, ":", d.version)), d.stages.map((s) => /* @__PURE__ */ React.createElement(Chip, {
    label: s.name,
    key: s.name
  }))))));
};

const useStyles$4 = makeStyles((theme) => ({
  disabled: {
    backgroundColor: theme.palette.background.default,
    boxSizing: "border-box",
    width: "100%",
    paddingTop: "10px"
  },
  syncButton: {
    marginTop: "10px",
    marginRight: "10px"
  }
}));
const ServiceCard = ({
  variant = "gridItem"
}) => {
  const { entity } = useEntity();
  const classes = useStyles$4();
  const keptnApi = useApi(keptnApiRef);
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(false);
  const projectTitle = useProjectKey(entity);
  const serviceName = useServiceKey(entity);
  const loadData = async () => {
    setLoading(true);
    await keptnApi.getServiceStates(projectTitle).then((res) => {
      setLoading(false);
      setValue(res);
    });
  };
  useAsync(loadData, [keptnApi, projectTitle]);
  return /* @__PURE__ */ React.createElement(InfoCard, {
    title: `Keptn: ${serviceName}@${projectTitle}`,
    action: !loading && /* @__PURE__ */ React.createElement(IconButton, {
      "aria-label": "settings",
      onClick: loadData,
      className: classes.syncButton
    }, /* @__PURE__ */ React.createElement(SyncIcon, null)),
    variant,
    className: loading ? classes.disabled : void 0
  }, /* @__PURE__ */ React.createElement(CardContent, null, loading && /* @__PURE__ */ React.createElement(Progress, null), !loading && !projectTitle && /* @__PURE__ */ React.createElement(MissingAnnotationEmptyState, {
    annotation: KEPTN_SERVICE_KEY_ANNOTATION
  }), !loading && !serviceName && /* @__PURE__ */ React.createElement(MissingAnnotationEmptyState, {
    annotation: KEPTN_SERVICE_KEY_ANNOTATION
  }), !loading && projectTitle && serviceName && !value && /* @__PURE__ */ React.createElement(EmptyState, {
    missing: "info",
    title: "No information to display",
    description: `There is no Keptn project with key '${projectTitle}'.`
  }), !loading && value && /* @__PURE__ */ React.createElement(Grid, {
    item: true,
    container: true,
    direction: "row",
    alignItems: "flex-start",
    spacing: 2
  }, /* @__PURE__ */ React.createElement(Service, {
    service: value.find((x) => x.name === serviceName)
  }))));
};

const useStyles$3 = makeStyles((theme) => ({
  grid: {
    margin: "2px 0"
  },
  title: {
    textTransform: "uppercase",
    minWidth: "150px",
    marginTop: "8px"
  },
  label: {
    color: theme.palette.text.secondary,
    fontSize: "10px",
    textTransform: "uppercase",
    fontWeight: "bold"
  },
  container: {
    margin: "5px 0"
  },
  greenChip: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    margin: "0",
    textTransform: "uppercase"
  },
  redChip: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    margin: "0",
    textTransform: "uppercase"
  }
}));
const Details = ({ group, title }) => {
  const classes = useStyles$3();
  const badgeColor = () => {
    return group[0].data.result === "pass" || !group[0].data.result ? classes.greenChip : classes.redChip;
  };
  const message = (event) => {
    var _a, _b, _c;
    if (event.data.message)
      return event.data.message;
    if ((_c = (_b = (_a = event.data) == null ? void 0 : _a.configurationChange) == null ? void 0 : _b.values) == null ? void 0 : _c.image)
      return event.data.configurationChange.values.image;
    return event.type;
  };
  const icon = () => {
    switch (title) {
      case "rollback":
        return /* @__PURE__ */ React.createElement(ArrowDownwardSharp, null);
      case "release":
        return /* @__PURE__ */ React.createElement(NewReleases, null);
      case "evaluation":
        return /* @__PURE__ */ React.createElement(Search, null);
      case "deployment":
        return /* @__PURE__ */ React.createElement(ArrowUpwardTwoTone, null);
      case "test":
        return /* @__PURE__ */ React.createElement(CheckBox, null);
      default:
        return /* @__PURE__ */ React.createElement(InfoIcon, null);
    }
  };
  return /* @__PURE__ */ React.createElement(Grid, {
    item: true,
    container: true,
    wrap: "nowrap",
    direction: "row",
    alignItems: "center",
    spacing: 2,
    className: classes.grid
  }, /* @__PURE__ */ React.createElement(Grid, {
    container: true,
    wrap: "nowrap",
    spacing: 2
  }, /* @__PURE__ */ React.createElement(Grid, {
    item: true
  }, /* @__PURE__ */ React.createElement(Avatar, {
    className: badgeColor()
  }, icon())), /* @__PURE__ */ React.createElement(Grid, {
    item: true,
    className: classes.title
  }, /* @__PURE__ */ React.createElement(Typography, null, title)), /* @__PURE__ */ React.createElement(Grid, {
    item: true
  }, group.map((event, key) => /* @__PURE__ */ React.createElement("div", {
    key,
    className: classes.container
  }, /* @__PURE__ */ React.createElement(Typography, {
    className: classes.label
  }, event.time), /* @__PURE__ */ React.createElement(Typography, null, message(event)))))));
};

const useStyles$2 = makeStyles((theme) => ({
  title: {
    textTransform: "uppercase",
    width: "100%",
    display: "flex",
    alignItems: "center",
    fontSize: "1.2rem"
  },
  greenChip: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    margin: "0",
    textTransform: "uppercase"
  },
  redChip: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    margin: "0",
    textTransform: "uppercase"
  }
}));
const Event = ({ title, event }) => {
  const classes = useStyles$2();
  const group = () => {
    return event.reduce((r, a) => {
      const t = a.type.split(".");
      r[t[3]] = [...r[t[3]] || [], a];
      return r;
    }, {});
  };
  return /* @__PURE__ */ React.createElement(Accordion, null, /* @__PURE__ */ React.createElement(AccordionSummary, {
    expandIcon: /* @__PURE__ */ React.createElement(ExpandMoreIcon, null)
  }, /* @__PURE__ */ React.createElement(Typography, {
    className: classes.title
  }, title), /* @__PURE__ */ React.createElement(Chip, {
    label: event[0].data.status,
    className: event[0].data.status.toLowerCase() === "succeeded" ? classes.greenChip : classes.redChip
  })), /* @__PURE__ */ React.createElement(AccordionDetails, null, /* @__PURE__ */ React.createElement(Grid, {
    item: true,
    container: true,
    direction: "column",
    alignItems: "flex-start",
    spacing: 2
  }, Object.entries(group()).map(([key, group2]) => /* @__PURE__ */ React.createElement(Details, {
    group: group2,
    title: key,
    key
  })))));
};

const Context = ({ s, project }) => {
  const keptnApi = useApi(keptnApiRef);
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(false);
  const loadData = async () => {
    setLoading(true);
    await keptnApi.getEvent({
      keptnContext: s.shkeptncontext,
      project,
      pageSize: 100
    }).then((res) => {
      setLoading(false);
      setValue(res);
    });
  };
  const stages = () => {
    return value.events.reduce((r, a) => {
      r[a.data.stage] = [...r[a.data.stage] || [], a];
      return r;
    }, {});
  };
  useAsync(loadData, [keptnApi, project]);
  return /* @__PURE__ */ React.createElement(Grid, {
    container: true,
    direction: "column",
    wrap: "nowrap",
    spacing: 2
  }, !loading && value && Object.entries(stages()).map(([key, event]) => /* @__PURE__ */ React.createElement(Event, {
    key,
    title: key,
    event
  })));
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3
};
const useStyles$1 = makeStyles(() => ({
  label: {
    marginTop: "10px"
  },
  textField: {
    width: "100%",
    padding: "10px 0"
  },
  sendBtn: {
    marginTop: "10px"
  }
}));
const Delivery = ({
  value,
  deliveryHandler,
  open,
  handleClose
}) => {
  const classes = useStyles$1();
  const [image, setImage] = useState(value.states[0].stages[0].image);
  const [stage, setStage] = useState(value.states[0].stages[0].name);
  return /* @__PURE__ */ React.createElement(Modal, {
    open,
    onClose: handleClose,
    "aria-labelledby": "modal-modal-title",
    "aria-describedby": "modal-modal-description"
  }, /* @__PURE__ */ React.createElement(Box, {
    sx: { ...style }
  }, /* @__PURE__ */ React.createElement(Typography, {
    id: "modal-modal-title",
    variant: "h4",
    component: "h2"
  }, "New delivery"), /* @__PURE__ */ React.createElement(InputLabel, {
    variant: "standard",
    className: classes.label
  }, "Image"), /* @__PURE__ */ React.createElement(TextField, {
    placeholder: "Image",
    value: image,
    className: classes.textField,
    onChange: (e) => setImage(e.target.value)
  }), /* @__PURE__ */ React.createElement(InputLabel, {
    variant: "standard",
    className: classes.label,
    id: "stage-label"
  }, "Stage"), /* @__PURE__ */ React.createElement(TextField, {
    placeholder: "Image",
    value: stage,
    className: classes.textField,
    onChange: (e) => setStage(e.target.value)
  }), /* @__PURE__ */ React.createElement(Button, {
    className: classes.sendBtn,
    color: "primary",
    variant: "contained",
    onClick: () => deliveryHandler({
      image,
      stage
    })
  }, "delivery")));
};

const useStyles = makeStyles((theme) => ({
  disabled: {
    backgroundColor: theme.palette.background.default,
    boxSizing: "border-box",
    width: "100%",
    paddingTop: "10px"
  },
  syncButton: {
    marginTop: "10px",
    marginRight: "10px"
  },
  infoCard: {
    margin: "20px 0"
  }
}));
const Content = () => {
  const { entity } = useEntity();
  const classes = useStyles();
  const keptnApi = useApi(keptnApiRef);
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const projectTitle = useProjectKey(entity);
  const serviceName = useServiceKey(entity);
  const loadData = async () => {
    setLoading(true);
    await keptnApi.getSequence(projectTitle, { pageSize: "10" }).then((res) => {
      setLoading(false);
      setValue(res);
    });
  };
  const deliveryHandler = async (obj) => {
    const body = {
      type: `sh.keptn.event.${obj.stage}.delivery.triggered`,
      specversion: "1.0",
      source: "api",
      contenttype: "application/json",
      data: {
        project: projectTitle,
        stage: obj.stage,
        service: serviceName,
        configurationChange: {
          values: {
            image: obj.image
          }
        }
      }
    };
    handleClose();
    await keptnApi.postEvent("", body);
  };
  useAsync(loadData, [keptnApi, projectTitle]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(InfoCard, {
    title: `Keptn: ${serviceName}@${projectTitle}`,
    action: !loading && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(IconButton, {
      "aria-label": "delivery",
      onClick: handleOpen,
      className: classes.syncButton
    }, /* @__PURE__ */ React.createElement(ArrowUpwardTwoTone, null)), /* @__PURE__ */ React.createElement(IconButton, {
      "aria-label": "settings",
      onClick: loadData,
      className: classes.syncButton
    }, /* @__PURE__ */ React.createElement(SyncIcon, null))),
    className: loading ? classes.disabled : void 0
  }, loading && /* @__PURE__ */ React.createElement(CardContent, null, /* @__PURE__ */ React.createElement(Progress, null)), !loading && !projectTitle && /* @__PURE__ */ React.createElement(CardContent, null, /* @__PURE__ */ React.createElement(MissingAnnotationEmptyState, {
    annotation: KEPTN_SERVICE_KEY_ANNOTATION
  })), !loading && !serviceName && /* @__PURE__ */ React.createElement(CardContent, null, /* @__PURE__ */ React.createElement(MissingAnnotationEmptyState, {
    annotation: KEPTN_SERVICE_KEY_ANNOTATION
  })), !loading && projectTitle && serviceName && !value && /* @__PURE__ */ React.createElement(CardContent, null, /* @__PURE__ */ React.createElement(EmptyState, {
    missing: "info",
    title: "No information to display",
    description: `There is no Keptn project with key '${projectTitle}'.`
  }))), !loading && value && /* @__PURE__ */ React.createElement(React.Fragment, null, value.states.map((s, key) => /* @__PURE__ */ React.createElement(InfoCard, {
    key,
    title: `Context: ${s.shkeptncontext}`,
    className: classes.infoCard
  }, /* @__PURE__ */ React.createElement(Context, {
    s,
    key,
    project: projectTitle
  })))), !loading && value && /* @__PURE__ */ React.createElement(Delivery, {
    value,
    open,
    deliveryHandler,
    handleClose
  }));
};

export { Content, ProjectCard, ServiceCard };
//# sourceMappingURL=index-35421fad.esm.js.map
