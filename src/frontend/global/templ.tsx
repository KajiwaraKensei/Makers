import React from "react"
import * as Next from "next"
import styled from "styled-components"
import { connect } from "react-redux"
import { RootState } from "~/store"
import { ThunkDispatch } from "redux-thunk"
// ______________________________________________________
//
type OuterProps = {
}
type StateProps = {
  className?: string;
}
type DispatchProps = {
}
type Props = StateProps & DispatchProps & OuterProps
// ______________________________________________________
//
const Component: Next.NextComponentType<Next.NextPageContext, {}, Props> = (props: Props) => {
  return (
    <div className={props.className} >

    </div>
  )
}
// ______________________________________________________
//
const StyledComponent = styled(Component)`
`
// ______________________________________________________
//

const mapStateToProps = (
  state: RootState,
  _ownProps: OuterProps
): StateProps => ({
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