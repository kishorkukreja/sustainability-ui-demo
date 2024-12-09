import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Card = ({ children, className }) => (
  <div className={`bg-white rounded-lg shadow-xl ${className}`}>{children}</div>
);

const CardHeader = ({ children }) => (
  <div className="border-b p-4">{children}</div>
);

const CardTitle = ({ children }) => (
  <h2 className="text-xl font-semibold">{children}</h2>
);

const CardContent = ({ children, className }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const mockData = [
  {
    id: 1,
    title: "Q2 2023 Sustainability Analysis",
    date: "2023-06-30",
    analyst: "Jane Doe",
    questions: [
      "What were the key sustainability improvements in Q2 2023?",
      "How do these compare to our annual targets?",
    ],
    insights: [
      "Carbon emissions reduced by 15% compared to Q1",
      "Renewable energy usage increased to 60% of total consumption",
    ],
    actions: [
      "Invest in additional solar panels for manufacturing plants",
      "Implement new recycling program across all offices",
    ],
    graphData: [
      { name: "Jan", value: 4000 },
      { name: "Feb", value: 3000 },
      { name: "Mar", value: 5000 },
      { name: "Apr", value: 4000 },
      { name: "May", value: 3000 },
      { name: "Jun", value: 2000 },
    ],
  },
  {
    id: 2,
    title: "Q3 2023 Water Conservation Report",
    date: "2023-09-30",
    analyst: "John Smith",
    questions: [
      "How effective were our water conservation efforts in Q3?",
      "Which facilities showed the most improvement?",
    ],
    insights: [
      "Overall water usage reduced by 22% compared to Q2",
      "Facility B achieved a 30% reduction through new recycling systems",
    ],
    actions: [
      "Expand successful water recycling systems to other facilities",
      "Conduct employee training on water conservation best practices",
    ],
    graphData: [
      { name: "Jul", value: 3500 },
      { name: "Aug", value: 3200 },
      { name: "Sep", value: 2800 },
    ],
  },
  {
    id: 3,
    title: "2023 Annual Renewable Energy Assessment",
    date: "2023-12-31",
    analyst: "Emily Chen",
    questions: [
      "What progress did we make in renewable energy adoption this year?",
      "Are we on track to meet our 2025 renewable energy goals?",
    ],
    insights: [
      "Renewable energy now accounts for 75% of our total energy consumption",
      "Solar energy production increased by 40% year-over-year",
    ],
    actions: [
      "Explore wind energy options for coastal facilities",
      "Negotiate long-term contracts with renewable energy providers",
    ],
    graphData: [
      { name: "Q1", value: 5000 },
      { name: "Q2", value: 5500 },
      { name: "Q3", value: 6000 },
      { name: "Q4", value: 6500 },
    ],
  },
  {
    id: 4,
    title: "Q1 2024 Waste Reduction Initiative Results",
    date: "2024-03-31",
    analyst: "Michael Johnson",
    questions: [
      "How successful was our Q1 waste reduction initiative?",
      "Which waste streams showed the most significant improvements?",
    ],
    insights: [
      "Total waste reduced by 18% compared to Q4 2023",
      "Plastic waste in packaging decreased by 35% through new materials",
    ],
    actions: [
      "Scale up use of biodegradable packaging materials",
      "Partner with local recycling facilities to improve waste sorting",
    ],
    graphData: [
      { name: "Jan", value: 4500 },
      { name: "Feb", value: 4200 },
      { name: "Mar", value: 3800 },
    ],
  },
];

const HistoryPage = ({ savedAnalyses }) => {
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    // Combine mock data with saved analyses
    const combined = [...mockData, ...savedAnalyses];
    setCombinedData(combined);
  }, [savedAnalyses]);

  return (
    <div className="flex h-full bg-gray-100">
      <div className="w-1/3 bg-white shadow-lg p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-indigo-700">
          Saved Analyses
        </h2>
        {combinedData.map((analysis) => (
          <div
            key={analysis.id}
            className="cursor-pointer p-4 mb-4 hover:bg-indigo-50 rounded-lg transition duration-300 ease-in-out border border-gray-200"
            onClick={() => setSelectedAnalysis(analysis)}
          >
            <h3 className="font-semibold text-lg text-indigo-600">
              {analysis.title}
            </h3>
            <p className="text-sm text-gray-500">{analysis.date}</p>
          </div>
        ))}
      </div>
      <div className="w-2/3 p-8 overflow-y-auto">
        {selectedAnalysis ? (
          <Card className="bg-white shadow-xl rounded-lg overflow-hidden">
            <CardHeader className="bg-indigo-700 text-white p-6">
              <h2 className="text-3xl font-bold mb-2">
                {selectedAnalysis.title}
              </h2>
              <p className="text-indigo-200">
                <span className="font-semibold">Date:</span>{" "}
                {selectedAnalysis.date} |
                <span className="font-semibold ml-2">Analyst:</span>{" "}
                {selectedAnalysis.analyst}
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3 text-indigo-600">
                  Questions Asked:
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  {selectedAnalysis.questions.map((q, index) => (
                    <li key={index} className="text-gray-700">
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3 text-indigo-600">
                  Insights Generated:
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  {selectedAnalysis.insights.map((insight, index) => (
                    <li key={index} className="text-gray-700">
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3 text-indigo-600">
                  Actions Taken:
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  {selectedAnalysis.actions.map((action, index) => (
                    <li key={index} className="text-gray-700">
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-indigo-600">
                  Sustainability Metrics:
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={selectedAnalysis.graphData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#4f46e5"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-xl text-gray-500">
              Select an analysis to view details
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default HistoryPage;
