import { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import WidgetView from "../widget/WidgetView";

const PageWrapper = styled.div`
    ${(props) => props.styled}
`

const Section = styled.section`
    ${(props) => props.styled}
`

const Row = styled.div`
    ${(props) => props.styled}
`

const Col = styled.div`
    padding-top:0;
    padding-bottom:0;
    ${(props) => props.styled}
`
const PageView = ({ pageData, authData }) => {
    return (
        <PageWrapper className={`${pageData.className}`} styled={pageData.styled}>

            {pageData.children.map((section) => {
                console.log(section)
                return (
                    <Section isAdmin={authData.isAdmin} key={section.id} className={`${section.className}`} styled={section.styled}>

                        <Row isAdmin={authData.isAdmin} className="row">

                            {section.children.map((col) => {
                                return (
                                    <Col isAdmin={authData.isAdmin} key={col.id} className={`${col.className}`}  styled={col.styled}>
                                        {col.children.map((widget) => {
                                            return (
                                                <WidgetView key={widget.id} widget={widget} />
                                            )
                                        })}
                                    </Col>
                                )
                            })}
                        </Row>
                    </Section>
                )
            })}
        </PageWrapper>
    )
}
const mapStateToProps = (state) => {
    return {
        configData: state.configData,
        authData: state.authData,
        boardData: state.boardData,
        groupData: state.groupData,
        pageData: state.pageData
    };
};
const mapDispatchToProps = (dispatch) => {
    return {


    };
};
export default connect(mapStateToProps, mapDispatchToProps)(PageView);