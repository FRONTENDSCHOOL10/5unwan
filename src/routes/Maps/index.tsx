import { useOutletContext } from "react-router-dom";
import { UserContext } from "@/routes/PrivateRoute";
import Input from '@/components/Input';


export default function Maps() {
  const { user } = useOutletContext<UserContext>();

  return (
    <div>
      <p>현재 사용자: {user?.nickname}</p>
      <br />
      <span>지도</span>
      <Input status="text" isDark={true} />
      <Input status="text" />
      <Input status="text" titleHide={true} />
      <Input status="disabled" isDark={true} />
      <Input status="disabled" />
      <Input status="search" isDark={true} />
      <Input status="search" />
      <Input status="button" isDark={true} />
      <Input status="button" />
    </div>
  );
}

/* 
  > input에 들어갈 내용들
  1. status
    1-1. text
    1-2. text-disabled
    1-3. search
    1-4. search-disabled
    1-5. button
  2. 타이틀 
    2-1. 타이틀 제목 내용기입 o
    2-2. default값 o
    2-3. title Hide true / false o
  3. placeholder
    3-1. placeholder 내용기입 o
    3-2. default값 o
  4. 다크모드 → isDark 추가 o
  5. text
    5-1. text 내용기입 o
    5-2. default값 o
    5-3. textHide true / false o
*/