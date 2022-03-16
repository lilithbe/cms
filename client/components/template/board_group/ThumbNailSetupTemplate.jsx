import Image from "next/image";
import { SelectButton } from "primereact/selectbutton";
import { Button } from "primereact/button";
import { useState } from "react";

import ImageViewTemplate from "../ImageViewTemplate";
import { Sidebar } from "primereact/sidebar";
const ThumbNailSetupTemplate = ({ setState, state }) => {
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [imageType, setImageType] = useState("defaultThumbnail");
  return (
    <div>
      <table className="table table-sm table-bordered">
        <thead>
          <tr className="text-center">
            <th width="15%">key</th>
            <th>value</th>
            <th width="70%">description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="text-center">썸네일 설정</th>
            <td>
              {" "}
              <SelectButton
                value={state.isThumbnail ? true : false}
                options={[
                  { label: "on", value: true },
                  { label: "off", value: false }
                ]}
                onChange={(e) => setState({ ...state, isThumbnail: e.value })}
                optionLabel="label"
                optionValue="value"
              />
            </td>
            <td></td>
          </tr>
          <tr>
            <th className="text-center">썸네일 설정</th>
            <td>
              <Button
                label="썸네일"
                onClick={() => {
                  setIsImageOpen(true);
                  setImageType("defaultThumbnail");
                }}
              />
            </td>
            <td>
              {" "}
              <Image src={state.defaultThumbnail} width={80} height={80} alt="default thumbnail" />
              <div> 80px x 80px 의 이미지를 등록하세요. 썸네일게시판에서 이용자가 썸네일 미등록시 이용될 이미지 입니다.</div>
            </td>
          </tr>
          <tr>
            <th className="text-center">이미지 가져오기</th>
            <td>
              <Button
                label="제목 배경 이미지"
                onClick={() => {
                  setIsImageOpen(true);
                  setImageType("defaultTitleImage");
                }}
              />
            </td>
            <td>
              {" "}
              <div
                className="  d-flex align-items-center "
                style={{
                  width: "800px",
                  height: "120px",
                  backgroundImage: `url("${state.defaultTitleImage}")`,
                  textShadow: "1px -1px 1px #ffffff",
                  fontSize: "5rem",
                  color: "#ffffff",
                  display: "fixed"
                }}
              >
                <span className="text-center w-100">{state.label}</span>{" "}
              </div>
              800px x 120px 의 이미지를 등록하세요. 게시판에서 상단 타이틀에 이용될 이미지 입니다.{" "}
            </td>
          </tr>
        </tbody>
      </table>
      <Sidebar
        fullScreen
        visible={isImageOpen}
        onHide={() => {
          setIsImageOpen(false);
        }}
      >
        <ImageViewTemplate
          isCallback
          imageCallback={(value) => {
            setIsImageOpen(false);
            setState({ ...state, [imageType]: value.url });
          }}
        />
      </Sidebar>
    </div>
  );
};

export default ThumbNailSetupTemplate;
