import { Rule } from "../../common/model";

function RuleCard(props: { rule: Rule }) {
  return (
    <>
      <div>
        <h1>{props.rule.title}</h1>
        <p>{props.rule.description}</p>
      </div>
    </>
  );
}

export default RuleCard;
