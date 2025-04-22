import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Hero = () => {
  const [homeValue, setHomeValue] = useState(3000);
  const [downPayment, setDownPayment] = useState(600);
  const [loanAmount, setLoanAmount] = useState(2400);
  const [interestRate, setInterestRate] = useState(5);
  const [tenure, setTenure] = useState(5);

  const totalMonths = tenure * 12;
  const interestPerMonth = interestRate / 100 / 12;

  const monthlyPayment = (
    (loanAmount * interestPerMonth * Math.pow(1 + interestPerMonth, totalMonths)) /
    (Math.pow(1 + interestPerMonth, totalMonths) - 1)
  ).toFixed(2);

  const totalInterest = (monthlyPayment * totalMonths - loanAmount).toFixed(2);

  const pieData = {
    labels: ["Principal", "Interest"],
    datasets: [
      {
        data: [loanAmount, totalInterest],
        backgroundColor: ["#fbcfe8", "#bae6fd"],
        borderColor: ["#f3f4f6"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen p-4 bg-white">
      <h1 className="text-xl font-semibold text-white bg-blue-600 py-4 px-6 rounded-md mb-6">
        Bank of React
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Section */}
        <div className="flex-1 space-y-6">
          {/* Home Value */}
          <div>
            <label className="block text-gray-700 mb-1">Home Value</label>
            <p className="text-xl font-semibold text-blue-600">$ {homeValue}</p>
            <input
              type="range"
              min="1000"
              max="10000"
              step="100"
              value={homeValue}
              onChange={(e) => {
                const value = Number(e.target.value);
                const dp = value * 0.2;
                setHomeValue(value);
                setDownPayment(dp);
                setLoanAmount(value - dp);
              }}
              list="homeValueSteps"
              className="w-full accent-blue-600"
            />
            <datalist id="homeValueSteps">
              {Array.from({ length: 91 }, (_, i) => (
                <option key={i} value={1000 + i * 100} />
              ))}
            </datalist>
            <div className="text-sm text-gray-500 mt-1 flex justify-between">
              <span>$1000</span>
              <span>$10000</span>
            </div>
          </div>

          {/* Down Payment */}
          <div>
            <label className="block text-gray-700 mb-1">Down Payment</label>
            <p className="text-xl font-semibold text-blue-600">$ {downPayment}</p>
            <input
              type="range"
              min="0"
              max={homeValue}
              step="500"
              value={downPayment}
              onChange={(e) => {
                const value = Number(e.target.value);
                setDownPayment(value);
                setLoanAmount(homeValue - value);
              }}
              list="downPaymentSteps"
              className="w-full accent-blue-600"
            />
            <datalist id="downPaymentSteps">
              {Array.from({ length: Math.floor(homeValue / 500) + 1 }, (_, i) => (
                <option key={i} value={i * 500} />
              ))}
            </datalist>
            <div className="text-sm text-gray-500 mt-1 flex justify-between">
              <span>$0</span>
              <span>${homeValue}</span>
            </div>
          </div>

          {/* Loan Amount */}
          <div>
            <label className="block text-gray-700 mb-1">Loan Amount</label>
            <p className="text-xl font-semibold text-blue-600">$ {loanAmount}</p>
            <input
              type="range"
              min="0"
              max={homeValue}
              step="500"
              value={loanAmount}
              onChange={(e) => {
                const value = Number(e.target.value);
                setLoanAmount(value);
                setDownPayment(homeValue - value);
              }}
              list="loanAmountSteps"
              className="w-full accent-blue-600"
            />
            <datalist id="loanAmountSteps">
              {Array.from({ length: Math.floor(homeValue / 500) + 1 }, (_, i) => (
                <option key={i} value={i * 500} />
              ))}
            </datalist>
            <div className="text-sm text-gray-500 mt-1 flex justify-between">
              <span>$0</span>
              <span>${homeValue}</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <label className="block text-gray-700 mb-1">Interest Rate</label>
            <p className="text-xl font-semibold text-blue-600">{interestRate}%</p>
            <input
              type="range"
              min="2"
              max="18"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              list="interestRateSteps"
              className="w-full accent-blue-600"
            />
            <datalist id="interestRateSteps">
              {Array.from({ length: 161 }, (_, i) => (
                <option key={i} value={(2 + i * 0.1).toFixed(1)} />
              ))}
            </datalist>
            <div className="text-sm text-gray-500 mt-1 flex justify-between">
              <span>2%</span>
              <span>18%</span>
            </div>
          </div>

          {/* Tenure */}
          <div>
            <label className="block text-gray-700 mb-1">Tenure</label>
            <select
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              {[5, 10, 15, 20, 25, 30].map((year) => (
                <option key={year} value={year}>
                  {year} years
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex flex-col items-center">
          <h2 className="text-xl text-center mt-20 font-semibold mb-4 text-gray-800">
            Monthly Payment: ${monthlyPayment}
          </h2>
          <div className="w-full max-w-[400px] flex justify-center">
            <Pie data={pieData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

