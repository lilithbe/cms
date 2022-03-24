import { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { postApi } from "../../api";
import { DELETE_WIDGET } from "../../common";
import { setPage } from "../../redux";
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
    @media(max-width: 991px){
        padding-right:0;
    }
`

const PageView = ({ pageData, authData, setPage }) => {
    const [isLoading, setIsLoading] = useState(false)
    
const deleteWidgetCallback = (si,ci,wi,widgetId) => { 
 
    const widgetResult=Array.from(pageData.children[si].children[ci].children)
    widgetResult.splice(wi,1)  

    const colResult=Array.from(pageData.children[si].children)
    colResult.splice(ci,1,{...pageData.children[si].children[ci], children:widgetResult})
  
    const sectionResult=Array.from(pageData.children)
    sectionResult.splice(si,1,{...pageData.children[si], children:colResult})

    postApi(setIsLoading, DELETE_WIDGET + widgetId, (res) => {
        if(res.data.status){
            setPage({...pageData,children:sectionResult})
        }
      },{...pageData,children:sectionResult},authData.userToken)


 }
    return (
        <PageWrapper className={`${pageData.className}`} styled={pageData.styled}>
           
            {pageData.children.map((section ,si) => {
                return (
                    <Section isAdmin={authData.isAdmin} key={section.id} className={`${section.className}`} styled={section.styled}>

                        <Row isAdmin={authData.isAdmin} className="row">

                            {section.children.map((col ,ci) => {
                                return (
                                    <Col isAdmin={authData.isAdmin} key={col.id} className={`${col.className}`}  styled={col.styled}>
                                
                                        {col.children.map((widget , wi) => {
                                            return (
                                                <WidgetView key={widget.id} widget={widget} deleteWidget={()=>{deleteWidgetCallback(si,ci,wi,widget.id)}}/>
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
        setPage: (data) => dispatch(setPage(data))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(PageView);