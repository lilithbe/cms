

export const admin_menu = (admin)=>{
    console.log(admin.isAdmin)
    if(!admin.isAdmin){
        return []
    }else{
        return [
            

            admin.isAdmin?{
                label: 'Admin', type:"block",icon: 'pi pi-fw pi-server',
                items: [
                    { label: 'Home', icon: 'pi pi-fw pi-home', to: '/',},
                    { label: 'Dashboard', icon: 'pi pi-fw pi-server', to: '/admin'}
                ]
            }:{},
           
           
            {
                label:'Setting',icon: 'pi pi-fw pi-cog',items:[ 
                    admin.adminJ?
                    {
                        label:'설정',  icon: 'pi pi-cog',items:[ 
                            { label:'기본환경설정',icon:'pi pi-briefcase',to: '/admin/setup/default'},
                            { label: '회원가입설정', icon: 'pi pi-user', to: '/admin/setup/member'},
                            { label:'회사정보', icon: 'pi pi-building', to: '/admin/setup/company'},
                            ,
                        ]
                    }:{},
                    admin.memberJ?{
                        label:'회원 관리', icon: 'bi bi-people',items:[ 
                            { label: '회원관리', icon: 'bi bi-person-video3', to: '/admin/member/management'}, 
                            { label: '접속자 집계', icon: 'bi bi-person-rolodex', to: '/admin/member/accessor-count'},
                            { label: '회원메일발송', icon: 'bi bi-envelope', to: '/admin/member/send-mail'}, 
                        ]
                    }:{},
                    admin.groupJ||admin.boardJ ?{
                        label:'게시판 생성관리', icon: 'pi pi-fw pi-tablet',items:[ 
                            admin.groupJ?{ label: '그룹 목록', icon: 'pi pi-sitemap', to: '/admin/group' }:{},
                            admin.groupJ?{ label: '그룹 생성', icon: 'pi pi-slack', to: '/admin/group/create' }:{},
                            admin.boardJ?{ label: '게시판 목록', icon: 'pi pi-qrcode', to: '/admin/board' }:{},
                            admin.boardJ?{ label: '게시판 생성', icon: 'pi pi-microsoft', to: '/admin/board/create' }:{},
                        ]
                    }:{},
                    {
                        label:'사이트 관리', icon: 'pi pi-globe',items:[ 
                            admin.menuJ?{ label: '메뉴 관리', icon: 'pi pi-cog', to: '/admin/setup/navigation'}:{}, 
                            // admin.pageJ?{ label: '페이지 관리', icon: 'pi pi-fw pi-clone', items:[
                            //     { label: '새로운 페이지만들기', icon: 'bi bi-plus', to: '/admin/setup/page-management/create'},
                            //     { label: '메인 페이지', icon: 'bi bi-cup', to: '/admin/setup/page-management/main'},
                            //     { label: '커스텀 페이지', icon: 'pi pi-cog', to: '/admin/setup/page-management/custom'},
                            //     { label: '그룹페이지', icon: 'bi bi-diagram-2', to: '/admin/setup/page-management/group'},
                            //     { label: '게시판 목록 페이지', icon: 'bi bi-layout-text-window-reverse', to: '/admin/setup/page-management/boardlist'},
                            //     { label: '게시판 뷰페이지', icon: 'bi bi-layout-text-sidebar', to: '/admin/setup/page-management/boardview'},
                            //     { label: '프로필 페이지', icon: 'bi bi-person-lines-fill', to: '/admin/setup/page-management/profile'},
                            //     { label: '로그인 페이지', icon: 'bi bi-person-square', to: '/admin/setup/page-management/login'},
                            //     { label: '회원가입 페이지', icon: 'bi bi-person-plus', to: '/admin/setup/page-management/register'},
                                
                            // ]}:{},
                            admin.pointJ?{ label: '포인트 관리', icon: 'bi bi-currency-dollar', to: '/admin/member/point-management'}:{}, 
                            admin.voteJ?{ label: '투표 관리', icon: 'bi bi-collection', to: '/admin/member/voting-management'}:{}, 
                            admin.popupJ?{ label: '팝업 관리', icon: 'pi pi-sitemap', to: '/admin/popup' }:{},
                        ]
                    },
                    
                ]
            },
           
            admin.adminJ?{
                label: 'Components', icon: 'pi pi-fw pi-sitemap',
                items: [
                    {label: 'UI KIT', icon: 'pi pi-fw pi-id-card', items: [
                        {label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/admin/components/fileupload'},
        
        
                       
                    ]},
                  
                   
                ]
            }:{},
        ];
    }
    

    
}


export const user_menu=()=>{
    return  [
        {
            label: 'Dashboard',
            items: [
                { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/auth/dashboard'},
                { label: 'profile', icon: 'pi pi-fw pi-home', to: '/auth/profile'},
                { label: 'Calendar', icon: 'pi pi-fw pi-home', to: '/auth/profile/calendar'},
                { label: 'Friends', icon: 'pi pi-fw pi-home', to: '/auth/dashboard/friends' },
                { label: 'Posts', icon: 'pi pi-fw pi-home', to: '/auth/dashboard/posts' },
                { label: 'Files', icon: 'pi pi-fw pi-home', to: '/auth/dashboard/files' },
            ]
        },
       
    ];
}