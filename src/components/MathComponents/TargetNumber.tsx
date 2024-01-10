interface TargetNumberInterface {
    targetNumber: number;
}

function TargetNumber(props: TargetNumberInterface) {
    return <p className="target-number">Target: {props.targetNumber}</p>
}

export default TargetNumber;