import AdminLayout from "layouts/AdminApp";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

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
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<SelectedUsers>({});
  const [error, setError] = useState<string>("");

  // useEffect(() => {
  //   const getUsers = async () => {
  //     try {
  //       const accessToken = localStorage.getItem("accessToken");
  //       const { data } = await axios.get(
  //         "http://localhost:3001/api/admin/users",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //           withCredentials: true,
  //         }
  //       );
  //       setUsers(data.data);
  //       setError(""); // 에러 상태를 초기화합니다.
  //     } catch (err) {
  //       // 에러 처리 로직
  //       setError("사용자 정보를 불러오는데 실패했습니다.");
  //       console.error(err);
  //       // 추가적으로, err 객체에 따라 더 세부적인 에러 정보를 setError에 제공할 수 있습니다.
  //     }
  //   };
  //   getUsers();
  // }, []);
  const handleDelete = async (userId: number) => {
    await axios
      .delete(`http://localhost:3000/api/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setShow(false);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });

    setShow(false);
  };

  return (
    <AdminLayout>
      <span>admin 만 들어올 수 있도록 프론트 로직 추가해야함</span>
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
                <Button variant="Light" onClick={handleShow}>
                  ❌
                </Button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>삭제</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>유저를 삭제하시겠습니까?</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      아니요
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => handleDelete(user.id)}
                    >
                      예
                    </Button>
                  </Modal.Footer>
                </Modal>
                {/* <button onClick={handleDelete}>❌</button> */}
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