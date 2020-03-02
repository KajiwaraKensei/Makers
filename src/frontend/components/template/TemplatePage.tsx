// ______________________________________________________
// テンプレートの編集ぺーじ

import React from "react"
import * as Next from "next"
import styled from "styled-components"
import { connect } from "react-redux"
import { RootState } from "../../store"
import { ThunkDispatch } from "redux-thunk"
import { EditTemplate, PreviewTemplate, SaveTemplateForm } from "."
import QuestionPage from "../question/QuestionPage"
import { templateContents, areasType } from "../../store/template"
import { makeStyles, withStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { Box, Paper } from '@material-ui/core';
import { createTemplate } from "../../global"
import { question } from "../../store/questions"
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

// ______________________________________________________
// 型定義

type OuterProps = {
  questions: question[];
  editString: string

}
type StateProps = {
  className?: string;
  templateContents: templateContents[]
  windowWidth: number
}
type DispatchProps = {
}
type Props = StateProps & DispatchProps & OuterProps

// ______________________________________________________
// コンポーネント

const Component: Next.NextComponentType<Next.NextPageContext, {}, Props> = (props: Props) => {
  const classes = useStyles({});
  const [value, setValue] = React.useState(1);
  const theme = useTheme();
  const { templateContents, questions, editString, windowWidth
  } = props
  const contents = React.useMemo(() => createTemplate(editString, {}, questions), [editString, questions])

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };


  const templatePreview = (
    <div className="template_preview">
      <PreviewTemplate
        questions={questions}
        areas={contents.areas}
        templateContents={contents.contents}
      />
      {!!editString || <p className="non-string">まだありません。Let's編集</p>}
    </div>
  )
  const WideTemplate = (
    <div className="wide_template">
      <div>
        <div className="template_wide_header">表示</div>
        {templatePreview}
      </div>
      <div>
        <div className="template_wide_header">編集</div>
        <EditTemplate />
      </div>
      <div>
        <QuestionPage />
      </div>
    </div>

  )
  const MiniTemplate = (
    <Paper elevation={3} style={{ padding: ".3rem", margin: "1rem auto", width: "95%" }}>
      <div className={classes.root}>
        <div className={classes.back}>
          <div className="template_header">
            <StyledTabs value={value} onChange={handleChange}>
              <StyledTab label="表示" />
              <StyledTab label="編集" />
            </StyledTabs>
            <div>
              <QuestionPage />
            </div>
          </div>

          <TabPanel value={value} index={0} dir={theme.direction} >
            {templatePreview}
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <EditTemplate />
          </TabPanel>
          <Typography className={classes.padding} />
        </div>
      </div>
    </Paper>
  )

  return (
    <div className={props.className} >
      {windowWidth < 770 ? MiniTemplate : WideTemplate}
    </div>
  )
}

// ______________________________________________________
// スタイル

interface StyledComponentProps {
  width?: string | number;
  height?: string | number;
}
const StyledComponent = styled(Component) <StyledComponentProps>`
  width: ${props => props.width};
  height: ${props => props.height};
  .tab-holder{
    display: flex;
  }
  .template_header{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #aaa;
    & .MuiTabs-root{
      width: 100%;
    }
    & .MuiTab-textColorInherit{
      flex: 1
    }
  }
  .template_preview{
    min-height: 3rem;
    padding: 1rem;
    & > .non-string{
      color: #999;
      text-align: center;
      padding: 1rem;
      line-height: 3rem;
    }
  }
  & .wide_template{
    display: flex;
    height: 100%;
    background-color: #fff;
    & > *{
      margin: 0 1rem;
      width: 38%;
      height: 100%;
      overflow: scroll;
      &:last-child{
        width: 24%;
      }
    }
    & > * >  .template_wide_header{
      text-align: center;
      padding: .75rem;
      color: #678;
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
        margin-bottom: 17px;
      }
      &::after{
        margin-top: 17px;
      }
    }
  }
`;
StyledComponent.defaultProps = {
  width: "100%",
  height: "100%"
}


// ______________________________________________________
//

const LongMenu = () => {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        {["実行", "保存"].map(option => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
            <SaveTemplateForm>
              {option}
            </SaveTemplateForm>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

// ______________________________________________________
//

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Typography>
  );
}
interface StyledTabsProps {
  value: number;
  onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > div': {
      maxWidth: 120,
      width: '100%',
      backgroundColor: '#635ee7',
    },
  },
})((props: StyledTabsProps) => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

interface StyledTabProps {
  label: string;
}

const StyledTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: 'none',
      color: '#777',
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(15),
      marginRight: theme.spacing(1),
      '&:focus': {
        opacity: 1,
      },
    },
  }),
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(6),
  },

  back: {
    backgroundColor: '#fff',
  },
}));


// ______________________________________________________
//

const mapStateToProps = (
  state: RootState,
  _ownProps: OuterProps
): StateProps => ({
  templateContents: state.template.templateContents,
  windowWidth: state.window.width
})

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, undefined, any>,
  _ownProps: OuterProps
): DispatchProps => ({
});

export default connect<StateProps, DispatchProps, OuterProps, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(StyledComponent);