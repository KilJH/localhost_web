import { useState } from "react";

export const useInput = (
  initialValue: string | number,
  validator?: Function // value.includes('???') or value.length < ??? 등
) => {
  // state 생성 및 초기화
  const [value, setValue] = useState(initialValue);

  const onChange = (e: any) => {
    const {
      target: { value },
    } = e;

    const willUpdate = validator ? validator(value) : true;

    if (willUpdate) {
      setValue(value);
    }
  };
  return { value, onChange };
};
