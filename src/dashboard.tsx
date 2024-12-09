import React, { useState, useCallback, useEffect } from "react"; // Added useCallback
import ForceGraph3D from "react-force-graph-3d";
import * as THREE from "three";
import HistoryPage from "./history";
import { useNavigate } from "react-router-dom";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  BarChart, // Ensure BarChart is imported
  Bar, // Ensure Bar is imported
} from "recharts";
import { Download, Mail } from "lucide-react";

const sustainabilityData = [
  {
    month: "Jan",
    onTimePerformance: 90,
    sustainableQuotient: 75,
    recycledMaterials: 65,
    renewableEnergy: 40,
    carbonFootprint: 85,
  },
  {
    month: "Feb",
    onTimePerformance: 85,
    sustainableQuotient: 78,
    recycledMaterials: 68,
    renewableEnergy: 42,
    carbonFootprint: 82,
  },
  {
    month: "Mar",
    onTimePerformance: 88,
    sustainableQuotient: 80,
    recycledMaterials: 75,
    renewableEnergy: 45,
    carbonFootprint: 78,
  },
  {
    month: "Apr",
    onTimePerformance: 92,
    sustainableQuotient: 83,
    recycledMaterials: 78,
    renewableEnergy: 50,
    carbonFootprint: 75,
  },
  {
    month: "May",
    onTimePerformance: 95,
    sustainableQuotient: 85,
    recycledMaterials: 82,
    renewableEnergy: 55,
    carbonFootprint: 70,
  },
  {
    month: "Jun",
    onTimePerformance: 93,
    sustainableQuotient: 87,
    recycledMaterials: 85,
    renewableEnergy: 60,
    carbonFootprint: 65,
  },
];

const data_graph = {
  nodes: [
    // Suppliers
    { id: "Supplier A", group: 1 },
    { id: "Supplier B", group: 1 },
    { id: "Supplier C", group: 1 },
    { id: "Supplier D", group: 1 },

    // Sustainability Metrics
    { id: "Renewable Energy", group: 2 },
    { id: "Recycled Materials", group: 2 },
    { id: "Carbon Footprint", group: 2 },
    { id: "Water Usage", group: 2 },
    { id: "Waste Management", group: 2 },

    // Products
    { id: "Product X", group: 3 },
    { id: "Product Y", group: 3 },
    { id: "Product Z", group: 3 },

    // Certifications
    { id: "ISO 14001", group: 4 },
    { id: "Fair Trade", group: 4 },
    { id: "LEED Certified", group: 4 },
  ],
  links: [
    // Supplier to Sustainability Metrics
    {
      source: "Supplier A",
      target: "Renewable Energy",
      value: 10,
      label: "USES_RENEWABLE_ENERGY",
    },
    {
      source: "Supplier B",
      target: "Recycled Materials",
      value: 8,
      label: "USES_RECYCLED_MATERIALS",
    },
    {
      source: "Supplier C",
      target: "Carbon Footprint",
      value: 5,
      label: "REDUCES_CARBON_FOOTPRINT",
    },
    {
      source: "Supplier A",
      target: "Water Usage",
      value: 7,
      label: "REDUCES_WATER_USAGE",
    },
    {
      source: "Supplier B",
      target: "Carbon Footprint",
      value: 6,
      label: "REDUCES_CARBON_FOOTPRINT",
    },
    {
      source: "Supplier C",
      target: "Renewable Energy",
      value: 4,
      label: "USES_RENEWABLE_ENERGY",
    },
    {
      source: "Supplier D",
      target: "Waste Management",
      value: 9,
      label: "MANAGES_WASTE",
    },

    // Supplier to Products
    {
      source: "Supplier A",
      target: "Product X",
      value: 7,
      label: "SUPPLIES_PRODUCT",
    },
    {
      source: "Supplier B",
      target: "Product Y",
      value: 6,
      label: "SUPPLIES_PRODUCT",
    },
    {
      source: "Supplier C",
      target: "Product Z",
      value: 8,
      label: "SUPPLIES_PRODUCT",
    },
    {
      source: "Supplier D",
      target: "Product X",
      value: 5,
      label: "SUPPLIES_PRODUCT",
    },

    // Products to Sustainability Metrics
    {
      source: "Product X",
      target: "Recycled Materials",
      value: 10,
      label: "CONTAINS_RECYCLED_MATERIALS",
    },
    {
      source: "Product Y",
      target: "Water Usage",
      value: 7,
      label: "REQUIRES_WATER_USAGE",
    },
    {
      source: "Product Z",
      target: "Carbon Footprint",
      value: 9,
      label: "CONTRIBUTES_TO_CARBON_FOOTPRINT",
    },

    // Supplier to Certifications
    {
      source: "Supplier A",
      target: "ISO 14001",
      value: 8,
      label: "HOLDS_ISO_14001_CERTIFICATION",
    },
    {
      source: "Supplier B",
      target: "Fair Trade",
      value: 7,
      label: "HOLDS_FAIR_TRADE_CERTIFICATION",
    },
    {
      source: "Supplier C",
      target: "LEED Certified",
      value: 9,
      label: "HOLDS_LEED_CERTIFICATION",
    },
    {
      source: "Supplier D",
      target: "ISO 14001",
      value: 6,
      label: "HOLDS_ISO_14001_CERTIFICATION",
    },

    // Certifications to Sustainability Metrics
    {
      source: "ISO 14001",
      target: "Carbon Footprint",
      value: 5,
      label: "CERTIFIES_CARBON_FOOTPRINT_REDUCTION",
    },
    {
      source: "Fair Trade",
      target: "Renewable Energy",
      value: 6,
      label: "CERTIFIES_RENEWABLE_ENERGY_USE",
    },
    {
      source: "LEED Certified",
      target: "Water Usage",
      value: 8,
      label: "CERTIFIES_WATER_EFFICIENCY",
    },
  ],
};

const Alert = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative ${className}`}
      role="alert"
    >
      {children}
    </div>
  );
};

const AlertTitle = ({ children }) => {
  return <strong className="font-bold block">{children}</strong>;
};

const AlertDescription = ({ children }) => {
  return <span className="block sm:inline">{children}</span>;
};

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

const Avatar = ({ src, alt, fallback }) => (
  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
    {src ? (
      <img
        src="././images.jpg"
        alt={alt}
        className="w-full h-full object-cover"
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center text-gray-600">
        {fallback}
      </div>
    )}
  </div>
);

const generateNodeLabel = (node) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context.font = "bold 48px Arial";
  context.fillStyle = "rgba(0, 0, 0, 1)";
  context.fillText(node.id, 0, 50);
  canvas.width = context.measureText(node.id).width;
  canvas.height = 60;
  context.font = "bold 48px Arial";
  context.fillStyle = "rgba(0, 0, 0, 1)";
  context.fillText(node.id, 0, 50);
  return canvas;
};

const generateEdgeLabel = (link) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context.font = "bold 48px Arial";
  context.fillStyle = "rgba(0, 0, 0, 1)";
  context.fillText(link.value, 0, 50);
  canvas.width = context.measureText(link.value).width;
  canvas.height = 60;
  context.font = "bold 48px Arial";
  context.fillStyle = "rgba(0, 0, 0, 1)";
  context.fillText(link.value, 0, 50);
  return canvas;
};

// Helper function to create a text sprite
const createTextSprite = (text, color) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context.font = "24px Arial";
  context.fillStyle = color;
  context.fillText(text, 0, 24);
  const texture = new THREE.CanvasTexture(canvas);
  const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(10, 5, 1); // Scale the sprite to a reasonable size
  return sprite;
};

const Button = ({ children, onClick, className, type = "button" }) => (
  <button
    onClick={onClick}
    type={type}
    className={`px-4 py-2 rounded-full ${className}`}
  >
    {children}
  </button>
);

const Tooltip = ({ children, text }) => (
  <div className="relative group">
    {children}
    <div className="absolute bottom-full left-1/2 transform translate-x-2 mb-2 w-max bg-gray-700 text-white text-xs rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
      {text}
    </div>
  </div>
);

const Dashboard = () => {
  const [activeIcon, setActiveIcon] = useState("chat");
  const [activePage, setActivePage] = useState("chat");

  const [detailedResponse, setDetailedResponse] = useState(null);
  const [followUpQuestions, setFollowUpQuestions] = useState([]);
  const [analysisItems, setAnalysisItems] = useState([]);
  const [savedAnalyses, setSavedAnalyses] = useState([]); // Move this state to Dashboard
  const [chatMessages, setChatMessages] = useState([]);
  let [isSaved, setIsSaved] = useState(false);

  const [messages, setMessages] = useState([
    {
      type: "agent",
      content:
        "Welcome to the Unilever Sustainable GraphLLM. How can I assist you today?",
    },
    {
      type: "user",
      content:
        "Show me the current sustainability metrics for our D-premium Suppliers.",
    },
    {
      type: "agent",
      content: (
        <>
          <p>
            Certainly! I'll query our graph database for the latest
            sustainability metrics of our D-premium Suppliers.
          </p>
          <p className="mt-2">
            The current sustainability metrics for our D-premium suppliers
            indicate varying levels of performance.
            <strong> Supplier X stands out</strong> as the top performer,
            excelling in multiple areas such as{" "}
            <strong>carbon emissions reduction, waste management</strong>, and{" "}
            <strong>water usage efficiency</strong>. They have consistently
            achieved a <strong>30% reduction in emissions</strong> over the last
            year and implemented innovative recycling programs that have reduced
            waste by <strong>25%</strong>.
          </p>
          <p className="mt-2">
            Other suppliers, such as <strong>Supplier Y</strong> and{" "}
            <strong>Supplier Z</strong>, have made strides in improving their
            sustainability efforts but still lag behind Supplier X. For example,{" "}
            <strong>Supplier Y has reduced emissions by 15%</strong>, while{" "}
            <strong>Supplier Z</strong> has implemented{" "}
            <strong>water conservation measures</strong> but remains behind in
            waste management initiatives.
          </p>
          <p className="mt-4">
            <strong>
              Would you like to explore which suppliers have shown the most
              improvement and how we can further encourage sustainability
              efforts across the supply chain?
            </strong>
          </p>
        </>
      ),
    },
  ]);
  const [agentThinking, setAgentThinking] = useState(false);

  const MenuItem = ({ icon, name, tooltip }) => (
    <Tooltip text={tooltip}>
      <button
        onClick={() => {
          setActiveIcon(name);
          setActivePage(name);
        }}
        className={`w-16 h-16 mb-4 text-lg ${
          activeIcon === name ? "bg-gray-200" : "bg-white"
        }`}
      >
        {icon}
      </button>
    </Tooltip>
  );

  const Logo = () => {
    const navigate = useNavigate(); // Use the useNavigate hook

    return (
      <div
        className="w-full flex justify-center items-center py-4 border-b border-gray-200 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src="././logo.jpg" alt="Company Logo" className="h-14 w-auto" />
      </div>
    );
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const userMessage = e.target.message.value;
    setMessages([...messages, { type: "user", content: userMessage }]);
    e.target.reset();

    setAgentThinking(true);
    setTimeout(() => {
      setAgentThinking(false);
      setMessages((prev) => [
        ...prev,
        {
          type: "agent",
          content: "Sure, here are a few questions you might wish to explore",
        },
      ]);
      const newFollowUpQuestions = [
        "Which supplier has shown the most improvement in key sustainability indicators?",
        "How can we incentivize other suppliers to match top performers?",
        "What potential challenges might we face in maintaining this progress?",
        "How do these improvements impact our overall sustainability scorecard?",
      ];
      setFollowUpQuestions(newFollowUpQuestions);
    }, 2000);
  };

  const handleFollowUpQuestion = useCallback(
    (question) => {
      setMessages((prev) => [...prev, { type: "user", content: question }]);
      setFollowUpQuestions([]);
      setAgentThinking(true);

      // Simulate API call or processing time
      setTimeout(() => {
        setAgentThinking(false);
        let response = [];

        if (
          question ===
          "Which supplier has shown the most improvement in key sustainability indicators?"
        ) {
          response = [
            <p key="intro">
              Based on our latest data, <strong>Supplier X</strong> has
              demonstrated the most significant improvement in sustainability
              metrics:
            </p>,
            <ul key="list">
              <li>
                <strong>Carbon Footprint Reduction:</strong> 32% decrease
                year-over-year, from 120,000 to 81,600 tons CO2e.
              </li>
              <li>
                <strong>Renewable Energy Adoption:</strong> Increased from 45%
                to 78% of total energy consumption.
              </li>
              <li>
                <strong>Water Usage Efficiency:</strong> Improved by 25%, now
                using 3.2 liters of water per unit produced, down from 4.3
                liters.
              </li>
              <li>
                <strong>Waste Reduction:</strong> Achieved a 40% reduction in
                landfill waste, now at a 98% diversion rate.
              </li>
            </ul>,
            <p key="conclusion">
              These improvements put <strong>Supplier X</strong> on an
              accelerated trajectory towards our{" "}
              <strong>FY 2030 net zero target</strong>.
            </p>,
          ];
        } else if (
          question ===
            "How can we incentivize other suppliers to match top performers?" ||
          question ===
            "How can we incentivize other suppliers to match Supplier X's performance?"
        ) {
          response = [
            <p key="intro">
              To incentivize other suppliers to match the top performers, we can
              consider the following strategies:
            </p>,
            <ul key="list">
              <li>
                <strong>Introduce a reward system</strong> for top-performing
                suppliers, such as financial bonuses, public recognition, or
                preferred supplier status.
              </li>
              <li>
                <strong>
                  Provide access to exclusive resources and training programs
                </strong>{" "}
                that help other suppliers adopt best practices demonstrated by
                the top performers.
              </li>
              <li>
                <strong>Establish a tiered certification program</strong> that
                encourages competition among suppliers to reach higher
                sustainability standards.
              </li>
              <li>
                <strong>Create collaborative forums</strong> where top
                performers share their strategies and innovations with other
                suppliers, fostering a culture of continuous improvement.
              </li>
              <li>
                <strong>Offer financial incentives</strong> such as reduced
                financing costs or investment in sustainable technologies for
                suppliers who achieve specific sustainability targets.
              </li>
            </ul>,
            <p key="conclusion">
              These incentives can create a{" "}
              <strong>positive feedback loop</strong>, encouraging all suppliers
              to enhance their sustainability performance.
            </p>,
          ];
        } else if (
          question ===
            "What potential challenges might we face in maintaining this progress?" ||
          question ===
            "What potential challenges might Supplier X face in maintaining this progress?"
        ) {
          response = [
            <p key="intro">
              Maintaining this progress presents several potential challenges:
            </p>,
            <ul key="list">
              <li>
                Supply chain disruptions could hinder the consistent
                availability of sustainable materials, affecting the ability to
                maintain current levels of recycled materials and renewable
                energy usage.
              </li>
              <li>
                Increased costs associated with sustainable practices may strain
                supplier relationships, especially with smaller suppliers who
                may lack the financial resources to invest in sustainability.
              </li>
              <li>
                Regulatory changes or shifts in government policies could impact
                the feasibility of certain sustainability initiatives, requiring
                continuous adaptation and compliance.
              </li>
              <li>
                Technological advancements are needed to further reduce the
                carbon footprint and improve efficiency, but the pace of
                innovation may not keep up with our sustainability targets.
              </li>
              <li>
                Maintaining employee and stakeholder engagement in
                sustainability initiatives can be challenging, especially as
                initial enthusiasm wanes over time.
              </li>
            </ul>,
            <p key="conclusion">
              Addressing these challenges proactively will be crucial to
              sustaining the progress we have made towards our sustainability
              goals.
            </p>,
          ];
        } else if (
          question ===
            "How do these improvements impact our overall sustainability scorecard?" ||
          question ===
            "How does Supplier X's improvement impact our overall sustainability scorecard?"
        ) {
          response = [
            <p key="intro">
              The improvements made by our top-performing suppliers have a
              significant impact on our overall sustainability scorecard:
            </p>,
            <ul key="list">
              <li>
                Carbon Footprint: The reduction in carbon emissions contributes
                to a lower overall carbon footprint, bringing us closer to our
                net zero targets.
              </li>
              <li>
                Renewable Energy: Increased adoption of renewable energy sources
                raises the percentage of total energy usage from renewables,
                improving our energy sustainability metrics.
              </li>
              <li>
                Water Usage Efficiency: Improved water efficiency contributes to
                better performance in water-related metrics, which is crucial
                for our sustainability scorecard, particularly in water-scarce
                regions.
              </li>
              <li>
                Waste Reduction: Higher waste diversion rates enhance our waste
                management metrics, aligning with our goals to minimize landfill
                usage and promote circular economy practices.
              </li>
            </ul>,
            <p key="conclusion">
              These improvements strengthen our sustainability scorecard,
              demonstrating our commitment to continuous environmental
              improvement and setting a benchmark for future progress.
            </p>,
          ];
        } else if (
          question ===
          "What specific technologies or practices led to Supplier X's improvements?"
        ) {
          response = [
            <p key="intro">
              <strong>Supplier X's</strong> improvements were driven by the
              adoption of several key technologies and practices:
            </p>,
            <ul key="list">
              <li>
                <strong>
                  Advanced Carbon Capture and Storage (CCS) technology,
                </strong>{" "}
                which significantly reduced their carbon emissions.
              </li>
              <li>
                <strong>
                  Implementation of smart energy management systems
                </strong>{" "}
                that optimized energy usage, allowing a higher reliance on
                renewable energy sources.
              </li>
              <li>
                <strong>
                  Installation of high-efficiency water recycling systems,
                </strong>{" "}
                reducing freshwater consumption and improving overall water
                usage efficiency.
              </li>
              <li>
                <strong>Adoption of circular economy principles,</strong>{" "}
                including increased use of recycled materials and
                waste-to-energy processes, leading to a significant reduction in
                landfill waste.
              </li>
              <li>
                <strong>Investing in employee training programs</strong> focused
                on sustainability best practices, ensuring that the entire
                workforce contributed to the company’s sustainability goals.
              </li>
            </ul>,
            <p key="conclusion">
              These technologies and practices have positioned{" "}
              <strong>Supplier X</strong> as a leader in sustainability within
              our supply chain, providing a model for other suppliers to follow.
            </p>,
          ];
        } else {
          response = [
            <p key="processing">
              I'm processing your request. Please give me a moment to analyze
              the data and provide a detailed response.
            </p>,
          ];
        }

        setMessages((prev) => [...prev, { type: "agent", content: response }]);
        console.log("Before setting detailedResponse:", detailedResponse); // Logs the value before update
        console.log("Setting detailedResponse with:", response); // Logs the new value to be set
        setDetailedResponse(response);
        console.log("After setting detailedResponse:", response); // Logs the value after update

        const newFollowUpQuestions = [
          "What specific technologies or practices led to Supplier X's improvements?",
          "How can we incentivize other suppliers to match Supplier X's performance?",
          "What potential challenges might Supplier X face in maintaining this progress?",
          "How does Supplier X's improvement impact our overall sustainability scorecard?",
        ];
        setFollowUpQuestions(newFollowUpQuestions);
      }, 2000);
    },
    [setMessages, setFollowUpQuestions, setAgentThinking, setDetailedResponse]
  );

  const handleAddToAnalysis = (question, answer) => {
    setChatMessages((prev) => [
      ...prev,
      { type: "user", content: question },
      { type: "agent", content: answer },
    ]);
    setMessages((prev) => [
      ...prev,
      {
        type: "system",
        content: "Item added to analysis.",
      },
    ]);
  };

  const AnalysisItem = ({ item, index }) => (
    <div className="border-b pb-4 mb-4">
      <h3 className="font-semibold">Question {index + 1}:</h3>
      <p className="mb-2">{item.question}</p>
      <h3 className="font-semibold">Answer:</h3>
      {Array.isArray(item.answer) ? (
        item.answer.map((part, i) => <div key={i}>{part}</div>)
      ) : (
        <p>{item.answer}</p>
      )}
    </div>
  );

  const SummarizePage = ({
    chatMessages,
    savedAnalyses,
    setSavedAnalyses,
    isSaved,
    setIsSaved,
  }) => {
    const [summaryType, setSummaryType] = useState(null);
    let [analysisName, setAnalysisName] = useState("");
    const [showPopup, setShowPopup] = useState(false); // State for showing the popup
    const handleSummaryAction = (type) => {
      setSummaryType(type);
    };

    const renderContent = () => {
      switch (summaryType) {
        case "insights":
          return (
            <ul className="list-disc pl-5">
              <li>Supplier X has shown a 32% decrease in carbon footprint</li>
              <li>Renewable energy adoption increased from 45% to 78%</li>
              <li>Water usage efficiency improved by 25%</li>
              <li>98% waste diversion rate achieved</li>
            </ul>
          );
        case "summary":
          return (
            <div>
              <p>
                Supplier X has made significant strides in sustainability, with
                notable improvements in carbon footprint reduction, renewable
                energy adoption, water usage efficiency, and waste reduction.
                These achievements put them on an accelerated trajectory towards
                our FY 2030 net zero target, potentially achieving it two years
                early.
              </p>
              <button className="mt-4 bg-blue-500 text-white text-sm px-4 py-2 rounded">
                <Download className="inline-block mr-2 h-4 w-4" /> Download
                Summary
              </button>
            </div>
          );
        case "actions":
          return (
            <ul className="list-disc pl-5">
              <li>
                Document and share Supplier X's best practices -{" "}
                <span className="font-semibold">Sustainability Team</span>
              </li>
              <li>
                Invest in scaling successful initiatives -{" "}
                <span className="font-semibold">Finance and Operations</span>
              </li>
              <li>
                Set more aggressive interim targets for other suppliers -{" "}
                <span className="font-semibold">Supply Chain Management</span>
              </li>
            </ul>
          );
        default:
          return <p>Select an option to see details here.</p>;
      }
    };

    const handleSaveAnalysis = () => {
      const newAnalysis = {
        id: savedAnalyses.length + 1,
        title: analysisName,
        date: new Date().toLocaleDateString(),
        analyst: "John Doe",
        insights: [
          "Supplier X has shown a 32% decrease in carbon footprint",
          "Renewable energy adoption increased from 45% to 78%",
          "Water usage efficiency improved by 25%",
          "98% waste diversion rate achieved",
        ],
        actions: [
          "Document and share Supplier X's best practices - Sustainability Team",
          "Invest in scaling successful initiatives - Finance and Operations",
          "Set more aggressive interim targets for other suppliers - Supply Chain Management",
        ],
        questions: [
          "Which supplier has shown the most improvement in sustainability?",
          "What specific technologies or practices led to Supplier X's improvements?",
          "How does Supplier X's improvement impact our overall sustainability scorecard?",
        ],
        graphData: [
          { name: "Jan", value: 3500 },
          { name: "Feb", value: 4200 },
          { name: "Mar", value: 3800 },
          { name: "Apr", value: 4600 },
          { name: "May", value: 3900 },
          { name: "Jun", value: 4800 },
          { name: "Jul", value: 4300 },
          { name: "Aug", value: 4500 },
          { name: "Sep", value: 4700 },
          { name: "Oct", value: 4000 },
          { name: "Nov", value: 3800 },
          { name: "Dec", value: 4200 },
        ],
      };

      setSavedAnalyses([...savedAnalyses, newAnalysis]);
      // setSavedAnalyses((prevAnalyses) => {
      //   const exists = prevAnalyses.some(
      //     (analysis) => analysis.title === newAnalysis.title
      //   );
      //   if (!exists) {
      //     return [...prevAnalyses, newAnalysis];
      //   }
      //   return prevAnalyses;
      // });

      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
      }, 1000000);
    };

    return (
      <div className="flex flex-col h-full bg-gray-100">
        <div className="flex flex-grow space-x-4 p-6 overflow-y-auto">
          {/* Left Panel with Scrollable Chat Messages */}
          <div className="w-1/2 bg-white p-4 rounded shadow-md overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Analysis Messages</h2>
            <div className="space-y-2">
              {chatMessages.length > 0 ? (
                chatMessages.map((message, index) => (
                  <div key={index} className="p-2 bg-gray-200 rounded">
                    {message.content}
                  </div>
                ))
              ) : (
                <p>No chat messages available.</p>
              )}
            </div>
          </div>

          {/* Right Panel with Content based on Button Clicks */}
          <div className="w-1/2 bg-white p-4 rounded shadow-md overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Analysis Details</h2>
            {renderContent()}
          </div>
        </div>

        {/* Buttons Section at the Bottom */}
        <div className="flex justify-center space-x-4 p-6 bg-white border-t">
          <button
            onClick={() => handleSummaryAction("insights")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Key Insights
          </button>
          <button
            onClick={() => handleSummaryAction("summary")}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Summarize
          </button>
          <button
            onClick={() => handleSummaryAction("actions")}
            className="bg-purple-500 text-white px-4 py-2 rounded"
          >
            Actions
          </button>
          <button
            onClick={() => setShowPopup(true)} // Show popup to enter name
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save Analysis
          </button>
        </div>
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg text-center">
              <h2 className="text-lg font-bold mb-4">Save Analysis</h2>
              <input
                type="text"
                placeholder="Enter analysis name"
                value={analysisName}
                onChange={(e) => setAnalysisName(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full"
              />
              <div className="mt-4 space-x-4">
                <button
                  onClick={handleSaveAnalysis}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowPopup(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Save Confirmation Popup */}
        {isSaved && (
          //  (
          //     <div className="fixed top-0 inset-x-0 p-4 bg-green-600 text-white text-center z-5000">
          //       Analysis saved successfully! Check the History for saved analyses.
          //     </div>
          //   )&&
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg text-center">
              <p className="text-green-700">Analysis saved successfully!</p>
              <p>Click on History to view saved analyses.</p>
              <button
                onClick={() => setIsSaved(false)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-20 bg-white shadow-lg p-3 flex flex-col items-center">
        <Logo />
        <MenuItem icon="✨" name="chat" tooltip="Chat with AI" />
        <MenuItem icon="🔍" name="search" tooltip="Search the database" />
        <MenuItem icon="📊" name="analytics" tooltip="View analytics" />
        <MenuItem icon="🌿" name="graph" tooltip="Sustainability graphs" />
        <MenuItem icon="🗄️" name="summarize" tooltip="Summarize reports" />
        <MenuItem icon="🕒" name="history" tooltip="View history" />
        <MenuItem icon="📜" name="logs" tooltip="View logs" />

        <div className="flex-grow" />
        <MenuItem icon="⚙️" name="settings" tooltip="Settings" />
        <Avatar src="././images.jpg" alt="User" fallback="JD" />
      </div>

      <div className="flex flex-1 p-6 space-x-6 overflow-y-auto">
        {activePage === "chat" ? (
          <>
            <Card className="w-1/3 flex flex-col">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar
                    src="/api/placeholder/40/40"
                    alt="User"
                    fallback="JD"
                  />
                  <div>
                    <CardTitle>Jane Doe</CardTitle>
                    <p className="text-sm text-gray-500">
                      Sustainability Manager
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`${
                      message.type === "user"
                        ? "bg-gray-100 ml-auto"
                        : "bg-blue-100"
                    } p-3 rounded-lg max-w-[80%]`}
                  >
                    {typeof message.content === "string" ? (
                      <p className="text-sm">{message.content}</p>
                    ) : (
                      message.content
                    )}
                  </div>
                ))}
                {agentThinking && (
                  <div className="bg-blue-100 p-3 rounded-lg max-w-[80%]">
                    <p className="text-sm">Agent is pondering...</p>
                  </div>
                )}
                {followUpQuestions.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-semibold">
                      Follow-up questions:
                    </p>
                    {followUpQuestions.map((question, index) => (
                      <Button
                        key={index}
                        onClick={() => handleFollowUpQuestion(question)}
                        className="bg-gray-200 text-gray-800 text-sm w-full text-left"
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                )}
              </CardContent>
              <div className="p-4 border-t">
                <form onSubmit={handleSendMessage} className="flex">
                  <input
                    name="message"
                    placeholder="Type your query here..."
                    className="bg-gray-100 w-full mr-2 px-4 py-2 rounded-full"
                  />
                  <Button type="submit" className="bg-[#0F0E9A] text-white">
                    Send
                  </Button>
                </form>
              </div>
              <div className="p-4 border-t bg-gray-50 max-h-40 overflow-y-auto">
                <h3 className="font-semibold mb-2">Agent Logs:</h3>
                <div className="space-y-2 text-xs">
                  <p>
                    <span className="font-semibold">14:30:22</span> - Query:
                    Sustainability metrics for D-premium Suppliers
                  </p>
                  <p>
                    <span className="font-semibold">14:30:23</span> - Accessing
                    TigerGraph database
                  </p>
                  <p>
                    <span className="font-semibold">14:30:24</span> - Running
                    GSQL query: SELECT supplier, recycled_materials,
                    renewable_energy, carbon_footprint ...
                  </p>
                  <p>
                    <span className="font-semibold">14:30:25</span> - Processing
                    query results
                  </p>
                  <p>
                    <span className="font-semibold">14:30:26</span> - Generating
                    AI insights
                  </p>
                  <p>
                    <span className="font-semibold">14:30:27</span> - Rendering
                    sustainability metrics chart
                  </p>
                  <p>
                    <span className="font-semibold">14:30:28</span> - Response
                    sent to user
                  </p>
                </div>
              </div>
            </Card>

            <div className="flex-1 space-y-6 overflow-y-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Sustainability Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  {detailedResponse && <>{detailedResponse}</>}
                  {/* Conditionally render the button based on messages */}
                  <Button
                    onClick={() => {
                      console.log(
                        "Adding to analysis:",
                        messages[messages.length - 2]?.content,
                        detailedResponse
                      );
                      handleAddToAnalysis(
                        messages[messages.length - 2]?.content,
                        detailedResponse
                      );
                    }}
                    className={`mt-4 text-white ${
                      messages.length > 3
                        ? "bg-[#0F0E9A]"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                    disabled={messages.length === 0}
                  >
                    Add to Analysis
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Unilever Sustainable Visualization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center overflow-y-auto">
                    <ForceGraph3D
                      graphData={data_graph}
                      nodeAutoColorBy="group"
                      linkDirectionalParticles={4}
                      linkDirectionalParticleSpeed={(d) => d.value * 0.001}
                      //nodeLabel="id"
                      nodeLabel={(node) =>
                        `<span style="color: black">${node.id}</span>`
                      } // Display node labels in black
                      linkLabel={(link) =>
                        `<span style="color: black">${link.label}</span>`
                      } // Display edge labels in black on hover
                      backgroundColor="#f7fafc"
                      linkWidth={(link) => link.value * 0.2} // Make links bold based on their value
                      linkColor={() => "#000000"} // Set link color to black for better visibility
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sustainability Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex">
                    {/* Line Chart with Title */}
                    <div className="w-1/2">
                      <h3 className="text-center font-semibold mb-2">
                        Supplier X Performance Over Time
                      </h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={sustainabilityData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="onTimePerformance"
                            stroke="#009BDC" // Blue color for On Time Performance
                            name="On Time Performance (%)"
                          />
                          <Line
                            type="monotone"
                            dataKey="sustainableQuotient"
                            stroke="#FCB43C" // Orange color for Sustainable Quotient
                            name="Sustainable Quotient"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Bar Chart with Title */}
                    <div className="w-1/2">
                      <h3 className="text-center font-semibold mb-2">
                        KPIs Performance for Supplier X
                      </h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={sustainabilityData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar
                            dataKey="recycledMaterials"
                            fill="#3E3C3E" // Dark Gray
                            name="Recycled Materials (%)"
                          />
                          <Bar
                            dataKey="renewableEnergy"
                            fill="#009BDC" // Blue
                            name="Renewable Energy Usage (%)"
                          />
                          <Bar
                            dataKey="carbonFootprint"
                            fill="#FCB43C" // Orange
                            name="Carbon Footprint (tons CO2)"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>AI-Generated Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>
                      D-premium Supplier A has increased use of recycled
                      materials by 20% this quarter.
                    </li>
                    <li>
                      Renewable energy adoption among D-premium Suppliers has
                      grown from 40% to 60% in the last 6 months.
                    </li>
                    <li>
                      Overall carbon footprint has decreased by 15% due to
                      sustainable raw material sourcing.
                    </li>
                    <li>
                      85% of our packaging now comes from sustainable sources,
                      up from 70% last year.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </>
        ) : activePage === "summarize" ? (
          <Card className="w-full h-full">
            <CardContent className="h-full">
              <SummarizePage
                chatMessages={chatMessages}
                setChatMessages={setChatMessages}
                savedAnalyses={savedAnalyses} // Pass down savedAnalyses
                setSavedAnalyses={setSavedAnalyses} // Pass down setSavedAnalyses
                isSaved={isSaved}
                setIsSaved={setIsSaved}
              />
            </CardContent>
          </Card>
        ) : activePage === "history" ? (
          <Card className="w-full h-full">
            <CardContent className="h-full">
              <HistoryPage savedAnalyses={savedAnalyses} />
            </CardContent>
          </Card>
        ) : (
          <div className="w-full flex items-center justify-center">
            <p className="text-xl text-gray-500">
              Content for {activePage} page
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
