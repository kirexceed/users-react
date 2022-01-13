import React, { useState, useCallback, useEffect } from "react";
import { useQuery } from "react-query";
import Loader from "../../components/Loader/Loader";
import { UserCard } from "../../components/UserCard/UserCard";
import { LoadMoreButton } from "../../components/Buttons/LoadMoreButton";

import "./MainPage.css";
const url = "https://randomuser.me/api/?results=30";

const loadQuery = () =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => data.results);

export default function Ll() {
  const [filterString, setFilterString] = useState("");

  const { data, error, isLoading, refetch } = useQuery("data", loadQuery);

  const [users, setUsers] = useState([]);

  const handleReload = () => {
    setFilterString("");
    refetch();
  };

  useEffect(() => {
    !isLoading && setUsers(data);
  }, [isLoading, data]);

  useEffect(() => {
    data &&
      setUsers(
        [...data].filter((user) => {
          if (!!filterString) {
            let rg = new RegExp(filterString.toLowerCase());
            return rg.test(user.name.first.toLowerCase());
          }
          return user;
        })
      );
  }, [filterString]);

  if (isLoading) return <Loader />;
  if (error) return "An error has occurred: " + error.message;
  if (data.length === 0) return <div> No users found</div>;
  return (
    <div className="data-container">
      <div className="container-filters">
        <div className="name-filters">
          <p>
            Filter by <span>name</span>
          </p>
          <div className="name-filters--buttons">
            <input
              value={filterString}
              onChange={(event) => setFilterString(event.target.value)}
            />
          </div>
        </div>
      </div>

      {!isLoading &&
        users.map((user) => (
          <UserCard
            key={user.login.uuid}
            picture={user.picture.thumbnail}
            name={`${user.name.first} ${user.name.last}`}
            email={user.email}
          />
        ))}
      <LoadMoreButton handler={handleReload} />
    </div>
  );
}
