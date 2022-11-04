import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import closeIcon from "../../assets/icons/close.svg";
import { Rule } from "../../common/model";
import supabase from "../../supabaseClient";
import LoadingRule from "./LoadingRule";
import RuleCard from "./RuleCard";

function RulesView() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [rules, setRules] = useState<Rule[]>([]);

  useEffect(() => {
    supabase.from<Rule>("rules").then((response) => {
      setLoaded(true);
      if (response.data) {
        setRules(response.data);
      }
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-[#28DAD4] relative">
      <div className="fixed top-2 right-2 hover:animate-pulse hover:cursor-pointer">
        <Link to="/">
          <img src={closeIcon} />
        </Link>
      </div>
      <div className="h-5/6 w-11/12 md:w-1/3 md:h-5/6 bg-white rounded-2xl ">
        <div className="text-[120px] mt-[-100px] text-center">🍻</div>
        {!loaded && (
          <div className="flex flex-col justify-center items-center h-full">
            <LoadingRule></LoadingRule>
          </div>
        )}
        {loaded && rules && (
          <div>
            {rules.map((rule) => (
              <RuleCard key={rule.id} rule={rule}></RuleCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RulesView;
