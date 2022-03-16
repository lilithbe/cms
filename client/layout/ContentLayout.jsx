import { useRouter } from "next/router";
import {Button } from 'primereact/button'

const ContentLayout = ({ children, boardConfig, authData, boardList, groupList }) => {
  const router = useRouter()
  const sideTemplate= <div className="card">
  <div className="card-header p-0 d-none d-md-block">
    <Button className="w-100" icon="bi bi-pen" onClick={()=>{router.push(`/content/write/${boardConfig.value}`)}}>글쓰기</Button>
  </div>
  <div className="card-body">
    side menu list
  </div>
</div>
  return (
    <div className="container mt-5 mt-md-1">
      <div className="row">
      <div className="col-12 col-md-4 col-lg-3 d-block d-md-none">
         {sideTemplate}
        </div>
        <div className="col-12 col-md-8 col-lg-9">{children}</div>
        <div className="col-12 col-md-4 col-lg-3 d-none d-md-block">
         {sideTemplate}
        </div>
      </div>
    </div>
  );
};

export default ContentLayout;
