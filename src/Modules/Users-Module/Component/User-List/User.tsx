import React, { useEffect, useState } from "react";
import "./User.modules.css";
import GirlPhoto from "../../../../assets/header.png";
import axiosInstance, {
  imgUrl,
  userUrl,
} from "../../../Shared-Components/api/authInstance";
import { ClipLoader } from "react-spinners";
import { GrView } from "react-icons/gr";

import { HiDotsHorizontal } from "react-icons/hi";
import { MdOutlineBlock } from "react-icons/md";
import { GoBlocked } from "react-icons/go";
import { Modal } from "react-bootstrap";
import NoData from "../../../Shared-Components/Components/NoData/NoData";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";

export default function User() {
  const [userList, setUserList] = useState<user[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(0);
  const [viewUser, setViewUser] = useState<user | null>(null);
  const [show, setShow] = useState(false);
  const [pageNum, setPageNum] = useState<number[]>([]);
  const [activePage, setActivePage] = useState(1);

  type user = {
    id: number;
    userName: string;
    email: string;
    phoneNumber: string;
    country: string;
    imagePath?: string;
    isActivated: boolean;
  };

  const handleClose = () => setShow(false);
  const handleShow = (id: number) => {
    setUserId(id);
    setShow(true);
  };

  const getAllUser = async (pageSize: number, pageNumber: number) => {
    try {
      const { data } = await axiosInstance.get(userUrl.AllUser, {
        params: { pageSize, pageNumber },
      });
      setUserList(data?.data);
      setPageNum([...Array(data?.totalNumberOfPages)].map((_, i) => i + 1));
      setLoading(false);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Request failed");
    }
  };

  const filterUser = async (
    userName: string,
    pageSize: number,
    pageNumber: number
  ) => {
    if (userName && userName.trim() != "") {
      try {
        const { data } = await axiosInstance.get(userUrl.filterUser, {
          params: { userName, pageSize, pageNumber },
        });
        setUserList(data.data);
        setActivePage(1);
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        toast.error(err.response?.data?.message || "Request failed");
      }
    } else {
      getAllUser(4, activePage);
    }
  };

  const inActivateUser = async (id: number) => {
    await axiosInstance.put(userUrl.ActivateUser(id));
    getAllUser(4, activePage);
  };

  const getUser = async (userId: number) => {
    const { data } = await axiosInstance.get(userUrl.ActivateUser(userId));
    setViewUser(data);
  };

  useEffect(() => {
    getAllUser(4, activePage);
    getUser(userId);
  }, [userId, activePage]);

  return (
    <div className="py-2">
      <h4 className="mb-3">Users</h4>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <button
            type="button"
            aria-label="Close"
            onClick={handleClose}
            className="fa-regular fa-circle-xmark fa-xl d-block ms-auto bg-transparent border-0 close-btn"
          ></button>

          <img
            className="table-img mx-auto d-block"
            src={
              viewUser?.imagePath ? `${imgUrl}${viewUser.imagePath}` : GirlPhoto
            }
            alt="user-img"
          />

          <ul className="list-unstyled user-info">
            <li>Name: {viewUser?.userName}</li>
            <li>Email: {viewUser?.email}</li>
            <li>Phone: {viewUser?.phoneNumber}</li>
            <li>Country: {viewUser?.country}</li>
          </ul>
        </Modal.Body>
      </Modal>

      {loading ? (
        <div className="text-center py-5">
          <ClipLoader size={40} aria-label="Loading Spinner" />
        </div>
      ) : userList.length > 0 ? (
        <div className="user-table-container bg-light-gray rounded-3 p-4">
          <div className="mb-3">
            <input
              className="form-control rounded-4 w-50 mx-auto"
              type="text"
              placeholder="Search by name..."
              onChange={(e) => filterUser(e.target.value, 2, 1)}
            />
          </div>

          <table className="table table-hover  align-middle text-center">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Photo</th>
                <th>Status</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user) => (
                <tr key={user.id}>
                  <td>{user.userName}</td>
                  <td>
                    <img
                      className="table-img"
                      src={
                        user.imagePath
                          ? `${imgUrl}${user.imagePath}`
                          : GirlPhoto
                      }
                      alt="user-img"
                    />
                  </td>
                  <td>
                    <span
                      className={`badge rounded-pill ${
                        user.isActivated ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {user.isActivated ? "Active" : "Not Active"}
                    </span>
                  </td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.email}</td>
                  <td>
                    <div className="dropdown">
                      <button
                        className="btn border-0"
                        type="button"
                        data-bs-toggle="dropdown"
                      >
                        <HiDotsHorizontal />
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <button
                            className="dropdown-item fw-bold text-danger"
                            onClick={() => inActivateUser(user.id)}
                          >
                            {user.isActivated ? (
                              <span>
                                <MdOutlineBlock /> Block
                              </span>
                            ) : (
                              <span className="text-success">
                                <GoBlocked /> Activate
                              </span>
                            )}
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item fw-bold"
                            onClick={() => handleShow(user.id)}
                          >
                            <GrView /> View
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <nav aria-label="User pagination">
            <ul className="pagination justify-content-center">
              <li className="page-item">
                <button
                  className={`page-link ${activePage > 1 ? "" : "disabled"}`}
                  onClick={() =>
                    activePage > 1 && setActivePage(activePage - 1)
                  }
                >
                  «
                </button>
              </li>

              {pageNum
                .filter((page) =>
                  activePage === pageNum.length
                    ? page >= activePage - 2
                    : Math.abs(activePage - page) <= 1
                )
                .map((page) => (
                  <li key={page} className="page-item">
                    <button
                      className={`page-link ${
                        page === activePage ? "active" : ""
                      }`}
                      onClick={() => setActivePage(page)}
                    >
                      {page}
                    </button>
                  </li>
                ))}

              <li className="page-item">
                <button
                  className={`page-link ${
                    activePage === pageNum.length ? "disabled" : ""
                  }`}
                  onClick={() =>
                    activePage < pageNum.length && setActivePage(activePage + 1)
                  }
                >
                  »
                </button>
              </li>
            </ul>
          </nav>
        </div>
      ) : (
        <NoData />
      )}
    </div>
  );
}
