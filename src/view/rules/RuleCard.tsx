import { Rule } from "../../common/model";

function RuleCard(props: { rule: Rule }) {
  return (
    <>
      <div className="m-3">
        <h1 className="font-semibold">{props.rule.title}</h1>
        <p className="italic">{props.rule.description}</p>
      </div>
    </>
  );
}

export default RuleCard;
