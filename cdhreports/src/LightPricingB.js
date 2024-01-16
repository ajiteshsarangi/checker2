import React, { useEffect } from "react";
import PropTypes from "prop-types";

function LightPricingB(props) {
  const { results } = props;
  // console.log(results);
  var New = [results];
  console.log(results);
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
            Pricing
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Banh mi cornhole echo park skateboard authentic crucifix neutra tilde lyft biodiesel
            artisan direct trade mumblecore 3 wolf moon twee
          </p>
        </div>
        <div className="lg:w-2/3 w-full mx-auto overflow-auto">
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                  Value Missing in CDH
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Missing Value of CDH
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Value Missing in CDP
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Missing Value of CDP
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {results === undefined ? (
                <tr>
                  <td className="px-4 py-3">NA</td>
                  <td className="px-4 py-3">NA</td>
                  <td className="px-4 py-3">NA</td>
                  <td className="px-4 py-3">NA</td>
                </tr>
              ) : (
                results.map((data, index) => (
                  <tr key={index}>
                    {/* <td className="px-4 py-3">{data[index][`cdp${index + 1}_NotPresent`]}</td>
                    <td className="px-4 py-3">
                      {`${JSON.stringify(data[index][`cdp${index + 1}_IsMissing`])}`}
                    </td>
                    <td className="px-4 py-3">{data[index][`cdh${index + 1}_NotPresent`]}</td>
                    <td className="px-4 py-3">
                      {`${JSON.stringify(data[index][`cdh${index + 1}_IsMissing`])}`}
                    </td> */}
                    <td className="px-4 py-3">{console.log(data[index])}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

LightPricingB.defaultProps = {
  theme: "indigo",
};

LightPricingB.propTypes = {
  theme: PropTypes.string.isRequired,
};

export default LightPricingB;
