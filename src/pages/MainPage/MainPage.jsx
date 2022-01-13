import React, { useState, useCallback, useEffect } from "react";
import { useQuery } from "react-query";
import Loader from "../../components/Loader/Loader";
import { UserCard } from "../../components/UserCard/UserCard";
import { LoadMoreButton } from "../../components/Buttons/LoadMoreButton";

import "./MainPage.css";
export default function MainPage() {
  const url = "https://randomuser.me/api/?results=30";
  const [users, setUsers] = useState(null);
  // супер что решила испольозвать react-query, но тогда
  // с ним можно реализовать загрузку немного иначе 
  const { data, error, status, isLoading, refetch } = useQuery("data", () =>
    fetch(url)
      .then((res) => res.json())
      //почему бы сразу не сохранить data.results
      .then((data) => setUsers(data))
  );
  //фильтры не совсем в ту сторону реализованы,
  const [filters, setFilters] = useState(null);
  const handleNameFilter = useCallback(
    (name) => {
      const filteredUsers = users.results.filter((username) => {
        return username.name.first === name;
      });
      return setFilters(filteredUsers);
    },
    [filters, setFilters, users]
  );
  // может быть здесь useCallback излишний
  const handleReload = useCallback(() => {
    // это хорошо)
    setFilters(null);
    refetch();
  }, [setFilters]);

  if (isLoading) return <Loader />;
  // мб шаблонный литерал? красивее будет
  if (error) return  "An error has occurred: " + error.message;
  if (users.results.length === 0) return <div> No users found</div>;
  return (
    <div className="data-container">
      {/* зачем здесь фрагмент */}
      <>
        <div className="container-filters">
          <div className="name-filters">
            <p>
              Filter by <span>name</span>
            </p>
            <div className="name-filters--buttons">
              {/* зачем такой сложный ключ? */}
              {users.results.map((user) => (
                <button
                  key={`${user.id.name}${user.id.value}${user.picture.large}`}
                  className={`button-filterby--name`}
                  onClick={() => {
                    handleNameFilter(user.name.first);
                  }}
                >
                  {user.name.first}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* а вот это странно */}
        {filters != null &&
          filters.map((user) => (
            <UserCard
              key={user.login.uuid}
              picture={user.picture.thumbnail}
              name={`${user.name.first} ${user.name.last}`}
              email={user.email}
            />
          ))}
		{/* по возможности избежать повтореня одинковых конструкций типа этого перебора и похожего условия */}
        {filters === null &&
          users.results.map((user) => (
            <UserCard
              key={user.login.uuid}
              picture={user.picture.thumbnail}
              name={`${user.name.first} ${user.name.last}`}
              email={user.email}
            />
          ))}
        <LoadMoreButton handler={handleReload} />
      </>
    </div>
  );
}
