import { useState } from "react";

type User = {
  id: number,
  name: string,
  role: string,
  email: string,
  age: number,
  postCode: string,
  phone: string,
  hobbies: string[],
  url: string,
  studyMinutes?: number,
  experienceDays?: number,
  taskCode?: number,
  studyLangs?: string[],
  useLangs?: string[],
  score?: number,
  availableStartCode?: number,
  availableEndCode?: number
}

export const App = () => {
  const userList: User[] = [
    { id: 1, name: "鈴木太郎", role: "student", email: "test1@happiness.com", age: 26, postCode: "100-0003", phone: "0120000001", hobbies: ["旅行", "食べ歩き", "サーフィン"], url: "https://aaa.com", studyMinutes: 3000, taskCode: 101, studyLangs: ["Rails", "Javascript"], score: 68 },
    { id: 2, name: "鈴木二郎", role: "mentor", email: "test2@happiness.com", age: 31, postCode: "100-0005", phone: "0120000002", hobbies: ["サッカー", "ランニング", "筋トレ"], url: "https://bbb.com", experienceDays: 1850, useLangs: ["Next.js", "GoLang"], availableStartCode: 201, availableEndCode: 302 },
    { id: 3, name: "鈴木三郎", role: "student", email: "test3@happiness.com", age: 23, postCode: "300-0332", phone: "0120000003", hobbies: ["アニメ", "ゲーム", "旅行"], url: "https://ccc.com", studyMinutes: 125000, taskCode: 204, studyLangs: ["Rails", "Next.js"], score: 90 },
    { id: 4, name: "鈴木四郎", role: "mentor", email: "test4@happiness.com", age: 31, postCode: "100-0005", phone: "0120000004", hobbies: ["食べ歩き", "ランニング", "旅行"], url: "https://ddd.com", experienceDays: 260, useLangs: ["PHP", "Javascript"], availableStartCode: 103, availableEndCode: 408 },
    { id: 5, name: "鈴木五郎", role: "student", email: "test5@happiness.com", age: 22, postCode: "300-0005", phone: "0120000005", hobbies: ["筋トレ", "ランニング"], url: "https://eee.com", studyMinutes: 47800, taskCode: 305, studyLangs: ["Next.js", "Rails"], score: 84 },
    { id: 6, name: "鈴木六郎", role: "mentor", email: "test6@happiness.com", age: 28, postCode: "100-0007", phone: "0120000006", hobbies: ["ゲーム", "サッカー"], url: "https://fff.com", experienceDays: 260, useLangs: ["PHP", "Javascript"], availableStartCode: 101, availableEndCode: 302 },
    { id: 7, name: "鈴木七郎", role: "student", email: "test7@happiness.com", age: 24, postCode: "300-0008", phone: "0120000007", hobbies: ["筋トレ", "ダーツ"], url: "https://ggg.com", studyMinutes: 26900, taskCode: 401, studyLangs: ["PHP", "Rails"], score: 73 },
    { id: 8, name: "鈴木八郎", role: "mentor", email: "test8@happiness.com", age: 33, postCode: "100-0009", phone: "0120000008", hobbies: ["ランニング", "旅行"], url: "https://hhh.com", experienceDays: 6000, useLangs: ["Golang", "Rails"], availableStartCode: 301, availableEndCode: 505 },
  ]

  const [users, setUsers] = useState<User[]>(userList);
  const [userRole, setUserRole] = useState<string>("all");
  const [sortFlag, setSortFlag] = useState<boolean>(true);

  const filteredUserList = (filterKey: string):void => {
    let tmpUsers: User[] = userList.filter(user => {
      return user.role === filterKey;
    });
    setUsers(tmpUsers);
    setUserRole(filterKey)
  }

  const allUserList = ():void => {
    setUsers(userList);
    setUserRole("all");
  }

  const filteredAvailableMentor = (taskCode: number): string[] => {
    const tmpFilteredArray = userList.filter(function(value){
      return value.availableStartCode && value.availableStartCode <= taskCode &&
            value.availableEndCode && taskCode <= value.availableEndCode
    })
    return tmpFilteredArray.map((obj) => obj.name);
  }

  const filteredAvailableStudent = (availableStartCode: number, availableEndCode: number) => {
    const tmpFilteredArray = userList.filter(function(value){
      return value.taskCode && (availableStartCode <= value.taskCode &&
            value.taskCode <= availableEndCode)
    })
    return tmpFilteredArray.map((obj) => obj.name);
  }

  const sortedUserList = <K extends keyof User>(key: K): void => {
    const tmpSortedUserList = users.sort((a, b) => {
      const aMinutes = a[key] as number ?? 0;
      const bMinutes = b[key] as number ?? 0;

      if(sortFlag){
        return aMinutes - bMinutes;
      } else {
        return bMinutes - aMinutes;
      }
    });

    const sortedUserList = [...tmpSortedUserList];
    setUsers(sortedUserList);
    setSortFlag(!sortFlag);
  }

  return (
    <>
      <ul className="nav">
        <li className="nav-item">
          <button onClick={ () => allUserList() }>共通</button>
        </li>
        <li className="nav-item">
          <button onClick={ () => filteredUserList("student") }>生徒</button>
        </li>
        <li className="nav-item">
          <button onClick={ () => filteredUserList("mentor") }>メンター</button>
        </li>
      </ul>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">名前</th>
            <th scope="col">ロール</th>
            <th scope="col">メールアドレス</th>
            <th scope="col">年齢</th>
            <th scope="col">郵便番号</th>
            <th scope="col">電話番号</th>
            <th scope="col">趣味</th>
            <th scope="col">URL</th>
            {(userRole === 'student' || userRole === 'all') &&
              <>
                <th scope="col" onClick={ () => userRole === 'student' && sortedUserList("studyMinutes") }>勉強時間</th>
                <th scope="col">課題番号</th>
                <th scope="col">勉強中の言語</th>
                <th scope="col" onClick={ () => userRole === 'student' && sortedUserList("score") }>ハピネススコア</th>
                <th scope="col">対応可能なメンター</th>
              </>
            }
            {(userRole === 'mentor' || userRole === 'all') &&
              <>
                <th scope="col" onClick={ () => userRole === 'mentor' && sortedUserList("experienceDays") }>実務経験月数</th>
                <th scope="col">現場で使っている言語</th>
                <th scope="col">担当できる課題番号初め</th>
                <th scope="col">担当できる課題番号終わり</th>
                <th scope="col">対応可能な生徒</th>
              </>
            }
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>{user.postCode}</td>
              <td>{user.phone}</td>
              <td>{user.hobbies.join(', ')}</td>
              <td>{user.url}</td>
              {(userRole === 'student' || userRole === 'all') &&
                <>
                  <td>{user.studyMinutes}</td>
                  <td>{user.taskCode}</td>
                  <td>{user.studyLangs && user.studyLangs.join(', ')}</td>
                  <td>{user.score}</td>
                  <td>{user.taskCode && filteredAvailableMentor(user.taskCode).join(', ')}</td>
                </>
              }
              {(userRole === 'mentor' || userRole === 'all') &&
                <>
                  <td>{user.experienceDays}</td>
                  <td>{user.useLangs && user.useLangs.join(', ')}</td>
                  <td>{user.availableStartCode}</td>
                  <td>{user.availableEndCode}</td>
                  <td>{(user.availableStartCode && user.availableEndCode) && filteredAvailableStudent(user.availableStartCode, user.availableEndCode).join(', ')}</td>
                </>
              }
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
