import { useEffect, useState } from "react";
import CheckInButton from "../components/attendance/CheckInButton";
import Loading from "../components/Loading";
import { dummyAttendanceData } from "../assets/assets";
import AttendanceStats from "../components/attendance/AttendanceStats";
import AttendanceHistory from "../components/attendance/AttendanceHistory";

const Attendance = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleted] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setHistory([]);
    setLoading(false);
  };

  const handleAttendance = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const today = new Date().toDateString();

    setHistory(dummyAttendanceData)
  };

  if (loading) {
    return <Loading />;
  }

  const todayRecord = history.find(
    (item) =>
      new Date(item.date).toDateString() === new Date().toDateString()
  );

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Attendance</h1>
        <p className="page-subtitle">
          Track your work hours and daily check-ins
        </p>
      </div>

      {isDeleted ? (
        <div className="mb-8 p-6 bg-rose-50 border border-rose-200 rounded-2xl text-center">
          <p className="text-red-600">
            You can no longer clock in or out because your employee
            records have been marked as deleted.
          </p>
        </div>
      ) : (
        <div className="mb-8">
          <CheckInButton
            todayRecord={todayRecord}
            onAction={handleAttendance}
          />
        </div>
      )}
      <AttendanceStats history={history} />
      <AttendanceHistory history={history} />
      {/* <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">
          Attendance History
        </h2>

        {history.length === 0 ? (
          <p>No attendance records found.</p>
        ) : (
          <div className="space-y-3">
            {history.map((record) => (
              <div
                key={record.id}
                className="p-4 border rounded-lg bg-white shadow-sm"
              >
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(record.date).toLocaleDateString()}
                </p>

                <p>
                  <strong>Check In:</strong> {record.checkIn}
                </p>

                <p>
                  <strong>Check Out:</strong>{" "}
                  {record.checkOut || "-"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div> */}
    </div>
  );
};

export default Attendance;
