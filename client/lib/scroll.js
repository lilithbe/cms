import $ from "jquery";

export const goToScroll =(targetHtmlfor)=>{
    const target = $(`${targetHtmlfor}`).offset().top-45.5;
    $(`html,body`).animate(
        {
            scrollTop: target-5,
        },
        700,()=>{
            $(`html,body`).animate(
                {
                    scrollTop: target+5,
                },
                300
            );
        }
    );
}