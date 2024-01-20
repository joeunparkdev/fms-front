import AdminLayout from "layouts/AdminApp";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Checkbox = styled.input`
  margin-right: 10px;
`;

const DeleteButton = styled.button`
  padding: 5px 10px;
  margin-left: 10px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: darkred;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: #eee;
  th {
    padding: 10px;
    border: 1px solid #ddd;
  }
`;

const TableBody = styled.tbody`
  tr:nth-child(odd) {
    background-color: #f9f9f9;
  }
  td {
    padding: 8px;
    border: 1px solid #ddd;
    text-align: center;
  }
`;

type User = {
  id: number;
  email: string;
  name: string;
  team?: string; // team은 선택적 프로퍼티로, 값이 없을 수도 있습니다.
  phone?: string; // phone도 선택적 프로퍼티입니다.
  birthdate?: string; // birthdate도 선택적 프로퍼티입니다.
};

type SelectedUsers = {
  [key: number]: boolean;
};

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<SelectedUsers>({});
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const { data } = await axios.get(
          "http://localhost:3001/api/admin/users",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        );
        setUsers(data.data);
        setError(""); // 에러 상태를 초기화합니다.
      } catch (err) {
        // 에러 처리 로직
        setError("사용자 정보를 불러오는데 실패했습니다.");
        console.error(err);
        // 추가적으로, err 객체에 따라 더 세부적인 에러 정보를 setError에 제공할 수 있습니다.
      }
    };
    getUsers();
  }, []);
  const handleCheckboxChange = (userId: number) => {
    setSelectedUsers((prevSelectedUsers) => ({
      ...prevSelectedUsers,
      [userId]: !prevSelectedUsers[userId],
    }));
  };

  const handleDeleteSelected = async () => {
    try {
      // Filter out the selected user ids
      const userIdsToDelete = Object.entries(selectedUsers)
        .filter(([_, isSelected]) => isSelected)
        .map(([userId, _]) => userId);

      // Call the API to delete the users
      await Promise.all(
        userIdsToDelete.map((userId) => {
          return axios.delete(
            `http://localhost:3001/api/admin/users/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          );
        })
      );

      // Update the user list by filtering out the deleted users
      setUsers(
        users.filter((user) => !userIdsToDelete.includes(String(user.id)))
      );

      // Clear selected users
      setSelectedUsers({});
    } catch (err) {
      setError("Failed to delete users.");
      console.error(err);
    }
  };

  return (
    <AdminLayout>
      {error && <div className="error-message">{error}</div>}{" "}
      <Table>
        <TableHead>
          <tr>
            <th></th>
            <th>이메일</th>
            <th>이름</th>
            <th>팀</th>
            <th>휴대폰번호</th>
            <th>생년월일</th>
          </tr>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Checkbox
                  type="checkbox"
                  checked={selectedUsers[user.id] || false}
                  onChange={() => handleCheckboxChange(user.id)}
                />
              </td>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>{user.team || "N/A"}</td>
              <td>{user.phone || "N/A"}</td>
              <td>{user.birthdate || "N/A"}</td>
            </tr>
          ))}
        </TableBody>
      </Table>
    </AdminLayout>
  );
};

export default AdminUsers;
