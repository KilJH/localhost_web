import { User } from "../../interfaces";
import React from "react";

type Props = {
  user: User;
};

export default function UserItem({ user }: Props) {
  return (
    <React.Fragment>
      <td>{user.name}</td>
      <td>{user.nickname}</td>
      <td>{user.email}</td>
      <td>{user.address}</td>
    </React.Fragment>
  );
}
