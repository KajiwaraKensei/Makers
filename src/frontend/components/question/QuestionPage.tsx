// ______________________________________________________
// 

import React from "react";
import * as Next from "next";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState, actionCreator } from "~/store";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { ExpansionPanelSummary, ExpansionPanelDetails, ExpansionPanel, Typography } from '@material-ui/core';
import { IconButton, Dialog, AppBar, Toolbar, Slide, Button } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SendIcon from '@material-ui/icons/Send';
import { QuestionList, Memo, GenreTags } from ".";
import { templateContents, areasType } from "~/store/template";
import { question } from "~/store/questions";
import { createTemplate } from "~/global";
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from "@material-ui/icons/Close";
import { TransitionProps } from '@material-ui/core/transitions';
import Joyride, { ACTIONS, CallBackProps, EVENTS, STATUS, Step, StoreHelpers } from 'react-joyride';

// ______________________________________________________
// 型定義

type StateProps = {
  questions: question[];
  editString: string;
  windowWidth: number;
  breakPoint: number;
};

type Props = {
  className?: string;
};

interface State {
  run: boolean;
  steps: Step[];
}

const selector = (state: RootState): StateProps => ({
  questions: state.questions.questions,
  editString: state.template.editString,
  windowWidth: state.window.width,
  breakPoint: state.window.breakPoint
});

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// ______________________________________________________
// コンポーネント

const Component: Next.NextComponentType<Next.NextPageContext, {}, Props> = (props: Props) => {
  const classes = useStyles({});
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const states = useSelector(selector);
  const router = useRouter();
  const doSave = () => {
    dispatch(actionCreator.template.doAdd())
  };
  const setTemplateContents = (next: templateContents[]) => {
    dispatch(actionCreator.template.setTemplateContents(next))
  };
  const setTemplateArea = (next: areasType) => {
    dispatch(actionCreator.template.setArea(next))
  };
  const setQuestions = (questions: question[]) => {
    dispatch(actionCreator.questions.setQuestions(questions))
  };


  const ExpansionPanels = (text: string, panel: React.ReactNode, defaultExpanded = false) => (
    <ExpansionPanel defaultExpanded={defaultExpanded} >
      <div className="template_wide_header">
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>{text}</Typography>
          <Typography className={classes.secondaryHeading}></Typography>
        </ExpansionPanelSummary>
      </div>

      <ExpansionPanelDetails>
        {panel}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );

  const doTemplate = () => {
    const contents = createTemplate(states.editString, {}, states.questions);
    setTemplateContents(contents.contents);
    setTemplateArea(contents.areas);
    setQuestions(states.questions);
    dispatch(actionCreator.loading.stopLoading("template"));
    dispatch(actionCreator.template.setBackAnswer(true))
    router.push("/template/answer");
  };
  const [helpers, setHelpers] = React.useState<StoreHelpers>()
  const [state, setState] = React.useState<State>({
    run: false,
    steps: [
      {
        content: <h2>テンプレートの作り方</h2>,
        locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
        placement: 'center',
        target: 'body',
      },
      {
        content: <h2>クリックで質問を追加</h2>,
        floaterProps: {
          disableAnimation: true,
        },
        styles: {
          options: {
            width: 300,
          },
        },
        target: '.add_button_button',
        title: 'add question',
      }, {
        content: <h2>テンプレートの作り方</h2>,
        locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
        target: 'body',
      },
      {
        content: <h2>Sticky elements</h2>,
        floaterProps: {
          disableAnimation: true,
        },
        spotlightPadding: 20,
        target: 'body',
      },
      {
        content: 'These are our super awesome projects!',
        placement: 'center',
        styles: {
          options: {
            width: 300,
          },
        },
        target: 'body',
        title: 'Our projects',
      },
      {
        content: (
          <div>
            You can render anything!
              <br />
            <h3>Like this H3 title</h3>
          </div>
        ),
        placement: 'center',
        target: 'body',
        title: 'Our Mission',
      },
      {
        content: (
          <div>
            <h3>All about us</h3>
            <svg
              width="50px"
              height="50px"
              viewBox="0 0 96 96"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid"
            >
              <g>
                <path
                  d="M83.2922435,72.3864207 C69.5357835,69.2103145 56.7313553,66.4262214 62.9315626,54.7138297 C81.812194,19.0646376 67.93573,0 48.0030634,0 C27.6743835,0 14.1459311,19.796662 33.0745641,54.7138297 C39.4627778,66.4942237 26.1743334,69.2783168 12.7138832,72.3864207 C0.421472164,75.2265157 -0.0385432192,81.3307198 0.0014581185,92.0030767 L0.0174586536,96.0032105 L95.9806678,96.0032105 L95.9966684,92.1270809 C96.04467,81.3747213 95.628656,75.2385161 83.2922435,72.3864207 Z"
                  fill="#000000"
                />
              </g>
            </svg>
          </div>
        ),
        placement: 'center',
        target: 'body',
      },
    ],
  });

  const getHelpers = (nextHelpers: StoreHelpers) => {
    setHelpers(nextHelpers);
  }
  const handleClickStart = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setState({
      ...state,
      run: true,
    });
  };
  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setState((state) => { return { ...state, run: false } });
    }
  };

  const content = (
    <div className={classes.root}>
      {ExpansionPanels("質問", <QuestionList />, true)}
      {ExpansionPanels("メモ", <Memo />)}
      {ExpansionPanels("タグ", <GenreTags />)}
    </div>
  );

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const tempDialog = (
    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
      <AppBar className={classes.appBar} >
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            情報
        </Typography>
          <Button autoFocus color="inherit" onClick={doTemplate}>
            実行
        </Button>
        </Toolbar>
      </AppBar>
      {content}
    </Dialog>
  );
  const miniContent = (
    <div>
      <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleOpen}>
        <MenuIcon />
      </IconButton>
      {tempDialog}
    </div>

  );

  return (
    <div className={props.className} >
      {
        states.windowWidth < states.breakPoint ?
          miniContent
          :
          content
      }
      {
        states.windowWidth > states.breakPoint &&
        <div style={{ height: "5rem" }} />
      }
      <Fab aria-label="" className={classes.fab} color="primary" onClick={doTemplate} >
        <SendIcon />
      </Fab>

    </div>
  );
};

// ______________________________________________________
// スタイル

const StyledComponent = styled(Component)`
& .MuiExpansionPanelDetails-root{
  padding: 0;
}
& .MuiPaper-elevation1{
  box-shadow: none;
}

& > div > .MuiExpansionPanel-root:before{
  opacity: 0;
}
& .MuiExpansionPanelSummary-root{
  height: 59px;
}
& .MuiExpansionPanelSummary-content{
  text-align: center;
  display: flex;
  justify-content: center;
}
  & .template_wide_header{
    padding: .75rem;
    color: #678;
      text-align: center;
      &::before,
      &::after{
        content: '';
        display: block;
        width: calc( 100% + 32px );
        height: 1px;
        margin-left: -16px;
        background: linear-gradient(to left, #2980b9, #6dd5fa, #cfcffa);
      }
      &::before{
        margin-bottom: 0px;
      }
      &::after{
        margin-top: 0px;
      }
    }
`;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: "100%",
      overflowY: "scroll"
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    button: {
      margin: theme.spacing(1),
    },
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      zIndex: 9999
    },
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }),
);

export default StyledComponent;