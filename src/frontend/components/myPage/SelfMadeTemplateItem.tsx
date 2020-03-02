// ______________________________________________________
// 作ったテンプレートの詳細

import React from "react"
import * as Next from "next"
import { useRouter } from "next/router"
import styled from "styled-components"
import { useDispatch } from "react-redux";
import { actionCreator } from "~/store"
import { selfMadeTemplate } from "~/store/account"
import { ExpansionPanelSummary, ExpansionPanelDetails, ExpansionPanel, ButtonGroup, Button, Typography, Paper } from '@material-ui/core'
import { ExpandMore, } from '@material-ui/icons';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { PreviewTemplate } from "~/components/template"
import { createTemplate } from "~/global"

// ______________________________________________________
// 型定義

type Props = {
  selfMadeTemplate: selfMadeTemplate;
  onClick: () => void
  className?: string;
}

// ______________________________________________________
// コンポーネント

const Component: Next.NextComponentType<Next.NextPageContext, {}, Props> = (props: Props) => {
  const { selfMadeTemplate } = props
  const classes = useStyles({});
  const contents = React.useMemo(() => createTemplate(selfMadeTemplate.template, {}, selfMadeTemplate.questions), [selfMadeTemplate])

  const ExpansionPanels = (text: string, panel: React.ReactNode, defaultExpanded = false) => (
    <ExpansionPanel defaultExpanded={defaultExpanded} >
      <ExpansionPanelSummary expandIcon={<ExpandMore />}>
        <Typography className={classes.heading}>{text}</Typography>
        <Typography className={classes.secondaryHeading}></Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {panel}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )

  const router = useRouter();
  const dispatch = useDispatch();

  const doTemplate = async () => {
    dispatch(actionCreator.template.setTemplateContents(contents.contents))
    dispatch(actionCreator.template.setArea(contents.areas))
    dispatch(actionCreator.questions.setQuestions(selfMadeTemplate.questions))
    dispatch(actionCreator.loading.stopLoading("template"));
    router.push("/template/answer")
  }
  const editTemplate = () => {
    router.push(`/template/${selfMadeTemplate.id}`)
  }

  const detail = (
    <div className={props.className}>
      <div className="result_tags">
        {selfMadeTemplate.tags.map((tag, i) => (
          <div key={"tag_" + i}>{tag}</div>
        ))}
      </div>
      <div className="result_temp">
        <PreviewTemplate
          templateContents={contents.contents}
          areas={contents.areas}
          questions={selfMadeTemplate.questions}
        />
      </div>
      <div className="result_info">
        <p>メモ: {selfMadeTemplate.memo}</p>
        <p>作成日: {selfMadeTemplate.date}</p>
        <ButtonGroup size="large" aria-label="small outlined button group">
          <Button onClick={doTemplate}>実行</Button>
          <Button onClick={editTemplate}>編集</Button>
        </ButtonGroup>
      </div>
    </div>
  )
  const breakView = (props: { title: string, value: string }) => (
    <div className="question_item_break">
      <Typography variant="caption" display="block" gutterBottom>
        {props.title}
      </Typography>
      <Typography variant="body2" display="block" gutterBottom style={{ paddingLeft: ".4rem" }}>
        {props.value}
      </Typography>
    </div>
  );
  const miniCard = (
    <Paper className="card_my_page" elevation={4} style={{ position: "relative", wordWrap: "break-word", whiteSpace: "pre-wrap", padding: "1rem" }}>
      {breakView({ title: "タイトル", value: selfMadeTemplate.title })}
      {breakView({ title: "メモ", value: selfMadeTemplate.memo })}
      {breakView({ title: "作成日", value: selfMadeTemplate.date })}
      <div className="question_item_break">
        <Typography variant="caption" display="block" gutterBottom>
          プレビュー
      </Typography>
        <Typography variant="body2" display="block" gutterBottom style={{ paddingLeft: ".4rem" }}>
          <PreviewTemplate
            templateContents={contents.contents}
            areas={contents.areas}
            questions={selfMadeTemplate.questions}
          />
        </Typography>
      </div>
      <div className="my_page_buttons">
        <Button onClick={doTemplate} variant="outlined" color="secondary">実行</Button>
        <Button onClick={editTemplate} variant="outlined" color="primary">編集</Button>
      </div>
    </Paper>
  )

  return (
    <div className={props.className} onClick={props.onClick}>
      <div>{miniCard}</div>
    </div>
  )
}

// ______________________________________________________
// スタイル

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    }, button: {
      margin: theme.spacing(1),
    },
  }),
);

interface StyleProps {
  select: boolean;
}
const StyledComponent = styled(Component) <StyleProps>`

    display: flex;
    align-items: stretch;
    margin: 1rem .5rem;
    transition:all .2s ease-in;
  & .MuiButton-outlinedSecondary{
    color: #ffa6c6;
    border: 1px solid rgba(245, 0, 87, 0.28);
  }
  & .MuiButton-outlinedPrimary{
    color: #64b1ef;
    border: 1px solid rgb(97, 175, 239);
  }
  & > * {
    transition:all .2s ease-in;
    height: 100%;
    width: 100%;
  }
  width: 100%;
  max-width: 30rem;
  min-width: 15rem;
  height: 100%;
  .result_info{
    padding: 1rem 0 1.5rem;
  }
  .result_temp{
    border: 1px solid #555;
    padding: 1rem;
    margin: .5rem auto;
  }

  .result_tags{
    display: flex;
    flex-wrap: wrap;
    border-radius: .5rem;
    padding: .25rem 0;
    font-size: .9rem;
    & > div{
      border: 1px solid #888;
      padding: .3rem .6rem;
      margin: .3rem .7rem .3rem 0;
    }
  }
  & .card_my_page{
    width: 100%;
  }
  & .question_item_break{
    transition:all .2s .1s ease-in;

    padding: 0 0 .75rem;
    &:last-child{
      padding-bottom: 0;
    }
  }
  & .question_item_break > :first-child{
      color: #5ae;
  }
  & .my_page_buttons{
    text-align: right;
    & > *{
      margin-right: .5rem;
    }
  }
`

// ______________________________________________________
//

export default StyledComponent;



