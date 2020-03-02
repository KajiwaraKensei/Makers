import React from "react"
import * as Next from "next"
import styled from "styled-components"
import { Typography } from "@material-ui/core"
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import CreateIcon from '@material-ui/icons/Create';
import SearchIcon from '@material-ui/icons/Search';
import { useRouter } from "next/router"
// ______________________________________________________
//

type Props = {
  className?: string;
}

// ______________________________________________________
//
const Component: Next.NextComponentType<Next.NextPageContext, {}, Props> = (props) => {
  const router = useRouter()
  const clickCard = (title: string) => {
    router.push(title)
  }
  return (
    <div className={props.className} >
      <HomeCard onClick={clickCard} url="/template" fileName="create.jpg" background="#636C99" title="作成" description="文章のテンプレートを作成します " icon={(<CreateIcon color="action" fontSize="large" />)} />
      <HomeCard onClick={clickCard} url="/myPage" fileName="bea.jpg" background="#7C63A6" title="実行" description="テインプレーを使って文章を効率よく作成しましょう" icon={(<PlayArrowIcon color="action" fontSize="large" />)} />
      <HomeCard onClick={clickCard} url="/search" fileName="search.jpg" background="#716AB0" title="検索" description='何を書いていいかわからない時に' icon={(<SearchIcon color="action" fontSize="large" />)} />
      <HomeCard onClick={clickCard} url="/myPage" fileName="manage.jpg" background="#6A88B0" title="管理" description="自分だけのテンプレートを管理する" icon={(<TurnedInNotIcon color="action" fontSize="large" />)} />
    </div>
  )
}
// ______________________________________________________
//
const StyledComponent = styled(Component)`
  width: 100%;
  height: 100%;
  color: #fff;
  display: flex;
`

interface CardProps {
  className?: string;
  description: string;
  title: string;
  url: string;
  icon: JSX.Element;
  onClick: (title: string) => void
}
const Card = (props: CardProps) => {

  const { description, icon, title, url } = props

  const doClick = () => {
    props.onClick(url)
  };

  return (
    <div className={props.className} onClick={doClick}>
      <div className="top_card_content">
        <div className="top_card_icon">
          {icon}
        </div>
        <Typography style={{ fontWeight: "bold" }} variant="body1">{title}</Typography>
        <Typography variant="caption">{description}</Typography>
      </div>
    </div>
  )
};

interface CardType {
  background: string;
  fileName: string;
};
const HomeCard = styled(Card) <CardType>`
  width: 100%;
  height: 100%;
  background-color: ${props => props.background};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 2;
  transition:all .2s .1s ease-in;
  &:hover{
    flex-shrink: 1;
    background-image: url("/static/${props => props.fileName}");
    background-size:cover;
    position: relative;
    
    &::before{
      background-color: rgba(0,0,0,0.4);
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      content: ' ';
    }
  }
  & > .top_card_content{
    position: absolute;
    padding: .5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem;
    max-width: 14rem;
    text-align: center;
    & > .top_card_icon{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 5.3em;
      height: 5.3em;
      margin: 1em auto;
      background-color: #fff;
      border-radius: 50%;
    }
    &:hover{
      cursor : pointer;
    }
  }
`;

export default StyledComponent;