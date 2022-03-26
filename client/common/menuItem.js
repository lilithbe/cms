

export const admin_menu = (admin)=>{
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

           
            {label:'Setting',icon: 'pi pi-fw pi-cog',items:[ 
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


            {
                label: 'Shop', 
                items: [
                    {label: 'Category', icon: 'pi pi-fw pi-id-card', items: [
                        {label: 'Category', icon: 'pi pi-fw pi-mobile', to: '/admin/shop/category'},
                    ]},
                  
                   
                ]
            }


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