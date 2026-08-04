const applicants = [
  {
    name: "Ahmet Yılmaz",
    position: "Frontend Developer",
    score: "92%",
    status: "Accepted",
  },
  {
    name: "Mehmet Kaya",
    position: "Backend Developer",
    score: "78%",
    status: "Review",
  },
  {
    name: "Ayşe Demir",
    position: "Data Scientist",
    score: "88%",
    status: "Accepted",
  },
];

function RecentApplicants() {
  return (
    <div className="bg-white rounded-xl border p-5 mt-6">
      <h2 className="text-xl font-bold mb-4">
        Recent Applicants
      </h2>

      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-500">
            <th>Name</th>
            <th>Position</th>
            <th>Score</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {applicants.map((applicant) => (
            <tr key={applicant.name} className="border-t">
              <td className="py-3">
                {applicant.name}
              </td>

              <td>
                {applicant.position}
              </td>

              <td>
                {applicant.score}
              </td>

              <td>
                {applicant.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentApplicants;