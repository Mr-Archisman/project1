"use client";

import CreditInfo from "@/constants/CreditInfo";
import React, { useEffect, useState } from "react";
import "../../app/globals.css";
import { Modal } from "./Modal";

interface Props {
  data: CreditInfo[];
}

export const CreditInfoTable: React.FC<Props> = ({ data }) => {
  const [employeeRange, setEmployeeRange] = useState({ min: 0, max: 750 });
  const [sortedData, setSortedData] = useState(data);
  const [dateFilter, setDateFilter] = useState<"asc" | "desc">("desc");
  const [accountStatusFilter, setAccountStatusFilter] = useState({
    active: true,
    closed: true,
  });
  const [sortField, setSortField] = useState<
    | "registrationDate"
    | "netProfit"
    | "numberOfEmployees"
    | "raisedCapital"
    | "turnover"
  >("netProfit");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [showModal, setShowModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<CreditInfo | null>(
    null
  );

  const handleDateFilterChange = () => {
    setDateFilter(dateFilter === "asc" ? "desc" : "asc");
  };
  const handleRowClick = (company: CreditInfo) => {
    setSelectedCompany(company);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSortChange = (
    field:
      | "registrationDate"
      | "netProfit"
      | "numberOfEmployees"
      | "raisedCapital"
      | "turnover"
  ) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  useEffect(() => {
    let filteredData = data.filter(
      (item) =>
        (accountStatusFilter.active && item.accountStatus === "active") ||
        (accountStatusFilter.closed &&
          item.accountStatus === "closed" &&
          item.numberOfEmployees >= employeeRange.min &&
          item.numberOfEmployees <= employeeRange.max)
    );

    filteredData.sort((a, b) => {
      if (sortField === "registrationDate") {
        return dateFilter === "asc"
          ? a.registrationDate.localeCompare(b.registrationDate)
          : b.registrationDate.localeCompare(a.registrationDate);
      } else {
        const valueA = a[sortField];
        const valueB = b[sortField];
        return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
      }
    });

    setSortedData(filteredData);
  }, [
    data,
    sortDirection,
    sortField,
    accountStatusFilter,
    dateFilter,
    employeeRange,
  ]);

  const handleFilterChange = (status: "active" | "closed") => {
    setAccountStatusFilter((prev) => ({
      ...prev,
      [status]: !prev[status],
    }));
  };

  return (
    <>
      <div className="flex">
        <div className="flex flex-col gap-y-2 p-8 w-[20%]">
          <h3>Filter by status</h3>
          <label className="flex">
            <input
              type="checkbox"
              checked={accountStatusFilter.active}
              onChange={() => handleFilterChange("active")}
            />
            Active
          </label>
          <label className="flex">
            <input
              type="checkbox"
              checked={accountStatusFilter.closed}
              onChange={() => handleFilterChange("closed")}
            />
            Closed
          </label>
          {/* <div className="flex flex-col gap-y-2">
            <label className="text-truncate">
              Minimum number of Employees:{employeeRange.min}
            </label>
            <input
              type="range"
              min="0"
              max="1000" // Adjust based on your data
              value={employeeRange.min}
              onChange={(e) =>
                setEmployeeRange({
                  ...employeeRange,
                  min: Number(e.target.value),
                })
              }
            />
            <label className="text-truncate">
              Maximum number of Employees:{employeeRange.max}
            </label>
            <input
              type="range"
              min="0"
              max="1000" // Adjust based on your data
              value={employeeRange.max}
              onChange={(e) =>
                setEmployeeRange({
                  ...employeeRange,
                  max: Number(e.target.value),
                })
              }
            />
          </div> */}
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Registration Date</th>
              <th onClick={() => handleSortChange("numberOfEmployees")}>
                Number of Employees{" "}
                {sortField === "numberOfEmployees"
                  ? sortDirection === "asc"
                    ? "🔼"
                    : "🔽"
                  : ""}
              </th>
              <th onClick={() => handleSortChange("raisedCapital")}>
                Raised Capital{" "}
                {sortField === "raisedCapital"
                  ? sortDirection === "asc"
                    ? "🔼"
                    : "🔽"
                  : ""}
              </th>
              <th onClick={() => handleSortChange("turnover")}>
                Turnover{" "}
                {sortField === "turnover"
                  ? sortDirection === "asc"
                    ? "🔼"
                    : "🔽"
                  : ""}
              </th>
              <th onClick={() => handleSortChange("netProfit")}>
                Net Profit{" "}
                {sortField === "netProfit"
                  ? sortDirection === "asc"
                    ? "🔼"
                    : "🔽"
                  : ""}
              </th>
              <th>Contact Number</th>
              <th>Contact Email</th>
              <th>Account Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              <tr key={index} onClick={() => handleRowClick(item)}>
                <td>{item.companyName}</td>
                <td>{item.registrationDate}</td>
                <td>{item.numberOfEmployees}</td>
                <td>{item.raisedCapital}</td>
                <td>{item.turnover}</td>
                <td>{item.netProfit}</td>
                <td>{item.contactNumber}</td>
                <td>{item.contactEmail}</td>
                <td
                  className={
                    item.accountStatus === "active"
                      ? "text-green-800"
                      : "text-red-800"
                  }
                >
                  {item.accountStatus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal
          show={showModal}
          onClose={handleCloseModal}
          companyData={selectedCompany}
        />
      </div>
    </>
  );
};

{
  /* <th>Account Status</th> <td>{item.accountStatus}</td> */
}
