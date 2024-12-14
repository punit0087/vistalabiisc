export default function Page() {
  return (
    <div className=" text-white mt-[10%] w-[80%] mx-auto sm:mt-[40%]">
      <h2 className="text-2xl text-zinc-300 font-bold mb-4">
        Teaching Experience
      </h2>

      <h3 className="text-lg text-zinc-300 font-semibold mb-2">
        Current Teaching
      </h3>

      <div className="mb-4">
        <p>
          <strong>
            CP 217, Machine Learning for Cyber-Physical Systems (ML4CPS)
          </strong>{" "}
          (Aug-Dec 2024), IISc Bangalore
        </p>
        <p className="credits">Credits: 3:1</p>
      </div>

      <div className="mb-4">
        <p>
          <strong>CP 318, Data Science for Smart City Applications</strong>{" "}
          (Aug-Dec 2022, 2023), IISc Bangalore
        </p>
        <p className="credits">Credits: 2:1 </p>
      </div>

      <div className="mb-4">
        <p>
          <strong>
            DA 218-O, Probabilistic Machine Learning: Theory and Applications
          </strong>{" "}
          (Jan-April 2023, 2024) (M.Tech Online Course), IISc Bangalore
        </p>
        <p className="credits">Credits: 3:1 </p>
      </div>

      <div className="mb-4">
        <p>
          <strong>CP 218, Theory and Applications of Bayesian Learning</strong>{" "}
          (Jan-April 2022, 2023, 2024), IISc Bangalore
        </p>
        <p className="credits">Credits: 2:1 </p>
      </div>

      <h3 className="text-lg text-zinc-300 font-semibold mt-10 mb-2">
        Previous Teaching (During my Ph.D.)
      </h3>
      <div className="mb-4">
        <p>
          <strong>
            Postgraduate Course COMP90051 Statistical Machine Learning
          </strong>{" "}
          with Assoc. Prof. Benjamin Rubinstein, School of Computing and
          Information Systems, The University of Melbourne, Australia, July 2018
          - Nov 2018
        </p>
      </div>

      <div className="mb-4">
        <p>
          <strong>
            Postgraduate Course SIT 743 Multivariate and Categorical Data
            Analysis
          </strong>{" "}
          with Asst. Prof. Sutharshan Rajasegarar, School of Information
          Technology, Deakin University, Burwood, Australia, July 2018 - Oct
          2018
        </p>
      </div>

      <div className="mb-4">
        <p>
          <strong>
            Postgraduate Course COMP90051 Statistical Machine Learning
          </strong>{" "}
          with Assoc. Prof. Trevor Cohn, School of Computing and Information
          Systems, The University of Melbourne, Australia, July 2016 - Nov 2016
        </p>
      </div>
    </div>
  );
}
