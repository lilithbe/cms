const users=[]
/**
 * 신규유저를 배열에 추가한다.
 * 프로필데이터에서 유저가 설정한 네임값을 지정한다.
 * 네임과 룸의 대문자 사용을 소문자로 변환한다.
 * 입력받은 데이터가 배열에 있는지 확인한다.
 * 만약 이미 데이터가 존재한다면 에러메세지를 리턴.
 * 배열에 추가가 완료되면 해당 유저의 정보를 반환한다.
 * @param {object} param0 
 */
export const addUser = ({ id, profile, room, userId }) => {
    let name = userId
    if (profile.useName !== 'userId') {
        name = profile[profile.useName]
    }
    name = name.trim().toLowerCase()
    room = room.trim().toLowerCase()
    const existingUser = users.find((user) => user.room === room && user.name === name)
    //find() 메서드는 주어진 판별 함수를 만족하는 첫 번째 요소의 값을 반환합니다. 그런 요소가 없다면 undefined를 반환합니다.
    if (existingUser) {
        return { error: 'Username is Token' }
    }
    const user = { id, name, room }
    users.push(user)
    return { user }
}
/**
 * 배열에서 해당 아이디의 인덱스값을 확인하고 인덱스값이 유효한경우 삭제하고 삭제된 오브젝트를 리턴
 * @param {string} id socket.id
 */
export const removeUser = (id)=>{
    const index = users.findIndex((user)=>user.id===id)
    if(index !== -1){
        return users.splice(index,1)[0]
    }
}
/**
 * 배열에서 아이디와 일치하는 오브젝트 데이터를 리턴
 * @param {string} id socket.id
 */
export const getUser = (id) => users.find((user)=>user.id===id)
/**
 * 배열에서 룸과 일치하는 배열데이터를 리턴
 * @param {string} room room
 */
export const getUsersInRoom = (room) =>  users.filter((user)=>user.room===room)

